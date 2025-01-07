import React from "react";
import { IoLocation } from "react-icons/io5";

const LocationSuggestion = ({ suggestion, handleSuggestionClick }) => {
  
  return (
    <div onClick={()=>handleSuggestionClick(suggestion)} className="flex items-center gap-4 bg-white p-2 rounded-md">
      <div className="p-3 bg-gray-300 rounded-full flex-shrink-0">
        <IoLocation size={28} className="" />
      </div>
      <div>
        <h3 className="text-xl font-semibold line-clamp-1">
          {suggestion.display_place}
        </h3>
        <p className="text-gray-600 line-clamp-2 font-semibold text-[18px] leading-5 mt-1">
          {suggestion.display_address}        </p>
      </div>
    </div>
  );
};

export default LocationSuggestion;
