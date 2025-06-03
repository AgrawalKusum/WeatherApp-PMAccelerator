// src/components/WeatherDisplay.js
import React from 'react';

function WeatherDisplay({ data }) {
  return (
    <div>
      <h2>Forecast:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default WeatherDisplay;
