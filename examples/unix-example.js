// Import the FunctionChain class and the openApp function
import { FunctionChain, openApp } from "ai-function-chain";

// Instantiate the FunctionChain with the openApp function
const functionChain = new FunctionChain({
  functions: [openApp],
});

// Use the FunctionChain to call your function
const res = await functionChain.call("Open the calculator on my computer");

console.log(res);
