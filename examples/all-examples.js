import {
  FunctionChain,
  fetchCryptoPrice,
  getAlphaVantageCompanyOverview,
  getAlphaVantageIntraday,
  askPinecone,
  createPinecone,
  updatePinecone,
  openApp,
  takeScreenshot,
  getVisualCrossingWeatherForecast,
  huggingFaceImageClassification,
  wikipedia,
} from "ai-function-chain";

const functionChain = new FunctionChain({
  functions: [
    wikipedia,
    fetchCryptoPrice,
    getAlphaVantageCompanyOverview,
    getAlphaVantageIntraday,
    askPinecone,
    createPinecone,
    updatePinecone,
    openApp,
    takeScreenshot,
    getVisualCrossingWeatherForecast,
    huggingFaceImageClassification,
  ],
});

const commands = [
  "Look up on Wikipedia what Langchain is in one sentence.",
  "What is the latest price of Bitcoin?",
  "Get the current PE Ratio of Microsoft.",
  "What was Apple's last intraday stock price?",
  "Create a pinecone index called function-chain",
  "Update my pinecone index called function-chain in the namespace hello-world with: This is a demonstration of upserting to Pinecone with natural language",
  "What demonstrations are in my pinecone index called function-chain under the hello-world namespace?",
  "Open the Calculator on my computer",
  "Take a screenshot on my computer",
  "Get the weather forecast for San Francisco Today",
  "Classify this image: https://shorturl.at/ciTU6",
];

for (const [commandIndex, command] of commands.entries()) {
  const commandResult = await functionChain.call(command);
  const logMessage = `${commandIndex + 1}. ${commandResult}`;
  console.log(logMessage);
}
