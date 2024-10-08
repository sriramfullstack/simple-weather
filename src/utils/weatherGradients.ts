export const getWeatherGradient = (weatherCondition: string): string => {
  switch (weatherCondition.toLowerCase()) {
    case 'clear':
      return 'from-blue-400 to-blue-200';
    case 'clouds':
      return 'from-gray-400 to-gray-200';
    case 'rain':
      return 'from-blue-600 to-blue-400';
    case 'snow':
      return 'from-blue-100 to-gray-100';
    case 'thunderstorm':
      return 'from-purple-600 to-purple-400';
    case 'drizzle':
      return 'from-blue-300 to-blue-100';
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'dust':
    case 'fog':
      return 'from-gray-300 to-gray-100';
    default:
      return 'from-gray-500 to-gray-300';
  }
};