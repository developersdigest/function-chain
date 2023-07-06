![Image](https://i.imgur.com/aFpv4iu.gif)
[FunctionChain: OpenAI Function Calling Simplified in Node.js](https://youtu.be/jmrFG7n3Nt8)

# Quickstart

This guide will walk you through the basic steps required to get the `FunctionChain` library up and running.

## Installation

1. First of all, you need to clone the repository to your local machine:

```bash
git clone https://github.com/developersdigest/FunctionChain
```

2. Move to the directory where the repository has been cloned and install the necessary dependencies using npm:

```bash
cd FunctionChain
npm install
```

3. Rename the `.env.example` to `.env` at the root of your project. Obtain your OpenAI API Key from [here](https://platform.openai.com/account/api-keys), and add it to the `.env` file:

```bash
OPENAI_API_KEY=your_openai_api_key
```

4. Now you can run with the example in `index.js` by using:

```bash
node index.js
or
npm run dev
```

## API Keys

To use `FunctionChain`, you must obtain and provide the appropriate API keys. 

REQUIRED: for all functions:

```bash
OPENAI_API_KEY=your_openai_api_key
```

You need to obtain your OpenAI API Key [here](https://platform.openai.com/account/api-keys) and add it to the `.env` file.

OPTIONAL: If you intend to use specific functions, you need to obtain the respective API keys:

**For Alpha Vantage functions:**

```bash
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
```

Get your Alpha Vantage API key [here](https://www.alphavantage.co/support/#api-key)

**For Pinecone functions:**

```bash
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX=your_pinecone_index
```

Get your Pinecone API key [here](https://docs.pinecone.io/docs/node-client)

**For Visual Crossing API functions:**

```bash
VISUAL_CROSSING_API_KEY=your_visual_crossing_api_key
```

Get your Visual Crossing API key [here](https://www.visualcrossing.com/weather-api)

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

## Examples

Here are some examples of how you can use FunctionChain:

**Example 1: Unix Example (No additional API Key Required)** 

```javascript
import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain();

const res = await functionChain.call("Open the calculator on my computer");
console.log(res);
```
Alternatively, you can run the following:
```bash
node examples/unix-example.js
```

**Example 2: Crypto Prices (No API Key Required)**

```javascript
import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain();

const res1 = await functionChain.call("Get me the latest price of Bitcoin");
const res2 = await functionChain.call("Get me the latest price of Ethereum");

console.log(`1. ${res1} \n2. ${res2}`);
```
Alternatively, you can run the following:
```bash
node examples/no-api-key-example.js
```

**Example 3: Pinecone Example (Pinecone API Key Required)**

You can get your Pinecone API Key [here](https://docs.pinecone.io/docs/node-client)

```javascript
import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain({
    functionsArray: ["createPinecone", "updatePinecone", "askPinecone"]
});

const create = await functionChain.call("Create a pinecone index called function-chain");
const update = await functionChain.call("Add 'John Smith, his phone number is 123-456-7890 and email johnsmith@example.com' under the namespace my-contacts");
const ask = await functionChain.call("What is John Smiths number? to-do's in my my-contacts pinecone namespace?");

console.log(`1. ${create} \n2. ${update} \n3. ${ask}`);
```
Alternatively, you can run the following:
```bash
node examples/pinecone-example.js
```

**Example 4: Alpha Vantage API (Free API Key Required)**

You can get your Alpha Vantage API key [here](https://www.alphavantage.co/support/#api-key)

```javascript
import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain({functionArray: ["getAlphaVantageCompanyOverview"]});

const res1 = await functionChain.call("What is Apple's market capitalization");
const res2 = await functionChain.call("What is Microsoft's PE Ratio");
const res3 = await functionChain.call("What is Amazon's Revenue (TTM)");
const res4 = await functionChain.call("What is Alphabet's EBITDA");

console.log(`1. ${res1} \n2. ${res2} \n3. ${res3} \n4. ${res4}`);
```
Alternatively, you can run the following:
```bash
node examples/alpha-vantage-examples.js
```


**Example 5: Huggingface Inference (Free API Key Required)**

You can get your Alpha Vantage API key [here](https://huggingface.co/settings/tokens) (A read only token)

```javascript
import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain({functionArray: ["huggingFaceImageClassification"]}); 

const res = await functionChain.call("What is this image? https://www.shutterstock.com/image-photo/yellow-lovebird-sitting-alone-on-260nw-1894954309.jpg");

console.log(res);
```
Alternatively, you can run the following:
```bash
node examples/hugging-face-example.js
```

**Example 6: Visual Crossing API (API Key Required)**

You can get your Visual Crossing API key [here](https://www.visualcrossing.com/weather-api)

```javascript
import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain({functionArray: ["getVisualCrossingWeatherForecast"]});

const res1 = await functionChain.call("What's the weather this week in Toronto");

console.log(res1);
```
Alternatively, you can run the following:
```bash
node examples/weather-visual-crossing-example.js
```

# Contribution

Contributions to the `FunctionChain` library are more than welcome! If you have any helpful functions you'd like to contribute, or if there's a library you'd like to see integrated with `FunctionChain`, please feel free to reach out or submit a pull request.

You can contribute in several ways:

- **Submit a pull request**: If you've written any functions that you'd like to share with the community, you can submit a pull request on the GitHub repository.
- **Open an issue**: If you've identified a bug or have a feature request, you can open an issue on the GitHub repository.
- **Get in touch**: If you have ideas or questions, feel free to reach out directly. Your feedback and ideas are invaluable in continuing to improve `FunctionChain`.

I am excited to see how you use `FunctionChain` and to hear your ideas for improvements!
