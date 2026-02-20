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

const App = () => {
  const [city, setCity] = useState("Очамчира");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lang, setLang] = useState("ru");
  const [isDark, setIsDark] = useState(true);

  const t = translations[lang];

  const loadWeather = async () => {
    if (!city) return;

    setIsLoading(true);
    setError(null);
    try {
      const { uiCurWeatherData, uiForecastWeeklyData } =
        await getWeatherWithForecast(city, lang);

      setWeather(uiCurWeatherData);
      setForecast(uiForecastWeeklyData);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error(err);
      }
      if (err.code === "CITY_NOT_FOUND") {
        setError(t.errors.notFound);
      } else {
        setError(t.errors.network);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, [city, lang]);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [isDark]);

  return (
    <div className="app">
      <Header
        city={city}
        setCity={setCity}
        isDark={isDark}
        setIsDark={setIsDark}
        lang={lang}
        setLang={setLang}
        t={t}
      />

      {isLoading && (
        <StatusMessage type="loading" message={t.ui.loading} icon="⏳" t={t} />
      )}

      {error && !isLoading && (
        <StatusMessage
          type="error"
          message={error}
          icon="⚠️"
          t={t}
          onRetry={loadWeather}
        />
      )}

      {!isLoading && !error && weather && (
        <>
          <CurrentWeather
            city={weather.city}
            country={weather.country}
            temp={weather.temp}
            feelsLike={weather.feelsLike}
            condition={weather.condition}
            icon={weather.condition}
            isNight={weather.isNight}
            t={t}
          />

          <Stats
            wind={weather.windSpeed}
            pressure={weather.pressure}
            humidity={weather.humidity}
            visibility={weather.visibility}
            dewPoint={weather.dewPoint}
            uvIndex={forecast[0]?.uvIndex}
            t={t}
          />

          {forecast.length > 0 && (
            <div className="forecast">
              <h2 className=" forecast-title">{t.forecast.weeklyForecast}</h2>

              <Forecast forecast={forecast} t={t} lang={lang} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
