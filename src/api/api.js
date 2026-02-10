const API_KEY = "b3ad058bc5daec2b9236aba02e90b21b";
const URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeatherByCity(city) {
  const res = await fetch(`${URL}?q=${city}&appid=${API_KEY}&units=metric`);

  if (!res.ok) throw new Error("City not found");

  const rawData = await res.json();

  const mappedData = {
    city: rawData.name,
    county: rawData.sys.country,

    temp: rawData.main.temp,
    feelsLike: rawData.main.feels_like,
    tempMin: rawData.main.temp_min,
    tempMax: rawData.main.temp_max,

    humidity: rawData.main.humidity,
    pressure: rawData.main.pressure,

    condition: rawData.weather[0].main,
    description: rawData.weather[0].description,

    windSpeed: rawData.wind.speed,
  };

  return { raw: rawData, mapped: mappedData };
}
