import React from "react";
import SearchBar from "./SearchBar/SearchBar.jsx";
import Logo from "./Logo/Logo.jsx";
import Theme from "./Theme/Theme.jsx";
import "./Header.css";

const HeaderBar = ({ city, setCity, lang, setLang, t, isDark, setIsDark }) => {
  return (
    <header className="header-bar">
      <div className="header-left">
        <Logo />
      </div>

      <div className="header-center">
        <SearchBar city={city} setCity={setCity} t={t} />
      </div>

      <div className="header-right">
        <button
          className="lang-btn"
          onClick={() => setLang(lang === "ru" ? "en" : "ru")}
        >
          {lang.toUpperCase()}
        </button>

        <Theme isDark={isDark} setIsDark={setIsDark} />
      </div>
    </header>
  );
};

export default HeaderBar;
