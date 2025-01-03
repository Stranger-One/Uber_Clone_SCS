import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa6";
import ButtonLoader from "./ButtonLoader";

const SearchRideForm = ({ isOpenSuggestions, setIsOpenSuggestions, setPannel }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [btnLoading, setBtnLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true)

    await new Promise((resolve)=> setTimeout(resolve, 2000))
    console.log({ from, to });
    setPannel(2);


    setFrom("");
    setTo("");
    setBtnLoading(false)
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 bg-white">
      <div className="flex items-center justify-between p-1">
        <h2 className="text-3xl font-semibold mb-4">Find aa trip</h2>
        <button type="button" onClick={() => setIsOpenSuggestions((state) => !state)}>
          <IoIosArrowUp
            size={32}
            className={`${isOpenSuggestions ? "rotate-180" : ""} duration-200`}
          />
        </button>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-md relative ">
        <div className="w-10 h-[80%] absolute left-0 top-1/2 -translate-y-1/2 flex flex-col justify-between items-center p-2 gap-2">
          <div className="w-3 h-3 flex-shrink-0 bg-black rounded-full "></div>
          <div className="h-full w-[2px] bg-black"></div>
          <div className="w-3 h-3 flex-shrink-0 bg-black rounded-full "></div>
        </div>
        {/* Location Input */}
        <div className="flex items-center bg-gray-300 rounded-md py-3 pl-10 pr-5">
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            onClick={() => setIsOpenSuggestions(true)}
            type="text"
            placeholder="Enter location"
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-700 text-lg"
          />
          <button type="button" className="text-gray-500 hover:text-black">
            <FaLocationArrow size={20} />
          </button>
        </div>

        {/* Destination Input */}
        <div className="flex items-center bg-gray-300 rounded-md py-3 pl-10 pr-5">
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            onClick={() => setIsOpenSuggestions(true)}
            type="text"
            placeholder="Enter destination"
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-700 text-lg"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={!from || !to}
        className={`w-full bg-black text-xl font-semibold text-white py-3 rounded-md mt-4 ${
          !from || !to ? "opacity-80 cursor-not-allowed" : "hover:opacity-90"
        }`}
      >
        {btnLoading ? <ButtonLoader/> : "Search"}
      </button>
    </form>
  );
};

export default SearchRideForm;
