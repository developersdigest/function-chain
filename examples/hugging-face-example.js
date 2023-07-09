import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain({functionArray: ["huggingFaceImageClassification"]});

const res = await functionChain.call("What is this image? https://www.shutterstock.com/image-photo/yellow-lovebird-sitting-alone-on-260nw-1894954309.jpg");

console.log(res)