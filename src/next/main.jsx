import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./next.css";
import NextApp from "./NextApp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextApp />
  </StrictMode>
);
