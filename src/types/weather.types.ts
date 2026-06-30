export type Conditions =
  | "Clouds"
  | "Mist"
  | "Fog"
  | "Rain"
  | "Drizzle"
  | "Snow"
  | "Storm"
  | "Clear";

// === CURRENT WEATHER === ///
export type RawWeatherResponse = {
  name: string;
  dt: number;
  visibility: number;

  coord: {
    lat: number;
    lon: number;
  };

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };

  weather: {
    main: string;
    description: string;
  }[];

  wind: {
    speed: number;
  };

  sys: {
    sunrise: number;
    sunset: number;
  };
};

export type MappedWeather = {
  city: string;

  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;

  humidity: number;
  pressure: number;

  condition: Conditions;
  description: string;

  windSpeed: number;
  visibility: number;

  dewPoint: number;
  isNight: boolean;
};

// === FORECAST WEATHER === //
export type RawForecastResponse = {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    relative_humidity_2m_max: number[];
    weathercode: number[];
    uv_index_max: number[];
  };
};

export type ForecastDay = {
  date: string;
  dayTemp: number;
  nightTemp: number;
  humidity: number;
  weatherCode: number;
  uvIndex: number;
  condition: Conditions;
};

// === WEATHER RESULT === ///
export type WeatherResult = {
  uiCurWeatherData: MappedWeather;
  uiForecastWeeklyData: ForecastDay[];
};

// === WEATHER ERROR === //
export interface WeatherError extends Error {
  code: string;
}
