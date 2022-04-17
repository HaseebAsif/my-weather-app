import React, { useState, useEffect } from "react";
import "./App.css";
import Weathercard from "./WeatherCard";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("london");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=5443a21ad24bf3ab5f101f2df63eeed5`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myWatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myWatherInfo);
      console.log(temp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <div>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            name="search"
            className="searchTerm"
            autoFocus
            id="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      <Weathercard tempInfo={tempInfo} />
    </div>
  );
};

export default Temp;
