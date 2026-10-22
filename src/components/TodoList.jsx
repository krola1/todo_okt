import { useTodo } from "../context/TodoContext";
import TodoCard from "./TodoCard";

// Renders every todo item as a TodoCard, laid out in a grid (see App.css).
export default function TodoList() {
  // Read the current list of todos from the shared context.
  const { todos } = useTodo();

  // Maps over the todos array and renders one TodoCard per item.
  // The item object is spread onto the card so each of its fields
  // (id, title, completed, createdAt) becomes a separate prop.
  return (
    <div className="todo-grid">
      {todos.map((item, i) => (
        <TodoCard key={i} {...item} />
      ))}
    </div>
  );
}
