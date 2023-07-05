// 1. Write Function Code Within Execute Function
export const execute = async (options) => {
    const { symbol, interval = "5min", outputsize = "compact", month } = options;
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    if (!apiKey) {
      return 'API key not found in process environment variables. Please ensure to input your Alpha Vantage API key in the .env file for this function to work.';
    }
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&apikey=${apiKey}`;
  
    if (month) {
      url += `&month=${month}`;
    }
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      if(data["Meta Data"]){
          const latestTradingDay = data["Meta Data"]["3. Last Refreshed"];
          return JSON.stringify(data["Time Series (5min)"][latestTradingDay], null, 2); 
      } else {
          return 'Unable to fetch the latest trading data. Please check if the symbol is correct or try again later.';
      }
    } catch (error) {
      console.error(`Error fetching company overview:`, error);
      throw error;
    }
  };
  
  // 2. Add Function Details for LLM to use
  export const details = {
    name: 'getAlphaVantageIntradayData',
    description: 'Fetches intraday time series for the specified equity using the Alpha Vantage API. The function returns the most recent intraday OHLCV data for the specified symbol. By default, the function returns the most recent 100 intraday OHLCV data points, but this can be adjusted using the "outputsize" parameter.',
    parameters: {
      type: 'object',
      properties: {
        symbol: {
          type: 'string',
          description: 'The symbol of the equity of your choice. For example: symbol=IBM.',
        },
        interval: {
          type: 'string',
          default: '5min',
          description: 'Time interval between two consecutive data points in the time series. The following values are supported: 1min, 5min, 15min, 30min, 60min',
        },
        outputsize: {
          type: 'string',
          default: 'compact',
          description: 'By default, outputsize=compact. Strings compact and full are accepted with the following specifications: compact returns only the latest 100 data points in the intraday time series; full returns the full-length intraday data.',
        },
        month: {
          type: 'string',
          description: 'You can use the month parameter (in YYYY-MM format) to query a specific month in history. For example, month=2009-01. Any month in the last 20+ years (since 2000-01) is supported.',
        },
      },
    },
    example: 'Get intraday data for IBM',
  };
  