import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { useGlobal } from "../contexts/globalContext";

const UserLogout = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const { setUserData } = useGlobal();

  useEffect(() => {
    const logoutUser = async () => {
      const response = await UserService.logoutUser(token);
      if (response.success) {
        localStorage.removeItem("token");
        setUserData(null);
        navigate("/auth/user-login");
      }
    };
    logoutUser();
  }, [token, navigate]);

  return <div>UserLogout</div>;
};

export default UserLogout;
