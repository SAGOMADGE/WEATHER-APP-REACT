const ForecastDayCard = ({ label, dayTemp, nightTemp, humidity }) => {
  return (
    <div className="forecast-card">
      <p>{label}</p>
      <p>{dayTemp}°</p>
      <p>{nightTemp}°</p>
      <p>{humidity}%</p>
    </div>
  );
};

export default ForecastDayCard;
