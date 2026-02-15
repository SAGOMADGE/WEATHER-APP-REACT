import ThermomemterIcon from "../../icons/Thermometer.svg";

const ThermometerSrc = ThermomemterIcon;

const ConditionInfo = ({ condition, feelsLike, t }) => {
  return (
    <div className="current-weather__details">
      {/* описание погоды */}
      <div className="current-weather__description">
        {t?.current?.conditions?.[condition] || condition}
      </div>

      {/* ощущается как */}
      <div className="current-weather__feels-like">
        <span>
          {t.current.feelsLike} {Math.round(feelsLike)}{" "}
          <img
            className="thermomemter-icon"
            src={ThermometerSrc}
            alt="Thermometer icon"
          ></img>
          °C
        </span>
      </div>
    </div>
  );
};

export default ConditionInfo;
