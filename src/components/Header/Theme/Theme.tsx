import "./Theme.css";

import SunIcon from "./SunIcon";
import MoonIcon from "./MoonIcon";

type ThemeProps = {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
};

const Theme = ({ isDark, setIsDark }: ThemeProps) => {
  return (
    <button
      type="button"
      className="theme-btn"
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default Theme;
