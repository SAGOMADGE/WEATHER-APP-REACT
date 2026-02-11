const ForecastDayCard = ({ day }) => {
  return (
    <div className="forecast-card">
      <p>{day.date}</p>
      <p>{day.dayTemp}°</p>
      <p>{day.nightTemp}</p>
      <p>{day.humidity}</p>
    </div>
  );
};

export default ForecastDayCard;
