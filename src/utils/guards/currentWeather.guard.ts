import { RawWeatherResponse } from "../../types/weather.types";
import { isNumber } from "../helpers/isNumber";

import { isObject } from "../helpers/isObject";
import { isString } from "../helpers/isString";

export function isRawCurrentWeather(data: unknown): data is RawWeatherResponse {
  if (!isObject(data)) return false;

  if (
    !("main" in data) ||
    !("weather" in data) ||
    !("wind" in data) ||
    !("sys" in data) ||
    !("coord" in data)
  ) {
    return false;
  }

  const main = data.main;
  const weather = data.weather;
  const wind = data.wind;
  const sys = data.sys;
  const coord = data.coord;

  if (
    !isObject(main) ||
    !isObject(wind) ||
    !isObject(sys) ||
    !isObject(coord)
  ) {
    return false;
  }

  if (!Array.isArray(weather) || weather.length === 0) {
    return false;
  }

  const firstWeather = weather[0];

  if (!isObject(firstWeather)) return false;

  return (
    isString(data.name) &&
    isNumber(data.visibility) &&
    isNumber(data.dt) &&
    isNumber(main.temp) &&
    isNumber(main.feels_like) &&
    isNumber(main.temp_min) &&
    isNumber(main.temp_max) &&
    isNumber(main.humidity) &&
    isNumber(main.pressure) &&
    isString(firstWeather.main) &&
    isString(firstWeather.description) &&
    isNumber(wind.speed) &&
    isNumber(sys.sunrise) &&
    isNumber(sys.sunset) &&
    isNumber(coord.lat) &&
    isNumber(coord.lon)
  );
}
