// Import the FunctionChain class and the function you plan to use
import { FunctionChain, getAlphaVantageIntraday } from "ai-function-chain";

// Instantiate the FunctionChain with the function you want to use
const functionChain = new FunctionChain({
  functions: [getAlphaVantageIntraday],
});

// Use the FunctionChain to call your function
const res = await functionChain.call("What is Apple's stock price, tell me the date");

console.log(res);
