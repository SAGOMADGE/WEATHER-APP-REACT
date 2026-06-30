import interpretWmoCode from "../utils/interpretWmoCode";
import mapForecastData from "../utils/mapForecastData";
import mapCurrentWeather from "../utils/mapCurrentWeather";
// guards
import { isRawCurrentWeather } from "../utils/guards/currentWeather.guard";
import { isRawForecast } from "../utils/guards/forecast.guard";
// types
import type { WeatherResult } from "../types/weather.types";
import type { WeatherError } from "../types/weather.types";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const URL_CUR_WEATHER = "https://api.openweathermap.org/data/2.5/weather";

//////////////////////////////////
// Fetch function
//////////////////////////////////
export default async function getWeatherWithForecast(
  city: string,
  lang: "ru" | "en",
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

  const rawCurWeatherData: unknown = await resCurWeather.json();

  if (!isRawCurrentWeather(rawCurWeatherData)) {
    throw new Error("Invalid OpenWeather API response");
  }

  const mappedCurWeatherData = mapCurrentWeather(rawCurWeatherData);

  const { lat, lon } = rawCurWeatherData.coord;

  const forecastUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,weathercode,uv_index_max` +
    `&forecast_days=7&timezone=auto`;

  const resForecastWeekly = await fetch(forecastUrl);

  if (!resForecastWeekly.ok) {
    throw new Error("ошибка статуса OPEN METEO");
  }

  const rawForecastWeeklyData: unknown = await resForecastWeekly.json();

  if (!isRawForecast(rawForecastWeeklyData)) {
    throw new Error("Invalid OPEN METEO API Response");
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
