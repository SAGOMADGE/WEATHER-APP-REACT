import React, { SetStateAction } from "react";
import SearchBar from "./SearchBar/SearchBar.js";
import Logo from "./Logo/Logo.js";
import Theme from "./Theme/Theme.js";
import "./Header.css";

import type { Translations } from "../../i18n/translations.js";

type HeaderProps = {
  city: string;
  setCity: React.Dispatch<SetStateAction<string>>;
  lang: "ru" | "en";
  setLang: React.Dispatch<SetStateAction<string>>;
  t: Translations;
  isDark: boolean;
  setIsDark: React.Dispatch<SetStateAction<boolean>>;
};

const HeaderBar = ({
  city,
  setCity,
  lang,
  setLang,
  t,
  isDark,
  setIsDark,
}: HeaderProps) => {
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
