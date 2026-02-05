import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "./layouts/public-layout";
import PrivateLayout from "./layouts/private-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [{ path: "", element: "" }],
  },
  {
    path: "/private",
    element: <PrivateLayout />,
    children: [{ path: "", element: "" }],
  },
]);
