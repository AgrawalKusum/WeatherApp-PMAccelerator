// src/components/LocationInput.js
import React, { useState, useEffect } from 'react';

function LocationInput({ onFetchWeather }) {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 28.6139, lng: 77.2090 },
      zoom: 5,
    });

    map.addListener("click", (e) => {
      const clickedLat = e.latLng.lat();
      const clickedLng = e.latLng.lng();
      setLat(clickedLat);
      setLng(clickedLng);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lat && lng && date) {
      onFetchWeather(lat, lng, date);
    } else {
      alert("Please select location and date");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Select Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <div id="map" style={{ width: '100%', height: '300px', margin: '10px 0' }}></div>
        <button type="submit">Get Forecast</button>
      </form>
    </div>
  );
}

export default LocationInput;
