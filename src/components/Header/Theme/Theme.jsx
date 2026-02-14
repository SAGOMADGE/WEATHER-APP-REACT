import "./Theme.css";

const Theme = ({ isDark, setIsDark }) => {
  return (
    <button
      className="theme-btn"
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle theme"
    >
      {/* Используем эмодзи или постые иконки для начала */}
      {isDark ? "☀️" : "🌙"}
    </button>
  );
};

export default Theme;
