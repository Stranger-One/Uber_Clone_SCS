import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AfterOtpComfirm, Route } from "../components";
import { useCaptainData } from "../contexts/CaptainContext";
import RideService from "../services/RideService";

const PickUp = () => {
  const navigate = useNavigate();
  const [isOpenRoutes, setIsOpenRoutes] = useState(false);
  const [isOtpConfirmed, setIsOtpConfirmed] = useState(false);
  const [pannel, setPannel] = useState(1);
  const { newRideDetails, setNewRideDetails } = useCaptainData()
  const [otp, setOtp] = useState('')
  const token = JSON.parse(localStorage.getItem("token"))
  

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    console.log("start Ride:", {
      ...newRideDetails[0],
      otp,
    })

    const response = await RideService.confirmOtp(newRideDetails[0]._id, otp, token)
    console.log("response", response)
    if(response?.success){
      setIsOtpConfirmed(true);
      setPannel(2)
    } else {
      alert('Invalid OTP')
    }
  };

  const handleFinishRide = async (e) => {
    setPannel(1)

    const response = await RideService.updateRide(newRideDetails[0]._id, {
      status: "completed",
    }, token)

    console.log("finish ride update", response);
    



    navigate('/captain')

  };

  return (
    <section className="w-full h-screen relative">
      <div className="header flex items-center justify-between p-4 fixed top-0 left-0 w-full">
        <button type="button" onClick={() => navigate(-1)} className="">
          <FaArrowLeft size={32} />
        </button>
        <h2 className="text-xl font-semibold capitalize">pick up</h2>
      </div>

      <div className="w-full h-full ">
        <img src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" alt="" className="h-full object-cover" />
      </div>

      <div className="w-full flex flex-col justify-end h-full pt-20 absolute top-0 left-0">
        {pannel === 1 ? (
          <form
            onSubmit={handleOtpSubmit}
            className="w-full bg-gray-300 p-4 rounded-t-lg space-y-5"
          >
            <h1 className="text-3xl text-center font-semibold">Confirm OTP</h1>
            <input
              required
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full p-3 text-xl border-none outline-none rounded-lg"
            />
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-2xl font-semibold rounded-lg text-white"
            >
              Confirm
            </button>
          </form>
        ) : pannel === 2 ? (
          <AfterOtpComfirm

            setPannel={setPannel}
            isOpenRoutes={isOpenRoutes}
            setIsOpenRoutes={setIsOpenRoutes}
          />
        ) : (
          <div className="absolute bottom-0 w-full bg-white">
            <div
              className={`rounded-t-lg p-2`}
              style={{
                boxShadow: "0px -5px 10px gray",
              }}
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
                onClick={handleFinishRide}
                className="w-full py-3 rounded-lg text-xl font-bold bg-yellow-500 block text-center"
              >
                Confirm Finish Ride
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PickUp;
