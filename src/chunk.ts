import axios from 'axios';
import { parse } from 'node-html-parser';
import { EndpointServiceClient } from '@google-cloud/aiplatform';
import GoogleClient from './googleClient';
import createDocument from './document';

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
    const chunk = {
      data: { stringValue: text.slice(i, i + chunkSize) },
      customMetadata: {
        tags: ['Tag1', 'Tag2'],
        chunkingStrategy: 'greedily_aggregate_sibling_nodes'
      }
    };

    const createChunkRequest = {
      parent: document.name,
      chunk
    };

    chunks.push(createChunkRequest);
  }

  const client: EndpointServiceClient = await GoogleClient.getInstance();
  await client..batchCreateChunks({ parent: document.name, requests: chunks });

  return chunks;
};
export default chunkDocument;
