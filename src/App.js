import './App.css';
import { useState, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Taipei');
  const [error, setError] = useState('');
  const apiKey = 'myApiKey';

  const fetchWeatherRef = useRef(debounce(async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        if(response.status===404){
          throw new Error(`City Can Not Be Found.`);
        }else{
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setWeather(null);
      setError(error.message);
    }
  }, 1000));

  useEffect(() => {
    if(city){
    fetchWeatherRef.current(city)}
  }, [city]);

  const handleCityChange = (event) => {
    const inputCity = event.target.value;
    const cityRegex = /^[a-zA-Z\s]*$/;
    if(cityRegex.test(inputCity)){
      setCity(inputCity);
      setError('');
    }else{
      setError('Invalid City Name.Please use only letters and spaces')

    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <input type='text' value={city} onChange={handleCityChange} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {weather ? (
          <div>
            <h2>{weather.name}</h2>
            {weather.main ? (
              <p>Temperature: {weather.main.temp}°C</p>
            ) : (
              <p>Temperature data not available</p>
            )}
            {weather.weather ? (
              <p>Weather: {weather.weather[0].description}</p>
            ) : (
              <p>Weather description not available</p>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;
