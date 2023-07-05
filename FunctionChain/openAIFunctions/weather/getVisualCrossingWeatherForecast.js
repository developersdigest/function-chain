// 1. Write Function Code Within Execute Function
export const execute = async (options) => {
  const { location, startDate, endDate } = options;
  const apiKey = process.env.VISUAL_CROSSING_API_KEY;

  if (!apiKey) {
    return 'API key not found in process environment variables. Please ensure to input your Visual Crossing API key in the .env file for this function to work.';
  }

  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`;

  if(startDate) url += `/${startDate}`;
  if(endDate) url += `/${endDate}`;

  url += `?key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    let result = `Weather for ${data.resolvedAddress} - ${data.description}\n`;

    for(let day of data.days) {
      result += `On ${day.datetime}, max temp: ${day.tempmax}, min temp: ${day.tempmin}, condition: ${day.conditions}\n`;
    }

    return result;

  } catch (error) {
    console.error(`Error fetching weather data:`, error);
    throw error;
  }
};

// 2. Add Function Details for LLM to use
export const details = {
  name: 'getVisualCrossingWeatherForecast',
  description: 'Fetches weather forecast for the specified location using the Visual Crossing API. This includes temperature, humidity, wind speed, and other important weather data.',
  parameters: {
    type: 'object',
    properties: {
      location: {
        type: 'string',
        description: 'The name of the location you want to get weather data for. For example: location="Toronto, Canada".',
      },
      startDate: {
        type: 'string',
        description: 'The start date for the weather data in the format YYYY-MM-DD. If not provided, it defaults to the current date.',
      },
      endDate: {
        type: 'string',
        description: 'The end date for the weather data in the format YYYY-MM-DD. If not provided, it defaults to 7 days from the current date.',
      },
    },
  },
  example: 'Get weather data for the week in Toronto, Canada',
};
