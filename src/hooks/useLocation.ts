import { useState, useEffect } from 'react';

interface Location {
  lat: number;
  lon: number;
}

export const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [cityName, setCityName] = useState<string | null>(null);

  const saveLocation = (newLocation: Location, newCityName: string) => {
    setLocation(newLocation);
    setCityName(newCityName);
    localStorage.setItem('weatherAppLocation', JSON.stringify({ ...newLocation, cityName: newCityName }));
  };

  useEffect(() => {
    const savedLocation = localStorage.getItem('weatherAppLocation');
    if (savedLocation) {
      const { lat, lon, cityName } = JSON.parse(savedLocation);
      setLocation({ lat, lon });
      setCityName(cityName);
    } else {
      setCurrentLocationAsMain();
    }
  }, []);

  const setManualLocation = (lat: number, lon: number, name: string) => {
    const newLocation = { lat, lon };
    saveLocation(newLocation, name);
  };

  const setCurrentLocationAsMain = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        try {
          const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${newLocation.lat}&lon=${newLocation.lon}&limit=1&appid=4103fb80c1acdb68060bf9589985ce53`);
          const data = await response.json();
          const cityName = data[0]?.name || 'Unknown location';
          saveLocation(newLocation, cityName);
        } catch (error) {
          console.error('Error fetching location name:', error);
          saveLocation(newLocation, 'Current location');
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        // Set a default location (e.g., New York City) if geolocation fails
        const defaultLocation = { lat: 40.7128, lon: -74.0060 };
        saveLocation(defaultLocation, 'New York City');
      }
    );
  };

  return { location, cityName, setManualLocation, setCurrentLocationAsMain };
};