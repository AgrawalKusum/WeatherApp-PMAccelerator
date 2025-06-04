const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/weather', async (req, res) => {
  const { lat, lng, date } = req.query;

  if (!lat || !lng || !date) {
    return res.status(400).json({ error: 'Missing lat, lng or date' });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_key;

    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall`,
      {
        params: {
          lat,
          lon: lng,
          appid: apiKey,
          units: 'metric',
          exclude: 'minutely,hourly,alerts'
        }
      }
    );

    const data = response.data;

    // Example: Find forecast for the requested date
    const targetDate = new Date(date).setHours(0, 0, 0, 0);
    const dailyForecast = data.daily.find(d => {
      const forecastDate = new Date(d.dt * 1000).setHours(0, 0, 0, 0);
      return forecastDate === targetDate;
    });

    res.json({
      location: { lat, lng },
      date,
      forecast: dailyForecast || 'Not available'
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
