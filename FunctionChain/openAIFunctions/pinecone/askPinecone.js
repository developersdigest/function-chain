import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

const execute = async ({ indexName = process.env.PINECONE_INDEX, question, namespace }) => {
  // console.log(`Querying question to Pinecone index: ${question}`);
  const apiKey = process.env.PINECONE_API_KEY;
  const environment = process.env.PINECONE_ENVIRONMENT;

  if (!apiKey || !environment || !indexName) {
    console.warn('Warning: API key, environment, or Pinecone index name not found in process environment variables or function parameters. Please ensure to input your Pinecone API key, environment, and index name in the .env file or function parameters for this function to work.');
    return;
  }

  const client = new PineconeClient();
  await client.init({
    apiKey,
    environment,
  });

  const index = client.Index(indexName);
  const queryEmbedding = await new OpenAIEmbeddings().embedQuery(question);

  let queryResponse = await index.query({
    queryRequest: {
      namespace: namespace || null,
      topK: 3,
      vector: queryEmbedding,
      includeMetadata: true,
      includeValues: true,
    },
  });

  let response = {};

  if (queryResponse.matches.length) {
    const topResultsString = queryResponse.matches
      .map((match, index) => `${index + 1}. ${match.metadata.txtPath}`)
      .join(", ");
  
    response = `indexName: ${indexName}, question: ${question}, namespace: ${namespace}, answer: Query '${question}' to index '${indexName}' in namespace '${namespace}' yielded the following top results: ${topResultsString}`;
  } else {
    response = `indexName: ${indexName}, question: ${question}, namespace: ${namespace}, answer: There were no matches found for the question: ${question} in the Pinecone index: ${indexName}`;
  }
  return response;
};


const details = {
  name: 'askPinecone',
  description: 'This function queries/asks a question to a Pinecone index and returns the top answer. The Pinecone client, index name, and API keys are specified in the .env file or function parameters.',
  parameters: {
    type: 'object',
    properties: {
      indexName: {
        type: 'string',
        description: 'The name of the Pinecone index to be queried. If not provided, it will default to the value specified in the .env file.',
      },
      question: {
        type: 'string',
        description: 'The query for the Pinecone index.',
      },
      namespace: {
        type: 'string',
        description: 'Optional namespace for Pinecone query.',
      },
    },
    required: ['question'],
  },
  example: 'Query the Pinecone index with a question.',
};

export const askPinecone = {
  execute,
  details,
};
