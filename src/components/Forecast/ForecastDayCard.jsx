import { getWeatherIcon } from "../../utils/getWeatherIcon.js";

const ForecastDayCard = ({ label, dayTemp, nightTemp, condition }) => {
  // Получаем путь к SVG на основе текста состояния
  const iconSrc = getWeatherIcon(condition);

  return (
    <li className="forecast-item">
      {/* TITLE */}
      <span className="day-label">{label}</span>

      {/* CONDITION WRAPPER */}
      <div className="condition-wrapper">
        {/* img + text */}
        <img src={iconSrc} alt={condition} className="weather-icon"></img>
        <span className="condition-text">{condition}</span>
      </div>

      {/* TEMP WRAPPER */}
      <div className="temp-wrapper">
        <span className="high">{Math.round(dayTemp)}</span>

        <span className="seperator">/</span>

        <span className="low">{Math.round(nightTemp)}</span>
      </div>
    </li>
  );
};

export default ForecastDayCard;
