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
  const IconSrc = getWeatherIcon(condition, isNight);

  return (
    <div className="weather-icon-wrapper">
      <img src={IconSrc} alt={condition} className="weather-icon" />
    </div>
  );
};

export default CurrentWeatherIcon;
