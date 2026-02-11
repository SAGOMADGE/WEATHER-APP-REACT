import "./stats.css";

const Stats = ({ wind, pressure, humidity, visibility, dewPoint }) => {
  return (
    <div className="weatherStats">
      <div className="card">
        <p>Wind</p>
        <p>{wind} km/h</p>
      </div>

      <div className="card">
        <p>Pressure</p>
        <p>{pressure} hPa</p>
      </div>

      <div className="card">
        <p>Humidity</p>
        <p>{humidity}%</p>
      </div>

      <div className="card">
        <p>Visibility</p>
        <p>{visibility / 1000} km</p>
      </div>

      <div className="card">
        <p>Dew Point</p>
        <p>{dewPoint} °C</p>
      </div>
    </div>
  );
};

export default Stats;
