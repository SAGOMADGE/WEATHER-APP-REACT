/* HeaderBar - UI-контролы:
логотип
поиск города
смена языка
(в будущем) смена темы.
Всё состояние живёт в App.jsx, HeaderBar только:
получает значения
вызывает функции */
import React from "react";
import SearchBar from "./SearchBar/SearchBar.jsx";
import Logo from "./Logo/Logo.jsx";
import Theme from "./Theme/Theme.jsx";
import "./Header.css";

const HeaderBar = ({ city, setCity, lang, setLang, t }) => {
  return (
    <header className="header-bar">
      {/* Логотип слева*/}
      <div className="header-left">
        <Logo />
      </div>

      {/* Поиск + язык по центру */}
      <div className="header-center">
        <SearchBar
          city={city}
          setCity={setCity}
          lang={lang}
          setLang={setLang}
          t={t}
        />
      </div>

      <div className="header-right">
        <button
          className="lang-btn"
          onClick={() => setLang(lang === "ru" ? "en" : "ru")}
        >
          {lang.toUpperCase()}
        </button>

        <Theme />
      </div>
    </header>
  );
};

export default HeaderBar;
