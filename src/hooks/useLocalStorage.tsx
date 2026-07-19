import { useState } from "react";

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const savedValue = localStorage.getItem(key);

      if (savedValue === null) {
        return initialValue;
      }

      return JSON.parse(savedValue) as T;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error(
          `Не удалось прочитать значение "${key}" из localStorage:`,
          error,
        );
      }

      return initialValue;
    }
  });

  const setStoredValue = (newValue: T) => {
    setValue(newValue);

    try {
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error(
          `Не удалось сохранить значение "${key}" в localStorage:`,
          error,
        );
      }
    }
  };

  return [value, setStoredValue] as const;
};
