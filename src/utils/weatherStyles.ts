import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Cloudy, CloudDrizzle, CloudFog } from 'lucide-react';

type WeatherStyle = {
  background: string;
  textColor: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
};

const weatherStyles: Record<string, WeatherStyle> = {
  clear: {
    background: 'bg-gradient-to-br from-blue-400 to-blue-200',
    textColor: 'text-gray-800',
    icon: Sun,
  },
  clouds: {
    background: 'bg-gradient-to-br from-gray-300 to-gray-100',
    textColor: 'text-gray-800',
    icon: Cloud,
  },
  rain: {
    background: 'bg-gradient-to-br from-blue-600 to-blue-400',
    textColor: 'text-white',
    icon: CloudRain,
  },
  snow: {
    background: 'bg-gradient-to-br from-blue-100 to-gray-100',
    textColor: 'text-gray-800',
    icon: CloudSnow,
  },
  thunderstorm: {
    background: 'bg-gradient-to-br from-gray-700 to-gray-500',
    textColor: 'text-white',
    icon: CloudLightning,
  },
  drizzle: {
    background: 'bg-gradient-to-br from-blue-300 to-blue-100',
    textColor: 'text-gray-800',
    icon: CloudDrizzle,
  },
  mist: {
    background: 'bg-gradient-to-br from-gray-400 to-gray-200',
    textColor: 'text-gray-800',
    icon: CloudFog,
  },
  smoke: {
    background: 'bg-gradient-to-br from-gray-600 to-gray-400',
    textColor: 'text-white',
    icon: CloudFog,
  },
  haze: {
    background: 'bg-gradient-to-br from-yellow-200 to-yellow-100',
    textColor: 'text-gray-800',
    icon: Cloudy,
  },
  dust: {
    background: 'bg-gradient-to-br from-yellow-600 to-yellow-400',
    textColor: 'text-white',
    icon: CloudFog,
  },
  fog: {
    background: 'bg-gradient-to-br from-gray-300 to-gray-100',
    textColor: 'text-gray-800',
    icon: CloudFog,
  },
};

export const getWeatherBackground = (weatherCondition: string): string => {
  return weatherStyles[weatherCondition.toLowerCase()]?.background || 'bg-gradient-to-br from-gray-500 to-gray-300';
};

export const getWeatherIcon = (weatherCondition: string): React.ComponentType<{ size?: number | string; className?: string }> => {
  return weatherStyles[weatherCondition.toLowerCase()]?.icon || Cloud;
};

export const getTextColor = (weatherCondition: string): string => {
  return weatherStyles[weatherCondition.toLowerCase()]?.textColor || 'text-gray-800';
};