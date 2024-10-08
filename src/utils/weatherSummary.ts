interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
}

export const generateWeatherSummary = (weather: WeatherData, unit: 'celsius' | 'fahrenheit'): string => {
  const { temp, feels_like, humidity } = weather.main;
  const { speed: windSpeed } = weather.wind;
  const { main: weatherMain, description: weatherDescription } = weather.weather[0];
  
  const tempUnit = unit === 'celsius' ? '°C' : '°F';
  const windUnit = unit === 'celsius' ? 'm/s' : 'mph';

  let summary = `It's ${Math.round(temp)}${tempUnit} with ${weatherDescription}. `;

  if (Math.abs(temp - feels_like) > 3) {
    summary += `It feels like ${Math.round(feels_like)}${tempUnit}. `;
  }

  if (humidity > 70) {
    summary += "The air is quite humid. ";
  } else if (humidity < 30) {
    summary += "The air is dry. ";
  }

  if (windSpeed > 5) {
    summary += `It's windy with speeds of ${windSpeed.toFixed(1)} ${windUnit}. `;
  } else if (windSpeed < 0.5) {
    summary += "The air is calm. ";
  }

  switch (weatherMain.toLowerCase()) {
    case 'clear':
      summary += "It's a clear day, perfect for outdoor activities.";
      break;
    case 'clouds':
      summary += "Expect a cloudy day.";
      break;
    case 'rain':
      summary += "Don't forget your umbrella!";
      break;
    case 'snow':
      summary += "Bundle up and watch for slippery conditions.";
      break;
    case 'thunderstorm':
      summary += "Be cautious of thunderstorms and stay indoors if possible.";
      break;
    default:
      summary += "Enjoy your day!";
  }

  return summary;
};