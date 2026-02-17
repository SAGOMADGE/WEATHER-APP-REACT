import { getWeatherIcon } from "../../utils/getWeatherIcon.js";

const CurrentWeatherIcon = ({ condition }) => {
  const IconSrc = getWeatherIcon(condition);

  return (
    <div className="weather-icon-wrapper">
      <img src={IconSrc} alt={condition} className="weather-icon" />
    </div>
  );
};

export default CurrentWeatherIcon;
