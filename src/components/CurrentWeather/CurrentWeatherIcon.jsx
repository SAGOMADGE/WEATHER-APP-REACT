const iconMap = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Snow: "❄️",
};

const WeatherIcon = ({ icon, condition }) => {
  return <div style={{ fontSize: "5rem" }}>{iconMap[condition] || "❓"}</div>;
};

export default WeatherIcon;
