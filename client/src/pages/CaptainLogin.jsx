import React, { useState } from "react";
import { ButtonLoader, InputWithLable, UberLogo } from "../components";
import { Link, useNavigate } from "react-router-dom";
import CaptainService from "../services/CaptainService";
import toast from "react-hot-toast";
import { useGlobal } from "../contexts/globalContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { captainData, setCaptainData } = useGlobal();
  const navigate = useNavigate();

  const handleCaptainLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const Data = { email, password };
    console.log("Captain Login", Data);

    const response = await CaptainService.loginCaptain(Data);
    console.log("Captain login response", response);
    if (response?.success) {
      toast.success(response.message);
      localStorage.setItem("token", JSON.stringify(response.token));
      setCaptainData(response.captain);
      setEmail("");
      setPassword("");
      navigate("/captain");
    } else {
      if (response?.errors) {
        response.errors.map((error) => toast.error(error.msg.split("::")[1]));
      } else if (response?.message) {
        toast.error(response.message);
      }
    }

    setLoading(false);
  };

  return (
    <section className=" w-full h-screen px-6 py-10 flex flex-col justify-between">
      <UberLogo />

      <form onSubmit={handleCaptainLogin} className="w-full h-full mt-10">
        <h1 className="text-3xl font-bold text-center mb-4 underline">
          Captain Login
        </h1>
        <InputWithLable
          id="email"
          label="What's your email?"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputWithLable
          id="password"
          label="Enter Password"
          type="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black hover:opacity-90 w-full text-white p-2 rounded-md font-semibold"
        >
          {loading ? <ButtonLoader size={24} /> : "Login as Captain"}
        </button>
        <p className="text-sm text-center mt-4">
          New here?{" "}
          <Link
            className="text-blue-600 text-sm font-semibold hover:underline"
            to="/auth/captain-register"
          >
            Create New Account
          </Link>{" "}
        </p>
      </form>
      <div className="w-full">
        <Link
          to="/auth/user-login"
          className="w-full py-2 flex items-center justify-center bg-green-600 text-white font-semibold rounded-md"
        >
          Sign in as User
        </Link>
      </div>
    </section>
  );
};

export default CaptainLogin;
