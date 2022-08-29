import React, { Fragment, useEffect, useState } from "react";
import VolleyballChartLine from "./VolleyballChart";
import LoadingSpinner from "../UI/LoadingSpinner";

const Volleyball = (props) => {
  const [weekWeather, setWeekWeather] = useState({});
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);

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

        const filtered = weatherData.list.filter((mov) =>
          mov.dt_txt.includes("18:00:00")
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

  return (
    <Fragment>
      <div className="daysGapFromTop">
        {loading && <LoadingSpinner />}
        {check && (
          <Fragment>
            <h2 className="city"> Beach Volley ball good weather days (6PM)</h2>
            <p className="legened">{`🟩-good day (wind speed < 17 km/hr) 🟥-bad day`}</p>
            <VolleyballChartLine data={weekWeather} />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Volleyball;
