import React, { createContext, useContext, useEffect } from 'react'
import { io } from 'socket.io-client'

const SocketDataContext = createContext()
const socket = io(`${import.meta.env.VITE_BACKEND_URL}`)

const SocketContext = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected to socket server...')
        })

        socket.on("disconnect", () => {
            console.log("disconnect from socket server")
        })

        return () => {
            socket.disconnect()
        }
    }, [])



    return (
        <SocketDataContext.Provider value={{socket}}>
            {children}
        </SocketDataContext.Provider>
    )
}

export const useSocket = () => useContext(SocketDataContext)

export default SocketContext