import React, { createContext, useContext, useState } from 'react'

const CaptainDataContext = createContext()

const CaptainContext = ({ children }) => {
    const [captainDetails, setCaptainDetails] = useState(null)
    const [newRideDetails, setNewRideDetails] = useState(null)
    return (

        <CaptainDataContext.Provider value={{ captainDetails, setCaptainDetails, newRideDetails, setNewRideDetails }}>
            {children}
        </CaptainDataContext.Provider>

    )
}

export const useCaptainData = () => useContext(CaptainDataContext)

export default CaptainContext