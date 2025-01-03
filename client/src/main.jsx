import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthLayout, AuthProtector, CaptainProtector, ProfileLayout, UserProtector } from "./others/index.js";
import {
  CaptainHome,
  CaptainLogin,
  CaptainLogout,
  CaptainRegister,
  PageNotFound,
  Profile,
  Start,
  UserHome,
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
        path: "user",
        element: (
          <UserProtector>
            <UserHome />
          </UserProtector>
        ),
      },
      {
        path: "captain",
        element: (
          <CaptainProtector>
            <CaptainHome />
          </CaptainProtector>
        ),
      },
      {
        path: "auth",
        element: (
          <AuthProtector>
            <AuthLayout />
          </AuthProtector>
        ),
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
      // {
      //   path: "profile",
      //   element: (
      //     <AuthProtector>
      //       <ProfileLayout />
      //     </AuthProtector>
      //   ),
      //   children: [
      //     {
      //       index: true,
      //       element: <Profile />,
      //     },
      //     {
      //       path: "user-logout",
      //       element: <UserLogout />,
      //     },
      //     {
      //       path: "captain-logout",
      //       element: <CaptainLogout />,
      //     },
      //   ],
      // },
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
