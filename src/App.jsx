// App.sx - владеет состояниями и fetch

import { useState, useEffect } from "react";
import { getWeatherByCity } from "./api/api.js";
import { translations } from "./i18n/translations.js";
import WeatherCard from "./components/Weather-card/WeatherCard.jsx";
import Search from "./components/Search/Search.jsx";
import "./styles/App.css";

const App = () => {
  // состояния
  // кто меняет city? → Search
  // кто читает weather? → WeatherCard
  // когда loading = true? → перед запросом
  // когда error? → если fetch упал
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lang, setLang] = useState("ru");

  const t = translations[lang]; // если lang = ru, то t это обьект с значениями элементов страницы на русском языке

  useEffect(() => {
    if (!city) return;
    async function loadWeather() {
      setLoading(true); // состояние загрузки
      setError(null); // сбрасываем ошибки(если были)
      setWeather(null); // очищаем данные перед новым запрос на сервер
      try {
        // данные храним в переменной
        const data = await getWeatherByCity(city); // <-- ожидаемый параметр для api функции который подставляется в URL запрос функции тут, запустится только при получении нового значения city(input обрабатывается в Search, при клике на кнопку поиск, вызывается setCity, который обновляет значение city, что триггерит следующее
        // -> Object.is([city], [city])) (FALSE) -> RERENDER
        setWeather(data); // обновляем стейт погоды города, триггерит перерисовку UI компонента WeatherCard
      } catch (err) {
        // ловим ошибки
        setError(err.message);
      } finally {
        // конечный итог(исход не важен)
        setLoading(false);
      }
    }

    loadWeather(); // запускаем функцию
  }, [city]); // инструкция "реакту" для слежки изменений (dependencies array)

  return (
    // jsx
    <div className="app">
      <h1 className="app-header">Weather App</h1>
      <Search
        city={city}
        setCity={setCity}
        lang={lang}
        setLang={setLang}
        t={t}
      />
      {/* 
        city={city} -> передаем текущее значение города в Search

        onCityChange={setCity} -> передаем функцию которая обновляет состояние App.
        Когда Search вызывает onCityChange(inputValue), на самом деле срабатывает setCity(inputValue) внутри App что триггерит вызов useEffect, что триггерит fetch запрос, что триггерит render Weather Card 
        
        Search не хранит результат fetch, он просто сообщает App, какой город нужно загрузить

        App получает город -> useEffect срабатывает -> fetch данных -> обновление weather - ререндер
        */}
      {/* loading / error */}
      {loading && <p>{t.Loading}</p>}
      {error && <p style={{ color: "red" }}>{t.error}</p>}
      {/* отображение погоды */}
      {weather && !loading && !error && (
        <div>
          <WeatherCard weather={weather} lang={lang} t={t} />
          {/*  */}
        </div>
      )}
    </div>
  );
};

export default App;
