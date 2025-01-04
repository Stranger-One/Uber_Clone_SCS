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
  const [isOpenSuggestions, setIsOpenSuggestions] = useState(false);
  const [pannel, setPannel] = useState(5);

  return (
    <section className="w-full h-screen relative">
      <div className="w-full h-full bg-blue-500"></div>
      <UberLogo className="absolute top-6 left-6" />

      <div className="w-full h-screen absolute bottom-0 left-0 flex flex-col justify-end ">
        {pannel === 1 ? (
          <>
            <SearchRideForm
              setPannel={setPannel}
              isOpenSuggestions={isOpenSuggestions}
              setIsOpenSuggestions={setIsOpenSuggestions}
            />
            <SearchRideSuggestions isOpenSuggestions={isOpenSuggestions} />
          </>
        ) : pannel === 2 ? (
          <AvailableVehicles setPannel={setPannel} />
        ) : pannel === 3 ? (
          <ConfirmRide setPannel={setPannel}/>
        ): pannel === 4 ?(
          <LookingForDriver/>
        ):(
          <RideConfirm/>
        )}
      </div>
    </section>
  );
};

export default UserHome;
