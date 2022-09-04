import "./App.css";
import { Routes, Route } from "react-router";
import Next5Days from "./components/Next5Days";
import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import CurrentCity from "./components/CurrentCity";
import Modal from "./UI/Modal";
import Volleyball from "./components/Volleyball";
import CoverImg from "./images/sunset.jpg";
import getIcon from "./helpres/getIcon";

let content;

function App() {
  const [weather, setWeather] = useState({});
  const [error, setError] = useState({
    hasError: false,
    errorMessage: "Something went wrong",
  });
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timezone, setTimezone] = useState(null);

  // function that excuting if succeded to find location
  const findPosition = async (position) => {
    try {
      setError({ hasError: false });
      setIsLoading(true); // for render spinner

      const { latitude } = position.coords;
      const { longitude } = position.coords;

      // fetching data from weather API, inout is the location.
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5f8777ac1e5db6a5c0ffd481f54c8f55`
      );

      // handling error from weather API
      if (!response.ok) {
        if (response.status === 400)
          throw new Error(
            `Couldn't find your location, use search to find weather per city.`
          );
        else {
          throw new Error();
        }
      }

      const weatherData = await response.json();

      const weatherDisplay = {
        coords: weatherData.coord,
        location: weatherData.name,
        temp: (weatherData.main.temp - 273).toFixed(0),
        humidity: weatherData.main.humidity.toFixed(0),
        wind: weatherData.wind.speed.toFixed(0),
        description: weatherData.weather[0].description,
        img: weatherData.weather[0].icon,
        timezone: weatherData.timezone,
      };
      setTimezone(weatherData.timezone);
      setIsLoading(false);
      setWeather(weatherDisplay);
    } catch (error) {
      console.error(`${error.message}💥💥`);
      setError({ hasError: true, errorMessage: error.message });
    }
  };

  // error handling for location issues.
  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        setError({
          hasError: true,
          errorMessage:
            "Please enable the location setting to see your weather or use the search input.",
        });
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable. Use the search input.");
        setError({
          hasError: true,
          errorMessage: "Location information is unavailable.",
        });
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        setError({
          hasError: true,
          errorMessage:
            "The request to get user location timed out. try to refresh or use the search input.",
        });
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        setError({
          hasError: true,
          errorMessage:
            "An unknown error occurred with getting your location. try to refresh or use the search input.",
        });
        break;
      default:
        break;
    }
  };

  // using useEffect to run this weather for specific location for the first time
  useEffect(() => {
    setError({ hasError: false });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(findPosition, showError);
    } else {
      setError({ hasError: true, errorMessage: "Something went wrong" });
      alert(
        "Geolocation is not supported by this browser, can't find your location"
      );
    }
  }, []);

  // getting location vie Geolocation API

  const weatherPerCity = async (city) => {
    try {
      setIsLoading(true);
      setError({ hasError: false });
      // fetching data from weather API, input is city name.
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5f8777ac1e5db6a5c0ffd481f54c8f55`
      );

      // handling error from weather API
      if (!response.ok) {
        if (response.status === 404)
          throw new Error(
            `City was not found, check your spelling and try again`
          );
        else {
          throw new Error(`Something went wrong, try again later`);
        }
      }

      const weatherData = await response.json();

      const weatherDisplay = {
        coords: weatherData.coord,
        location: weatherData.name,
        temp: (weatherData.main.temp - 273).toFixed(0),
        humidity: weatherData.main.humidity.toFixed(0),
        wind: weatherData.wind.speed.toFixed(0),
        description: weatherData.weather[0].description,
        img: weatherData.weather[0].icon,
        time: weatherData.dt,
        timezone: weather.timezone,
      };

      document.body.style.backgroundImage =
        "url('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunset-quotes-21-1586531574.jpg')";

      setIsLoading(false);
      setWeather(weatherDisplay);
    } catch (error) {
      console.log(`${error}💥💥`);
      setError({ hasError: true, errorMessage: error });
    }
  };

  const closeModal = () => {
    setShow(false);
  };

  // when clicking on one of the days,  a hourly forecast will popup
  const showHourlyWeather = (data) => {
    // check if can add here a portal  so the hourly data will pop over
    setShow(true);

    const date = data[0].dt_txt.slice(0, 10).split("-").reverse().join("/");

    content = (
      <Modal onClose={closeModal}>
        <div>
          <h3 className="h3">{`Hourly forecast ${date}`}</h3>
          <ul className="weather-item-daily">
            {data.map((mov) => (
              <li className="modal-week-list" key={mov.dt}>
                <div className="temp">
                  Temp: {mov.main.temp.toFixed(0) - 273 + " ℃"} Hour:{" "}
                  {mov.dt_txt.slice(16, 21)}
                </div>
                <img
                  style={{ marginBottom: "1rem" }}
                  width="60"
                  height="60"
                  src={getIcon(mov.weather[0].icon)}
                  alt={`weather img: ${mov.weather.description}`}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="actions">
          <button className="buttom--alt" onClick={closeModal}>
            Close
          </button>
        </div>
      </Modal>
    );
  };

  document.body.style.backgroundImage = `url(${CoverImg})`;

  return (
    <Fragment>
      {show && content}
      <Header />
      <Search cityWeather={weatherPerCity} />
      <Routes>
        <Route
          path="/"
          element={
            <CurrentCity
              st
              weather={weather}
              cityWeather={weatherPerCity}
              error={error}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/next5days"
          excat
          element={
            <Next5Days
              timezone={timezone}
              weather={weather}
              onShowHourlyWeather={showHourlyWeather}
              error={error}
              isLoading={isLoading}
            />
          }
        />
        <Route path="/volleyball" element={<Volleyball weather={weather} />} />
      </Routes>
    </Fragment>
  );
}

export default App;
