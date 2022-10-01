import { createBrowserRouter } from "react-router-dom";
import { Home } from "./home";
import { Second } from "./second";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/second",
    element: <Second />
  }
]);
