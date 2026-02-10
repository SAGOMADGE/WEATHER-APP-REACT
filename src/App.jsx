// App.sx - владеет состояниями и fetch

import { useState, useEffect } from "react";
import { getWeatherWithForecast } from "./api/api.js";
import { translations } from "./i18n/translations.js";
import WeatherCard from "./components/Weather-card/WeatherCard.jsx";
import Search from "./components/Search/Search.jsx";
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

  {
    loading && <p>{t.Loading}</p>;
  }

  {
    error && <p style={{ color: "red" }}>{t.error}</p>;
  }

  return (
    // jsx
    <div className="app">
      {/* Header */}
      {weather && <Header city={weather.city} country={weather.country} />}

      {/* Main Weather */}
      {weather && (
        <CurrentWeather
          temp={weather.temp}
          conditionText={weather.description}
          feelsLike={weather.feelsLike}
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
