import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import WeatherChart from './WeatherChart';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const resWeather = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const resForecast = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(resWeather.data);
      setForecast(resForecast.data);
      setError('');
    } catch (err) {
      setError('City not found or API error');
      setWeather(null);
      setForecast(null);
    }
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div className="weather-box">
          <h2>{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
          <p><strong>{weather.weather[0].main}</strong></p>
          <p>Temp: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}

      {forecast && <WeatherChart forecast={forecast} />}
    </div>
  );
}

export default App;
