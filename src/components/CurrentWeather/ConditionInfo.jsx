const ConditionInfo = ({ condition, feelsLike, t }) => {
  return (
    <div className="current-weather_details">
      {/* описание погоды */}
      <div className="current-weather__description">
        {t?.current?.conditions?.[condition] || condition}
      </div>

      {/* ощущается как */}
      <div className="current-weather__feels-like">
        {t.current.feelsLike}
        {Math.round(feelsLike)} °C
      </div>
    </div>
  );
};

export default ConditionInfo;
