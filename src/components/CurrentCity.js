import React, { Fragment } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

// renders the weather detailes
const CurrentCity = (props) => {
  return (
    <Fragment>
      {!props.error.hasError && (
        <div className="homepage">
          <div className="weather-container">
            {props.isLoading && <LoadingSpinner />}
            {!props.isLoading && (
              <Fragment>
                <div>{props.weather.location}</div>
                <br />
                <div>Current temp: {props.weather.temp + " ℃"} </div>
                <div>Humidity: {props.weather.humidity + "%"} </div>
                <div>Wind: {+props.weather.wind * 3.6 + " km/hr"}</div>
                <div>{props.weather.description}</div>
              </Fragment>
            )}
          </div>
        </div>
      )}
      {props.error.hasError && (
        <p className="error">{`${props.error.errorMessage}`}</p>
      )}
    </Fragment>
  );
};

export default CurrentCity;
