// Import the FunctionChain class and the functions you plan to use
import {
  FunctionChain,
  getAlphaVantageCompanyOverview,
  getAlphaVantageIntraday,
} from "ai-function-chain";

// Instantiate the FunctionChain with the functions you want to use
const functionChain = new FunctionChain({
  functions: [getAlphaVantageCompanyOverview, getAlphaVantageIntraday],
});

// Use the FunctionChain to call your functions
const res1 = await functionChain.call("What is Apple's market capitalization?");
console.log(res1);

const res2 = await functionChain.call("What is Microsoft's PE Ratio?");
console.log(res2);

const res3 = await functionChain.call("What is Amazon's Revenue?");
console.log(res3);

const res4 = await functionChain.call("What is Google's stock price?");
console.log(res4);
