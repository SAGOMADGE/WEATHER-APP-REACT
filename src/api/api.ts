import interpretWmoCode from "../utils/interpretWmoCode";
import mapForecastData from "../utils/mapForecastData";
import mapCurrentWeather from "../utils/mapCurrentWeather";
import type { WeatherResult } from "../types/weather.types";
import type { WeatherError } from "../types/weather.types";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const URL_CUR_WEATHER = "https://api.openweathermap.org/data/2.5/weather";

//////////////////////////////////
// Fetch function
//////////////////////////////////
export default async function getWeatherWithForecast(
  city: string,
  lang: string,
): Promise<WeatherResult> {
  const resCurWeather = await fetch(
    `${URL_CUR_WEATHER}?q=${city}&appid=${API_KEY}&units=metric&lang=${lang}`,
  );

  if (!resCurWeather.ok) {
    const error = new Error("Weather fetching failed") as WeatherError;
    error.code =
      resCurWeather.status === 404 ? "CITY_NOT_FOUND" : "NETWORK_ERROR";
    throw error;
  }

  const rawCurWeatherData = await resCurWeather.json();

  const mappedCurWeatherData = mapCurrentWeather(rawCurWeatherData);

  const lat = Number(rawCurWeatherData.coord.lat);
  const lon = Number(rawCurWeatherData.coord.lon); // {lat, lon}

  const forecastUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,weathercode,uv_index_max` +
    `&forecast_days=7&timezone=auto`;

  const resForecastWeekly = await fetch(forecastUrl);

  const rawForecastWeeklyData = await resForecastWeekly.json();

  if (!resForecastWeekly.ok) {
    throw new Error("ошибка запроса прогноза погоды");
  }

  const uiForecastWeeklyData = mapForecastData(
    rawForecastWeeklyData,
    interpretWmoCode,
  );

  return {
    uiCurWeatherData: mappedCurWeatherData,

    uiForecastWeeklyData: uiForecastWeeklyData,
  };
}
