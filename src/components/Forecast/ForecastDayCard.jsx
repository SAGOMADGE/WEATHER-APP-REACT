import { getWeatherIcon } from "../../utils/getWeatherIcon.js";

const ForecastDayCard = ({ label, dayTemp, nightTemp, condition, t }) => {
  // Получаем путь к SVG на основе текста состояния
  const iconSrc = getWeatherIcon(condition);

  return (
    <li className="forecast-item">
      {/* левая часть: День недели*/}
      <span className="day-label">{label}</span>

      {/* Центральная часть: Состояние (Иконка + Текст) */}
      <div className="condition-wrapper">
        {/* Правая часть: Температуры */}
        <img
          src={iconSrc}
          alt={condition}
          className="weather-forecast__icon"
        ></img>
        <span className="condition-text">
          {t?.current?.conditions?.[condition] || condition}
        </span>
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
