import { FunctionChain } from "ai-function-chain";

const pineconeChain = new FunctionChain();

const create = await pineconeChain.call("Create an index called bookshelf");
const update = await pineconeChain.call("Add 'The goose is named Joe' to the bookshelf index");
const ask = await pineconeChain.call("What is the name of the goose in the bookshelf index?");

console.log(`1. ${create} \n 2. ${update} \n 3. ${ask}`);
