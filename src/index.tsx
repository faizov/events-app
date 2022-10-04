import App from "./App";
import { RouterProvider } from "react-router-dom";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./__data__/store";
import { router } from "./routes";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as Element);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
