const API_KEY = "b3ad058bc5daec2b9236aba02e90b21b";
const URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeatherByCity(city) {
  const res = await fetch(`${URL}?q=${city}&appid=${API_KEY}&units=metric`);

  if (!res.ok) throw new Error("City not found");

  const data = await res.json();

  return {
    city: data.name,
    temp: Math.round(data.main.temp),
    conditions: data.weather[0].main,
  };
}
