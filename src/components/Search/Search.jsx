// Search.jsx - управляет вводом и отправкой

import { useState } from "react";
import "./search.css";

// Проверка валидности города
function isValidCity(value) {
  // ^ и $ означают "начало и конец строки"
  // [a-zA-Zа-яА-ЯёЁ\- ]+ — разрешены буквы, дефис и пробел, один и более символов
  const regex = /^[a-zA-Zа-яА-ЯёЁ\- ]+$/;
  return regex.test(value);
}

const Search = ({ city, setCity, lang, setLang, t }) => {
  const [inputValue, setInputValueLocal] = useState(city);
  const [touched, setTouched] = useState(false); // состояние которое информирует, ушел ли пользователь с поля

  const isValid = inputValue === "" || isValidCity(inputValue);

  return (
    <div className="input-area">
      <div className="input-and-error-area">
        <input
          id="input-search"
          type="text"
          placeholder={t.searchPlaceholder}
          value={inputValue} // подписываем на инпут
          required
          onChange={(e) => setInputValueLocal(e.target.value)} // пользователь вводит город, обновляется inputValue
          onBlur={() => setTouched(true)} // пользователь ушел с поля
          className={!isValid && touched ? "invalid" : ""} // если инпут не валидный , и фокус потерян добавляем класс "invalid"
        />

        {/* показываем ошибку только если инпут содержит хоть один символ, он не валидный и он в фокусе */}
        {inputValue && !isValid && touched && (
          <p className="error-message">Город не должен содержать цифры</p>
        )}
      </div>
      <div className="input-buttons-area">
        <button
          onClick={() => {
            setTouched(true);
            if (isValid) setCity(inputValue);
          }}
        >
          {t.searchButton}
        </button>{" "}
        <button onClick={() => setLang(lang === "ru" ? "en" : "ru")}>
          {lang.toUpperCase()}
        </button>
      </div>
    </div>
  );
};

export default Search;
