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
import AddAlumni from "./pages/AddAlumni.jsx";
import Infaks from "./pages/Infaks.jsx";
import AddInfak from "./pages/AddInfak.jsx";
import EditInfak from "./pages/EditInfak.jsx";
import Rekenings from "./pages/Rekenings.jsx"
import AddRekening from "./pages/AddRekening.jsx";
import EditRekening from "./pages/EditRekening.jsx";
import DetailAlumni from "./pages/DetailAlumni.jsx";

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
        path: "/alumni/:id",
        element: <DetailAlumni/>,
      },
      {
        path: "/addAlumni",
        element: <AddAlumni/>,
      },
      {
        path: "/alumni/:id/edit",
        element: <EditAlumni/>,
      },
      {
        path: "/infak",
        element: <Infaks/>,
      },
      {
        path: "/addInfak",
        element: <AddInfak/>,
      },
      {
        path: "/infak/:id/edit",
        element: <EditInfak/>,
      },
      {
        path: "/rekening",
        element: <Rekenings/>,
      },
      {
        path: "/addRekening",
        element: <AddRekening/>,
      },
      {
        path: "rekening/:id/edit",
        element: <EditRekening/>,
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
