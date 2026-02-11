import ForecastDayCard from "./ForecastDayCard.jsx";
import "./forecast.css";

const Forecast = ({ forecast }) => {
  return (
    <section className="forecast">
      {forecast.map((day) => (
        <ForecastDayCard key={day.date} day={day} />
      ))}
    </section>
  );
};

export default Forecast;
