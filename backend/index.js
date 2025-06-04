const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/weather', async (req, res) => {
  const { lat, lng, date } = req.query;
  console.log("Received query:", { lat, lng, date });

  if (!lat || !lng || !date) {
    return res.status(400).json({ error: 'Missing lat, lng or date' });
  }

  try {
    const apiKey = process.env.WEATHERAPI_KEY;

    const response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
      params: {
        key: apiKey,
        q: `${lat},${lng}`,
        dt: date,
        days: 1,
        aqi: 'no',
        alerts: 'no',
      }
    });

    const data = response.data;

    // Example: Find forecast for the requested date
    const targetDate = new Date(date).setHours(0, 0, 0, 0);
    const dailyForecast = response.data.forecast.forecastday[0];

    res.json({
  location: response.data.location,
  date,
  forecast: dailyForecast
});

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
console.log("Using OpenWeather API key:", process.env.OPENWEATHER_API_KEY);
