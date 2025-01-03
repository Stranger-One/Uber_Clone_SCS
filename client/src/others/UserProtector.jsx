import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import CaptainService from "../services/CaptainService";

const UserProtector = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

//   console.log("token", token);

  const validateToken = async () => {
    const userProfileResponse = await UserService.getUserProfile(token);
    // console.log("userProfileResponse", userProfileResponse);

    if (!userProfileResponse.success) {
      return navigate("/auth/user-login");
    }

    // console.log("User is logged in");
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      validateToken();
    } else {
      navigate("/auth/user-login");
    }

    // console.log(location.pathname);
  }, [location.pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default UserProtector;
