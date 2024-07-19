import Bottleneck from 'bottleneck';
import initializeClient from './googleClient';

const limiter = new Bottleneck({
  minTime: 200,
  maxConcurrent: 1
});

const generateAnswer = async (
  corpusName: string,
  question: string,
  answerStyle: string = 'ABSTRACTIVE'
) => {
  const client = await initializeClient();

  const request = {
    model: 'models/aqa',
    contents: [{ parts: [{ text: question }] }],
    semanticRetriever: {
      source: corpusName,
      query: { parts: [{ text: question }] }
    },
    answerStyle
  };

  const attemptGenerateAnswer = async (retries = 3): Promise<any> => {
    try {
      const [response] = await client.generateAnswer(request);
      return response;
    } catch (error) {
      if (retries > 0) {
        await new Promise((res) => setTimeout(res, (4 - retries) * 1000));
        return attemptGenerateAnswer(retries - 1);
      } else {
        throw error;
      }
    }
  };

  return limiter.schedule(() => attemptGenerateAnswer());
};

export default generateAnswer;
