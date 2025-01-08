import React from "react";
import car from "../assets/UberXL.webp";
import { FaArrowLeft, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

const ConfirmRide = ({ setPannel, createRide, selectedVehicle, fromTo }) => {

  // console.log("fromTo", fromTo)
  const handleConfirmRide = () => {
    createRide()
  };
  return (
    <div className="w-full h-fit bg-gray-600 overflow-auto">
      <div className="flex flex-col items-center bg-white shadow-md rounded-md w-full max-w-md mx-auto p-4 space-y-4">
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            Confirm your Ride
          </h2>
          <button onClick={() => setPannel(2)} type="button" className="mr-4">
            <FaArrowLeft size={28} />
          </button>
        </div>

        {/* Car Image */}
        <img
          src={selectedVehicle.image} // Replace with your car image URL
          alt="Car"
          className="h-40 object-contain mx-auto"
        />

        {/* Location Details */}
        <div className="w-full space-y-2">
          {/* Pickup */}
          <div className="flex items-start space-x-2">
            <FaMapMarkerAlt size={28} className="text-gray-500 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-800 text-2xl">{fromTo.origin.display_place}</p>
              <p className="text-gray-500 text-lg line-clamp-2">{fromTo.origin.display_name}</p>
            </div>
          </div>

          {/* Drop-off */}
          <div className="flex items-start space-x-2">
            <FaMapMarkerAlt size={28} className="text-gray-500 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-800 text-2xl">{fromTo.destination.display_place}</p>
              <p className="text-gray-500 text-lg line-clamp-2">{fromTo.destination.display_name}</p>
            </div>
          </div>
        </div>

        {/* Fare Details */}
        <div className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-md  text-xl">
          <div className="flex items-center space-x-2">
            <FaRupeeSign className="text-gray-600" />
            <p className="font-semibold text-gray-800">{selectedVehicle.fare}</p>
          </div>
          <p className=" text-gray-500">Cash</p>
        </div>

        {/* Confirm Button */}
        <button type="button" onClick={handleConfirmRide} className="w-full py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
