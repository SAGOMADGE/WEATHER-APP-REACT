// App.sx - владеет состояниями и fetch

// Hooks import
import { useState, useEffect } from "react";
// Components import
import Header from "./components/Header/Header.jsx";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather.jsx";
import { translations } from "./i18n/translations.js";
// Api import
import getWeatherWithForecast from "../src/api/api.js";
import Stats from "./components/Stats/Stats.jsx";
import Forecast from "./components/Forecast/Forecast.jsx";
// CSS import
import "./styles/App.css";

// состояния
// кто меняет city? → Search
// кто читает weather? → WeatherCard
// когда loading = true? → перед запросом
// когда error? → если fetch упал

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lang, setLang] = useState("ru");

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
    <div className="app">
      {/* Header */}
      {loading && <p>{t.Loading}</p>}
      {error && <p style={{ color: "red" }}>{t.error}</p>}
      {/* weater Header*/}

      <Header
        city={city} // город
        setCity={setCity} // смена города
        lang={lang} // тек язык
        setLang={setLang}
        t={t}
      />

      {/* Main Weather */}

      {weather && (
        <CurrentWeather
          city={weather.city}
          country={weather.country}
          temp={weather.temp}
          feelsLike={weather.feelsLike}
          condition={weather.condition}
          icon={weather.condition}
        />
      )}
      {/* Addition stats*/}

      {weather && (
        <Stats
          wind={weather.windSpeed}
          pressure={weather.pressure}
          humidity={weather.humidity}
        />
      )}
      {/* Weekly forecast */}
      {forecast.length > 0 && <Forecast forecast={forecast} />}
    </div>
  );
};

export default App;
