import { createHashRouter } from "react-router-dom";
import Home from "../Home";

export const router = createHashRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/word/:word",
    Component: Home,
  },
]);
