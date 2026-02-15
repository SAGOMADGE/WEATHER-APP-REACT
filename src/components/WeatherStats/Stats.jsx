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
        <p>
          {wind}{" "}
          <span>
            {t.stats.km}/{t.stats.h}
          </span>
        </p>
      </div>

      <div className="card">
        <p>{t.stats.pressure}</p>
        <p>
          {pressure} <span>{t.stats.hPa}</span>
        </p>
      </div>

      <div className="card">
        <p>{t.stats.humidity}</p>
        <p>{humidity}%</p>
      </div>

      <div className="card">
        <p>{t.stats.visibility}</p>
        <p>
          {visibility / 1000} <span>{t.stats.km}</span>
        </p>
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
