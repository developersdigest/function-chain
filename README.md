## Demo

![Demonstration](https://i.imgur.com/nHp7uRq.gif)

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
        functionArray: ["latestPrices"] // Optionally specify which functions to use
    });

    console.log(res1, res2, res3);
}

main();
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

## Running Your Project

After setting up `index.js` and adding your functions, run your project using:

```bash
npm run dev
```
