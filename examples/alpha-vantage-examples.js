import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain({ functionArray: ["getAlphaVantageCompanyOverview"] });

const res1 = await functionChain.call("What is Apple's market capitalization");
const res2 = await functionChain.call("What is Microsoft's PE Ratio");
const res3 = await functionChain.call("What is Amazon's Revenue (TTM)");
const res4 = await functionChain.call("What is Alphabet's EBITDA");

console.log(res1, res2, res3, res4);
