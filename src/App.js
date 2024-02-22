import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("karachi");
  const [photos, setPhotos] = useState([]);
  const API ={
    key: "1315e207be3242acf3af559b696c94ac",
    url: "https://api.openweathermap.org/data/2.5/weather"
  }
  useEffect(() => {
    ifClicked();
  }, []);

  function ifClicked() {
    fetch(`${API.url}?q=${locations}&appid=${API.key}`)
      .then((res) => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          if (res.status === 404) {
            return alert("Oops, there seems to be an error!(wrong location)");
          }
          alert("Oops, there seems to be an error!");
          throw new Error("You have an error");
        }
      })
      .then((object) => {
        setWeather(object);
        console.log(weather);
      })
      .catch((error) => console.log(error));
    fetch(
      `https://api.unsplash.com/search/photos?query=${locations}&client_id=Q3aDLb1PRAfc7ZE53AvgAdURhM9zYaeWpDNOzjb7vs8`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("You made a mistake");
        }
      })
      .then((data) => {
        console.log(data);
        setPhotos(data?.results[0]?.urls?.raw);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="app">
      <div className="wrapper">
        <div className="search">
          <h1 className="app_name">Weather App</h1>
          <input type="text" value={locations} placeholder="Enter location" className="location_input"
            onChange={(e) => setLocations(e.target.value)}/>
          <button className="location_searcher" onClick={ifClicked}>
            Search Location
          </button>
        </div>
        <div className="app__data">
          <p className="temp">Current Temparature: {weather?.main?.temp} Humidity: {weather?.main?.humidity}</p>
          <p className="temp">Feels Like: {weather?.main?.feels_like} Air Pressure: {weather?.main?.pressure}</p>
          {/* <p className="temp">Feels Like: {weather?.main?.feels_like}</p> */}
          {/* <p className="temp">Air Pressure: {weather?.main?.pressure}</p> */}
        </div>
        <img className="app__image" src={photos} alt="" />
      </div>
    </div>
  );
}

export default App;