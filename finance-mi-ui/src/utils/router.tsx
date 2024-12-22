import { createBrowserRouter, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import AuthGuard from "../components/AuthGuard";
import Dashboard from "../pages/Dashboard";
import Layout from "../components/Layout";
import GuestGuard from "../components/GuestGuard";
import Transactions from "../pages/Transactions";
import Settings from "../pages/Settings";

export const router = createBrowserRouter([
  {
    path: "login",
    element: <GuestGuard />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "transactions",
            element: <Transactions />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);
