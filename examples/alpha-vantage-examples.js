import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain({functionArray: ["getAlphaVantageCompanyOverview", "getAlphaVantageIntraday"]});

const res1 = await functionChain.call("What is Apple's market capitalization?");
console.log(res1);
const res2 = await functionChain.call("What is Microsoft's PE Ratio?");
console.log(res2);
const res3 = await functionChain.call("What is Amazon's Revenue?");
console.log(res3);
const res4 = await functionChain.call("What is Google's stock price?");
console.log(res4);