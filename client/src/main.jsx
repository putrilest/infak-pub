import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Alumnis from "./pages/Alumnis.jsx";
import EditAlumni from "./pages/EditAlumni.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/alumni",
        element: <Alumnis/>,
      },
      {
        path: "/alumni/:id/edit",
        element: <EditAlumni/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
