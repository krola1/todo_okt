import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TodoContext = createContext(null);

export default function TodoProvider({ children }) {
  const [todos, setTodos] = useLocalStorage("todookt");

  const addItem = (text) => {
    setTodos((prev) => [...prev, { title: text }]);
  };

  const value = { todos, addItem };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used inside <TodoProvider");
  }
  return context;
};
