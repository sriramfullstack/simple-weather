import React, { useState, useEffect } from 'react';
import { useLocation } from '../hooks/useLocation';
import { useTemperatureUnit } from '../hooks/useTemperatureUnit';
import { searchCities } from '../utils/api';

interface City {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

const LocationSettings: React.FC = () => {
  const { location, setManualLocation, setCurrentLocationAsMain, cityName } = useLocation();
  const { unit, toggleUnit } = useTemperatureUnit();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      if (searchQuery.length > 2) {
        setIsLoading(true);
        try {
          const results = await searchCities(searchQuery);
          setSuggestions(results);
        } catch (error) {
          console.error('Error fetching city suggestions:', error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(fetchCities, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion: City) => {
    setManualLocation(suggestion.lat, suggestion.lon, suggestion.name);
    setSearchQuery(suggestion.name);
    setSuggestions([]);
  };

  const handleSetCurrentLocation = () => {
    setCurrentLocationAsMain();
    setSearchQuery('');
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Location Settings</h2>
        <p className="text-gray-600 mb-4">
          Current location: {cityName || 'Not set'}
        </p>
        <div className="mt-4 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a city"
            autoComplete="off"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
          />
          {isLoading && (
            <div className="absolute right-3 top-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
            </div>
          )}
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <li 
                  key={index} 
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-slate-700"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}, {suggestion.state ? `${suggestion.state}, ` : ''}{suggestion.country}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={handleSetCurrentLocation}
          className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
        >
          Use Current Location
        </button>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Temperature Unit</h3>
          <button
            onClick={toggleUnit}
            className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
              unit === 'celsius' 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {unit === 'celsius' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationSettings;