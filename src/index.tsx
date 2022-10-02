import App from "./App";
import { RouterProvider } from "react-router-dom";

import { createRoot } from "react-dom/client";

import { router } from "./routes";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as Element);

root.render(<RouterProvider router={router} />);
