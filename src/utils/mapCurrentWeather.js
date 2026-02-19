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

    isNight:
      rawCurWeatherData.dr < rawCurWeatherData.sys.sunrise ||
      rawCurWeatherData.dt > rawCurWeatherData.sys.sunset,
  };
  return mappedCurWeatherData;
};

export default mapCurrentWeather;
