import axios from 'axios';
import { parse } from 'node-html-parser';
import { aiplatform } from '@google-cloud/aiplatform';
import initializeClient from './client';

const { Document, Chunk } = aiplatform.protos.google.cloud.aiplatform.v1;

const createDocument = async (
  projectId: string,
  location: string,
  documentName: string,
  documentUrl: string
): Promise<any> => {
  const client = await initializeClient();

  const document = new Document({
    displayName: documentName,
    customMetadata: { url: documentUrl }
  });

  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    document
  };

  const [response] = await client.createDocument(request);
  return response;
};

const chunkDocument = async (
  projectId: string,
  location: string,
  documentName: string,
  documentUrl: string
): Promise<any[]> => {
  const response = await axios.get(documentUrl);
  const root = parse(response.data);
  const text = root.text;

  const document = await createDocument(
    projectId,
    location,
    documentName,
    documentUrl
  );

  const chunks: any[] = [];
  const chunkSize = 2000;
  for (let i = 0; i < text.length; i += chunkSize) {
    const chunk = new Chunk({
      data: { stringValue: text.slice(i, i + chunkSize) },
      customMetadata: {
        tags: ['Tag1', 'Tag2'],
        chunkingStrategy: 'greedily_aggregate_sibling_nodes'
      }
    });

    const createChunkRequest = {
      parent: document.name,
      chunk
    };

    chunks.push(createChunkRequest);
  }

  const client = await initializeClient();
  await client.batchCreateChunks({ parent: document.name, requests: chunks });

  return chunks;
};

export { createDocument, chunkDocument };
