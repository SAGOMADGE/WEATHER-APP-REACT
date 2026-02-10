// Search.jsx - управляет вводом и отправкой

import { useState, useEffect } from "react";
import "./SearchBar.css";

// Проверка валидности города
function isValidCity(value) {
  // ^ и $ означают "начало и конец строки"
  // [a-zA-Zа-яА-ЯёЁ\- ]+ — разрешены буквы, дефис и пробел, один и более символов
  const regex = /^[a-zA-Zа-яА-ЯёЁ\- ]+$/;
  return regex.test(value);
}

const SearchBar = ({ city, setCity, lang, setLang, t }) => {
  // состояния
  const [inputValue, setInputValueLocal] = useState(city);
  const [touched, setTouched] = useState(false); // состояние которое информирует, ушел ли пользователь с поля

  // синхронизация city и inputValue
  useEffect(() => {
    setInputValueLocal(city);
  }, [city]);

  // функция сабмита
  const handleSubmit = () => {
    setTouched(true);
    if (!isValid || !inputValue.trim()) return;
    setCity(inputValue.trim());
  };

  // переменная валидности
  const isValid = inputValue === "" || isValidCity(inputValue);

  return (
    <div className="input-area">
      <div className="input-and-error-area">
        <input
          id="input-search"
          type="text"
          placeholder={t.searchPlaceholder}
          value={inputValue} // подписываемся на инпут
          required
          onChange={(e) => setInputValueLocal(e.target.value)}
          // клик по "Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          onBlur={() => setTouched(true)} // пользователь ушел с поля
          className={!isValid && touched ? "invalid" : ""} // если инпут не валидный , и фокус потерян добавляем класс "invalid"
        />

        {/* показываем ошибку только если инпут содержит хоть один символ, он не валидный и он в фокусе */}
        {inputValue && !isValid && touched && (
          <p className="error-message">Город не должен содержать цифры</p>
        )}
      </div>
      {/* зона кнопок */}
      <div className="input-buttons-area">
        {/* кнопка поиска */}
        <button onClick={handleSubmit}>{t.searchButton}</button>
        {/* кнопка смены языка */}
        <button onClick={() => setLang(lang === "ru" ? "en" : "ru")}>
          {lang.toUpperCase()}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
