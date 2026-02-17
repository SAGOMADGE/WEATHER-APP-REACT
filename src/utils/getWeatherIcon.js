import cloudsIcon from "../icons/cloudy.svg";
import sunIcon from "../icons/sunny.svg";
import rainIcon from "../icons/rain.svg";
import snowIcon from "../icons/snow.svg";
import mistIcon from "../icons/mistIcon.svg";

export const iconMap = {
  Clouds: cloudsIcon,
  Clear: sunIcon,
  Rain: rainIcon,
  Drizzle: rainIcon, // Добавь маппинг для похожих состояний
  Snow: snowIcon,
  Mist: mistIcon,
  Fog: mistIcon,
};

export const getWeatherIcon = (condition) => {
  return iconMap[condition] || cloudsIcon;
};
