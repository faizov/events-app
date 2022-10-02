import { createBrowserRouter } from "react-router-dom";
import { Home } from "./home";
import { AddPost } from "./addPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/add",
    element: <AddPost />
  }
]);
