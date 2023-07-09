// Import the FunctionChain class and the getVisualCrossingWeatherForecast function
import { FunctionChain, getVisualCrossingWeatherForecast } from "ai-function-chain";

// Instantiate the FunctionChain with the getVisualCrossingWeatherForecast function
const functionChain = new FunctionChain({
  functions: [getVisualCrossingWeatherForecast],
});

// Use the FunctionChain to call your function
const res = await functionChain.call("What's the weather this week in Toronto");

console.log(res);
