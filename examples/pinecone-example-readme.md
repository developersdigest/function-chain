# Pinecone Usage Guide

This README will guide you through setting up and using Pinecone with the given code examples. 

## Prerequisites

Make sure to have the following dependencies installed in your project:

- @pinecone-database/pinecone
- langchain

You can install them using your package manager of choice, such as `pnpm`, `npm` or `yarn`:

```bash
npm install @pinecone-database/pinecone langchain
```
OR
```bash
yarn add @pinecone-database/pinecone langchain
```
OR
```bash
pnpm add @pinecone-database/pinecone langchain
```

Additionally, you will need a Pinecone API key and the Pinecone environment. An optional index name can also be provided. These can be set in your `.env` file as shown below:

```bash
PINECONE_API_KEY=<your_api_key>
PINECONE_ENVIRONMENT=<your_environment>
PINECONE_INDEX=<your_index_name>  # This is optional
```

## Code Example

Here are some example usage of Pinecone:

```javascript
import { FunctionChain } from "ai-function-chain";

const pineconeChain = new FunctionChain();

const create = await pineconeChain.call("Create an index called bookshelf");
const update = await pineconeChain.call("Add 'The goose is named Joe' to the bookshelf index");
const ask = await pineconeChain.call("What is the name of the goose in the bookshelf index?");

console.log(`1. ${create} \n 2. ${update} \n 3. ${ask}`);
```

## Notes

Please note that when you are creating a Pinecone index for the first time, it could take a minute or two to fully set up the database.
