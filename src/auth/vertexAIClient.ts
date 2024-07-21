import { VertexAI, VertexInit } from '@google-cloud/vertexai';
import { GoogleAuth, GoogleAuthOptions, JWT } from 'google-auth-library';
import cfg from '../config/env';

const { _LOCATION, _API_ENDPOINT } = cfg;

const setupVertexAIClient = async (): Promise<VertexAI> => {
  const authOptions: GoogleAuthOptions = {
    keyFilename: '../../service_account_key.json', // Update this path to your service account key file
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
  };

  const auth = new GoogleAuth(authOptions);

  const authClient = (await auth.getClient()) as JWT; // Explicitly cast to JWT to bypass the type error
  const projectId = await auth.getProjectId();

  const vertexInit: VertexInit = {
    project: projectId,
    location: _LOCATION,
    googleAuthOptions: {
      authClient: authClient
    },
    apiEndpoint: _API_ENDPOINT
  };
  return new VertexAI(vertexInit);
};

export default setupVertexAIClient;
