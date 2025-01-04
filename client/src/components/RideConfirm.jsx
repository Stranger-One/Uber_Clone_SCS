import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";
import car from "../assets/UberXL.webp";

const RideConfirm = () => {
  return (
    <div className="w-full h-[300px] bg-white overflow-auto">
      <div className="">
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
            <h4 className="uppercase text-lg font-semibold">Santh</h4>
            <h1 className="text-3xl font-bold">KA15K00-0</h1>
            <p>White Suxuki S-Presso LXI</p>
            <div className="flex items-center gap-1 text-lg">
              <MdOutlineStar />
              4.9
            </div>
          </div>
        </div>
        {/* Location Details */}
        <div className="w-full space-y-2 p-2">
          {/* Pickup */}
          <div className="flex items-start space-x-2">
            <FaMapMarkerAlt size={28} className="text-gray-500 mt-1" />
            <div>
              <p className="font-semibold text-gray-800 text-2xl">562/11-A</p>
              <p className="text-gray-500 text-lg">Kankariya Talab, Bhopal</p>
            </div>
          </div>

          {/* Drop-off */}
          <div className="flex items-start space-x-2 border-t-2">
            <FaMapMarkerAlt size={28} className="text-gray-500 mt-1" />
            <div>
              <p className="font-semibold text-gray-800 text-2xl">562/11-A</p>
              <p className="text-gray-500 text-lg">Kankariya Talab, Bhopal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideConfirm;
