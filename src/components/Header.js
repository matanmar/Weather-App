import React from "react";
import "../App.css";
import { NavLink, Link } from "react-router-dom";
import { FaVolleyballBall } from "react-icons/fa";
import { TiWeatherPartlySunny } from "react-icons/ti";

const Header = (props) => {
  return (
    <div>
      <header className="header">
        <h1 className="link">
          <Link to="/">
            Weather Forecast
            <TiWeatherPartlySunny />
          </Link>
        </h1>
        <div className="links">
          <NavLink to="/next5days">Next 5 days</NavLink>
          <span className="span">|</span>
          <NavLink to="/volleyball">
            Volleyball <FaVolleyballBall />
          </NavLink>
        </div>
      </header>
    </div>
  );
};

export default Header;
