import { createBrowserRouter } from "react-router-dom";
import Home from "../Home";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Home,
    },
    {
      path: "/word/:word",
      Component: Home,
    },
  ],
  {
    basename,
  },
);
