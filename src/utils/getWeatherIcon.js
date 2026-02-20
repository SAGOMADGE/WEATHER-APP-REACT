import cloudsIcon from "../icons/cloudy.svg";
import sunIcon from "../icons/sunny.svg";
import rainIcon from "../icons/rainIcon.svg";
import snowIcon from "../icons/snowIcon.svg";
import mistIcon from "../icons/mistIcon.svg";
import stormIcon from "../icons/stormIcon.svg";
import moonIcon from "../icons/moonIcon.svg";

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

export const getWeatherIcon = (condition, isNight) => {
  if (condition === "Clear" && isNight) {
    return iconMap.nightClear;
  } else {
    return iconMap[condition] || cloudsIcon;
  }
};
