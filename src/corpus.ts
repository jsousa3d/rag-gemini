import { aiplatform } from '@google-cloud/aiplatform';
import initializeClient from './googleClient';

const { Corpus } = aiplatform.protos.google.cloud.aiplatform.v1;

const createCorpus = async (
  projectId: string,
  displayName: string
): Promise<string> => {
  const client = await initializeClient();

  const corpus = new Corpus({
    displayName: displayName
  });

  const request = {
    parent: `projects/${projectId}/locations/YOUR_LOCATION`, // replace YOUR_LOCATION with your actual location
    corpus: corpus
  };

  const [response] = await client.createCorpus(request);
  return response.name;
};

export default createCorpus;
