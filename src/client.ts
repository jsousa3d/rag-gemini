import { AIPlatformServiceClient } from '@google-cloud/aiplatform';
import { getAuthClient } from './auth';

let clientInstance: AIPlatformServiceClient | null = null;

const initializeClient = async (): Promise<AIPlatformServiceClient> => {
  if (!clientInstance) {
    const authClient = await getAuthClient();
    clientInstance = new AIPlatformServiceClient({ authClient });
  }
  return clientInstance;
};

export default initializeClient;
