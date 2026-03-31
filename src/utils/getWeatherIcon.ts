import cloudsIcon from "../icons/cloudy.svg";
import sunIcon from "../icons/sunny.svg";
import rainIcon from "../icons/rainIcon.svg";
import snowIcon from "../icons/snowIcon.svg";
import mistIcon from "../icons/mistIcon.svg";
import stormIcon from "../icons/stormIcon.svg";
import moonIcon from "../icons/moonIcon.svg";

type Conditions = "Clouds" | "Mist" | "Rain" | "Snow" | "Storm" | "Clear";

export const iconMap = {
  Clouds: cloudsIcon,
  Clear: sunIcon,
  Rain: rainIcon,
  Drizzle: rainIcon,
  Snow: snowIcon,
  Mist: mistIcon,
  Fog: mistIcon,
  Storm: stormIcon,
  nightClear: moonIcon,
};

export const getWeatherIcon = (
  condition: Conditions,
  isNight: boolean,
): string => {
  if (condition === "Clear" && isNight) {
    return iconMap.nightClear;
  } else {
    return iconMap[condition] || cloudsIcon;
  }
};
