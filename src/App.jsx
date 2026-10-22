import TodoCard from "./components/TodoCard";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

// Root component of the application.
// It doesn't hold any state itself — all todo data lives in TodoContext,
// so App only needs to render the form (for adding todos) and the list
// (for displaying them).
export default function App() {
  return (
    <>
      <TodoForm />
      <TodoList />
    </>
  );
}
