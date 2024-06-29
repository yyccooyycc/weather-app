import './App.css';
import { useState,useEffect } from 'react';

function App() {
  const [weather,setWeather]=useState(null);
  const [city,setCity]=useState('Taipei');
  const apiKey='793379df1be585e2aef944d6c29a4861';

  useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response=>response.json())
    .then(data=>setWeather(data))
  },[city])

  const handleCityChange=(event)=>{
    setCity(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <input type='text' value={city} onChange={handleCityChange}/>
        {weather?(
          <div>
            <h2>{weather.name}</h2>
            <p>Temperature:{weather.main.temp}°C</p>
            <p>Weather:{weather.weather[0].description}</p>
          </div>
        ):(
          <p>Loading...</p>
        )
      }
      </header>
    </div>
  );
}

export default App;
