// App.sx - владеет состояниями и fetch

// Hooks import
import { useState, useEffect } from "react";

// Components import
import Header from "./components/Header/Header.jsx";
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

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lang, setLang] = useState("ru");
  const [isDark, setIsDark] = useState(false);

  const t = translations[lang]; // если lang = ru, то t это обьект с значениями элементов страницы на русском языке

  useEffect(() => {
    if (!city) return;

    const loadWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        // данные храним в переменной
        const { uiCurWeatherData, uiForecastWeeklyData } =
          await getWeatherWithForecast(city);

        // текущая погода
        setWeather(uiCurWeatherData);
        // прогноз на неделю
        setForecast(uiForecastWeeklyData);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        // конечный итог(исход не важен)
        setLoading(false);
      }
    };

    loadWeather(); // запускаем функцию
  }, [city]); // инструкция "реакту" для слежки изменений (dependencies array)

  return (
    // jsx
    <div className={`app ${isDark ? "dark-theme" : "light-theme"}`}>
      {/* Loading or error states */}
      {loading && <p>{t.ui.loading}</p>}
      {error && <p style={{ color: "red" }}>{t.ui.error}</p>}

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

      {/* BLOCK 2. Current Weather */}

      {weather && (
        <CurrentWeather
          city={weather.city}
          country={weather.country}
          temp={weather.temp}
          feelsLike={weather.feelsLike}
          condition={weather.condition}
          icon={weather.condition}
          t={t}
        />
      )}

      {/* BLOCK 3: Addition stats*/}

      {weather && (
        <Stats
          wind={weather.windSpeed}
          pressure={weather.pressure}
          humidity={weather.humidity}
          visibility={weather.visibility}
          dewPoint={weather.dewPoint}
          uvIndex={forecast[0]?.uvIndex} // Берем uvIndex из первого дня
          t={t}
        />
      )}

      {/* BLOCK 4: Weekly forecast */}

      <div className="forecast">
        <h2 className=" forecast-title">{t.forecast.weeklyForecast}</h2>
        {forecast.length > 0 && (
          <Forecast forecast={forecast} t={t} lang={lang} />
        )}
      </div>
    </div>
  );
};

export default App;
