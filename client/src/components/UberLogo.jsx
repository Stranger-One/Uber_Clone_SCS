import React from "react";

const UberLogo = ({size=20, className}) => {
  return (
    <img
      className={`w-20 ${className}`}
      src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
      alt=""
    />
  );
};

export default UberLogo;
