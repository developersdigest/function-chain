import vm from "vm";
import fs from "fs";
import path from "path";
import util from "util";
import os from "os";
import crypto from "crypto";

const execute = async (options) => {
  const { code } = options;
  // Remove require and import statements
  code = code.replace(/(require|import)\s*\(.*?\)\s*;/g, "");

  let logBuffer = "";
  const context = {
    console: {
      ...console,
      log: (...args) => {
        args.forEach((arg) => (logBuffer += arg + " "));
        logBuffer += "\n";
      },
    },
    fetch,
    fs,
    path,
    util,
    os,
    crypto,
  };
  const script = new vm.Script(code);
  await script.runInNewContext(context);
  // Log that it ran in the Node.js V8 runtime
  console.log(`Ran "${code}" in the Node.js V8 runtime`);
  const resultObject = { code, result: logBuffer };
  return JSON.stringify(resultObject);
};

const details = {
  name: "codeInterpreter",
  description: `Executes the provided JavaScript code within a Node.js V8 runtime and returns the result. If the code contains prompts for user input, the prompts will be simulated and the code will be executed accordingly within the Node.js runtime.`,
  parameters: {
    type: "object",
    properties: {
      code: {
        type: "string",
        description: `The JavaScript code to execute`,
      },
    },
    required: ["code"],
  },
  example: `Run "console.log('Hello, world!');" in the Node.js V8 runtime`,
};

export const codeInterpreter = {
  execute,
  details,
};
