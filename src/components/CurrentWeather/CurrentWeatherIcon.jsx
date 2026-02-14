import cloudsIcon from "../../icons/cloudy.svg";
import sunIcon from "../../icons/sunny.svg";
import rainIcon from "../../icons/rain.svg";
import snowIcon from "../../icons/snowVarTwo.svg";
import mistIcon from "../../icons/mistIcon.svg";

const iconMap = {
  Clouds: cloudsIcon,
  Clear: sunIcon,
  Rain: rainIcon,
  Snow: snowIcon,
  Mist: mistIcon,
};

const CurrentWeatherIcon = ({ condition }) => {
  const IconSrc = iconMap[condition] || cloudsIcon;

  return (
    <div className="weather-icon-wrapper">
      <img src={IconSrc} alt={condition} className="weather-icon" />
    </div>
  );
};

export default CurrentWeatherIcon;
