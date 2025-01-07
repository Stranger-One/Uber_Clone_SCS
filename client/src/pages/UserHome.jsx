import React, { useState } from "react";
import {
  AvailableVehicles,
  ConfirmRide,
  LookingForDriver,
  RideConfirm,
  SearchRideForm,
  SearchRideSuggestions,
  UberLogo,
} from "../components";
import { FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

const UserHome = () => {
  const [pannel, setPannel] = useState(1);
  const [fromTo, setFromTo] = useState({})
  const [rideRoute, setRideRoute] = useState(null)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const token = JSON.parse(localStorage.getItem("token"))

  const createRide = () => {
    // console.log("selectedVehicle", selectedVehicle);
    // console.log("fromTo", fromTo);
    // console.log("rideRoute", rideRoute);
    // console.log("token", token);
    
    const data = {
      token,
      pickup: fromTo.origin.display_name,
      destination: fromTo.destination.display_name,
      vehicle: {
        fare: selectedVehicle.fare
      }
    }
    console.log("data", data)
    // create ride
  };


  return (
    <section className="w-full h-screen relative">
      <UberLogo className="absolute top-6 left-6" />
      <div className="w-full h-full bg-blue-500"></div>

      <div className="w-full h-screen absolute bottom-0 left-0 flex flex-col justify-end ">
        {pannel === 1 ? (
          <SearchRideForm setPannel={setPannel} setRideRoute={setRideRoute} setFromTo={setFromTo} />
        ) : pannel === 2 ? (
          <AvailableVehicles setPannel={setPannel} rideRoute={rideRoute} setSelectedVehicle={setSelectedVehicle} createRide={createRide} />
        ) : pannel === 3 ? (
          <ConfirmRide setPannel={setPannel} rideRoute={rideRoute} selectedVehicle={selectedVehicle} createRide={createRide} fromTo={fromTo} />
        ) : pannel === 4 ? (
          <LookingForDriver />
        ) : (
          <RideConfirm />
        )}
      </div>
    </section>
  );
};

export default UserHome;
