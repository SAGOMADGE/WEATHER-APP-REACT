import { getWeatherIcon } from "../../utils/getWeatherIcon.js";

const CurrentWeatherIcon = ({ condition, isNight }) => {
  const IconSrc = getWeatherIcon(condition, isNight);

  return (
    <div className="weather-icon-wrapper">
      <img src={IconSrc} alt={condition} className="weather-icon" />
    </div>
  );
};

export default CurrentWeatherIcon;
