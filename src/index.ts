import createCorpus from './corpus';
import chunkDocument from './chunk';
import createDocument from './document';
import queryCorpus from './query';
import generateAnswer from './generateAnswer';

const main = async () => {
  try {
    const projectId = 'your-project-id';
    const corpusDisplayName = 'Your Corpus Display Name';
    const documentDisplayName = 'Your Document Display Name';
    const documentUrl = 'https://your-document-url.com';
    const question = 'Your question here';

    const corpusName = await createCorpus(projectId, corpusDisplayName);
    const documentName = await createDocument(
      projectId,
      corpusName,
      documentDisplayName,
      documentUrl
    );
    await chunkDocument(
      projectId,
      corpusName,
      documentDisplayName,
      documentUrl
    );
    const queryResponse = await queryCorpus(corpusName, question, ['Tag1']);
    const aqaResponse = await generateAnswer(corpusName, question);

    console.log('Query Response:', queryResponse);
    console.log('AQA Response:', aqaResponse);
  } catch (error) {
    console.error('Error:', error);
  }
};

main().catch(console.error);
