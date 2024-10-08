const API_KEY = '4103fb80c1acdb68060bf9589985ce53'; // Replace with your actual API key

export const fetchWeather = async (lat: number, lon: number, unit: 'celsius' | 'fahrenheit') => {
  const unitParam = unit === 'celsius' ? 'metric' : 'imperial';
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unitParam}&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Weather data not available');
  }
  return response.json();
};

export const fetchForecast = async (lat: number, lon: number, unit: 'celsius' | 'fahrenheit') => {
  const unitParam = unit === 'celsius' ? 'metric' : 'imperial';
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unitParam}&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Forecast data not available');
  }
  return response.json();
};

export const searchCities = async (query: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('City search failed');
  }
  return response.json();
};