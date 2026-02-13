import cloudsIcon from "../../icons/cloudy.svg";
import sunIcon from "../../icons/sunny.svg";
import rainIcon from "../../icons/rain.svg";
import snowIcon from "../../icons/snowVarTwo.svg";

const iconMap = {
  Clouds: cloudsIcon,
  Clear: sunIcon,
  Rain: rainIcon,
  Snow: snowIcon,
};

const WeatherIcon = ({ condition }) => {
  const IconSrc = iconMap[condition] || "❓";

  return (
    <div className="weather-icon-wrapper">
      <img
        src={IconSrc}
        alt={condition}
        className="weather-icon"
        style={{
          width: "100px",
          height: "100px",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default WeatherIcon;
