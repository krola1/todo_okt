import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TodoContext = createContext(null);

export default function TodoProvider({ children }) {
  const [todos, setTodos] = useLocalStorage("todookt");

  const addItem = (text) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: text,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [...prev, newTask]);
  };

  //remove
  //takes in ID, uses functional update to filter out all items without a matching id.
  //returns those as a new array to setTodos
  const removeItem = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  //edit

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
