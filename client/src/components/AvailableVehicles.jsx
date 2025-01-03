import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuTimer } from "react-icons/lu";
import car from "../assets/UberXL.webp";
import moto from "../assets/moto.jpeg";
import auto from "../assets/auto.jpeg";
import { RiUser3Fill } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";


const Vehicles = ({setPannel}) => {
  return (
    <div onClick={()=>setPannel(3)} className="flex items-center gap-2 p-2 bg-gray-300 rounded-lg">
      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
        <img
          src={car}
          alt="vehicle"
          className="object-cover h-full object-center"
        />
      </div>
      <div className="w-full">
        <span className="text-lg font-semibold flex items-center gap-1">
          <h2 className="text-lg">Vehicle Name</h2> <RiUser3Fill /> <h4>2</h4>
        </span>
        <h4>2 min away • 15:24</h4>
        <p className="text-sm leading-4">Affordable, compact rides</p>
      </div>
      <div className=" flex-shrink-0">
        <h3 className="text-lg font-semibold">₹125.00</h3>
      </div>
    </div>
  );
};

const AvailableVehicles = ({setPannel}) => {
  return (
    <div className="w-full h-[400px] bg-white p-2 flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-fit flex-nowrap gap-3 p-3 bg-gray-300 rounded-full">
          <LuTimer size={20} />{" "}
          <h4 className="text-lg font-semibold">Leave Now</h4>{" "}
          <IoIosArrowDown size={20} />
        </div>
        <button onClick={()=>setPannel(1)} type="button" className="mr-4">
            <FaArrowLeft size={28}/>
        </button>
      </div>
      <div className="w-full h-full overflow-auto flex flex-col gap-2 py-2">
        <Vehicles setPannel={setPannel} />
        <Vehicles setPannel={setPannel} />
        <Vehicles setPannel={setPannel} />
        <Vehicles setPannel={setPannel} />
        <Vehicles setPannel={setPannel} />
        <Vehicles setPannel={setPannel} />
      </div>
    </div>
  );
};

export default AvailableVehicles;
