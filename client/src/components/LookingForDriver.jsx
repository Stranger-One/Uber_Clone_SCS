import React from "react";
import { FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";
import car from "../assets/UberXL.webp";

const LookingForDriver = () => {
  return (
    <div className="w-full h-[440px] bg-gray-600 overflow-auto">
      <div className="flex flex-col items-center bg-white shadow-md rounded-md w-full max-w-md mx-auto p-4 space-y-4">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800">
          Looking For a Driver
        </h2>

        {/* Car Image */}
        <div className=" relative flex items-center justify-center">
          <div className="w-40 h-40 bg-gray-500 rounded-full animate-ping "></div>
          <img
            src={car} // Replace with your car image URL
            alt="Car"
            className="h-40 object-contain mx-auto z-10 absolute top-0 left-0"
          />
        </div>

        {/* Location Details */}
        <div className="w-full space-y-2">
          {/* Pickup */}
          <div className="flex items-start space-x-2">
            <FaMapMarkerAlt size={28} className="text-gray-500 mt-1" />
            <div>
              <p className="font-semibold text-gray-800 text-2xl">562/11-A</p>
              <p className="text-gray-500 text-lg">Kankariya Talab, Bhopal</p>
            </div>
          </div>

          {/* Drop-off */}
          <div className="flex items-start space-x-2">
            <FaMapMarkerAlt size={28} className="text-gray-500 mt-1" />
            <div>
              <p className="font-semibold text-gray-800 text-2xl">562/11-A</p>
              <p className="text-gray-500 text-lg">Kankariya Talab, Bhopal</p>
            </div>
          </div>
        </div>

        {/* Fare Details */}
        <div className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-md  text-xl">
          <div className="flex items-center space-x-2">
            <FaRupeeSign className="text-gray-600" />
            <p className="font-semibold text-gray-800">193.20</p>
          </div>
          <p className=" text-gray-500">Cash</p>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
