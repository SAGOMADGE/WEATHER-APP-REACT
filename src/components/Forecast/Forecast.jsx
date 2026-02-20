import ForecastDayCard from "./ForecastDayCard.jsx";
import "./Forecast.css";

const formatForecastDate = (dateStr, lang) => {
  if (!dateStr) return "";

  const dateObj = new Date(dateStr + "T00:00:00");

  const formatter = new Intl.DateTimeFormat(lang, {
    weekday: "short",
    day: "numeric",
  });

  const formatted = formatter.format(dateObj);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const Forecast = ({ forecast, t, lang }) => {
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
            icon={day.icon}
            t={t}
          />
        );
      })}
    </ul>
  );
};

export default Forecast;

// Intl.DateTimeFormat(...) → это конструктор, который создаёт объект-форматтер для даты.
// lang - "ru" / "en"
// ru - сокращение дней "пн, вт, ср..."
// { weekday: "short"} - настройка, чтоы мы хотим только день недели в коротком формате
// en - сокращение "Mon, Tue, Wed"
// То есть мы говорим: «Эй, JS, хочу короткий день недели на языке lang».

// dateObj - это обьект, созданный через встроенный конструктор Date
// new Date - встроенная функция/ конструктор JS, она создает обьект Date, с него можно получать день недели, месяц, год, часы, минуты
// берем строку "2026-02-12"
// добавляем "T00:00:00" чтобы точно задать полночь
// Создаем обьект Date, с которым можно работать
// dateObj.getDay() - день недели
// Intl.DateTimeFormat(...).format(dateObj) - локализированное сокращение дня
// Сравнения, добавления дней
