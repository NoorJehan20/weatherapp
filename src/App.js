import logo from './logo.svg';
import './App.css';
// import { WiCloud } from "react-icons/wi";
import { useEffect, useState } from 'react';

function App() {
const [result, setresult] = useState({})
const [city, setcity] = useState("")
const API ={
  key: "1315e207be3242acf3af559b696c94ac",
  url: "https://api.openweathermap.org/data/2.5/weather"
} 
const handleSearch = () => {
  console.log(city, "city")
  fetch(`${API.url}?q=${city}&appid=${API.key}`)
  .then(res => res.json())
  .then(data =>
    {
      console.log(data)
      setresult(data)
    })
}
useEffect(() => {
  fetch(`${API.url}?q=karachi&appid=${API.key}`)
  .then(res => res.json())
  .then(data =>
    {
      console.log(data)
      setresult(data)
    })
 },[])
 console.log(result)
  return (
    <div className='App'>
      Weather
      <h1>{result.main && result.main.temp}<sup>o</sup>F</h1>
      <h1>{result.main && result.main.humidity}</h1>
      <div>
        <input type='text' name='city' onChange={(e)=> setcity(e.target.value)}></input>
        <button type='button' onClick={handleSearch}>Search</button>

      </div>
    </div>
  )
}

export default App;
