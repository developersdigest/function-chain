import { FunctionChain, wikipedia } from "ai-function-chain";

const functionChain = new FunctionChain({
  functions: [wikipedia],
  skipFinalAPICall: true,
});

const res1 = await functionChain.call("In one sentence, look up on wikipedia, what is Langchain?");
console.log(res1);

// console.log(`${res1} \n${res2} \n${res3}`);
