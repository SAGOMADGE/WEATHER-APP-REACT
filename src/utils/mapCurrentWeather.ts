type RawWeatherResponse = {
  name: string;
  dt: number;
  visibility: number;

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

type MappedWeather = {
  city: string;

  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;

  humidity: number;
  pressure: number;

  condition: string;
  description: string;

  windSpeed: number;
  visibility: number;

  dewPoint: number;
  isNight: boolean;
};

const mapCurrentWeather = (
  rawCurWeatherData: RawWeatherResponse,
): MappedWeather => {
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

    isNight:
      rawCurWeatherData.dt < rawCurWeatherData.sys.sunrise ||
      rawCurWeatherData.dt > rawCurWeatherData.sys.sunset,
  };
  return mappedCurWeatherData;
};

export default mapCurrentWeather;
