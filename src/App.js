import React, {useState} from 'react';
import './App.css';
const API = {
  key: "41f86ab9a9459b0744c274726517e044",
  base: "https://api.openweathermap.org/data/2.5/",
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${API.base}forecast?q=${query}&units=metric&APPID=${API.key}`)
        .then(res => res.json())
        .then(result => {
          if (result.cod === "404" || result.cod === "400") {
            alert("Type valid city name");
            return;
          }
          setWeather(result);
          setQuery('');
          console.log(result);
          console.log(typeof result.cod);
        });
    }
  }
  
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className='App'>
      <input
        type="text"
        className="search_field"
        placeholder='Search '
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
      />
      {(Object.keys(weather).length & weather.cod !== "400") ? (
        <div className="weather_card">
          <div className='weather_card__content'>
            <div className='weather_card__city'>
              {weather.city.name}
            </div>
            <div className='weather_card__date'>
              {dateBuilder(new Date())}
            </div>
            <div className='weather_card__temperature'>
              {Math.round(weather.list[0].main.temp)}°c
            </div>
            <div className='weater_card__weather'>
              {weather.list[0].weather[0].description}
            </div>
          </div>
        </div>
      ) : ('')}
    </div>
  );
}

export default App;
