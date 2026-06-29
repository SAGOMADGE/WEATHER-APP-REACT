import { SetStateAction } from "react";
import "./Theme.css";

import SunIcon from "./SunIcon";
import MoonIcon from "./MoonIcon";

type ThemeProps = {
  isDark: boolean;
  setIsDark: React.Dispatch<SetStateAction<boolean>>;
};

const Theme = ({ isDark, setIsDark }: ThemeProps) => {
  return (
    <button className="theme-btn" onClick={() => setIsDark(!isDark)}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default Theme;
