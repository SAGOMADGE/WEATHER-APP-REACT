// Search.jsx - управляет вводом и отправкой

import { useState, useEffect, React } from "react";
import "./SearchBar.css";
import SearchIcon from "./SearchIcon.jsx";
import validateCity from "../../../utils/validateCity.js";

const SearchBar = ({ city, setCity, lang, setLang, t }) => {
  // состояния
  const [inputValue, setInputValueLocal] = useState(city ?? "");
  const [touched, setTouched] = useState(false); // состояние которое информирует, ушел ли пользователь с поля

  console.log("city:", city);
  console.log("inputValue:", inputValue);

  // синхронизация city и inputValue
  useEffect(() => {
    setInputValueLocal(city ?? "");
  }, [city]);

  // функция сабмита
  const handleSubmit = () => {
    setTouched(true);
    if (!isValid || !inputValue.trim()) return;
    setCity(inputValue.trim());
  };

  // переменная валидности
  const isValid = inputValue === "" || validateCity(inputValue);

  const showError = !isValid && touched && inputValue.length > 0;

  return (
    <header className="header-bar">
      <div className="search-container">
        <div className="input-wrapper">
          <input
            id="input-search"
            type="text"
            value={inputValue} // подписываемся на инпут
            placeholder={t.header.searchPlaceholder}
            onChange={(e) => setInputValueLocal(e.target.value)}
            // клик по "Enter"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            onBlur={() => setTouched(true)} // пользователь ушел с поля
            className={showError ? "invalid" : ""} // если инпут не валидный , и фокус потерян добавляем класс "invalid"
          />
          {/* Кнопка поиска внутри интута или сразу за ним*/}
          <button className="search-submit-btn" onClick={handleSubmit}>
            <SearchIcon />
          </button>
        </div>

        {/* показываем ошибку только если инпут содержит хоть один символ, он не валидный и он в фокусе */}
        {inputValue && !isValid && touched && (
          <p className="error-message">Город не должен содержать цифры</p>
        )}
      </div>
      {/* кнопка смены языка отдельно */}
      <button
        className="lang-btn"
        onClick={() => setLang(lang === "ru" ? "en" : "ru")}
      >
        {lang.toUpperCase()}
      </button>
    </header>
  );
};

export default SearchBar;
