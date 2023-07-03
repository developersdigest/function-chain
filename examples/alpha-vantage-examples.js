import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain({ functionArray: ["getAlphaVantageCompanyOverview"] });

async function main() {
  const res1 = await functionChain.call("What is Apple's market capitalization");
  console.log(res1)
  const res2 = await functionChain.call("What is Microsoft's PE Ratio");
  console.log(res2)
  const res3 = await functionChain.call("What is Amazon's Revenue (TTM)");
  console.log(res3)
  const res4 = await functionChain.call("What is Alphabet's EBITDA");
  console.log(res4)

  console.log(res1, res2, res3, res4);
}

main();
