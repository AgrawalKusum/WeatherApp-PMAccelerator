import React, { useState } from 'react';
import LocationInput from './components/LocationInput';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  const [weather, setWeather] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchWeather = async (lat, lng, date) => {
  try {
    const response = await fetch(`${backendUrl}/weather?lat=${lat}&lng=${lng}&date=${date}`);
    const data = await response.json();
    setWeather(data);
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
};

  return (
    <div className="app">
      <h1>🌤️ Weather Forecast</h1>
      <LocationInput onFetchWeather={fetchWeather} />
      {weather && <WeatherDisplay data={weather} />}
    </div>
  );
}

export default App;
