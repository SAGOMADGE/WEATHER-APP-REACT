// --- Маппер погоды на неделю ---
const mapForecastData = (rawForecast, interpretWmoCode) => {
  const {
    time,
    temperature_2m_max,
    temperature_2m_min,
    relative_humidity_2m_max,
    weathercode,
    uv_index_max,
  } = rawForecast.daily;

  /* 👉 Один индекс = один день*/
  const forecast = time.map((date, index) => ({
    date, // "2026-02-10" <--
    dayTemp: temperature_2m_max[index],
    nightTemp: temperature_2m_min[index],
    humidity: relative_humidity_2m_max[index],
    weatherCode: weathercode[index], // потом можешь сопоставить с картинкой/иконкой
    uvIndex: uv_index_max[index],
    condition: interpretWmoCode(weathercode[index]),
  }));

  return forecast;
};

export default mapForecastData;
