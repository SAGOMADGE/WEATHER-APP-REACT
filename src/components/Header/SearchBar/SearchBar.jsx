// Search.jsx - управляет вводом и отправкой

import { useState, useEffect, React } from "react";
import "./SearchBar.css";
import SearchIcon from "./SearchIcon.jsx";
import validateCity from "../../../utils/validateCity.js";

const SearchBar = ({ city, setCity, t }) => {
  // состояния
  const [inputValue, setInputValueLocal] = useState(city ?? "");
  const [touched, setTouched] = useState(false); // состояние которое информирует, ушел ли пользователь с поля

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
          onBlur={() => setTouched(true)} //
          className={showError ? "invalid" : ""} //
        />

        <button className="search-submit-btn" onClick={handleSubmit}>
          <SearchIcon />
        </button>
      </div>

      {inputValue && !isValid && touched && (
        <p className="error-message">Город не должен содержать цифры</p>
      )}
    </div>
  );
};

export default SearchBar;
