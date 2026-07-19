import SearchBar from "./SearchBar/SearchBar.js";
import Logo from "./Logo/Logo.js";
import Theme from "./Theme/Theme.js";
import "./Header.css";

import type { Language, Translations } from "../../i18n/translations.js";

type HeaderProps = {
  city: string;
  setCity: (city: string) => void;

  isDark: boolean;
  setIsDark: (isDark: boolean) => void;

  lang: Language;
  setLang: (lang: Language) => void;

  t: Translations;
};

const HeaderBar = ({
  city,
  setCity,
  isDark,
  setIsDark,
  lang,
  setLang,
  t,
}: HeaderProps) => {
  return (
    <header className="header-bar">
      <div className="header-left">
        <Logo />
      </div>

      <div className="header-center">
        <SearchBar key={city} city={city} setCity={setCity} t={t} />
      </div>

      <div className="header-right">
        <button
          type="button"
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
