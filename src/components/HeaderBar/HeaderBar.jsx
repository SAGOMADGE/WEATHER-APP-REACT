/* HeaderBar - UI-контролы:
логотип
поиск города
смена языка
(в будущем) смена темы.
Всё состояние живёт в App.jsx, HeaderBar только:
получает значения
вызывает функции */

import Search from "./SearchBar/SearchBar.jsx";
import Logo from "./Logo/Logo.jsx";
import "./HeaderBar.css";

const HeaderBar = ({ city, setCity, lang, setLang }) => {
  return (
    <header className="header">
      {/* Логотип */}
      <Logo />

      {/* Поиск + язык */}
      <SearchBar city={city} setCity={setCity} lang={lang} setLang={setLang} />

      {/* Тема (пока заглушка) */}
      <button className="theme-btn">🌙</button>
    </header>
  );
};

export default HeaderBar;
