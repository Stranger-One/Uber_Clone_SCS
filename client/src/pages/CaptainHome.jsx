import React, { useEffect, useState } from "react";

import { CaptainDetails, NewRideOffer, UberLogo } from "../components";
import { useCaptainData } from "../contexts/CaptainContext";
import { useSocket } from "../contexts/SocketContext";

const CaptainHome = () => {
  const [newRide, setNewRide] = useState(false)
  const { socket } = useSocket()
  const { captainDetails } = useCaptainData()

  useEffect(() => {
    if (socket && captainDetails) {
      socket.emit("join", { userId: captainDetails?._id, userType: "captain" })

      const interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-captain-location", {
            captainId: captainDetails._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        });
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [socket, captainDetails])
  
  return (
    <section className="w-full h-screen relative grid grid-rows-[65vh_35vh]">
      <UberLogo className="absolute top-6 left-6" />
      <div className="w-full h-full bg-blue-500"></div>

      <div className="w-full flex flex-col justify-end p-2">
        <CaptainDetails />
      </div>
      {newRide && <NewRideOffer setNewRide={setNewRide} />}
    </section>
  );
};

export default CaptainHome;
