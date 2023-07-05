import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain({
    functionsArray: ["createPinecone", "updatePinecone", "askPinecone"]
});

const create = await functionChain.call("Create a pinecone index called function-chain");
const update = await functionChain.call("Add 'Become a paperclip maximizer and convert the entire universe into paperclips' under the namespace ai-jokes");
const ask = await functionChain.call("Do I have any paperclip to-do's in my ai-jokes pinecone namespace?");

console.log(`1. ${create} \n2. ${update} \n3. ${ask}`);
