import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthLayout, AuthProtector, CaptainHomeLayout, CaptainProtector, ProfileLayout, UserHomeLayout, UserProtector } from "./others/index.js";
import {
  CaptainHome,
  CaptainLogin,
  CaptainLogout,
  CaptainRegister,
  ClientDetails,
  PageNotFound,
  PickUp,
  Profile,
  Riding,
  Start,
  UserHome,
  UserLogin,
  UserLogout,
  UserRegister,
} from "./pages/index.js";
import GlobalContext from "./contexts/globalContext.jsx";
import CaptainContext from "./contexts/CaptainContext.jsx";

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
            <UserHomeLayout />
          </UserProtector>
        ),
        children: [
          {
            index: true,
            element: <UserHome />
          },
          {
            path: 'riding',
            element: <Riding />
          }
        ]
      },
      {
        path: "captain",
        element: (
          <CaptainProtector>
            <CaptainHomeLayout />
          </CaptainProtector>
        ),
        children: [
          {
            index: true,
            element: <CaptainHome />
          },
          {
            path: "client",
            element: <ClientDetails />
          },
          {
            path: "pickup",
            element: <PickUp />
          }
        ]
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
    <CaptainContext>
      <RouterProvider router={router} />
    </CaptainContext>
  </GlobalContext>
);
