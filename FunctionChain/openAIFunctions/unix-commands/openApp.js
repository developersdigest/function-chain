// 1. Add Dependencies
import { exec } from 'child_process';
// 2. Write Function Code Within Execute Function
export const execute = (options) => {
    const { appName } = options;
    return new Promise((resolve, reject) => {
        exec(`open -a "${appName}"`, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
                reject(`Error opening ${appName}: ${error.message}`);
            }
            resolve(`${appName} opened successfully.`);
        });
    });
}
// 3. Add Function Details for LLM to use
export const details = {
    name: "openApp",
    description: "Opens a specified application on your computer",
    parameters: {
        type: "object",
        properties: {
            appName: {
                type: "string",
                description: "The name of the application to open"
            },
        },
        required: ["appName"],
    },
    example: "Open the 'Calculator' application"
};