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
    <div className="currentWeatherContainer">
      <div className="location">
        <h2>{city}</h2>
        {/* <h2>{country}</h2> */}
      </div>

      <CurrentWeatherIcon icon={icon} condition={condition} />
      <div className="WeatherInfo">
        <Temperature temp={temp} />
        <ConditionInfo condition={condition} feelsLike={feelsLike} t={t} />
      </div>
    </div>
  );
};

export default CurrentWeather;

// const normalized = condition.toLowerCase();
