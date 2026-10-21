import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue = []) => {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error("could not read from localstorage");
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("could not write to localstorage");
    }
  }, [key, value]);

  return [value, setValue];
};
