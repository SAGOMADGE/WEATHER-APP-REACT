import { getWeatherIcon } from "../../utils/getWeatherIcon.js";

import type { Conditions } from "../../types/weather.types.js";
import type { Translations } from "../../i18n/translations.js";

type ForecastDayCardProps = {
  label: string;
  dayTemp: number;
  nightTemp: number;
  condition: Conditions;
  t: Translations;
};

const ForecastDayCard = ({
  label,
  dayTemp,
  nightTemp,
  condition,
  t,
}: ForecastDayCardProps) => {
  const iconSrc = getWeatherIcon(condition);

  return (
    <li className="forecast-item">
      <span className="day-label">{label}</span>

      <div className="condition-wrapper">
        <img
          src={iconSrc}
          alt={condition}
          className="weather-forecast__icon"
        ></img>
        <span className="condition-text">
          {t.current.conditions[condition] || condition}
        </span>
      </div>

      <div className="temp-wrapper">
        <span className="high">{Math.round(dayTemp)}</span>

        <span className="seperator">/</span>

        <span className="low">{Math.round(nightTemp)}</span>
      </div>
    </li>
  );
};

export default ForecastDayCard;
