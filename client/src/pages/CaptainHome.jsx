import React, { useState } from "react";

import { CaptainDetails, NewRideOffer, UberLogo } from "../components";

const CaptainHome = () => {
  const [newRide, setNewRide] = useState(true)
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
