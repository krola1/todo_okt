import { useTodo } from "../context/TodoContext";

export default function TodoCard({ title, createdAt, complete, id }) {
  const { removeItem } = useTodo();
  const date = new Date(createdAt).toLocaleString([], { hour12: false });
  return (
    <div style={{ border: "solid white" }}>
      <h2>{title}</h2>
      <p> Date: {date}</p>
      <label htmlFor="">
        <input type="checkbox" checked={complete} />
      </label>
      <button onClick={() => removeItem(id)}>Delete</button>
      <button>Edit</button>
    </div>
  );
}
