const API_KEY = "b3ad058bc5daec2b9236aba02e90b21b";
const URL = "https://api.openweathermap.org/data/2.5/weather";

// функции помощники для упрощения fetch функции
const mapWeatherData = (rawCurWeatherData) => {
  const mappedCurWeatherData = {
    city: rawCurWeatherData.name,
    county: rawCurWeatherData.sys.country,

    temp: rawCurWeatherData.main.temp,
    feelsLike: rawCurWeatherData.main.feels_like,
    tempMin: rawCurWeatherData.main.temp_min,
    tempMax: rawCurWeatherData.main.temp_max,

    humidity: rawCurWeatherData.main.humidity,
    pressure: rawCurWeatherData.main.pressure,

    condition: rawCurWeatherData.weather[0].main,
    description: rawCurWeatherData.weather[0].description,

    windSpeed: rawCurWeatherData.wind.speed,
  };

  return mappedCurWeatherData;
};

// forecast mapper
export const mapForecastData = (rawForecast) => {
  // rawForecast.daily — объект с массивами: temperature_2m_max, temperature_2m_min, weathercode, humidity_2m_max, time
  const {
    time,
    temperature_2m_max,
    temperature_2m_min,
    relativehumidity_2m_max,
    weathercode,
  } = rawForecast.daily;

  const forecast = time.map((date, index) => ({
    date, // "2026-02-10"
    dayTemp: temperature_2m_max[index],
    nightTemp: temperature_2m_min[index],
    humidity: relativehumidity_2m_max[index],
    weatherCode: weathercode[index], // потом можешь сопоставить с картинкой/иконкой
  }));

  return forecast;
};

// Fetch функция
export async function getWeatherWithForecast(city) {
  const resCurWeather = await fetch(
    `${URL}?q=${city}&appid=${API_KEY}&units=metric`,
  );

  if (!resCurWeather.ok) throw new Error("City not found");

  const rawCurWeatherData = await resCurWeather.json();

  const mappedCurWeatherData = mapWeatherData(rawCurWeatherData);

  const lat = Number(rawCurWeatherData.coord.lat);
  const lon = Number(rawCurWeatherData.coord.lon); // {lat, lon}

  // недельный прогноз через Open-Meteo с влажностью
  const forecastUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&daily=temperature_2m_max,temperature_2m_min,relativehumidity_2m_max,weathercode` +
    `&forecast_days=7&timezone=Europe/Moscow`;

  const resForecastWeekly = await fetch(forecastUrl);

  if (!resForecastWeekly.ok) throw new Error("Ошибка запроса прогноза погоды");

  const rawForecastWeeklyData = await resForecastWeekly.json();
  const uiForecastWeeklyData = mapForecastData(rawForecastWeeklyData);

  return {
    uiCurWeatherData: mappedCurWeatherData,
    rawForecastWeeklyData: rawForecastWeeklyData,
    uiForecastWeeklyData: uiForecastWeeklyData,
  };
  // uiData - это ключ который увидит App.jsx  при присвоение переменной при деструктуризации
}

// raw - контракт с API
// mapped - контракт с UI
// API не знает, кто что будет логировать
