import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { Home } from "./pages/home";
import { AddPost } from "./pages/add";
import { Post } from "./pages/post";
import { Edit } from "./pages/edit";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
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
      },
      {
        path: "/edit/:id",
        element: <Edit />
      },
    ]
  }
]);
