import cloudsIcon from "../icons/cloudy.svg";
import sunIcon from "../icons/sunny.svg";
import rainIcon from "../icons/rainIcon.svg";
import snowIcon from "../icons/snowIcon.svg";
import mistIcon from "../icons/mistIcon.svg";
import stormIcon from "../icons/stormIcon.svg";
import moonIcon from "../icons/moonIcon.svg";

import type { Conditions } from "../types/weather.types";

export const iconMap = {
  Clouds: cloudsIcon,
  Clear: sunIcon,
  Rain: rainIcon,
  Drizzle: rainIcon,
  Snow: snowIcon,
  Mist: mistIcon,
  Fog: mistIcon,
  Storm: stormIcon,
} as const;

const nightClearIcon = moonIcon;

export const getWeatherIcon = (
  condition: Conditions,
  isNight?: boolean,
): string => {
  if (condition === "Clear" && isNight) {
    return nightClearIcon;
  } else {
    return iconMap[condition] || cloudsIcon;
  }
};
