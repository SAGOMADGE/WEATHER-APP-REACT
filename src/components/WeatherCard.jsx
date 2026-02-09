// WeatherCard.jsx - чистый компонент отображения(глупый UI)
import { translations } from "../i18n/translations.js";

const WeatherCard = ({ weather, lang, t }) => {
  if (!weather) return null;

  const translatedCondition =
    translations[lang][weather.conditions] ?? weather.conditions;

  return (
    <div>
      <h2>{weather.city}</h2>
      <p>
        {t.temperature}: {weather.temp}°C
      </p>
      <p>
        {t.conditions}: {translatedCondition}
      </p>
    </div>
  );
};

export default WeatherCard;
