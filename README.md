<!-- ![Image](https://i.imgur.com/aFpv4iu.gif) -->
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

## Setup

To setup `FunctionChain`, follow the steps below:

1. Create an `index.js` file in the root of your project.
2. Import the `FunctionChain` class from `ai-function-chain` and instantiate it.
3. Call the `call` method with a message. Optionally, you can specify a set of functions to execute.

```javascript
import { FunctionChain, fetchCryptoPrice, openApp } from "ai-function-chain";

const functionChain = new FunctionChain({
  functions: [openApp, fetchCryptoPrice],
});

const res1 = await functionChain.call("Open the calculator on my computer");
const res2 = await functionChain.call("Get me the latest price of Bitcoin");
const res3 = await functionChain.call("Get me the latest price of Ethereum");

console.log(`${res1} \n${res2} \n${res3}`);
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

**For Huggingface API functions:**

```bash
HUGGING_FACE_API_KEY=your_hugging_face_api_key
```

You can get your Huggingface API key [here](https://huggingface.co/settings/tokens) (A read only token)


## Examples

Here are some examples of how you can use FunctionChain:

**Example 1: Unix Example (No additional API Key Required)** 

```javascript
import { FunctionChain, openApp } from "ai-function-chain";

const functionChain = new FunctionChain({functions: [openApp]});

const res = await functionChain.call("Open the calculator on my computer");

console.log(res);
```
Alternatively, you can run the following:
```bash
node examples/unix-example.js
```

**Example 2: Crypto Prices (No API Key Required)**

```javascript
import { FunctionChain, fetchCryptoPrice } from "ai-function-chain";

const functionChain = new FunctionChain({functions: [fetchCryptoPrice]});

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
import { FunctionChain, createPinecone, updatePinecone, askPinecone } from "ai-function-chain";

const functionChain = new FunctionChain({functions: [createPinecone, updatePinecone, askPinecone]});

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
import { FunctionChain, getAlphaVantageCompanyOverview } from "ai-function-chain";

const functionChain = new FunctionChain({functions: [getAlphaVantageCompanyOverview]});

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

You can get your Huggingface API key [here](https://huggingface.co/settings/tokens) (A read only token)

```javascript
import { FunctionChain, huggingFaceImageClassification } from "ai-function-chain";

const functionChain = new FunctionChain({functions: [huggingFaceImageClassification]}); 

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
import { FunctionChain, getVisualCrossingWeatherForecast } from "ai-function-chain";

const functionChain = new FunctionChain({functions: [getVisualCrossingWeatherForecast]});

const res = await functionChain.call("What's the weather this week in Toronto");
console.log(res);
```
Alternatively, you can run the following:
```bash
node examples/weather-visual-crossing-example.js
```

### Example 7: Using the Wikipedia API (No API Key required)

This example demonstrates how you can use the `wikipedia` function from the AI Function Chain to retrieve a summary of a Wikipedia page:

```javascript
import { FunctionChain, wikipedia } from "ai-function-chain";

const functionChain = new FunctionChain({
  functions: [wikipedia],
  skipFinalAPICall: true,
});

const res = await functionChain.call("In one sentence, look up on wikipedia, what is Langchain?");
console.log(res);
```

You can also run this example directly from the command line:

```
node examples/wikipedia-example.js
```

**Note:** In this example, we're using the `skipFinalAPICall: true` option. This ensures that the result is obtained directly from the `wikipedia` function, without making a final API call to OpenAI.

# Function Descriptions

## wikipedia
- **Name**: wikipedia
- **Description**: Search for "JavaScript" on Wikipedia.

## fetchCryptoPrice
- **Name**: fetchCryptoPrice
- **Description**: Fetches the price of a cryptocurrency from CoinGecko.

## getAlphaVantageCompanyOverview
- **Name**: getAlphaVantageCompanyOverview
- **Description**: Fetches company information, financial ratios, and other key metrics for the specified equity using the Alpha Vantage API. This includes the following information: Symbol, Asset Type, Name, Description, CIK, Exchange, Currency, Country, Sector, Industry, Address, Fiscal Year End, Latest Quarter, Market Capitalization, EBITDA, PE Ratio, PEG Ratio, Book Value, Dividend Per Share, Dividend Yield, EPS, Revenue Per Share (TTM), Profit Margin, Operating Margin (TTM), Return on Assets (TTM), Return on Equity (TTM), Revenue (TTM), Gross Profit (TTM), Diluted EPS (TTM), Quarterly Earnings Growth (YoY), Quarterly Revenue Growth (YoY), Analyst Target Price, Trailing PE, Forward PE, Price to Sales Ratio (TTM), Price to Book Ratio, EV to Revenue, EV to EBITDA, Beta, 52-Week High, 52-Week Low, 50-Day Moving Average, 200-Day Moving Average, Shares Outstanding, Dividend Date, Ex-Dividend Date.

## getAlphaVantageIntraday
- **Name**: getAlphaVantageIntraday
- **Description**: Fetches intraday data for a specified stock without extended hours.

## askPinecone
- **Name**: askPinecone
- **Description**: This function queries/asks a question to a Pinecone index and returns the top answer. The Pinecone client, index name, and API keys are specified in the .env file or function parameters.

## createPinecone
- **Name**: createPinecone
- **Description**: This function checks if a specified Pinecone index exists. If it does not exist, it will create a new one. Do not confuse this with updating an index.

## updatePinecone
- **Name**: updatePinecone
- **Description**: This function updates a Pinecone index with vector embeddings generated from a given text with an optional namespace if passed. The Pinecone client, index name, and API keys are specified in the .env file or function parameters.

## openApp
- **Name**: openApp
- **Description**: Opens a specified application on your computer

## takeScreenshot
- **Name**: takeScreenshot
- **Description**: Captures a screenshot from the terminal

## getVisualCrossingWeatherForecast
- **Name**: getVisualCrossingWeatherForecast
- **Description**: Fetches weather forecast for the specified location using the Visual Crossing API. This includes temperature, humidity, wind speed, and other important weather data.


# Contribution

Contributions to the `FunctionChain` library are more than welcome! If you have any helpful functions you'd like to contribute, or if there's a library you'd like to see integrated with `FunctionChain`, please feel free to reach out or submit a pull request.

You can contribute in several ways:

- **Submit a pull request**: If you've written any functions that you'd like to share with the community, you can submit a pull request on the GitHub repository.
- **Open an issue**: If you've identified a bug or have a feature request, you can open an issue on the GitHub repository.
- **Get in touch**: If you have ideas or questions, feel free to reach out directly. Your feedback and ideas are invaluable in continuing to improve `FunctionChain`.

I am excited to see how you use `FunctionChain` and to hear your ideas for improvements!
