import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain({functionArray: ["getAlphaVantageIntraday"]});

const res1 = await functionChain.call("What is Apple's stock price, tell me the date");

console.log(`1. ${res1}`);