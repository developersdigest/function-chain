import { Client } from "@pinecone/database";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const execute = async (text) => {
  const apiKey = process.env.PINECONE_API_KEY;
  const environment = process.env.PINECONE_ENVIRONMENT;
  const indexName = process.env.PINECONE_INDEX;

  if (!apiKey || !environment || !indexName) {
    throw new Error('API key, environment, or Pinecone index name not found in process environment variables. Please ensure to input your Pinecone API key, environment, and index name in the .env file for this function to work.');
  }

  const client = new Client({
    apiKey: apiKey,
    environment: environment,
  });

  console.log("Retrieving Pinecone index...");
  const index = client.index(indexName);
  console.log(`Pinecone index retrieved: ${indexName}`);

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
  });

  console.log("Splitting text into chunks...");
  const chunks = await textSplitter.createDocuments([text]);
  console.log(`Text split into ${chunks.length} chunks`);
  console.log(`Calling OpenAI's Embedding endpoint documents with ${chunks.length} text chunks ...`);

  const embeddingsArrays = await new OpenAIEmbeddings().embedDocuments(
    chunks.map((chunk) => chunk.pageContent.replace(/\n/g, " "))
  );

  console.log("Finished embedding documents");
  console.log(`Creating ${chunks.length} vectors array with id, values, and metadata...`);

  const batchSize = 100;
  let batch = [];

  for (let idx = 0; idx < chunks.length; idx++) {
    const chunk = chunks[idx];
    const vector = {
      id: `${text}_${idx}`,
      values: embeddingsArrays[idx],
      metadata: {
        ...chunk.metadata,
        loc: JSON.stringify(chunk.metadata.loc),
        pageContent: chunk.pageContent,
        txtPath: text,
      },
    };
    batch.push(vector);

    if (batch.length === batchSize || idx === chunks.length - 1) {
      await index.upsert({
        upsertRequest: {
          vectors: batch,
        },
      });

      batch = [];
    }
  }

  console.log(`Pinecone index updated with ${chunks.length} vectors`);
  return "Pinecone index successfully updated.";
};
export const details = {
    name: 'updatePinecone',
    description: 'This function updates a Pinecone index with vector embeddings generated from a given text. The Pinecone client, index name, and API keys are specified in the .env file.',
    parameters: {
        type: 'object',
        properties: {
            text: {
                type: 'string',
                description: 'The text to be processed and added to the Pinecone index.',
            },
        },
    },
    example: 'Update the Pinecone index with vector embeddings generated from a given text.',
};
