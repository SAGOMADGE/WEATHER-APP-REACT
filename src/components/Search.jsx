// Search.jsx - управляет вводом и отправкой

import { useState } from "react";

// city - это значение города, которое App держит в своем состоянии city
// setCity - это  ссылка на род функцию , это callback, который App передает, чтобы Search мог поднять данные вверх. App.jsx передает setCity как setCity
// внутри Search при клике кнопки вызываем setCity(inputValue) -> App получает новое значение city
const Search = ({ city, setCity, lang, setLang, t }) => {
  const [inputValue, setInputValueLocal] = useState(city);
  // локальный стейт inputValue нужен, чтобы пользователь мог печатать и видеть изменения в инпуте, не трогая App сразу
  // Это важно, чтобы App не дергался при каждом символе, а обновлялся только когда пользователь нажмет кнопку "Поиск"

  return (
    <div>
      <input
        type="text"
        placeholder={t.searchPlaceholder}
        value={inputValue} // подписываем на инпут
        onChange={(e) => setInputValueLocal(e.target.value)} // пользователь вводит город, обновляется inputValue
      />
      <button onClick={() => setCity(inputValue)}>{t.searchButton}</button>{" "}
      <button onClick={() => setLang(lang === "ru" ? "en" : "ru")}>
        {lang.toUpperCase()}
      </button>
      {/* пользователь жмет на "Поиск", вызов setCity(value) изменяет state в App. вызывается родитель, и получачет новое значение города - запускается fetch
      То есть клик по кнопке внутри Search, использует ту же ссылку на функцию что и в App, вызов функции тут это тоже самое что прямой вызов setCity из App */}
    </div>
  );
};

export default Search;
