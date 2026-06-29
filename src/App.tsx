// Hooks import
import { useState, useEffect } from "react";

// Components import
import Header from "./components/Header/Header.js";
import StatusMessage from "./components/StatusMessage/StatusMessage.js";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather.js";
import { translations } from "./i18n/translations.js";
// Api import
import getWeatherWithForecast from "./api/api.js";
import Stats from "./components/WeatherStats/Stats.js";
import Forecast from "./components/Forecast/Forecast.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
// CSS import
import "./styles/App.css";

import type {
  MappedWeather,
  ForecastDay,
  WeatherError,
} from "./types/weather.types.js";

const App = () => {
  const [city, setCity] = useLocalStorage<string>("city", "Москва");
  const [weather, setWeather] = useState<MappedWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useLocalStorage<string>("lang", "ru");
  const [isDark, setIsDark] = useLocalStorage<boolean>("theme", false);

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
      const weatherErr = err as WeatherError;
      if (weatherErr.code == "CITY_NOT_FOUND") {
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
            temp={weather.temp}
            feelsLike={weather.feelsLike}
            condition={weather.condition}
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
