import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import CityNameContextProvider from "./context/city-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CityNameContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CityNameContextProvider>
);
