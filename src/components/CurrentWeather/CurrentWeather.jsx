import React from "react";
import CurrentWeatherIcon from "./CurrentWeatherIcon.jsx";
import Temperature from "./Temperature.jsx";
import ConditionInfo from "./ConditionInfo.jsx";

const CurrentWeather = ({
  city,
  // country,
  temp,
  feelsLike,
  condition,
  icon,
  t,
}) => {
  return (
    <div className="current-weather">
      <div className="current-weather__location">
        <h2 className="current-weather__city">{city}</h2>
      </div>

      <div className="current-weather__main">
        <CurrentWeatherIcon icon={icon} condition={condition} />
        <Temperature temp={temp} />
      </div>

      <ConditionInfo condition={condition} feelsLike={feelsLike} t={t} />
    </div>
  );
};

export default CurrentWeather;

// const normalized = condition.toLowerCase();
