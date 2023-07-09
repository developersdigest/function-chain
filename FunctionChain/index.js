import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

export class FunctionChain {
  constructor(initOptions = {}) {
    this.model = initOptions.openaiOptions?.model || "gpt-3.5-turbo-0613";
    this.baseURL = "https://api.openai.com/v1/chat/completions";
    this.headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    };
    this.functionArray = initOptions.functionArray;

    this.functionsDirectory = initOptions.functionsDirectory || path.resolve(__dirname, 'openAIFunctions');
  }
  async call(message, options = {}) {
    let functionArray = this.functionArray || options.functionArray;
    const openAIFunctions = await this.getFunctions();
    if (!functionArray) {
      functionArray = Object.keys(openAIFunctions);
    } 
    const functionMap = {};
    for (const functionName of functionArray) {
      if (openAIFunctions.hasOwnProperty(functionName)) {
        functionMap[functionName] = openAIFunctions[functionName];
      } else {
        throw new Error(`Unsupported function: ${functionName}`);
      }
    }
    const functionNames = functionArray.join(", ");
    // console.log(`Using functions the following functions: ${functionNames}`)
    let data = {
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      stream: true,
      model: this.model,
      functions: functionArray.map(
        (functionName) => openAIFunctions[functionName].details
      ),
      function_call: "auto",
    };
    try {
      // console.log(`Sending request of "${message}" to OpenAI...`);
      let response = await fetch(this.baseURL, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data),
      });
      response = await response.json();
      let executedFunctions = {};
      while (
        response.choices &&
        response.choices[0].message.function_call &&
        response.choices[0].finish_reason !== "stop"
      ) {
        let message = response.choices[0].message;
        const function_name = message.function_call.name;
        if (executedFunctions[function_name]) {
          break;
        }
        let function_response = "";
        if (functionMap.hasOwnProperty(function_name)) {
          const functionArgs = JSON.parse(message.function_call.arguments);
          const functionToExecute = functionMap[function_name];
          function_response = await functionToExecute.execute(functionArgs);
          // console.log(`Function response: ${function_response}`)
        } else {
          throw new Error(`Unsupported function: ${function_name}, ensure function name within description matches the javascript file name i.e. latestPrices.js should have a name: 'latestPrices' within the details object`);
        }
        executedFunctions[function_name] = true;
        data.messages.push({
          role: "function",
          name: function_name,
          content: function_response,
        });
        response = await fetch(this.baseURL, {
          method: "POST",
          headers: this.headers,
          body: JSON.stringify(data),
        });
        response = await response.json();
      }
      if (response.error) {
        throw new Error(response.error.message);
      } else {
        return response.choices[0].message.content;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async getFunctions(directory = this.functionsDirectory) {
    const files = fs.readdirSync(directory);
    const openAIFunctions = {};

    for (const file of files) {
      const filePath = path.join(directory, file);

      if (fs.statSync(filePath).isDirectory()) {
        const nestedFunctions = await this.getFunctions(filePath);
        Object.assign(openAIFunctions, nestedFunctions);
      } else if (file.endsWith('.js')) {
        const moduleName = file.slice(0, -3);
        const { execute, details } = await import(filePath);
        openAIFunctions[moduleName] = {
          execute,
          details,
        };
      }
    }
    // Test streaming
    const stream = OpenAIStream(openAIFunctions)
    return new StreamingTextResponse(stream)
    // return openAIFunctions;
  }
}