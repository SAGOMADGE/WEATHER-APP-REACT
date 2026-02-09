// WeatherCard.jsx - чистый компонент отображения(глупый UI)
import { translations } from "../../i18n/translations.js";

const WeatherCard = ({ weather, lang, t }) => {
  if (!weather) return null;

  const translatedCondition =
    translations[lang][weather.conditions] ?? weather.conditions;

  // API → возвращает КОДЫ. UI → решает, как эти коды показать. "cloudy" — это. данные"Облачно" — это представление

  return (
    <div className="weather-card">
      <h2 className="weather-card-header">{weather.city}</h2>
      <p className="weather-card-temp">
        {t.temperature}: {weather.temp}°C
      </p>
      <p className="weather-card-cond">
        {t.conditions}: {translatedCondition}
      </p>
    </div>
  );
};

export default WeatherCard;
