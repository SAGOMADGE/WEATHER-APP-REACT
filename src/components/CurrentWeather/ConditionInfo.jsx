const ConditionInfo = ({ condition, feelsLike, t }) => {
  return (
    <div>
      <div>{t.current.conditions[condition] || condition}</div>
      <div>
        {t.current.feelsLike}
        {Math.round(feelsLike)} °C
      </div>
    </div>
  );
};

export default ConditionInfo;
