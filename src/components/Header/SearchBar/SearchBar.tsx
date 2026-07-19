import { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "./SearchIcon.jsx";
import validateCity from "../../../utils/validateCity.js";

import type { Translations } from "../../../i18n/translations.js";

type SearchBarProps = {
  city: string;
  setCity: (city: string) => void;
  t: Translations;
};

const SearchBar = ({ city, setCity, t }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(city ?? "");
  const [touched, setTouched] = useState(false);

  const isValid = inputValue === "" || validateCity(inputValue);

  const showError = !isValid && touched && inputValue.length > 0;

  const handleSubmit = () => {
    setTouched(true);

    if (!isValid || !inputValue.trim()) {
      return;
    }

    setCity(inputValue.trim());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
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
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
          onBlur={() => setTouched(true)}
          className={showError ? "invalid" : ""}
        />

        <button
          type="button"
          className="search-submit-btn"
          onClick={handleSubmit}
        >
          <SearchIcon />
        </button>
      </div>

      {showError && <p className="error-message">{t.errors.invalidCity}</p>}
    </div>
  );
};

export default SearchBar;
