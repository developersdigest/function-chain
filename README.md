# FunctionChain

![FunctionChain Image](https://i.imgur.com/uR5YOc8.gif)


FunctionChain is a powerful JavaScript library that orchestrates a series of functions with OpenAI's GPT-3.5 and GPT-4 models. It's perfect for creating complex conversational applications.

The library automatically loads and executes functions defined in separate JavaScript modules and manages all the interactions with the OpenAI API.

## Installation

Using npm:

```bash
npm install ai-function-chain
```

Using yarn:

```bash
yarn add ai-function-chain
```

## Setup

In order to use FunctionChain, you need to have an API key from OpenAI. If you don't already have one, you can get it from [here](https://platform.openai.com/account/api-keys).

Create a `.env` file in the root of your project and add your OpenAI API Key:

```bash
OPENAI_API_KEY=your_openai_api_key
```

## Usage

First, import the `FunctionChain` class from `ai-function-chain` and create a new instance:

```javascript
import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain();
```

Note: If you are testing out the library and want to use the example functions, you don't need to specify any options. The library will default to use the functions in the `exampleFunctions` directory provided within the package.

Then, use the `call` method with a message, and optionally specify a set of functions to execute:

```javascript
const res1 = await functionChain.call("Get me the latest price of Bitcoin");
const res2 = await functionChain.call("Open the calculator on my computer");
const res3 = await functionChain.call("Get me the latest price of Ethereum", {
  functionArray: ["latestPrices"] // Optionally specify which functions to use
});

console.log(res1, res2, res3);
```

## Recommended Options

When creating the FunctionChain instance, you can also specify a different OpenAI model and a custom directory for your function modules:

```javascript
const initOptions = {
  openaiOptions: {
    model: "gpt-3.5-turbo-0613", // specify a different model if needed
  },
  functionsDirectory: "./myFunctions", // specify a custom directory if you have one
};

const functionChain = new FunctionChain(initOptions);
```

## Creating Functions

All function modules should be placed in the directory specified in the `FunctionChain` constructor (`functionsDirectory` option). 

Each function module should follow this pattern:

```javascript
// 1. Add Dependencies
import { exec } from 'child_process';
// 2. Write Function Code Within Execute Function
export const execute = (options) => {
    const { appName } = options;
    return new Promise((resolve, reject) => {
        exec(`open -a "${appName}"`, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
                reject(`Error opening ${appName}: ${error.message}`);
            }
            resolve(`${appName} opened successfully.`);
        });
    });
}
// 3. Add Function Details for LLM to use
export const details = {
    name: "openApp",
    description: "Opens a specified application on your computer",
    parameters: {
        type: "object",
        properties: {
            appName: {
                type: "string",
                description: "The name of the application to open"
            },
        },
        required: ["appName"],
    },
    example: "Open the 'Calculator' application"
};
```

With this structure, the library will automatically import and use your functions. The `name` property in the `details` object should match the filename of the module. Place your function logic inside the `execute` function. If your function has dependencies, you can import them at the top of the file.
