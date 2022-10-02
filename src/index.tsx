import App from "./App";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");

// 👇️ use type assertion
const root = createRoot(rootElement as Element);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
