import React, { useContext, useState } from "react";

const GlobalDataContext = React.createContext();

const GlobalContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [captainData, setCaptainData] = useState(null)

  return (
    <GlobalDataContext.Provider value={{userData, setUserData, captainData, setCaptainData}}>
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalDataContext);

export default GlobalContext;
