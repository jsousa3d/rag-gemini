import { EndpointServiceClient } from '@google-cloud/aiplatform';
import { GoogleAuth } from 'google-auth-library';

class GoogleClient {
  private static instance: EndpointServiceClient | null = null;

  private constructor() {}

  public static async getInstance(): Promise<EndpointServiceClient> {
    if (!GoogleClient.instance) {
      const auth = new GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/cloud-platform']
      });
      const authClient = await auth.getClient();
      GoogleClient.instance = new EndpointServiceClient({ authClient });
    }
    return GoogleClient.instance;
  }
}

export default GoogleClient;
