import { FunctionChain, codeInterpreter } from "ai-function-chain";

const functionChain = new FunctionChain({
  functions: [codeInterpreter],
});

let res = await functionChain.call("Give me a random number between 1 and 10, run in Node.");
console.log(res);

// Ask for a twoSum function and run it
res = await functionChain.call("Using node js, tell me What files are on my desktop? Don't use require or import.");
console.log(res);
