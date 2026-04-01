import "./Stats.css";

import type { Translations } from "../../i18n/translations";

type StatsProps = {
  wind: number;
  pressure: number;
  humidity: number;
  visibility: number;
  dewPoint: number;
  uvIndex: number;
  t: Translations;
};

const Stats = ({
  wind,
  pressure,
  humidity,
  visibility,
  dewPoint,
  uvIndex,
  t,
}: StatsProps) => {
  const visibilityKm = visibility / 1000;

  return (
    <div className="weather-stats">
      <div className="card">
        <p>{t.stats.wind}</p>
        <p>
          {wind.toFixed(1)}{" "}
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
          {visibilityKm.toFixed(1)} <span>{t.stats.km}</span>
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
