# FunctionChain

ai-function-chain is a powerful JavaScript library that orchestrates a series of functions with OpenAI's GPT-3.5 Turbo model. It's perfect for creating complex conversational applications.

The library uses the `.env` file for configurations, loads and executes functions defined in separate JavaScript modules, and manages all the interactions with the OpenAI API.

## Installation

Using npm:

```bash
npm install ai-function-chain
```

Using yarn:

\`\`\`bash
yarn add ai-function-chain
\`\`\`

## Setup

Create a `.env` file in the root of your project and add your OpenAI API Key:

\`\`\`bash
OPENAI_API_KEY=your_openai_api_key
\`\`\`

## Usage

First, import the `FunctionChain` class from `ai-function-chain` and create a new instance:

\`\`\`javascript
import { FunctionChain } from "ai-function-chain";

const initOptions = {
  openaiOptions: {
    model: "gpt-3.5-turbo-0613",
  },
  functionsDirectory: "./openAIFunctions",
};

const functionChain = new FunctionChain(initOptions);
\`\`\`

Then, use the `call` method with a message, and optionally specify a set of functions to execute:

\`\`\`javascript
const res1 = await functionChain.call("Get me the latest price of Bitcoin");
const res2 = await functionChain.call("Open the calculator on my computer");
const res3 = await functionChain.call("Get me the latest price of Ethereum", {
  functionArray: ["latestPrices"] // Optionally specify which functions to use
});

console.log(res1, res2, res3);
\`\`\`

## Creating Functions

All function modules should be placed in the directory specified in the `FunctionChain` constructor (`functionsDirectory` option). 

Each function module should follow this pattern:

\`\`\`javascript
// If you have dependencies, import them here

// myFunction.js
export const execute = async (args) => {
  // Your function logic goes here
};

export const details = {
  name: 'myFunction', // This should match the filename
  description: 'This function does something.',
  version: '1.0.0'
};
\`\`\`

With this structure, the library will automatically import and use your functions. The `name` property in the `details` object should match the filename of the module. Place your function logic inside the `execute` function. If your function has dependencies, you can import them at the top of the file.
