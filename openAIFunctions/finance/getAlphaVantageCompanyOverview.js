// 1. Write Function Code Within Execute Function
export const execute = async (options) => {
    const { symbol } = options;
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    if (!apiKey) {
      return 'API key not found in process environment variables. Please ensure to input your Alpha Vantage API key in the .env file for this function to work.';
    }
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return JSON.stringify(data, null, 2); 
    } catch (error) {
      console.error(`Error fetching company overview:`, error);
      throw error;
    }
  };
  // 2. Add Function Details for LLM to use
  export const details = {
    name: 'getAlphaVantageCompanyOverview',
    description: 'Fetches company information, financial ratios, and other key metrics for the specified equity using the Alpha Vantage API. This includes the following information: Symbol, Asset Type, Name, Description, CIK, Exchange, Currency, Country, Sector, Industry, Address, Fiscal Year End, Latest Quarter, Market Capitalization, EBITDA, PE Ratio, PEG Ratio, Book Value, Dividend Per Share, Dividend Yield, EPS, Revenue Per Share (TTM), Profit Margin, Operating Margin (TTM), Return on Assets (TTM), Return on Equity (TTM), Revenue (TTM), Gross Profit (TTM), Diluted EPS (TTM), Quarterly Earnings Growth (YoY), Quarterly Revenue Growth (YoY), Analyst Target Price, Trailing PE, Forward PE, Price to Sales Ratio (TTM), Price to Book Ratio, EV to Revenue, EV to EBITDA, Beta, 52-Week High, 52-Week Low, 50-Day Moving Average, 200-Day Moving Average, Shares Outstanding, Dividend Date, Ex-Dividend Date.',
    parameters: {
      type: 'object',
      properties: {
        symbol: {
          type: 'string',
          description: 'The symbol of the ticker of your choice. For example: symbol=IBM.',
        },
      },
    },
    example: 'Get company overview for IBM',
  };  