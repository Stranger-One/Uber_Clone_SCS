import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthProtector = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  console.log("token", token);
  useEffect(() => {
    console.log(location.pathname);
    if (!token && location.pathname.includes("/home")) {
      navigate("/auth/user-login");
    } else if(token && location.pathname.includes("/auth")) {
      navigate("/home")
    }
  }, [location]);

  return <>{children}</>;
};

export default AuthProtector;
