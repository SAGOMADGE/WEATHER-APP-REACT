import React from "react";
import CurrentWeatherIcon from "./CurrentWeatherIcon.jsx";
import Temperature from "./Temperature.jsx";
import ConditionInfo from "./ConditionInfo.jsx";
import "./CurrentWeather.css";
const CurrentWeather = ({
  city,
  temp,
  feelsLike,
  condition,
  icon,
  isNight,
  t,
}) => {
  return (
    <div className="current-weather">
      <div className="current-weather__location">
        <h2 className="current-weather__city">{city}</h2>
      </div>

      <div className="current-weather__main">
        <CurrentWeatherIcon
          icon={icon}
          condition={condition}
          isNight={isNight}
        />
        <Temperature temp={temp} />
      </div>

      <ConditionInfo condition={condition} feelsLike={feelsLike} t={t} />
    </div>
  );
};

export default CurrentWeather;
