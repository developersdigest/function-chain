// Import the FunctionChain class and the function you plan to use
import { FunctionChain, fetchCryptoPrice } from "ai-function-chain";

// Instantiate the FunctionChain with the function you want to use
const functionChain = new FunctionChain({
  functions: [fetchCryptoPrice],
});

// Use the FunctionChain to call your function
const res1 = await functionChain.call("Get me the latest price of Bitcoin");
const res2 = await functionChain.call("Get me the latest price of Ethereum");

console.log(`${res1} \n${res2}`);
