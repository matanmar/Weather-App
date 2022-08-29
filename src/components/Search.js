import React, { useRef } from "react";

const Search = (props) => {
  const cityNameRef = useRef("");

  // getting the function to fetch the city weather from App
  const submitCityHandler = (e) => {
    e.preventDefault();

    props.cityWeather(cityNameRef.current.value);
  };

  return (
    <form className="search">
      <input type="text" placeholder="Enter city name..." ref={cityNameRef} />
      <button className="button" type="submit" onClick={submitCityHandler}>
        Search
      </button>
    </form>
  );
};

export default Search;
