import React from 'react'
import { MdAccessTime } from "react-icons/md";
import { MdSpeed } from "react-icons/md";
import { useCaptainData } from '../contexts/CaptainContext';

const CaptainDetails = () => {
    const { captainDetails, setCaptainDetails } = useCaptainData()
    console.log("captainDetails", captainDetails);
    
  
  return (
    <div className="w-full h-fit bg-white overflow-auto">
          <div className="">
            <div className="flex items-start justify-between py-2">
              <div className=" relative flex items-center gap-2">
                <div
                  className="w-14 h-14 bg-gray-500 rounded-full z-10"
                  style={{
                    backgroundImage: "url('')",
                  }}
                ></div>
                <h2 className="text-2xl font-semibold capitalize">{captainDetails?.fullname?.firstname + " " + captainDetails?.fullname?.lastname}</h2>
              </div>

              <div className="flex flex-col items-end text-lg">
                <h1 className="text-3xl font-bold">₹125.00</h1>
                <p className="font-semibold">Earned</p>
              </div>
            </div>
            {/* Location Details */}
            <div className="w-full p-2 flex justify-between items-center gap-2 bg-gray-300 rounded-lg mt-10">
              <div className="text-center px-2">
                <MdAccessTime size={32} className="mx-auto" />
                <h2 className="text-2xl font-bold">10.2</h2>
                <p className="capitalize font-semibold">Hours Online</p>
              </div>
              <div className="text-center px-2">
                <MdSpeed size={32} className="mx-auto" />
                <h2 className="text-2xl font-bold">10.2</h2>
                <p className="capitalize font-semibold">Hours Online</p>
              </div>
              <div className="text-center px-2">
                <MdAccessTime size={32} className="mx-auto" />
                <h2 className="text-2xl font-bold">10.2</h2>
                <p className="capitalize font-semibold">Hours Online</p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default CaptainDetails