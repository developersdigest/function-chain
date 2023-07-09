import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain({functionArray: ["getVisualCrossingWeatherForecast"]});

const res = await functionChain.call("What's the weather this week in Toronto");

console.log(res)