import { useState, useEffect } from "react";

// Custom hook that behaves like useState, but keeps its value in sync
// with the browser's localStorage, so the data survives page reloads.
export const useLocalStorage = (key, initialValue = []) => {
  // Lazy initial state: the function passed to useState only runs once,
  // on the first render, instead of on every render.
  const [value, setValue] = useState(() => {
    try {
      // If something is already stored under this key, parse and use it.
      // Otherwise fall back to the given initial value.
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      // localStorage can throw (e.g. disabled storage, corrupted data),
      // so fail gracefully instead of crashing the app.
      console.error("could not read from localstorage");
      return initialValue;
    }
  });

  // Whenever the key or the value changes, write the latest value back
  // to localStorage so it's persisted for the next page load.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("could not write to localstorage");
    }
  }, [key, value]);

  // Same shape as useState's return value: [currentValue, setter].
  return [value, setValue];
};
