// Import required packages
import { PineconeClient } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

dotenv.config();  // Load environment variables

// 1. Write Function Code Within Execute Function
export const execute = async (options) => {
    const { indexName, vectorDimension } = options;
    const apiKey = process.env.PINECONE_API_KEY;
    const environment = process.env.PINECONE_ENVIRONMENT;
    if (!apiKey || !environment) {
      return 'API key or environment not found in process environment variables. Please ensure to input your Pinecone API key and environment in the .env file for this function to work.';
    }
    // Initialize Pinecone client
    const client = new PineconeClient();
    await client.init({
        apiKey,
        environment,
    });

    console.log(`Checking "${indexName}"...`);
    const existingIndexes = await client.listIndexes();

    if (!existingIndexes.includes(indexName)) {
        console.log(`Creating "${indexName}"...`);
        const createClient = await client.createIndex({
            createRequest: {
                name: indexName,
                dimension: vectorDimension,
                metric: "cosine",
            },
        });
        console.log(`Created with client:`, createClient);
        await new Promise((resolve) => setTimeout(resolve, 60000));
    } else {
        console.log(`"${indexName}" already exists.`);
    }
};

// 2. Add Function Details for LLM to use
export const details = {
    name: 'createPineconeIndex',
    description: 'This function checks if a specified Pinecone index exists. If it does not exist, it will create a new one. The name and vector dimension of the index are customizable.',
    parameters: {
        type: 'object',
        properties: {
            indexName: {
                type: 'string',
                description: 'The name of the index to be created or checked.',
            },
            vectorDimension: {
                type: 'number',
                description: 'The vector dimension for the index.',
            },
        },
    },
    example: 'Check if "your-pinecone-index-name" index exists, if not create it with a vector dimension of 1536.',
};