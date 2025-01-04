import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const ClientDetails = () => {
  const navigate = useNavigate();
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <section className="w-full h-screen relative">
      <div className="header flex items-center justify-between p-4 fixed top-0 left-0 w-full">
        <button type="button" onClick={() => navigate(-1)} className="">
          <FaArrowLeft size={32} />
        </button>
        <h2 className="text-xl font-semibold">#368236</h2>
      </div>

      <div className="w-full p-2 flex flex-col justify-between h-full pt-20">
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
        <div className="w-full ">
          {/* Pickup */}
          <div className="flex items-start space-x-2 py-2 border-gray-400 border-t-[1px] mt-4">
            <div>
              <p className="text-gray-500 text-lg uppercase">Pick Up</p>
              <p className="font-semibold text-gray-800 text-2xl">
                562/11-A Kankariya Talab, Bhopal
              </p>
            </div>
          </div>

          {/* Drop-off */}
          <div className="flex items-start space-x-2 py-2 border-gray-400 border-t-[1px] mt-4">
            <div>
              <p className="text-gray-500 text-lg uppercase">Drop Off</p>
              <p className="font-semibold text-gray-800 text-2xl">
                562/11-A Kankariya Talab, Bhopal
              </p>
            </div>
          </div>
        </div>
        <div className="border-gray-400 border-t-[1px] mt-4 py-2">
          <p className="uppercase text-lg text-gray-600 font-semibold">Noted</p>
          <p className="text-lg font-semibold leading-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus
            nisi optio, temporibus neque rem maiores vitae vero inventore quidem
            reprehenderit rerum sit magnam natus veritatis laudantium, omnis,
            voluptatibus repellat vel.
          </p>
        </div>
        <div className="border-gray-400 border-t-[1px] mt-4 py-2">
          <p className="uppercase text-lg text-gray-600 font-semibold my-2">
            trip fare
          </p>
          <span className="flex justify-between w-full items-center text-lg font-semibold">
            <h2>Apple Pay</h2>
            <h2>₹100.00</h2>
          </span>
          <span className="flex justify-between w-full items-center text-lg font-semibold">
            <h2>Discount</h2>
            <h2>₹25.00</h2>
          </span>
          <span className="flex justify-between w-full items-center text-lg font-semibold">
            <h2>Paid Amount</h2>
            <h2>₹125.00</h2>
          </span>
        </div>
        {isAccepted ? (
          <Link
            to={"/captain/pickup"}
            className="w-full py-3 rounded-lg text-xl font-bold bg-yellow-500 block text-center"
          >
            Go To Pic Up
          </Link>
        ) : (
          <div className="w-full flex items-center justify-between gap-2 text-white">
            <button
              type="button"
              className="w-full py-3 rounded-lg text-xl font-bold bg-gray-600 block text-center"
            >
              Cancle
            </button>
            <button
              type="button"
              onClick={() => setIsAccepted(true)}
              className="w-full py-3 rounded-lg text-xl font-bold bg-green-600 border-2"
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientDetails;
