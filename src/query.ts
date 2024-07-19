import { client } from './auth';

export const queryCorpus = async (
  corpusName: string,
  query: string,
  tags: string[],
  resultsCount: number = 5
) => {
  const request = {
    name: corpusName,
    query,
    resultsCount,
    metadataFilters: [
      {
        key: 'chunk.custom_metadata.tags',
        conditions: tags.map((tag) => ({
          stringValue: tag,
          operation: 'INCLUDES'
        }))
      }
    ]
  };

  const [response] = await client.queryCorpus(request);
  console.log('Query response:', response);
  return response;
};
