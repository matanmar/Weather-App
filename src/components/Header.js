import React from "react";
import "../App.css";
import { NavLink, Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div>
      <header className="header">
        <h1 className="link">
          <Link to="/">Weather Forecast🌦</Link>
        </h1>
        <div className="links">
          <NavLink to="/next7days">Next 5 days</NavLink>
          <span className="span">|</span>
          <NavLink to="/volleyball">Volleyball</NavLink>
        </div>
      </header>
    </div>
  );
};

export default Header;
