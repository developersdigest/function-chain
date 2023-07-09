import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain();

const res1 = await functionChain.call("Get me the latest price of Bitcoin");
const res2 = await functionChain.call("Get me the latest price of Ethereum");

console.log(`${res1} \n${res2}`);
