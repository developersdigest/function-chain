import { FunctionChain } from "ai-function-chain";

const functionChain = new FunctionChain();

async function main() {
    const res1 = await functionChain.call("Get me the latest price of Bitcoin");
    const res2 = await functionChain.call("Open the calculator on my computer");
    const res3 = await functionChain.call("Get me the latest price of Ethereum", {
        functionArray: ["fetchCryptoPrice"] // Optionally specify which functions to use
    });
    const res4 = await functionChain.call("Take a screenshot.");
    const res5 = await functionChain.call("What was apple's revenue in the last year?");

    console.log(res1, res2, res3, res4, res5);
}

main();