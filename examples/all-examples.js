// Remove the functions you don't want to use, this is a current list of all available functions (some require API keys):
import { FunctionChain, createPinecone, updatePinecone, askPinecone, wikipedia, fetchCryptoPrice, getAlphaVantageCompanyOverview, getAlphaVantageIntraday, openApp, takeScreenshot, getVisualCrossingWeatherForecast, huggingFaceImageClassification } from "ai-function-chain";
const functionChain = new FunctionChain({ functions: [createPinecone, updatePinecone, askPinecone, wikipedia, fetchCryptoPrice, getAlphaVantageCompanyOverview, getAlphaVantageIntraday, openApp, takeScreenshot, getVisualCrossingWeatherForecast, huggingFaceImageClassification] });
const commands = [
  "Check Wikipedia and tell me in a sentence about this new thing called Threads by Meta that everyone is talking about",
  "What is the latest price of Bitcoin?",
  "Get the current PE Ratio of Microsoft.",
  "What was Apple's last intraday stock price?",
  "Create a pinecone index called function-chain",
  "Update my pinecone index called function-chain in the namespace HelloWorld with: This is a demonstration of upserting to Pinecone with natural language",
  "What demonstrations are in my pinecone index called function-chain under the HelloWorld namespace?",
  "Open the Calculator App on my Computer",
  "Take a screenshot on my computer and save it locally",
  "Get the weather forecast for San Francisco Today",
  "Classify this image: https://shorturl.at/ciTU6",
];

for (const [commandIndex, command] of commands.entries()) {
  const logMessage = `${commandIndex + 1}. ${await functionChain.call(command)}`;
  console.log(logMessage);
}