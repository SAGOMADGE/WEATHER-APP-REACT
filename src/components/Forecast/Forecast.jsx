import ForecastDayCard from "./ForecastDayCard.jsx";
import "./forecast.css";

// dateObj - это обьект, созданный через встроенный конструктор Date
// new Date - встроенная функция/ конструктор JS, она создает обьект Date, с него можно получать день недели, месяц, год, часы, минуты
// берем строку "2026-02-12"
// добавляем "T00:00:00" чтобы точно задать полночь
// Создаем обьект Date, с которым можно работать
// dateObj.getDay() - день недели
// Intl.DateTimeFormat(...).format(dateObj) - локализированное сокращение дня
// Сравнения, добавления дней

const Forecast = ({ forecast, t, lang }) => {
  return (
    <section className="forecast">
      {forecast.map((day, index) => {
        const dateObj = new Date(day.date + "T00:00:00"); // 2026-02-12

        const weekday = new Intl.DateTimeFormat(lang, {
          weekday: "short",
        }).format(dateObj); //

        const label = index === 0 ? t.forecast.today : weekday;

        return (
          <ForecastDayCard
            key={day.date}
            label={label}
            dayTemp={day.dayTemp}
            nightTemp={day.nightTemp}
            humidity={day.humidity}
          />
        );
      })}
    </section>
  );
};

export default Forecast;

// Intl.DateTimeFormat(...) → это конструктор, который создаёт объект-форматтер для даты.
// lang - "ru" / "en"
// ru - сокращение дней "пн, вт, ср..."
// { weekday: "short"} - настройка, чтоы мы хотим только день недели в коротком формате
// en - сокращение "Mon, Tue, Wed"
// То есть мы говорим: «Эй, JS, хочу короткий день недели на языке lang».
