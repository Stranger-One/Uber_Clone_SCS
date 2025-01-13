import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa6";
import ButtonLoader from "./ButtonLoader";
import { LuTimer } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import LocationSuggestion from "./LocationSuggestion";
import MapService from "../services/MapService";

const SearchRideForm = ({ setPannel, setRideRoute, setFromTo }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [origin, setOrigin] = useState(null)
  const [destination, setDestination] = useState(null)
  const [btnLoading, setBtnLoading] = useState(false)
  const [isOpenSuggestions, setIsOpenSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([])
  const [activeInput, setActiveInput] = useState(null)

  const handlePickUpChange = async (e) => {
    setFrom(e.target.value);

    const res = await MapService.getSuggestions(e.target.value)
    console.log(res.suggestions)
    setSuggestions(res.suggestions)

  };

  const handleDestinationChange = async (e) => {
    setTo(e.target.value)

    const res = await MapService.getSuggestions(e.target.value)
    console.log(res.suggestions)
    setSuggestions(res.suggestions)
  };

  const handleSuggestionClick = (suggestion) => {
    if (activeInput === "pickup") {
      setFrom(suggestion.display_place)
      setOrigin(suggestion)
    } else if (activeInput === "destination") {
      setTo(suggestion.display_place)
      setDestination(suggestion)
    }
    setSuggestions([])
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true)

    // await new Promise((resolve) => setTimeout(resolve, 2000))
    const response = await MapService.getRoute(origin.lat, origin.lon, destination.lat, destination.lon)

    console.log({ from, to, origin, destination });
    console.log("response", response);
    setFromTo({origin, destination})
    setRideRoute(response.route)
    setPannel(2);


    setFrom("");
    setTo("");
    setBtnLoading(false)
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full p-4 rounded-t-lg bg-white" style={{
                boxShadow: "0px -5px 10px gray",
              }}>
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
              onChange={handlePickUpChange}
              onClick={() => {
                setIsOpenSuggestions(true)
                setActiveInput("pickup")
              }}
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
              onChange={handleDestinationChange}
              onClick={() => {
                setIsOpenSuggestions(true)
                setActiveInput("destination")
              }}
              type="text"
              placeholder="Enter destination"
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-700 text-lg"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={!from || !to}
          className={`w-full bg-black text-xl font-semibold text-white py-3 rounded-md mt-4 ${!from || !to ? "opacity-80 cursor-not-allowed" : "hover:opacity-90"
            }`}
        >
          {btnLoading ? <ButtonLoader /> : "Search"}
        </button>
      </form>
      <div
        className={`w-full ${isOpenSuggestions ? "h-full" : "h-0"
          } transition-height duration-200 bg-zinc-200 px-2 overflow-hidden flex flex-col gap-2`}
      >
        {/* <div className="flex items-center w-fit flex-nowrap gap-3 p-3 bg-gray-300 rounded-full mt-2">
          <LuTimer size={20} /> <h4 className="text-lg font-semibold">Leave Now</h4> <IoIosArrowDown size={20} />
        </div> */}
        <div className="flex flex-col gap-2 h-full overflow-auto py-2">
          {suggestions?.length ? suggestions.map((suggestion, index) => (
            <LocationSuggestion key={index} suggestion={suggestion} handleSuggestionClick={handleSuggestionClick} />
          )) : (
            <p className="text-lg text-gray-500 text-center py-2">No suggestions found
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchRideForm;
