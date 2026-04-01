import ForecastDayCard from "./ForecastDayCard.jsx";
import "./Forecast.css";

import type { Conditions } from "../../types/weather.types.js";
import type { Translations } from "../../i18n/translations.js";

type ForecastDay = {
  date: string;
  dayTemp: number;
  nightTemp: number;
  condition: Conditions;
};

type ForecastProps = {
  forecast: ForecastDay[];
  t: Translations;
  lang: string;
};

const formatForecastDate = (dateStr: string, lang: string) => {
  if (!dateStr) return "";

  const dateObj = new Date(dateStr + "T00:00:00");

  const formatter = new Intl.DateTimeFormat(lang, {
    weekday: "short",
    day: "numeric",
  });

  const formatted = formatter.format(dateObj);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const Forecast = ({ forecast, t, lang }: ForecastProps) => {
  return (
    <ul className="forecast-list">
      {forecast.map((day, index) => {
        const label =
          index === 0 ? t.forecast.today : formatForecastDate(day.date, lang);

        return (
          <ForecastDayCard
            key={day.date}
            label={label}
            dayTemp={day.dayTemp}
            nightTemp={day.nightTemp}
            condition={day.condition}
            t={t}
          />
        );
      })}
    </ul>
  );
};

export default Forecast;
