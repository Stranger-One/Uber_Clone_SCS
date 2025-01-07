import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuTimer } from "react-icons/lu";
import car from "../assets/UberXL.webp";
import moto from "../assets/moto.jpeg";
import auto from "../assets/auto.jpeg";
import { RiUser3Fill } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";


const Vehicles = ({ setPannel, vehicle, fare, setSelectedVehicle }) => {
  console.log(vehicle, fare)

  let vehicleDetails = {}

  switch (vehicle) {
    case "car":
      vehicleDetails = {
        image: car,
        name: "Uber XL",
        capacity: 6,
        fare: fare,
      }
      break;
    case "auto":
      vehicleDetails = {
        image: auto,
        name: "Uber Auto",
        capacity: 4,
        fare: fare,
      }
      break;
    case "moto":
      vehicleDetails = {
        image: moto,
        name: "Uber Moto",
        capacity: 2,
        fare: fare,
      }
      break;

    default:
      break;
  }

  const handleVehicleSelect = (vehicleDetails) => {
    setSelectedVehicle(vehicleDetails)
      setPannel(3)
  };

  return (
    <div onClick={()=>handleVehicleSelect(vehicleDetails)} className="flex items-center gap-2 p-2 bg-gray-300 rounded-lg">
      <div className="w-16 h-16 overflow-hidden flex-shrink-0">
        <img
          src={vehicleDetails?.image}
          alt="vehicle"
          className="object-cover h-full object-center bg-blend-lighten"
        />
      </div>
      <div className="w-full">
        <span className="text-lg font-semibold flex items-center gap-1">
          <h2 className="text-lg">{vehicleDetails.name}</h2> <RiUser3Fill /> <h4>{vehicleDetails.capacity}</h4>
        </span>
        {/* <h4>2 min away • 15:24</h4> */}
        <p className="text-sm leading-4">Affordable, compact rides</p>
      </div>
      <div className=" flex-shrink-0">
        <h3 className="text-lg font-semibold">₹{vehicleDetails.fare}</h3>
      </div>
    </div>
  );
};

const AvailableVehicles = ({ setPannel, rideRoute, setSelectedVehicle }) => {
  return (
    <div className="w-full h-[400px] bg-white p-2 flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-fit flex-nowrap gap-3 p-3 bg-gray-300 rounded-full">
          <LuTimer size={20} />{" "}
          <h4 className="text-lg font-semibold">Leave Now</h4>{" "}
          <IoIosArrowDown size={20} />
        </div>
        <button onClick={() => setPannel(1)} type="button" className="mr-4">
          <FaArrowLeft size={28} />
        </button>
      </div>
      <div className="w-full h-full overflow-auto flex flex-col gap-2 py-2">
        {Object.keys(rideRoute?.fare).map((vehicle, index) => (
          <Vehicles key={index} setPannel={setPannel} vehicle={vehicle} fare={rideRoute.fare[vehicle]} setSelectedVehicle={setSelectedVehicle} />
        ))}
      </div>
    </div>
  );
};

export default AvailableVehicles;
