import { useState, useEffect } from 'react';

type TemperatureUnit = 'celsius' | 'fahrenheit';

export const useTemperatureUnit = () => {
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');

  useEffect(() => {
    const savedUnit = localStorage.getItem('weatherAppTempUnit') as TemperatureUnit;
    if (savedUnit) {
      setUnit(savedUnit);
    }
  }, []);

  const toggleUnit = () => {
    const newUnit = unit === 'celsius' ? 'fahrenheit' : 'celsius';
    setUnit(newUnit);
    localStorage.setItem('weatherAppTempUnit', newUnit);
  };

  return { unit, toggleUnit };
};