import dotenv from "dotenv";
import fetch from "node-fetch";
import * as allFunctions from './entrypoint.js';

dotenv.config();

export class FunctionChain {
  constructor(initOptions = {}) {
    this.model = initOptions.openaiOptions?.model || "gpt-3.5-turbo";
    this.baseURL = "https://api.openai.com/v1/chat/completions";
    this.headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    };
    this.functions = initOptions.functions || [];
    this.skipFinalAPICall = initOptions.skipFinalAPICall || false;
  }

  async call(message, options = {}) {
    let functionMap;
    if (options.functions && options.functions.length > 0) {
      functionMap = options.functions.reduce((result, func) => {
        result[func.details.name] = func;
        return result;
      }, {});
    } else if (this.functions.length > 0) {
      functionMap = this.functions.reduce((result, func) => {
        result[func.details.name] = func;
        return result;
      }, {});
    } else {
      console.warn("No functions were provided. Defaulting to all available functions.");
      functionMap = Object.values(allFunctions).reduce((result, func) => {
        result[func.details.name] = func;
        return result;
      }, {});
    }

    let data = {
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: this.model,
      functions: Object.values(functionMap).map(func => func.details),
      function_call: "auto",
    };

    try {
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
          console.log(`Executing function: "${function_name}" with args: ${JSON.stringify(functionArgs)}`);
        
          const functionToExecute = functionMap[function_name];
          function_response = await functionToExecute.execute(functionArgs);
        } else {
          throw new Error(`Unsupported function: ${function_name}, ensure function name within description matches the javascript file name i.e. latestPrices.js should have a name: 'latestPrices' within the details object`);
        }

        executedFunctions[function_name] = true;
        data.messages.push({
          role: "function",
          name: function_name,
          content: function_response,
        });

        // If additional API calls are not to be skipped, make another API call to OpenAI, otherwise return the response
        if(!this.skipFinalAPICall) {
          response = await fetch(this.baseURL, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data),
          });
          response = await response.json();
        }else{
          console.log("Skipping final API call to OpenAI, return function response")
          return JSON.stringify(function_response);
        }
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
}

export * from './entrypoint.js';
