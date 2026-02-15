import "./stats.css";

const Stats = ({
  wind,
  pressure,
  humidity,
  visibility,
  dewPoint,
  uvIndex,
  t,
}) => {
  return (
    <div className="weather-stats">
      <div className="card">
        <p>{t.stats.wind}</p>
        <p>{wind} km/h</p>
      </div>

      <div className="card">
        <p>{t.stats.pressure}</p>
        <p>{pressure} hPa</p>
      </div>

      <div className="card">
        <p>{t.stats.humidity}</p>
        <p>{humidity}%</p>
      </div>

      <div className="card">
        <p>{t.stats.visibility}</p>
        <p>{visibility / 1000} km</p>
      </div>

      <div className="card">
        <p>{t.stats.dewPoint}</p>
        <p>{dewPoint} °C</p>
      </div>

      <div className="card">
        <p>{t.stats.uvIndex}</p>
        <p>{uvIndex}</p>
      </div>
    </div>
  );
};

export default Stats;
