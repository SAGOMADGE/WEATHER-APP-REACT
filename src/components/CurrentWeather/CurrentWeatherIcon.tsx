import { getWeatherIcon } from "../../utils/getWeatherIcon";
import type { Conditions } from "../../types/weather.types";

type CurrentWeatherIconProps = {
  condition: Conditions;
  isNight: boolean;
};

const CurrentWeatherIcon = ({
  condition,
  isNight,
}: CurrentWeatherIconProps) => {
  const iconSrc = getWeatherIcon(condition, isNight);

  return (
    <div className="weather-icon-wrapper">
      <img
        src={iconSrc}
        alt={`Weather: ${condition}`}
        className="weather-icon"
      />
    </div>
  );
};

export default CurrentWeatherIcon;
