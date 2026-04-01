import CurrentWeatherIcon from "./CurrentWeatherIcon";
import Temperature from "./Temperature.jsx";
import ConditionInfo from "./ConditionInfo.jsx";
import "./CurrentWeather.css";
import type { Conditions } from "../../types/weather.types";
import type { Translations } from "../../i18n/translations";

type CurrentWeatherProps = {
  city: string;
  temp: number;
  feelsLike: number;
  condition: Conditions;
  isNight: boolean;
  t: Translations;
};

const CurrentWeather = ({
  city,
  temp,
  feelsLike,
  condition,
  isNight,
  t,
}: CurrentWeatherProps) => {
  return (
    <div className="current-weather">
      <div className="current-weather__location">
        <h2 className="current-weather__city">{city}</h2>
      </div>

      <div className="current-weather__main">
        <CurrentWeatherIcon condition={condition} isNight={isNight} />
        <Temperature temp={temp} />
      </div>

      <ConditionInfo condition={condition} feelsLike={feelsLike} t={t} />
    </div>
  );
};

export default CurrentWeather;
