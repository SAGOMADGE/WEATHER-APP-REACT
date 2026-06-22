import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import { Analytics } from "@vercel/analytics/react"; //← /react не /next
import App from "./App.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
);
 