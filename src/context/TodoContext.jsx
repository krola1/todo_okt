import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Context object used to share the todo state and its functions with
// every component in the tree, without having to pass props down
// manually at each level ("prop drilling").
const TodoContext = createContext(null);

// Provider component: wraps the app (see main.jsx) and makes the todo
// state and all the functions that mutate it available to any
// descendant component via the useTodo() hook below.
export default function TodoProvider({ children }) {
  // The todos array is persisted to localStorage under the key "todookt",
  // so the list survives page reloads. See useLocalStorage.jsx for details.
  const [todos, setTodos] = useLocalStorage("todookt");

  // Adds a new todo.
  // Takes in the title text, builds a new item object around it
  // (with a generated id, not completed yet, and the current timestamp),
  // then uses the spread operator to keep all existing items while
  // appending the new one to the end of the array.
  const addItem = (text) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: text,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [...prev, newTask]);
  };

  // Removes a todo.
  // Takes in an id and uses a functional update to filter out the item
  // whose id matches, returning the remaining items as a new array.
  const removeItem = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  // Toggles a todo's completed state.
  // Takes in an id and maps over the todos.
  // A ternary compares each item's id to the given id:
  // - on a match, a new copy of that item is returned with "completed" flipped
  // - otherwise, the item is returned unchanged
  const toggleCompleted = (id) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  // Edits a todo's title.
  // Same pattern as toggleCompleted: map over the todos and replace
  // only the "title" field of the item whose id matches.
  const editTask = (id, text) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title: text } : item)),
    );
  };

  // Everything exposed to consumers of this context.
  const value = { todos, addItem, removeItem, toggleCompleted, editTask };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

// Convenience hook for reading the todo context.
// Throws a clear error if it's used outside of <TodoProvider>,
// instead of silently returning null.
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used inside <TodoProvider>");
  }
  return context;
};
