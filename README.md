## Demo

![Demonstration](https://i.imgur.com/nHp7uRq.gif)
[YouTube link: FunctionChain: OpenAI Function Calling Simplified in Node.js](https://youtu.be/jmrFG7n3Nt8)

## Installation

1. Install the package using npm or yarn:

```bash
npm install ai-function-chain
# or
yarn add ai-function-chain
# or
pnpm install ai-function-chain
```

2. Create a file named `.env` at the root of your project. Obtain your OpenAI API Key from [here](https://platform.openai.com/account/api-keys), and add it to the `.env` file:

```bash
OPENAI_API_KEY=your_openai_api_key
```

## Setup

To setup `FunctionChain`:

1. Create an `index.js` file in the root of your project.
2. Import the `FunctionChain` class from `ai-function-chain` and instantiate it.
3. Call the `call` method with a message. Optionally, you can specify a set of functions to execute.

```javascript
import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain();

async function main() {
    const res1 = await functionChain.call("Get me the latest price of Bitcoin");
    const res2 = await functionChain.call("Open the calculator on my computer");
    const res3 = await functionChain.call("Get me the latest price of Ethereum", {
        functionArray: ["fetchCryptoPrice"] // Optionally specify which functions to use
    });
    console.log(res1, res2, res3);
}

main();
```
## Running Your Project

After setting up `index.js` and adding your functions, run your project using:

```bash
npm run dev
```

## Customization

You can customize FunctionChain instance by specifying different OpenAI model and a custom directory for your function modules:

```javascript
const initOptions = {
  openaiOptions: {
    model: "gpt-3.5-turbo-0613", // specify a different model if needed
  },
  functionsDirectory: "./myFunctions", // specify a custom directory if you have one
};

const functionChain = new FunctionChain(initOptions);
```

## Adding Custom Functions

1. Create a new JavaScript file for your function in the `functionsDirectory` specified while creating the `FunctionChain` instance.
2. Follow the following pattern to define your function:

```javascript
import { exec } from 'child_process';

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

## Examples

These examples demonstrate how to limit the functions available in the `FunctionChain` instance by passing a `functionArray` during instantiation.

### Example 1: Scoped FunctionChain Instance

In this example, we limit the functions available to the `FunctionChain` instance to only the `getAlphaVantageCompanyOverview` function:

```javascript
import { FunctionChain } from "ai-function-chain";

// By passing in no options, the default FunctionChain instance will use all available functions within the core FunctionChain library.
// Note that it will not include any custom functions unless a directory is explicitly passed.

const functionChain = new FunctionChain();

// The below invocations will use all functions in the functions directory to try to answer the question
const res1 = functionChain.call("Get me the latest price of Bitcoin");
const res2 = functionChain.call("Open the calculator on my computer");
const res3 = functionChain.call("Get me the latest price of Ethereum");

// The below invocations will use the specified functions to try to answer the question
const res4 = functionChain.call("Get me the latest price of Bitcoin", { functionArray: ["fetchCryptoPrices"] });
const res4 = functionChain.call("What is Apple's market capitalization", { functionArray: ["getAlphaVantageCompanyOverview"] });

// Alternatively, you can create a scoped FunctionChain instance like this to use an array of functions for all calls made with a FunctionChain instance
const scopedFunctionChain = new FunctionChain({ functionArray: ["getAlphaVantageCompanyOverview"] });

// These calls will use the scoped FunctionChain instance
// which includes only the "getAlphaVantageCompanyOverview" function
const res6 = scopedFunctionChain.call("What is Amazon's Revenue (TTM)");
const res7 = scopedFunctionChain.call("What is Alphabet's EBITDA");

console.log(res1, res2, res3, res4, res5, res6, res7);

// Note: The calls from res5 to res7 require a free API key from Alpha Vantage.
// To make these calls work, please replace the placeholder API key in the .env file
// with your own API key obtained from Alpha Vantage.
```

