import { FunctionChain, codeInterpreter } from "ai-function-chain";
const functionChain = new FunctionChain({
  functions: [codeInterpreter],
});
let res1 = await functionChain.call("Using node.js execute a function that will give me a random number");
console.log("1.", res1);
let res2 = await functionChain.call(`
    Execute this in Node.js:
    const fibonacci = (n) => {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    };
    fibonacci(10);
  `);
console.log("2.", res2);
let res3 = await functionChain.call("Execute a twoSum function in node.js");
console.log("3.", res3);
