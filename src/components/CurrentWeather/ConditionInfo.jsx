import { Thermometer } from "lucide-react";

const ConditionInfo = ({ condition, feelsLike, t }) => {
  return (
    <div className="current-weather__details">
      {/* описание погоды */}
      <div className="current-weather__description">
        {t?.current?.conditions?.[condition] || condition}
      </div>

      {/* ощущается как */}
      <div className="current-weather__feels-like">
        <Thermometer className="icon-thermometer" />

        <p>
          {t.current.feelsLike}{" "}
          <span className="feels-like__value"> {Math.round(feelsLike)} °C</span>
        </p>
      </div>
    </div>
  );
};

export default ConditionInfo;
