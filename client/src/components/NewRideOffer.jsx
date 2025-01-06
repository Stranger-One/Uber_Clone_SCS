import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const NewRideOffer = ({ setNewRide }) => {
  return (
    <div className="w-full h-[400px] absolute bottom-0 left-0 z-20 p-2">
      <div className="bg-gray-200 rounded-md p-2 h-full flex flex-col justify-between">
        <div className="flex items-start justify-between py-2">
          <div className=" relative flex items-start gap-2">
            <div
              className="w-14 h-14 bg-gray-500 rounded-lg z-10"
              style={{
                backgroundImage: "url('')",
              }}
            ></div>
            <h2 className="text-2xl font-semibold ">Harsh Patel</h2>
          </div>

          <div className="flex flex-col items-end text-lg">
            <h1 className="text-3xl font-bold">₹125.00</h1>
            <p className="font-semibold text-gray-600 text-lg">2.2 km</p>
          </div>
        </div>
        <div className="w-full p-2">
          {/* Pickup */}
          <div className="flex items-start space-x-2 py-2 border-t-2 border-white">
            <div>
              <p className="text-gray-500 text-lg uppercase">Pick Up</p>
              <p className="font-semibold text-gray-800 text-2xl">562/11-A Kankariya Talab, Bhopal</p>
            </div>
          </div>

          {/* Drop-off */}
          <div className="flex items-start space-x-2 py-2 border-t-2 border-white">
            <div>
              <p className="text-gray-500 text-lg uppercase">Drop Off</p>
              <p className="font-semibold text-gray-800 text-2xl">562/11-A Kankariya Talab, Bhopal</p>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between gap-2">
          <button type="button" onClick={() => setNewRide(false)} className="w-full py-3 rounded-lg text-xl font-bold text-gray-600 border-gray-600 border-2">Ignore</button>
          <Link to={'/captain/client'} className="w-full py-3 rounded-lg text-xl font-bold bg-green-600 block text-center">Details</Link>
        </div>
      </div>
    </div>
  );
};

export default NewRideOffer;
