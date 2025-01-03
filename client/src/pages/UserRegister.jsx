import React, { useState } from "react";
import { ButtonLoader, InputWithLable, UberLogo } from "../components";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { toast } from "react-hot-toast";
import { useGlobal } from "../contexts/globalContext";

const UserRegister = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
    const {userData, setUserData} = useGlobal();
  
  const navigate = useNavigate()

  const handleUserRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("User register", { firstname, lastname, email, password });
    const userData = {
      firstname,
      lastname,
      email,
      password,
    }

    const response = await UserService.registerUser(userData)
    // console.log("User register response", response);
    if (response?.success) {
      toast.success(response.message)
      localStorage.setItem("token", JSON.stringify(response.token));
      setUserData(response.user);
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      navigate("/user")
    } else {
      console.log("User register response", response);
      if(response?.errors){
        response.errors.map((error) => toast.error(error.msg.split("::")[1]))
      } else if(response?.message){
        toast.error(response.message)
      }
    }

    setLoading(false);
  };

  return (
    <section className=" w-full h-screen px-6 py-10 flex flex-col justify-between">
      <UberLogo />

      <form onSubmit={handleUserRegister} className="w-full h-full mt-10">
      <h1 className="text-3xl font-bold text-center mb-4 underline">User Register</h1>
        <div className="grid grid-cols-2 gap-1">
          <InputWithLable
            id="first-name"
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <InputWithLable
            id="last-name"
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
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
          {loading ? <ButtonLoader size={24} /> : "Create New Account"}
        </button>
        <p className="text-sm text-center mt-4">
          Already have an Account?{" "}
          <Link
            className="text-blue-600 text-sm font-semibold hover:underline"
            to="/auth/user-login"
          >
            Login
          </Link>{" "}
        </p>
      </form>
      <div className="w-full">
        <Link
          to="/auth/captain-register"
          className="w-full py-2 flex items-center justify-center bg-green-600 text-white font-semibold rounded-md"
        >
          Register as Captain
        </Link>
      </div>
    </section>
  );
};

export default UserRegister;
