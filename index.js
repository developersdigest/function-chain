import { FunctionChain, openApp, takeScreenshot } from "ai-function-chain";

const functionChain = new FunctionChain({
  functions: [openApp, takeScreenshot],
});

const res = await functionChain.call("Open the calculator on my computer", {
  functions: [openApp],
});
const res2 = await functionChain.call("Take a screenshot of my computer");

console.log(res);
console.log(res2);
