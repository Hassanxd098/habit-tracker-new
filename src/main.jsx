import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { HabitProvider } from "./context/HabitContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HabitProvider>
      <App />
    </HabitProvider>
  </BrowserRouter>
);
