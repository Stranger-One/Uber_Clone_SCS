import React from "react";
import { IoLocation } from "react-icons/io5";

const LocationSuggestion = ({location}) => {
  return (
    <div className="flex items-center gap-4 bg-white p-2 rounded-md">
      <div className="p-3 bg-gray-300 rounded-full flex-shrink-0">
        <IoLocation size={28} className="" />
      </div>
      <div>
        <h3 className="text-xl font-semibold line-clamp-1">
          Location 1 Lorem ipsum dolor sit amet consectetur.
        </h3>
        <p className="text-gray-600 line-clamp-2 font-semibold text-[18px] leading-5 mt-1">
          Location 1 description Lorem ipsum dolor sit amet consectetur.
        </p>
      </div>
    </div>
  );
};

export default LocationSuggestion;
