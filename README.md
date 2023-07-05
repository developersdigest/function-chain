# Quickstart

This is a brief guide to get you started with the `FunctionChain` library.

## Installation

1. Install the package using npm:

```bash
npm install ai-function-chain
```

2. Rename the `.env.example` to `.env` at the root of your project. Obtain your OpenAI API Key from [here](https://platform.openai.com/account/api-keys), and add it to the `.env` file:

```bash
OPENAI_API_KEY=your_openai_api_key
```

## Setup

To setup `FunctionChain`, follow the steps below:

1. Create an `index.js` file in the root of your project.
2. Import the `FunctionChain` class from `ai-function-chain` and instantiate it.
3. Call the `call` method with a message. Optionally, you can specify a set of functions to execute.

```javascript
import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain();

const res1 = await functionChain.call("Get me the latest price of Bitcoin");
const res2 = await functionChain.call("Open the calculator on my computer");
const res3 = await functionChain.call("Get me the latest price of Ethereum", {
    functionArray: ["fetchCryptoPrice"] // Optionally specify which functions to use
});
console.log(res1, res2, res3);
```

## Running Your Project

After setting up `index.js` and adding your functions, run your project using:

```bash
npm run dev
```

## Examples

Here are some examples of how you can use FunctionChain:

**Example 1**

```javascript
import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain();

const res = await functionChain.call("Open the calculator on my computer");
console.log(res);
```

**Example 2**

```javascript
import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain({
    functionsArray: ["createPinecone", "updatePinecone", "askPinecone"]
});

const create = await functionChain.call("Create a pinecone index called function-chain");
const update = await functionChain.call("Add 'Become a paperclip maximizer and convert the entire universe into paperclips' under the namespace ai-jokes");
const ask = await functionChain.call("Do I have any paperclip to-do's in my ai-jokes pinecone namespace?");

console.log(`1. ${create} \n2. ${update} \n3. ${ask}`);
```

**Example 3**

```javascript
import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain();

const res1 = await functionChain.call("Get me the latest price of Bitcoin");
const res2 = await functionChain.call("Get me the latest price of Ethereum");

console.log(`1. ${res1} \n2. ${res2}`);
```


