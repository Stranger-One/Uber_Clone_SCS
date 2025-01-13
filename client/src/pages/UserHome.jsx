import React, { useCallback, useEffect, useState } from "react";
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
import axios from "axios";
import { useSocket } from "../contexts/SocketContext";
import { useGlobal } from "../contexts/globalContext";
import Riding from "./Riding";

const UserHome = () => {
  const [pannel, setPannel] = useState(1);
  const [fromTo, setFromTo] = useState({})
  const [rideRoute, setRideRoute] = useState(null)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const token = JSON.parse(localStorage.getItem("token"))
  const [ride, setRide] = useState()
  const { socket } = useSocket()
  const { userData } = useGlobal()

  const createRide = async () => {
    // console.log("selectedVehicle", selectedVehicle);
    // console.log("fromTo", fromTo);
    // console.log("rideRoute", rideRoute);
    // console.log("token", token);

    const data = {
      pickup: fromTo.origin.display_name,
      destination: fromTo.destination.display_name,
      vehicle: {
        fare: selectedVehicle.fare
      }
    }
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ride/create`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    console.log("response", response.data)
    setPannel(4)
  };

  const handleRideUpdate = useCallback((data)=>{
    console.log("handleRideUpdate", data);
    if(data.status === "accepted"){
      setPannel(5)
      setRide(data)
    }
    if(data.status === "completed"){
      setPannel(1)
      setRide(null)

    }
  }, [])
  const handleRideStart = useCallback((data)=>{
    console.log("handleRideUpdate", data);
    
    setPannel(6)
  }, [])

  useEffect(() => {
    if (socket && userData) {
      // console.log("userData", userData)
      socket.emit("join", { userId: userData?._id, userType: "user" })
    }
  }, [socket, userData])

  useEffect(() => {
    if (socket && userData) {
      socket.on("RIDE_UPDATE", handleRideUpdate)
      socket.on("ride_start", handleRideStart)
      
      return ()=>{
        socket.off("RIDE_UPDATE", handleRideUpdate)
        socket.off("ride_start", handleRideStart)

      }
    }
  }, [socket, userData])





  return (
    <section className="w-full h-screen relative">
      <UberLogo className="absolute top-6 left-6" />
      <div className="w-full h-full ">
        <img src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" alt="" className="h-full object-cover" />
      </div>

      <div className="w-full h-screen absolute bottom-0 left-0 flex flex-col justify-end ">
        {pannel === 1 ? (
          <SearchRideForm setPannel={setPannel} setRideRoute={setRideRoute} setFromTo={setFromTo} />
        ) : pannel === 2 ? (
          <AvailableVehicles setPannel={setPannel} rideRoute={rideRoute} setSelectedVehicle={setSelectedVehicle} createRide={createRide} />
        ) : pannel === 3 ? (
          <ConfirmRide setPannel={setPannel} rideRoute={rideRoute} selectedVehicle={selectedVehicle} createRide={createRide} fromTo={fromTo} />
        ) : pannel === 4 ? (
          <LookingForDriver fromTo={fromTo} />
        ) : pannel === 5 ? (
          <RideConfirm ride={ride} />
        ) : (
          <Riding ride={ride}/>
        )}
      </div>
    </section>
  );
};

export default UserHome;
