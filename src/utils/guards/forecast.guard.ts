import { RawForecastResponse } from "../../types/weather.types";
import { isObject } from "../helpers/isObject";
import { isStringArray } from "../helpers/isStringArray";
import { isNumberArray } from "../helpers/isNumberArray";

export function isRawForecast(data: unknown): data is RawForecastResponse {
  if (!isObject(data)) return false;

  if (!("daily" in data)) return false;

  const daily = data.daily;

  if (!isObject(daily)) return false;

  const {
    time,
    temperature_2m_max,
    temperature_2m_min,
    relative_humidity_2m_max,
    weathercode,
    uv_index_max,
  } = daily;

  return (
    isStringArray(time) &&
    isNumberArray(temperature_2m_max) &&
    isNumberArray(temperature_2m_min) &&
    isNumberArray(relative_humidity_2m_max) &&
    isNumberArray(weathercode) &&
    isNumberArray(uv_index_max)
  );
}
