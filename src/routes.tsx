import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { Home, AddPost, EditPost, Post } from "./pages";

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
        element: <EditPost />
      }
    ]
  }
]);
