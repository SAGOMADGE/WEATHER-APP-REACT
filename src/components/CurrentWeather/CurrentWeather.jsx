import React from "react";
import CurrentWeatherIcon from "./CurrentWeatherIcon.jsx";
import Temperature from "./Temperature.jsx";
import ConditionInfo from "./ConditionInfo.jsx";

const CurrentWeather = ({
  city,
  country,
  temp,
  feelsLike,
  condition,
  icon,
}) => {
  return (
    <div className="currentWeatherContainer">
      <div className="location">
        <h2>{city}</h2>
        <h2>{country}</h2>
      </div>

      <CurrentWeatherIcon icon={icon} condition={condition} />
      <div className="WeatherInfo">
        <Temperature temp={temp} />
        <ConditionInfo condition={condition} feelsLike={feelsLike} />
      </div>
    </div>
  );
};

export default CurrentWeather;
