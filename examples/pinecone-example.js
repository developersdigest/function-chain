import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain({
    functionsArray: ["createPinecone", "updatePinecone", "askPinecone"]
});

const create = await functionChain.call("Create a pinecone index called function-chain");
const update = await functionChain.call("Add 'John Smith, his phone number is 123-456-7890 and email johnsmith@example.com' under the namespace my-contacts");
const ask = await functionChain.call("What is John Smiths number? to-do's in my my-contacts pinecone namespace?");

console.log(`1. ${create} \n2. ${update} \n3. ${ask}`);