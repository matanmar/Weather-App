import React, { Fragment, useEffect, useState } from "react";
import ChartLine from "./Chart";
import LoadingSpinner from "../UI/LoadingSpinner";

const Next5Days = (props) => {
  const [weekWeather, setWeekWeather] = useState({});
  const [check, setCheck] = useState(false);
  const [showTempChart, setShowTempChart] = useState(true);
  const [showWindChart, setShowWindChart] = useState(false);
  const [showPopChart, setShowPopChart] = useState(false);
  const [loading, setLoading] = useState(false);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    if (!props.weather.location) {
      return;
    }

    setLoading(true);

    const weatherWeek = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${props.weather.coords.lat}&lon=${props.weather.coords.lon}&appid=5f8777ac1e5db6a5c0ffd481f54c8f55`
        );

        // handling error from weather API
        if (!response.ok) {
          throw new Error(
            `Somthing went wrong with fetching weather data: ${response.statusText} `
          );
        }

        const weatherData = await response.json();

        const filtered = weatherData.list.filter(
          (_, index) => index === 0 || index % 8 === 0
        );

        setWeekWeather((pre) => ({
          ...pre,
          data: weatherData,
          weatherList: filtered,
        }));
        setLoading(false);
        setCheck(true);
      } catch (error) {
        console.error(`${error}💥💥`);
      }
    };
    weatherWeek();
  }, [props.weather]);

  const displayTempChartHandler = (e) => {
    setShowTempChart(true);
    setShowWindChart(false);
    setShowPopChart(false);

    e.target.classList.add("active-button");
    document.getElementById("button-wind").classList.remove("active-button");
    document.getElementById("button-pop").classList.remove("active-button");
  };

  const displayWindChartHandler = (e) => {
    setShowWindChart(true);
    setShowTempChart(false);
    setShowPopChart(false);

    e.target.classList.add("active-button");
    document.getElementById("button-temp").classList.remove("active-button");
    document.getElementById("button-pop").classList.remove("active-button");
  };

  const displayPopChartHandler = (e) => {
    setShowPopChart(true);
    setShowTempChart(false);
    setShowWindChart(false);

    e.target.classList.add("active-button");
    document.getElementById("button-temp").classList.remove("active-button");
    document.getElementById("button-wind").classList.remove("active-button");
  };

  return (
    <Fragment>
      {!props.error.hasError && (
        <div className="daysGapFromTop">
          {loading && <LoadingSpinner />}
          {check && (
            <nav>
              <div className="city"> {weekWeather.data.city.name}</div>
              <ul className="weather-item">
                {weekWeather.weatherList.map((mov, index) => (
                  <li
                    className="week-list"
                    key={mov.dt}
                    onClick={props.onShowHourlyWeather.bind(
                      null,
                      weekWeather.data.list.slice(index * 8, index * 8 + 8) // sending the function only the elements from the same day
                    )}
                  >
                    <div className="day">
                      {days[new Date(mov.dt_txt).getDay()]}
                    </div>
                    <div className="temp">
                      Temp: {mov.main.temp.toFixed(0) - 273 + " ℃"}
                    </div>
                    <div className="temp">
                      Humidity: {mov.main.humidity + "%"}
                    </div>
                    <div className="temp">
                      Date:
                      {mov.dt_txt.slice(0, 10).split("-").reverse().join("/")}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="buttons">
                <button
                  id="button-temp"
                  className="button--chart active-button"
                  onClick={displayTempChartHandler}
                >
                  Temp
                </button>
                <button
                  id="button-wind"
                  className="button--chart"
                  onClick={displayWindChartHandler}
                >
                  Wind
                </button>
                <button
                  id="button-pop"
                  className="button--chart"
                  onClick={displayPopChartHandler}
                >
                  Pop
                </button>
              </div>
              {showTempChart && <ChartLine data={weekWeather} type="temp" />}
              {showWindChart && <ChartLine data={weekWeather} type="wind" />}
              {showPopChart && <ChartLine data={weekWeather} type="pop" />}
            </nav>
          )}
        </div>
      )}
      {props.error.hasError && (
        <p className="error">{`${props.error.errorMessage}`}</p>
      )}
    </Fragment>
  );
};

export default Next5Days;
