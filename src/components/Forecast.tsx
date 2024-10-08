import React, { useState, useEffect } from 'react';
import { useLocation } from '../hooks/useLocation';
import { useTemperatureUnit } from '../hooks/useTemperatureUnit';
import { fetchForecast } from '../utils/api';
import { getWeatherBackground, getWeatherIcon, getTextColor } from '../utils/weatherStyles';

const Forecast: React.FC = () => {
  const [forecast, setForecast] = useState<any>(null);
  const { location } = useLocation();
  const { unit } = useTemperatureUnit();

  useEffect(() => {
    if (location) {
      fetchForecast(location.lat, location.lon, unit).then(setForecast);
    }
  }, [location, unit]);

  if (!forecast) return <div className="text-center text-gray-600">Loading...</div>;

  // Group forecast data by day
  const dailyForecasts = forecast.list.reduce((acc: any, item: any) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = item;
    }
    return acc;
  }, {});

  return (
    <div className="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">5-Day Forecast</h2>
      <p className="text-lg text-gray-600 mb-6">{forecast.city.name}, {forecast.city.country}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(dailyForecasts).slice(0, 5).map(([date, day]: [string, any]) => {
          const background = getWeatherBackground(day.weather[0].main);
          const textColor = getTextColor(day.weather[0].main);
          const WeatherIcon = getWeatherIcon(day.weather[0].main);
          return (
            <div key={date} className={`p-4 rounded-lg ${background} transition-all duration-300 hover:shadow-md`}>
              <h3 className={`text-xl font-semibold ${textColor}`}>
                {new Date(day.dt * 1000).toLocaleDateString(undefined, { weekday: 'long' })}
              </h3>
              <div className="flex items-center justify-between mt-2">
                <WeatherIcon size={32} className={`${textColor}`} />
                <p className={`text-3xl font-bold ${textColor}`}>
                  {Math.round(day.main.temp)}°{unit === 'celsius' ? 'C' : 'F'}
                </p>
              </div>
              <p className={`text-lg ${textColor} capitalize opacity-90 mt-2`}>{day.weather[0].description}</p>
              <div className={`grid grid-cols-2 gap-2 text-sm ${textColor} opacity-80 mt-2`}>
                <p>Humidity: {day.main.humidity}%</p>
                <p>Wind: {day.wind.speed} {unit === 'celsius' ? 'm/s' : 'mph'}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;