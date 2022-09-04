import React, { Fragment, useEffect, useState } from "react";
import ChartLine from "./Chart";
import LoadingSpinner from "../UI/LoadingSpinner";
import CoverImg from "../images/sunset.jpg";
import getIcon from "../helpres/getIcon";

const Next5Days = (props) => {
  const [weekWeather, setWeekWeather] = useState({});
  const [check, setCheck] = useState(false);
  const [showTempChart, setShowTempChart] = useState(true);
  const [showWindChart, setShowWindChart] = useState(false);
  const [showPopChart, setShowPopChart] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentLocationTimeZone = props.timezone;

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

        // changing time to be for each city per timezone
        weatherData.list.forEach((mov) => {
          let temp;
          if (weatherData.city.timezone === currentLocationTimeZone)
            temp = mov.dt * 1000; // if timezone is
          else
            temp =
              mov.dt * 1000 +
              weatherData.city.timezone * 1000 -
              currentLocationTimeZone * 1000;
          // mov.dt = temp;
          mov.dt_txt = new Date(temp).toString();
        });

        // Sun Sep 04 2022 06:00:00 GMT+0300 (Israel Daylight Time) {}
        // console.log(weatherData);

        // filtered 5 days- 5 results
        const filtered = weatherData.list.filter(
          (_, index) => index === 0 || index % 8 === 0
        );

        // change the 'n' letter in the icon name to be only icons of day time
        filtered.forEach((mov) => {
          const temp = mov.weather[0].icon.replace("n", "d");
          mov.weather[0].icon = temp;
        });

        // console.log(filtered);

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
  }, [props.weather, currentLocationTimeZone]);

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

  document.body.style.backgroundImage = `url(${CoverImg})`;

  return (
    <Fragment>
      {!props.error.hasError && (
        <div className="daysGapFromTop">
          {loading && <LoadingSpinner />}
          {check && (
            <nav className="weather-days-container">
              <div className="city"> {weekWeather.data.city.name}</div>
              <ul className="weather-item">
                {weekWeather.weatherList.map((mov, index) => (
                  <li
                    className={
                      index === 0 ? "week-list" : "week-list list-border "
                    }
                    key={mov.dt}
                    onClick={props.onShowHourlyWeather.bind(
                      null,
                      weekWeather.data.list.slice(index * 8, index * 8 + 8) // sending the function only the elements from the same day
                    )}
                  >
                    <div className="day">
                      {days[new Date(mov.dt_txt).getDay()]}{" "}
                      <div className="date">
                        {mov.dt_txt.slice(4, 10).split("-").reverse().join("/")}
                      </div>
                    </div>
                    <div className="temp">
                      Temp: {mov.main.temp.toFixed(0) - 273 + " ℃"}
                    </div>
                    <div className="temp">
                      Humidity: {mov.main.humidity + "%"}
                    </div>
                    <img
                      src={getIcon(mov.weather[0].icon)}
                      alt={`weather img: ${props.weather.description}`}
                    />
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
