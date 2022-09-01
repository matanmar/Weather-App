import React, { useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";

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
        <BiSearchAlt style={{ fontSize: "xx-large" }} />
      </button>
    </form>
  );
};

export default Search;
