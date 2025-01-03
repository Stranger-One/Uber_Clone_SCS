import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CaptainService from "../services/CaptainService";

const CaptainProtector = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const token = JSON.parse(localStorage.getItem("token"));
    const navigate = useNavigate();
    const location = useLocation();
  
    // console.log("token", token);
  
    const validateToken = async () => {
      const captainProfileResponse = await CaptainService.getCaptainProfile(
        token
      );
    //   console.log("captainProfileResponse", captainProfileResponse);
      if (!captainProfileResponse.success) {
        return navigate("/auth/captain-login");
      }
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
