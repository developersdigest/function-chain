// Import the FunctionChain class and the functions you plan to use
import { FunctionChain, createPinecone, updatePinecone, askPinecone } from "ai-function-chain";

// Instantiate the FunctionChain with the functions you want to use
const functionChain = new FunctionChain({
  functions: [createPinecone, updatePinecone, askPinecone],
});

// Use the FunctionChain to call your functions
const create = await functionChain.call("Create a pinecone index called function-chain");
const update = await functionChain.call("In my pinecone index called function-chain, add the namespace bookshelf and add 1984 by George Orwell to it");
const ask = await functionChain.call("Check my pinecone index called function-chain in the bookshelf namespace and what books by George Orwell are in it?");

console.log(`1. ${create} \n2. ${update} \n3. ${ask}`);
