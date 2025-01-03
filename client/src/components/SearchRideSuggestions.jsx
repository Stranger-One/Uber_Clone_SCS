import React from "react";
import { LuTimer } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import LocationSuggestion from "./LocationSuggestion";

const SearchRideSuggestions = ({ isOpenSuggestions }) => {
  return (
    <div
      className={`w-full ${
        isOpenSuggestions ? "h-full" : "h-0"
      } transition-height duration-200 bg-zinc-200 px-2 overflow-hidden flex flex-col gap-2`}
    >
      <div className="flex items-center w-fit flex-nowrap gap-3 p-3 bg-gray-300 rounded-full mt-2">
        <LuTimer size={20} /> <h4 className="text-lg font-semibold">Leave Now</h4> <IoIosArrowDown size={20} />
      </div>
      <div className="flex flex-col gap-2 h-full overflow-auto py-2">
        <LocationSuggestion />
        <LocationSuggestion />
        <LocationSuggestion />
        <LocationSuggestion />
        <LocationSuggestion />
        <LocationSuggestion />
        <LocationSuggestion />
        <LocationSuggestion />
      </div>
    </div>
  );
};

export default SearchRideSuggestions;
