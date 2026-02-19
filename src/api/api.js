import interpretWmoCode from "../utils/interpretWmoCode.js";
import mapForecastData from "../utils/mapForecastData.js";
import mapCurrentWeather from "../utils/mapCurrentWeather.js";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const URL_CUR_WEATHER = "https://api.openweathermap.org/data/2.5/weather";

console.log("API KEY:", import.meta.env.VITE_WEATHER_API_KEY);

//////////////////////////////////
// Fetch function
//////////////////////////////////
export default async function getWeatherWithForecast(city, lang) {
  // res погоды на день
  const resCurWeather = await fetch(
    `${URL_CUR_WEATHER}?q=${city}&appid=${API_KEY}&units=metric&lang=${lang}`,
  );
  п;
  if (!resCurWeather.ok) {
    // Создаем ошибку, но добавляем ей свойство code
    const error = new Error("Weather fetching failed");
    error.code =
      resCurWeather.status === 404 ? "CITY_NOT_FOUND" : "NETWORK_ERROR";
    throw error;
  }

  // парсим res погоды на день
  const rawCurWeatherData = await resCurWeather.json();

  console.log(rawCurWeatherData);

  // получаем UI данные погоды на день через функцию mappedCurWeatherData которая ждет rawCurWeatherData
  const mappedCurWeatherData = mapCurrentWeather(rawCurWeatherData);

  // координаты для феча, данные которых используются в api запросе  прогноза на неделю
  const lat = Number(rawCurWeatherData.coord.lat);
  const lon = Number(rawCurWeatherData.coord.lon); // {lat, lon}

  // === НЕДЕЛЬНЫЙ ПРОГНОЗ  Open-Meteo === ///
  // ---ссылка хранится в переменной для удобства и безопасности --- //
  const forecastUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,weathercode,uv_index_max` +
    `&forecast_days=7&timezone=auto`;

  // res прогноза на неделю
  const resForecastWeekly = await fetch(forecastUrl);

  // парсим res прогноза на неделю
  const rawForecastWeeklyData = await resForecastWeekly.json();

  if (!resForecastWeekly.ok) {
    throw new Error("ошибка запроса прогноза погоды");
  }

  // филтруем данные для через маппер mapForecastData, который ожидает rawForecastWeeklyData
  const uiForecastWeeklyData = mapForecastData(
    rawForecastWeeklyData,
    interpretWmoCode,
  );

  console.log(uiForecastWeeklyData);

  // возвращаем ключи с ссылками на UI данные для страницы
  return {
    // ui погода на день
    uiCurWeatherData: mappedCurWeatherData,

    // ui обработанные данные погоды на неделю
    uiForecastWeeklyData: uiForecastWeeklyData,
  };
  // uiData - это ключ который увидит App.jsx  при присвоение переменной при деструктуризации
}

/* Что происходит

App.jsx управляет состоянием weather и forecast.

Header получает только текстовые данные (город и страна).

CurrentWeather получает температуру, описание и код иконки.

Stats получает цифры: ветер, давление, влажность.

Forecast получает массив дней — внутри него ты можешь делать map и рендерить каждый день через ForecastDayCard. */
