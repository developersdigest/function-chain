import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import fs from "fs";
import path from "path";

export const execute = async ({ url }) => {
  try {
    const websiteName = new URL(url).hostname;
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    const outputDirectory = path.join(".", "output");
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory, { recursive: true });
    }

    const screenshotFileName = `${websiteName}_${timestamp}.png`;
    const screenshotFilePathWithDate = path.join(
      outputDirectory,
      screenshotFileName
    );

    const loader = new PuppeteerWebBaseLoader(url, {
      launchOptions: {
        headless: "new",
      },
      gotoOptions: {
        waitUntil: "domcontentloaded",
      },
      async evaluate(page, browser) {
        await page.screenshot({
          path: screenshotFilePathWithDate,
        });
        return `Screenshot saved to ${screenshotFilePathWithDate}`;
      },
    });

    await loader.load();

    return `Screenshot saved to ${screenshotFilePathWithDate}`;
  } catch (error) {
    console.error("Error occurred while taking a screenshot:", error);
    throw error;
  }
}

export const details = {
    name: "takeScreenshot",
    description: "Take a screenshot of a website",
    parameters: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "The URL of the website to take a screenshot",
        },
      },
      required: ["url"],
    },
    example: "Take a screenshot of the amazon homepage",
};
