import React, { useState } from "react";
import { ButtonLoader, InputWithLable, UberLogo } from "../components";
import { Link, useNavigate } from "react-router-dom";
import CaptainService from "../services/CaptainService";
import { useGlobal } from "../contexts/globalContext";
import { toast } from "react-hot-toast";

const CaptainRegister = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [loading, setLoading] = useState(false);
  const { captainData, setCaptainData } = useGlobal();
  const navigate = useNavigate();

  const handleCaptainRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const Data = {
      firstname,
      lastname,
      email,
      password,
      vehicle: {
        type: vehicleType,
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
      },
    };
    console.log("Captain register", Data);

    const response = await CaptainService.registerCaptain(Data);
    console.log("Captain register response", response);
    if (response?.success) {
      toast.success(response.message);
      localStorage.setItem("token", JSON.stringify(response.token));
      setCaptainData(response.captain);
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setVehicleType("");
      setVehicleColor("");
      setVehiclePlate("");
      setVehicleCapacity("");
      navigate("/captain");
    } else {
      // console.log("Captain register response", response);
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

      <form onSubmit={handleCaptainRegister} className="w-full h-full mt-10">
        <h1 className="text-3xl font-bold text-center mb-4 underline">
          Captain Register
        </h1>
        <div className="grid grid-cols-2 gap-1">
          <InputWithLable
            id="first-name"
            label="First Name"
            type="text"
            placeholder="Enter first name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <InputWithLable
            id="last-name"
            label="Last Name"
            type="text"
            placeholder="Enter last name"
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
        <div className="grid grid-cols-2 gap-1">
          <div className="flex flex-col gap-1 mb-4">
            <label
              htmlFor="vehicle-type"
              className="text-lg font-semibold cursor-pointer"
            >
              Vehicle Type
            </label>
            <select
              id="vehicle-type"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="p-2 rounded-md bg-gray-300 placeholder:text-gray-600 placeholder:font-semibold"
            >
              <option className="cursor-pointer" value="">
                Select vehicle type
              </option>
              <option className="cursor-pointer" value="car">
                Car
              </option>
              <option className="cursor-pointer" value="motorcycle">
                Motorcycle
              </option>
              <option className="cursor-pointer" value="auto">
                Auto
              </option>
            </select>
          </div>
          <InputWithLable
            id="vehicle-color"
            label="Vehicle Color"
            type="text"
            placeholder="Enter vehicle color"
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-1">
          <InputWithLable
            id="vehicle-plate"
            label="Vehicle Plate"
            type="text"
            placeholder="Enter vehicle plate"
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
          />
          <InputWithLable
            id="vehicle-capacity"
            label="Vehicle Capacity"
            type="number"
            placeholder="Enter vehicle capacity"
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-black hover:opacity-90 w-full text-white p-2 rounded-md font-semibold"
        >
          {loading ? <ButtonLoader size={24} /> : "Create Captain Account"}
        </button>
        <p className="text-sm text-center mt-4">
          Already have an Account?{" "}
          <Link
            className="text-blue-600 text-sm font-semibold hover:underline"
            to="/auth/captain-login"
          >
            Login
          </Link>{" "}
        </p>
      </form>
      <div className="w-full">
        <Link
          to="/auth/user-register"
          className="w-full py-2 flex items-center justify-center bg-green-600 text-white font-semibold rounded-md"
        >
          Register as User
        </Link>
      </div>
    </section>
  );
};

export default CaptainRegister;
