import { createBrowserRouter } from "react-router-dom";
import Home from "../Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/word/:word",
    Component: Home,
  },
]);
