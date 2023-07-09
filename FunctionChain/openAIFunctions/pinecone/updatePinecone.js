import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const execute = async ({
  text,
  indexName: paramIndexName,
  source,
  namespace,
}) => {
  console.log(`Updating Pinecone index with: ${text}..`);
  const apiKey = process.env.PINECONE_API_KEY;
  const environment = process.env.PINECONE_ENVIRONMENT;
  const indexName = paramIndexName || process.env.PINECONE_INDEX;

  if (!apiKey || !environment || !indexName) {
    throw new Error(
      "API key, environment, or Pinecone index name not found in process environment variables or function parameters. Please ensure to input your Pinecone API key, environment, and index name in the .env file or function parameters for this function to work."
    );
  }

  const client = new PineconeClient();
  await client.init({
    apiKey,
    environment,
  });

  const index = client.Index(indexName);
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
  });

  const chunks = await textSplitter.createDocuments([text]);
  const embeddingsArrays = await new OpenAIEmbeddings().embedDocuments(
    chunks.map((chunk) => chunk.pageContent.replace(/\n/g, " "))
  );

  const batchSize = 100;
  let batch = [];

  for (let idx = 0; idx < chunks.length; idx++) {
    const chunk = chunks[idx];
    const vector = {
      id: `${text}_${idx}`,
      values: embeddingsArrays[idx],
      metadata: {
        ...chunk.metadata,
        source,
        loc: JSON.stringify(chunk.metadata.loc),
        txtPath: text,
      },
    };
    batch.push(vector);
    if (batch.length === batchSize || idx === chunks.length - 1) {
      await index.upsert({
        upsertRequest: {
          vectors: batch,
          namespace: namespace, // Use the namespace parameter here
        },
      });

      batch = [];
    }
  }

  return `The Pinecone index "${indexName}" was updated with text: "${text}" in the namespace "${namespace}"`;
};

const details = {
  name: "updatePinecone",
  description:
    "This function updates a Pinecone index with vector embeddings generated from a given text with an optional namespace if passed. The Pinecone client, index name, and API keys are specified in the .env file or function parameters.",
  parameters: {
    type: "object",
    properties: {
      text: {
        type: "string",
        description:
          "The text to be processed and added to the Pinecone index.",
      },
      indexName: {
        type: "string",
        description:
          "Optional name of the Pinecone index to be updated. If not provided, it will default to the value specified in the .env file.",
      },
      source: {
        type: "string",
        description:
          "Optional source of the text being processed. This is optional and will be included in the vector metadata if provided.",
      },
      namespace: {
        type: "string",
        description:
          "Optional namespace to be used when updating the Pinecone index. This is optional and if not provided, no namespace will be used.",
      },
    },
    required: ["text"],
  },

  example:
    "Update the Pinecone index with vector embeddings generated from a given text, with an optional Pinecone index name.",
};

export const updatePinecone = {
  execute,
  details,
};
