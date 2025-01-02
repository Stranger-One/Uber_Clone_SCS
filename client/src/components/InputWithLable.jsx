import React from "react";

const InputWithLable = ({ label, type, id, placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1 mb-4">
      {label && (
        <label htmlFor={id} className="text-lg font-semibold cursor-pointer">
          {label}
        </label>
      )}
      <input
        id={id}
        // required
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="p-2 rounded-md bg-gray-300 placeholder:text-gray-600 placeholder:font-semibold"
      />
    </div>
  );
};

export default InputWithLable;
