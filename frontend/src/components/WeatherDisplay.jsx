// src/components/WeatherDisplay.jsx
import React from 'react';

const WeatherDisplay = ({ data }) => {
  const { location, date, forecast } = data;
  const { day } = forecast;

  return (
    <div className="weather-card">
      <h2>{location.name}, {location.region}, {location.country}</h2>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Temperature:</strong> {day.mintemp_c}°C – {day.maxtemp_c}°C</p>
      <p><strong>Humidity:</strong> {day.avghumidity}%</p>
      <p><strong>Wind:</strong> {day.maxwind_kph} km/h</p>
      <p><strong>Precipitation:</strong> {day.totalprecip_mm} mm</p>
      <p><strong>Condition:</strong> {day.daily_will_it_rain ? 'Likely to rain' : 'Unlikely to rain'}, {day.condition.text}</p>
      <p><strong>Visibility:</strong> {day.avgvis_km} km</p>
      <img src={`https:${day.condition.icon}`} alt={day.condition.text} />
    </div>
  );
};

export default WeatherDisplay;
