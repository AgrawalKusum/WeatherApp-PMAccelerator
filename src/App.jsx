import React, { useState } from 'react';
import LocationInput from './components/LocationInput';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (lat, lng, date) => {
    const response = await fetch(`/weather?lat=${lat}&lng=${lng}&date=${date}`);
    const data = await response.json();
    setWeather(data);
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
