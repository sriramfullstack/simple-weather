import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import LocationSettings from './components/LocationSettings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link to="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors duration-300">
                  Current
                </Link>
                <Link to="/forecast" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors duration-300">
                  Forecast
                </Link>
                <Link to="/settings" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors duration-300">
                  Settings
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow flex items-center justify-center">
          <Routes>
            <Route path="/" element={<CurrentWeather />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/settings" element={<LocationSettings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;