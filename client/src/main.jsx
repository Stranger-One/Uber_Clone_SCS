import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthLayout, AuthProtector, ProfileLayout } from "./others/index.js";
import {
  CaptainLogin,
  CaptainLogout,
  CaptainRegister,
  Home,
  PageNotFound,
  Profile,
  Start,
  UserLogin,
  UserLogout,
  UserRegister,
} from "./pages/index.js";
import GlobalContext from "./contexts/globalContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Start />,
      },
      {
        path: "home",
        element: <AuthProtector><Home /></AuthProtector>,
      },
      {
        path: "profile",
        element: <AuthProtector><ProfileLayout /></AuthProtector>,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "user-logout",
            element: <UserLogout />,
          },
          {
            path: "captain-logout",
            element: <CaptainLogout />,
          },
        ]
      },
      {
        path: "auth",
        element: <AuthProtector><AuthLayout /></AuthProtector>,
        children: [
          {
            path: "user-register",
            element: <UserRegister />,
          },
          {
            path: "user-login",
            element: <UserLogin />,
          },
          {
            path: "captain-register",
            element: <CaptainRegister />,
          },
          {
            path: "captain-login",
            element: <CaptainLogin />,
          },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <GlobalContext>
    <RouterProvider router={router} />
  </GlobalContext>
);
