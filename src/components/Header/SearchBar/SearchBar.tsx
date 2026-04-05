import { useState, useEffect } from "react";
import "./SearchBar.css";
import SearchIcon from "./SearchIcon.jsx";
import validateCity from "../../../utils/validateCity.js";

import type { Translations } from "../../../i18n/translations";

type SearchBarProps = {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  t: Translations;
};

const SearchBar = ({ city, setCity, t }: SearchBarProps) => {
  const [inputValue, setInputValueLocal] = useState(city ?? "");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setInputValueLocal(city ?? "");
  }, [city]);

  const handleSubmit = () => {
    setTouched(true);
    if (!isValid || !inputValue.trim()) return;
    setCity(inputValue.trim());
  };

  const isValid = inputValue === "" || validateCity(inputValue);

  const showError = !isValid && touched && inputValue.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueLocal(e.currentTarget.value);
  };

  return (
    <div className="search-container">
      <div className="input-wrapper">
        <input
          id="input-search"
          type="text"
          value={inputValue}
          placeholder={t.header.searchPlaceholder}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          onBlur={() => setTouched(true)}
          className={showError ? "invalid" : ""}
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
