import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain({functionArray: ["getAlphaVantageIntraday"]});

const res = await functionChain.call("What is Apple's stock price, tell me the date");

console.log(res);