import { SetStateAction } from "react";
import "./Theme.css";

type ThemeProps = {
  isDark: boolean;
  setIsDark: React.Dispatch<SetStateAction<boolean>>;
};

const Theme = ({ isDark, setIsDark }: ThemeProps) => {
  return (
    <button className="theme-btn" onClick={() => setIsDark((prev) => !prev)}>
      {isDark ? (
        // Иконка Солнца
        <svg
          className="sun-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="orange"
          stroke="orange"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        // Иконка Луны
        <svg
          className="moon-icon"
          viewBox="0 0 24 24"
          stroke="orange"
          strokeWidth="2"
          fill="orange"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
};

export default Theme;
