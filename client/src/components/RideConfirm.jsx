import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";
import { BsCash } from "react-icons/bs";

import car from "../assets/UberXL.webp";

const RideConfirm = ({ride}) => {
  return (
    <div className="w-full h-fit bg-white overflow-auto">
      <div className="">
        <div className="py-2">
          <h2 className="text-2xl uppercase font-bold text-center underline">Your Ride is Ready</h2>
        </div>
        <div className="flex items-start justify-between p-2">
          <div className="">
            <div className=" relative flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-500 rounded-full z-10" 
              style={{
                backgroundImage: "url('')"
              }}
              ></div>
              <img
                src={car} // Replace with your car image URL
                alt="Car"
                className="h-full scale-[2] object-contain mx-auto absolute top-0 left-[50%]"
              />
            </div>
          </div>
          <div className="flex flex-col items-end text-lg">
            <h4 className="uppercase text-lg font-semibold">{`${ride.captain.fullname.firstname} ${ride.captain.fullname.lastname}`}</h4>
            <h1 className="text-3xl font-bold capitalize">{ride.captain.vehicle.plate}</h1>
            <p>{ride.otp}</p>
            <div className="flex items-center gap-1 text-lg">
              <MdOutlineStar />
              4.9
            </div>
          </div>
        </div>
        {/* Location Details */}
        <div className="w-full space-y-2 p-2">
          {/* Pickup */}
          <div className="flex items-start space-x-2 py-1">
            <FaMapMarkerAlt size={28} className="text-gray-500 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-800 text-2xl">{ride.pickup}</p>
              <p className="text-gray-500 text-lg"></p>
            </div>
          </div>

          {/* Drop-off */}
          <div className="flex items-start space-x-2 py-1 border-t-2">
            <FaMapMarkerAlt size={28} className="text-gray-500 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-800 text-2xl">{ride.destination}</p>
              <p className="text-gray-500 text-lg"></p>
            </div>
          </div>

          {/* Drop-off */}
          <div className="flex items-start space-x-2 border-t-2">
            <BsCash size={28} className="text-gray-500 mt-1" />
            <div>
              <p className="font-semibold text-gray-800 text-2xl">₹ {ride.fare}</p>
              <p className="text-gray-500 text-lg">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideConfirm;
