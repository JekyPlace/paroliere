import { createBrowserRouter } from "react-router-dom";
import Home from "../Home";
import WordOpen from "../pages/WordOpen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/word/:word",
    Component: WordOpen,
  },
]);
