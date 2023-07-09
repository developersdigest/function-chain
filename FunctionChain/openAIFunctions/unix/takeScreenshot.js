// 1. Add Dependencies
import { exec } from 'child_process';

// 2. Write Function Code Within Execute Function
const execute = () => {
    return new Promise((resolve, reject) => {
        exec('screencapture screenshot.png', (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
                reject(`Error taking screenshot: ${error.message}`);
            }
            resolve('Screenshot captured successfully.');
        });
    });
};

// 3. Add Function Details for LLM to use
const details = {
    name: "takeScreenshot",
    description: "Captures a screenshot for mac from the terminal",
    parameters: {
        type: "object",
        properties: {},
        required: [],
    },
    example: "Capture a screenshot from the terminal"
};

export const takeScreenshot = {
  execute,
  details,
};
