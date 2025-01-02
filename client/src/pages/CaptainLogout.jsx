import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../contexts/globalContext";
import CaptainService from "../services/CaptainService";

const CaptainLogout = () => {
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("token"));
    const { setCaptainData } = useGlobal();
  
    useEffect(() => {
      const logoutCaptain = async () => {
        const response = await CaptainService.logoutCaptain(token);
        if (response.success) {
          localStorage.removeItem("token");
          setCaptainData(null);
          navigate("/auth/captain-login");
        }
      };
      logoutCaptain();
    }, [token, navigate]);
  return (
    <div>CaptainLogout</div>
  )
}

export default CaptainLogout