// App.sx - владеет состояниями и fetch

// Hooks import
import { useState, useEffect } from "react";

// Components import
import Header from "./components/Header/Header.jsx";
import StatusMessage from "./components/StatusMessage/StatusMessage.jsx";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather.jsx";
import { translations } from "./i18n/translations.js";
// Api import
import getWeatherWithForecast from "../src/api/api.js";
import Stats from "./components/WeatherStats/Stats.jsx";
import Forecast from "./components/Forecast/Forecast.jsx";
// CSS import
import "./styles/App.css";

/* App.jsx — это мозг.
Он:
хранит state (city, weather, forecast, lang)
запускает fetch
решает, что рендерить
передаёт данные вниз
App — это умный компонент (container component).
Он думает.
Остальные — отображают. */

// const DEFAULT_CITY = "Sukhumi"

const App = () => {
  const [city, setCity] = useState("Очамчира");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lang, setLang] = useState("ru");
  const [isDark, setIsDark] = useState(true);

  const t = translations[lang]; // если lang = ru, то t это обьект с значениями элементов страницы на русском языке

  const loadWeather = async () => {
    if (!city) return;

    setisLoading(true);
    setError(null);
    try {
      // данные храним в переменной
      const { uiCurWeatherData, uiForecastWeeklyData } =
        await getWeatherWithForecast(city, lang);

      // текущая погода
      setWeather(uiCurWeatherData);
      // прогноз на неделю
      setForecast(uiForecastWeeklyData);
    } catch (err) {
      // Мы поймали системную ошибку (err.message там "city not found")
      console.error(err);
      // Проверяем наш кастомный код
      if (err.code === "CITY_NOT_FOUND") {
        setError(t.errors.notFound);
      } else {
        setError(t.errors.network);
      }
    } finally {
      // конечный итог(исход не важен)
      setisLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, [city, lang]);

  // UseEffect для черной темы
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [isDark]);

  return (
    // jsx
    <div className="app">
      {/* BLOCK 1: weather Header*/}
      <Header
        city={city} // город
        setCity={setCity} // смена города
        isDark={isDark}
        setIsDark={setIsDark}
        lang={lang} // тек язык
        setLang={setLang}
        t={t}
      />

      {/* 1.Если идет загрузка - показываем только статус загрузки (позже скелетон) */}
      {isLoading && (
        <StatusMessage type="loading" message={t.ui.loading} icon="⏳" t={t} />
      )}

      {/* 2. Если есть ошибка - показываем статус ошибки */}
      {error && !isLoading && (
        <StatusMessage
          type="error"
          message={error}
          icon="⚠️"
          t={t}
          onRetry={loadWeather}
        />
      )}

      {/* 3. Если нет ошибки и загрузки - показываем контент пользователю */}
      {!isLoading && !error && weather && (
        <>
          <CurrentWeather
            city={weather.city}
            country={weather.country}
            temp={weather.temp}
            feelsLike={weather.feelsLike}
            condition={weather.condition}
            icon={weather.condition}
            t={t}
          />

          {/* BLOCK 3: Addition stats*/}

          <Stats
            wind={weather.windSpeed}
            pressure={weather.pressure}
            humidity={weather.humidity}
            visibility={weather.visibility}
            dewPoint={weather.dewPoint}
            uvIndex={forecast[0]?.uvIndex} // Берем uvIndex из первого дня
            t={t}
          />

          {/* BLOCK 4: Weekly forecast */}

          {forecast.length > 0 && (
            <div className="forecast">
              <h2 className=" forecast-title">{t.forecast.weeklyForecast}</h2>

              <Forecast forecast={forecast} t={t} lang={lang} />
            </div>
          )}
        </>
      )}

      {/* BLOCK 2. Current Weather */}
    </div>
  );
};

export default App;
