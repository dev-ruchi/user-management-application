import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import UserList from "./components/UserList.jsx";
import CreateUser from "./components/CreateUser.jsx";
import Layout from "./components/Layout.jsx";
import UpdateUser from "./components/UpdateUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <UserList />,
      },
      {
        path: "/create",
        element: <CreateUser />,
      },
      {
        path: "update/:userId",
        element: <UpdateUser />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <RouterProvider router={router} />
  </StrictMode>
);
