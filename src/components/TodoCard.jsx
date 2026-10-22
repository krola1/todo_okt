import { useState } from "react";
import { useTodo } from "../context/TodoContext";

// Renders a single todo item as a card, with controls to edit,
// complete and delete it.
export default function TodoCard({ title, createdAt, completed, id }) {
  const { removeItem, toggleCompleted, editTask } = useTodo();

  // State used while editing this card:
  // - "text" holds the (possibly unsaved) edited title; it starts out
  //   equal to the current title so the input shows the right value
  //   as soon as editing begins.
  // - "editing" toggles between the read-only view and the input field.
  const [text, setText] = useState(title);
  const [editing, setEditing] = useState(false);

  // Called by both the "Edit"/"Save" button and the Enter key.
  // If we were already editing, save the new text via editTask before
  // leaving edit mode. Either way, flip the editing flag.
  const onEdit = () => {
    if (editing) {
      editTask(id, text);
    }

    setEditing((prev) => !prev);
  };

  // Converts the stored timestamp into a human-readable, 24-hour date string.
  const date = new Date(createdAt).toLocaleString([], { hour12: false });

  // Renders the card: an editable text input while in edit mode,
  // otherwise a plain heading showing the title.
  return (
    <div style={{ border: "solid white" }}>
      {editing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            // Pressing Enter while editing saves the change,
            // same as clicking the "Save" button.
            if (e.key === "Enter") {
              onEdit(id, text);
            }
          }}
        />
      ) : (
        <h2>{title}</h2>
      )}
      <p> Date: {date}</p>
      <label htmlFor="">
        {/* Checkbox toggles the "completed" state for this item. */}
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleCompleted(id)}
        />
      </label>
      <button onClick={() => removeItem(id)}>Delete</button>
      <button onClick={onEdit}>{editing ? "Save" : "Edit"}</button>
    </div>
  );
}
