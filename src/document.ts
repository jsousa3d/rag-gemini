
import initializeClient from './googleClient';

const { Document } = aiplatform.protos.google.cloud.aiplatform.v1;

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

export default createDocument;
