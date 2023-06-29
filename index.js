import { FunctionChain } from "ai-function-chain";

const initOptions = { functionsDirectory: "./openAIFunctions"};
const functionChain = new FunctionChain(initOptions);

const res1 = await functionChain.call("Get me the latest price of Bitcoin");
const res2 = await functionChain.call("Open the calculator on my computer");
const res3 = await functionChain.call("Get me the latest price of Ethereum", {
  functionArray: ["latestPrices"] // Optionally specify which functions to use
});

console.log(res1, res2, res3);