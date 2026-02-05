import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicLayout from "./layouts/public-layout";
import PrivateLayout from "./layouts/private-layout";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Homepage from "./pages/homepage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
    ],
  },
  {
    path: "/private",
    element: <PrivateLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);
