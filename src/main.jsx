import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import TodoProvider from "./context/TodoContext.jsx";

// Entry point of the app.
// createRoot connects React to the <div id="root"> element in index.html,
// and render() draws our component tree into that div.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* TodoProvider gives every component below it access to the
        todo state and the functions that change it, via Context. */}
    <TodoProvider>
      <App />
    </TodoProvider>
  </StrictMode>,
);
