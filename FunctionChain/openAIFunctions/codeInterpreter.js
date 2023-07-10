import vm from "vm";

const execute = async (options) => {
  const { code } = options;
  let logBuffer = '';
  const context = {
    console: {
      ...console,
      log: (...args) => {
        args.forEach(arg => logBuffer += arg + ' ');
        logBuffer += '\n';
      }
    }
  };
  const script = new vm.Script(code);
  await script.runInNewContext(context);
  console.log("Executed \"" + code + "\" in the Node.js V8 runtime");
  const resultObject = { code, result: logBuffer };
  return JSON.stringify(resultObject);
};

const details = {
  name: "codeInterpreter",
  description: "Function can execute Node.js code directly code requested within a Node.js V8 runtime written in Javascript and returns the result. Doesn't support any new require or import statements yet.",
  parameters: {
    type: "object",
    properties: {
      code: {
        type: "string",
        description: "The JavaScript code to execute.",
      },
    },
    required: ['code'],
  },
  example: "Console log hello world in the Node.js V8 runtime"
};

export const codeInterpreter = {
  execute,
  details,
};
