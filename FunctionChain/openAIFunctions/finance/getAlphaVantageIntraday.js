const execute = async (options) => {
    const { symbol } = options;
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  
    if (!apiKey) {
      return 'API key not found. Please input your Alpha Vantage API key.';
    }
  
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&outputsize=compact&extended_hours=false&apikey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data["Meta Data"]) {
          const latestTradingDay = data["Meta Data"]["3. Last Refreshed"];
          const latestData = data["Time Series (1min)"][latestTradingDay];
          const { "1. open": open, "2. high": high, "3. low": low, "4. close": close, "5. volume": volume } = latestData;
  
          return `Latest data for ${symbol} on ${latestTradingDay}: Open - ${open}, High - ${high}, Low - ${low}, Close - ${close}, Volume - ${volume}.`; 
      } else {
          return 'No data available. Check the ticker or try again later.';
      }
  
    } catch (error) {
      console.error(`Error fetching intraday data:`, error);
      throw error;
    }
  };
  
  const details = {
    name: 'getAlphaVantageIntraday',
    description: 'Fetches intraday data for a specified stock without extended hours.',
    parameters: {
      type: 'object',
      properties: {
        symbol: {
          type: 'string',
          description: 'The stock symbol.',
        },
      },
    },
    example: 'Get intraday data for IBM',
  };
  
  export const getAlphaVantageIntraday = {
    execute,
    details,
  };
  