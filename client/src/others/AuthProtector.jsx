import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import CaptainService from "../services/CaptainService";

const AuthProtector = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  // console.log("token", token);

  const validateToken = async () => {
    const userProfileResponse = await UserService.getUserProfile(token);
    const captainProfileResponse = await CaptainService.getCaptainProfile(
      token
    );
    // console.log("userProfileResponse", userProfileResponse);
    // console.log("captainProfileResponse", captainProfileResponse);

    if (userProfileResponse.success) {
      // console.log("User is logged in");
      return navigate("/user");
    } else if (captainProfileResponse.success) {
      // console.log("Captain is logged in");
      return navigate("/captain");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      validateToken();
    } else {
      setLoading(false);
    }

    // console.log(location.pathname);
  }, [location.pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthProtector;
