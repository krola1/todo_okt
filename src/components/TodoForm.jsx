import { useState } from "react";
import { useTodo } from "../context/TodoContext";

export default function TodoForm() {
  const [text, setText] = useState("");
  const { addItem } = useTodo();

  const onSubmit = (e) => {
    e.preventDefault();
    addItem(text);
    setText("");
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
      />
      <button>Add</button>
    </form>
  );
}
