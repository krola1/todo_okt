import { useState } from "react";
import { useTodo } from "../context/TodoContext";

// Form for creating new todo items.
export default function TodoForm() {
  // Local state for the controlled text input.
  const [text, setText] = useState("");
  // Pull the addItem function out of the shared todo context.
  const { addItem } = useTodo();

  // Handles the form submit event:
  // 1. prevents the default page reload a form submit would otherwise cause
  // 2. adds a new todo item using the current input text
  // 3. clears the input field, ready for the next entry
  const onSubmit = (e) => {
    e.preventDefault();
    addItem(text);
    setText("");
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Controlled input: its value always mirrors the "text" state,
          and every keystroke updates that state via onChange. */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
      />
      <button>Add</button>
    </form>
  );
}
