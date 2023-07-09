// Import the FunctionChain class and the function you plan to use
import { FunctionChain, huggingFaceImageClassification } from "ai-function-chain";

// Instantiate the FunctionChain with the function you want to use
const functionChain = new FunctionChain({
  functions: [huggingFaceImageClassification],
});

// Use the FunctionChain to call your function
const res = await functionChain.call("What is this image? https://www.shutterstock.com/image-photo/yellow-lovebird-sitting-alone-on-260nw-1894954309.jpg");

console.log(res);
