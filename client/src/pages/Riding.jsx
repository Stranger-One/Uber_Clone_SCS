import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";
import car from "../assets/UberXL.webp";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";

const Riding = () => {
  return (
    <div className="w-full h-screen ">
      <div className="w-full h-3/5 ">
      <Link to='/user' className="absolute top-4 left-4 p-2 bg-white rounded-full flex items-center justify-center">
        <MdHome size={32}/>
      </Link>
        <img
          src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg"
          alt=""
          className="object-cover h-full w-full"
        />
      </div>
      <div className="w-full h-2/5 p-2">
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-start justify-between p-2">
            <div className="">
              <img
                src={car} // Replace with your car image URL
                alt="Car"
                className="h-20 object-cover mx-auto"
              />
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
          <div className="mt-">
            <button type="button" className="w-full py-3 text-lg bg-green-600 text-white font-semibold rounded-lg">Make a Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Riding;
