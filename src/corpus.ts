import { EndpointServiceClient } from '@google-cloud/aiplatform';
import GoogleClient from './googleClient';

const createCorpus = async (
  projectId: string,
  displayName: string
): Promise<string> => {
  const client: EndpointServiceClient = await GoogleClient.getInstance();

  const corpus = {
    displayName: displayName
  };

  const request = {
    parent: `projects/${projectId}/locations/YOUR_LOCATION`, // replace YOUR_LOCATION with your actual location
    corpus: corpus
  };

  const [response] = await client.createCorpus(request);
  return response.name;
};

export default createCorpus;
