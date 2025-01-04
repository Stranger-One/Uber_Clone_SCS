import React from "react";
import Route from "./Route";

const AfterOtpComfirm = ({setPannel, isOpenRoutes, setIsOpenRoutes}) => {
  return (
    <>
      <div
        className={`rounded-t-lg p-2`}
        style={{
          boxShadow: "0px -5px 10px gray",
        }}
        onClick={() => setIsOpenRoutes((state) => !state)}
      >
        <div className="flex justify-center py-2">
          <div className="w-20 h-[6px] bg-gray-600 rounded-lg "></div>
        </div>
        <div className="flex gap-2">
          <div className="w-14 h-14 bg-gray-500 rounded-full"></div>
          <div className="">
            <p className="text-lg text-gray-600 font-bold leading-4">
              Pick up at
            </p>
            <h2 className="text-2xl font-bold">3232 Swati Village</h2>
          </div>
        </div>
      </div>
      <div
        className={`${
          isOpenRoutes ? "h-fit" : "h-0"
        } transition-height duration-200 w-full`}
      >
        <div className="p-4 space-y-6 border-gray-600 border-t-[1px] py-4">
          <div className="w-full flex justify-between items-center gap-2  rounded-lg mt-10">
            <div className="text-center px-2">
              <p className="capitalize text-lg text-gray-600 font-semibold">
                EST
              </p>
              <h2 className="text-2xl font-bold">5 min</h2>
            </div>
            <div className="text-center px-2">
              <p className="capitalize text-lg text-gray-600 font-semibold">
                Distance
              </p>
              <h2 className="text-2xl font-bold">3.2 km</h2>
            </div>
            <div className="text-center px-2">
              <p className="capitalize text-lg text-gray-600 font-semibold">
                Fare
              </p>
              <h2 className="text-2xl font-bold">₹10.02</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={()=>setPannel(3)}
            className="w-full py-3 rounded-lg text-xl font-bold bg-yellow-500 block text-center"
          >
            Finish Ride
          </button>
        </div>
        <div className="border-gray-600 border-t-[1px] py-4">
          <Route />
          <Route />
          <Route />
        </div>
      </div>
    </>
  );
};

export default AfterOtpComfirm;
