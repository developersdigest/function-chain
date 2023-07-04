import { FunctionChain } from "ai-function-chain";

const PineconeChain = new FunctionChain({
  functionArray: ["createPineconeIndex", "updatePinecone"],
});

const create = await PineconeChain.call(
  "Create a pinecone index called bookshelf"
);
console.log(create)

const update = await PineconeChain.call(
  "Add this info my pinecone index called bookshelf. With the following: This is an example of where you can fill in the text you want to be processed. The source for this is 'example.com'"
);
console.log(update);

const query = await PineconeChain.call(
  "Query my pinecone index called bookshelf. With the following: This is an example of where you can fill in the text you want to be processed. The source for this is 'example.com'"
);
console.log(query);