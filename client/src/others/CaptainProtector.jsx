import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CaptainService from "../services/CaptainService";
import { useCaptainData } from "../contexts/CaptainContext";

const CaptainProtector = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();
  const { setCaptainDetails } = useCaptainData()

  // console.log("token", token);

  const validateToken = async () => {
    const captainProfileResponse = await CaptainService.getCaptainProfile(
      token
    );
    // console.log("captainProfileResponse", captainProfileResponse);
    if (!captainProfileResponse.success) {
      return navigate("/auth/captain-login");
    }
    setCaptainDetails(captainProfileResponse.captain)
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      validateToken();
    } else {
      navigate("/auth/captain-login")
    }
  }, [location.pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return <>{children}</>;
};

export default CaptainProtector;
