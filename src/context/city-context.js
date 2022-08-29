import React, { useState } from "react";

export const CityNameContext = React.createContext();

const CityNameContextProvider = (props) => {
  const [city, setCity] = useState({});

  const updateCity = (cityWeather) => {
    setCity({ ...cityWeather });
  };

  return (
    <CityNameContext.Provider value={city} updateCity={updateCity}>
      {props.children}
    </CityNameContext.Provider>
  );
};

export default CityNameContextProvider;
