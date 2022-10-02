import { createBrowserRouter } from "react-router-dom";
import { Home } from "./home";
import { AddPost } from "./addPost";
import { Post } from "./post";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/add",
    element: <AddPost />
  },
  {
    path: "/event/:id",
    element: <Post />
  }
]);
