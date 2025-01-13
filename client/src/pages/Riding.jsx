import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";
import car from "../assets/UberXL.webp";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { useCaptainData } from "../contexts/CaptainContext";

const Riding = ({ride}) => {
  const { newRideDetails, setNewRideDetails } = useCaptainData()
  console.log("newRideDetails", ride);
  const [openDetails, setOpenDetails] = useState(false)

  return (
    <div className="w-full h-screen flex flex-col bg-gray-300" >
      <div className="w-full h-full ">
        <Link to='/user' className="absolute top-4 left-4 p-2 bg-white rounded-full flex items-center justify-center">
          <MdHome size={32} />
        </Link>
        <img
          src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg"
          alt=""
          className="object-cover h-full w-full"
        />
      </div>
      <div className="w-full h-fit p-2 rounded-t-lg" style={{
                boxShadow: "0px -5px 10px gray",
              }}>
        <div className="w-full py-2" onClick={()=>setOpenDetails(state => !state)}>
          <div className="bg-gray-400 w-40 h-2 rounded-full mx-auto"></div>
        </div>
        <div className={`flex flex-col justify-between ${openDetails?"h-fit":"h-0"}` }>
          <div className="flex items-start justify-between p-2">
            <div className="">
              <img
                src={car} // Replace with your car image URL
                alt="Car"
                className="h-20 object-cover mx-auto"
              />
            </div>

            <div className="flex flex-col items-end text-lg">
              <h4 className="uppercase text-lg font-semibold">{`${ride?.captain?.fullname?.firstname} ${ride?.captain?.fullname?.lastname}`}</h4>
              <h1 className="text-3xl font-bold">{ride?.captain.vehicle.plate}</h1>
              <p></p>
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
              <FaMapMarkerAlt size={28} className="text-gray-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800 text-2xl line-clamp-2">{ride?.pickup}</p>
                {/* <p className="text-gray-500 text-lg">Kankariya Talab, Bhopal</p> */}
              </div>
            </div>

            {/* Drop-off */}
            <div className="flex items-start space-x-2 border-t-2">
              <FaMapMarkerAlt size={28} className="text-gray-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800 text-2xl line-clamp-2">{ride?.destination}</p>
                {/* <p className="text-gray-500 text-lg">Kankariya Talab, Bhopal</p> */}
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
