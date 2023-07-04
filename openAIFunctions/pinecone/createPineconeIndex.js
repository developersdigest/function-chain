// Import required packages
import { PineconeClient } from "@pinecone-database/pinecone";

// 1. Write Function Code Within Execute Function
export const execute = async (options) => {
    const { indexName } = options;
    const apiKey = process.env.PINECONE_API_KEY;
    const environment = process.env.PINECONE_ENVIRONMENT;
    const vectorDimension = 1536;  // Vector dimension is set to a constant value
    if (!apiKey || !environment) {
      return 'API key or environment not found in process environment variables. Please ensure to input your Pinecone API key and environment in the .env file for this function to work.';
    }
    const client = new PineconeClient();
    await client.init({
        apiKey,
        environment,
    });

    console.log(`Checking "${indexName}"...`);
    const existingIndexes = await client.listIndexes();

    if (!existingIndexes.includes(indexName)) {
        console.log(`Creating "${indexName}"...`);
        await client.createIndex({
            createRequest: {
                name: indexName,
                dimension: vectorDimension,
                metric: "cosine",
            },
        });
        console.log(`Created client`);
        console.log(`Created client with index "${indexName}"`);
        return `Created client with index "${indexName}"`;
    } else {
        console.log(`"${indexName}" already exists.`);
        return `"${indexName}" already exists.`;
    }
};

// 2. Add Function Details for LLM to use
export const details = {
    name: 'createPineconeIndex',
    description: 'This function checks if a specified Pinecone index exists. If it does not exist, it will create a new one. Do not confuse this with updating an index.',
    parameters: {
        type: 'object',
        properties: {
            indexName: {
                type: 'string',
                description: 'The name of the index to be created or checked.',
            },
        },
    },
    example: 'Check if "your-pinecone-index-name" index exists, if not create it.',
};
