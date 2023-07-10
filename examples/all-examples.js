import {
    FunctionChain, 
    wikipedia, 
    fetchCryptoPrice,
    getAlphaVantageCompanyOverview,
    getAlphaVantageIntraday,
    askPinecone,
    createPinecone,
    updatePinecone,
    openApp,
    takeScreenshot,
    getVisualCrossingWeatherForecast,
    huggingFaceImageClassification
} from "ai-function-chain";

async function runAllExamples() {
    
    const functionChain = new FunctionChain();
    
    // 1. Wikipedia Example
    let res1 = await functionChain.call("Look up 'JavaScript' on Wikipedia", wikipedia);
    console.log("1. Wikipedia Example Result:", res1);
    
    // 2. Fetch Crypto Price Example
    let res2 = await functionChain.call("Fetch the latest price of Bitcoin", fetchCryptoPrice);
    console.log("2. Fetch Crypto Price Example Result:", res2);
    
    // 3. Alpha Vantage Example
    let res3 = await functionChain.call("Get the overview of Microsoft", getAlphaVantageCompanyOverview);
    console.log("3. Alpha Vantage Example Result:", res3);
    
    let res4 = await functionChain.call("Get the intraday of Apple", getAlphaVantageIntraday);
    console.log("4. Alpha Vantage Intraday Example Result:", res4);
    
    // 5. Pinecone Example
    let res5 = await functionChain.call("Create a pinecone index called function-chain", createPinecone);
    console.log("5. Pinecone Example Result (Create):", res5);
    
    let res6 = await functionChain.call("Update pinecone data with ID 1", updatePinecone);
    console.log("6. Pinecone Example Result (Update):", res6);
    
    let res7 = await functionChain.call("Ask Pinecone data with ID 1", askPinecone);
    console.log("7. Pinecone Example Result (Ask):", res7);
    
    // 8. Open App Example
    let res8 = await functionChain.call("Open Slack", openApp);
    console.log("8. Open App Example Result:", res8);
    
    // 9. Take Screenshot Example
    let res9 = await functionChain.call("Take a screenshot of the current window", takeScreenshot);
    console.log("9. Take Screenshot Example Result:", res9);
    
    // 10. Visual Crossing Weather Forecast Example
    let res10 = await functionChain.call("Get the weather forecast for San Francisco", getVisualCrossingWeatherForecast);
    console.log("10. Visual Crossing Weather Forecast Example Result:", res10);
    
    // 11. Hugging Face Image Classification Example
    let res11 = await functionChain.call("Classify an image of a cat", huggingFaceImageClassification);
    console.log("11. Hugging Face Image Classification Example Result:", res11);
}

runAllExamples();
