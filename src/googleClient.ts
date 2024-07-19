import { aiplatform } from '@google-cloud/aiplatform';
import { getAuthClient } from './auth';

const { EndpointServiceClient } = aiplatform.v1;

let clientInstance: EndpointServiceClient | null = null;

const initializeClient = async (): Promise<EndpointServiceClient> => {
  if (!clientInstance) {
    const authClient = await getAuthClient();
    clientInstance = new EndpointServiceClient({ authClient });
  }
  return clientInstance;
};

export default initializeClient;
