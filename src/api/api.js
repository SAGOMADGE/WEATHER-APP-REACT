const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const URL_CUR_WEATHER = "https://api.openweathermap.org/data/2.5/weather";

console.log("API KEY:", import.meta.env.VITE_WEATHER_API_KEY);

//////////////////////////////////
// === Мапперы ==
//////////////////////////////////

// --- Маппер погоды на день
const mapCurrentWeather = (rawCurWeatherData) => {
  const temp = rawCurWeatherData.main.temp;
  const humidity = rawCurWeatherData.main.humidity;

  const mappedCurWeatherData = {
    city: rawCurWeatherData.name,
    // country: rawCurWeatherData.sys.country,

    temp,
    feelsLike: rawCurWeatherData.main.feels_like,
    tempMin: rawCurWeatherData.main.temp_min,
    tempMax: rawCurWeatherData.main.temp_max,

    humidity,
    pressure: rawCurWeatherData.main.pressure,

    condition: rawCurWeatherData.weather[0].main,
    description: rawCurWeatherData.weather[0].description,

    windSpeed: rawCurWeatherData.wind.speed,
    visibility: rawCurWeatherData.visibility, // в метрах;

    dewPoint: +(temp - (100 - humidity) / 5).toFixed(1),
  };

  // есть ветер, давление, влажность, видимость и точка росы

  return mappedCurWeatherData;
};

// --- Маппер погоды на неделю ---
export const mapForecastData = (rawForecast) => {
  const {
    time,
    temperature_2m_max,
    temperature_2m_min,
    relative_humidity_2m_max,
    weathercode,
    uv_index_max,
  } = rawForecast.daily;

  /* 👉 Один индекс = один день*/
  const forecast = time.map((date, index) => ({
    date, // "2026-02-10" <--
    dayTemp: temperature_2m_max[index],
    nightTemp: temperature_2m_min[index],
    humidity: relative_humidity_2m_max[index],
    weatherCode: weathercode[index], // потом можешь сопоставить с картинкой/иконкой
    uvIndex: uv_index_max[index],
  }));

  return forecast;
};

//////////////////////////////////
// Fetch function
//////////////////////////////////
export default async function getWeatherWithForecast(city) {
  // res погоды на день
  const resCurWeather = await fetch(
    `${URL_CUR_WEATHER}?q=${city}&appid=${API_KEY}&units=metric`,
  );

  if (!resCurWeather.ok) throw new Error("City not found");

  // парсим res погоды на день
  const rawCurWeatherData = await resCurWeather.json();

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
  const uiForecastWeeklyData = mapForecastData(rawForecastWeeklyData);

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
