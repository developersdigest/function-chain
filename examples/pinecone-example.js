import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain({
    functionsArray: ["createPinecone", "updatePinecone", "askPinecone"]
});

const create = await functionChain.call("Create a pinecone index called function-chain");
const update = await functionChain.call("In my pinecone index called function-chain, add the namespace bookshelf and add 1984 by George Orwell to it");
const ask = await functionChain.call("Check my pinecone index called function-chain in the bookshelf namespace and what books by George Orwell are in it?");

console.log(`1. ${create} \n2. ${update} \n3. ${ask}`);