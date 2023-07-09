// Import required packages
import { PineconeClient } from "@pinecone-database/pinecone";

// 1. Write Function Code Within Execute Function
const execute = async ({ indexName: paramIndexName }) => {
  const indexName = paramIndexName || process.env.PINECONE_INDEX;
  if (!indexName) {
    console.warn(
      "No indexName provided and no 'PINECONE_INDEX' environment variable found. Please specify an index name."
    );
    return;
  }
  console.log(`Checking if ${indexName} index exists in Pinecone...`);
  const apiKey = process.env.PINECONE_API_KEY;
  const environment = process.env.PINECONE_ENVIRONMENT;
  const vectorDimension = 1536; // Vector dimension is set to a constant value
  if (!apiKey || !environment) {
    return "API key or environment not found in process environment variables. Please ensure to input your Pinecone API key and environment in the .env file for this function to work.";
  }
  const client = new PineconeClient();
  await client.init({
    apiKey,
    environment,
  });

  const existingIndexes = await client.listIndexes();

  if (!existingIndexes.includes(indexName)) {
    console.log(
      `Creating index "${indexName}" this can take a couple minutes to initalize the index if creating for the first time`
    );
    await client.createIndex({
      createRequest: {
        name: indexName,
        dimension: vectorDimension,
        metric: "cosine",
      },
    });
    await new Promise((resolve) => setTimeout(resolve, 60000)); // Pause for 30 seconds while initalizing the firs time

    return `Created client with index "${indexName}"`;
  } else {
    return `"${indexName}" already exists.`;
  }
};

// 2. Add Function Details for LLM to use
const details = {
  name: "createPinecone",
  description:
    "This function checks if a specified Pinecone index exists. If it does not exist, it will create a new one. Do not confuse this with updating an index.",
  parameters: {
    type: "object",
    properties: {
      indexName: {
        type: "string",
        description:
          "The name of the index to be created or checked. If not provided, it will default to the value specified in the .env file.",
      },
    },
  },
  example:
    'Check if "your-pinecone-index-name" index exists, if not create it.',
};
export const createPinecone = {
  execute,
  details,
};
