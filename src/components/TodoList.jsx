import { useTodo } from "../context/TodoContext";
import TodoCard from "./TodoCard";

export default function TodoList() {
  const { todos } = useTodo();
  return (
    <>
      {todos.map((item, i) => (
        <TodoCard key={i} {...item} />
      ))}
    </>
  );
}
