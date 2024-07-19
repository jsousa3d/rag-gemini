import { EndpointServiceClient } from '@google-cloud/aiplatform';
import GoogleClient from './googleClient';

const createDocument = async (
  projectId: string,
  location: string,
  documentName: string,
  documentUrl: string
): Promise<any> => {
  const client: EndpointServiceClient = await GoogleClient.getInstance();

  const document = {
    displayName: documentName,
    customMetadata: { url: documentUrl }
  };

  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    document
  };

  const [response] = await client.createDocument(request);
  return response;
};

export default createDocument;
