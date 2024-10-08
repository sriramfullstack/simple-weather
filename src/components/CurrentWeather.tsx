import React, { useState, useEffect } from 'react';
import { useLocation } from '../hooks/useLocation';
import { useTemperatureUnit } from '../hooks/useTemperatureUnit';
import { fetchWeather } from '../utils/api';
import { getWeatherBackground, getWeatherIcon } from '../utils/weatherStyles';
import { generateWeatherSummary } from '../utils/weatherSummary';
import { Droplet, Wind } from 'lucide-react';

const CurrentWeather: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const { location, cityName } = useLocation();
  const { unit } = useTemperatureUnit();

  useEffect(() => {
    if (location) {
      fetchWeather(location.lat, location.lon, unit).then(setWeather);
    }
  }, [location, unit]);

  if (!weather) return <div className="flex items-center justify-center h-screen text-gray-800 dark:text-gray-200">Loading...</div>;

  const backgroundClass = getWeatherBackground(weather.weather[0].main);
  const WeatherIcon = getWeatherIcon(weather.weather[0].main);
  const weatherSummary = generateWeatherSummary(weather, unit);

  return (
    <div className={`min-h-screen w-full ${backgroundClass} flex flex-col items-center justify-center p-4`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-gray-800 dark:text-gray-200">
        <h1 className="text-3xl font-bold mb-2">{cityName}</h1>
        <p className="text-xl mb-6">{weather.sys.country}</p>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <WeatherIcon size={64} className="text-blue-500 dark:text-blue-400" aria-hidden="true" />
            <span className="text-6xl font-bold ml-4">
              {Math.round(weather.main.temp)}°{unit === 'celsius' ? 'C' : 'F'}
            </span>
          </div>
          <p className="text-xl font-semibold capitalize">{weather.weather[0].description}</p>
        </div>
        
        <p className="text-lg mb-6">{weatherSummary}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <Droplet className="mr-2 text-blue-500 dark:text-blue-400" aria-hidden="true" />
            <span>Humidity: {weather.main.humidity}%</span>
          </div>
          <div className="flex items-center">
            <Wind className="mr-2 text-blue-500 dark:text-blue-400" aria-hidden="true" />
            <span>Wind: {weather.wind.speed} {unit === 'celsius' ? 'm/s' : 'mph'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;