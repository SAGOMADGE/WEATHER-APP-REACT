type RawForecastResponse = {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    relative_humidity_2m_max: number[];
    weathercode: number[];
    uv_index_max: number[];
  };
};

type Conditions = "Clouds" | "Mist" | "Rain" | "Snow" | "Storm" | "Clear";

type ForecastDay = {
  date: string;
  dayTemp: number;
  nightTemp: number;
  humidity: number;
  weatherCode: number;
  uvIndex: number;
  condition: Conditions;
};

const mapForecastData = (
  rawForecast: RawForecastResponse,
  interpretWmoCode: (code: number) => Conditions,
): ForecastDay[] => {
  const {
    time,
    temperature_2m_max,
    temperature_2m_min,
    relative_humidity_2m_max,
    weathercode,
    uv_index_max,
  } = rawForecast.daily;

  const forecast = time.map((date, index) => ({
    date, // "2026-02-10" <--
    dayTemp: temperature_2m_max[index],
    nightTemp: temperature_2m_min[index],
    humidity: relative_humidity_2m_max[index],
    weatherCode: weathercode[index],
    uvIndex: uv_index_max[index],
    condition: interpretWmoCode(weathercode[index]),
  }));

  return forecast;
};

export default mapForecastData;
