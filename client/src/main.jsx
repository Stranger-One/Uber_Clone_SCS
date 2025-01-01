import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <div>Home</div>,
      },
      {
        path: "auth",
        element: <div>Auth<Outlet /></div>,
        children: [
          {
            path: "user-register",
            element: <div>User Register</div>,
          },
          {
            path: "user-login",
            element: <div>User Login</div>,
          },
          {
            path: 'captain-register',
            element: <div>Captain Register</div>
          },
          {
            path: 'captain-login',
            element: <div>Captain Login</div>
          }
        ],
      },
      {
        path: '*',
        element: <div>Not Found</div>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
