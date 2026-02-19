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
  Drizzle: rainIcon, // Добавь маппинг для похожих состояний
  Snow: snowIcon,
  Mist: mistIcon,
  Fog: mistIcon,
  Storm: stormIcon,
  Moon: moonIcon,
};

export const getWeatherIcon = (condition) => {
  return iconMap[condition] || cloudsIcon;
};
