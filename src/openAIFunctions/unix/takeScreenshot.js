// 1. Add Dependencies
import { exec } from 'child_process';

// 2. Write Function Code Within Execute Function
export const execute = () => {
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
export const details = {
    name: "takeScreenshot",
    description: "Captures a screenshot from the terminal",
    parameters: {
        type: "object",
        properties: {},
        required: [],
    },
    example: "Capture a screenshot from the terminal"
};
