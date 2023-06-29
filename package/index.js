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
  }
  async call(message, options = {}) {
    let functionArray = options.functionArray;
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
    let data = {
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: this.model,
      functions: functionArray.map(
        (functionName) => openAIFunctions[functionName].details
      ),
      function_call: "auto",
    };
    try {
      console.log(`Sending request of "${message}" to OpenAI...`);
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
        } else {
          throw new Error(`Unsupported function: ${function_name}`);
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
  async getFunctions() {
  let functionsDirectory = path.resolve(process.cwd(), 'node_modules', 'ai-function-chain','src', 'exampleFunctions');
  if (this.functionsDirectory) {
    functionsDirectory = path.resolve(process.cwd(), this.functionsDirectory);
  }
    // Rest of the code remains the same
    if (!functionsDirectory) {
      throw new Error('Invalid functions directory');
    }
    const files = fs.readdirSync(functionsDirectory);
    const openAIFunctions = {};
    for (const file of files) {
      if (file.endsWith('.js')) {
        const moduleName = file.slice(0, -3);
        const modulePath = path.join(functionsDirectory, `${moduleName}.js`);
        const { execute, details } = await import(modulePath);
        openAIFunctions[moduleName] = {
          execute,
          details,
        };
      }
    }
    return openAIFunctions;
  }
}
