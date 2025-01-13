import { Server } from "socket.io";
import User from "./models/userModel.js";
import Captain from "./models/captainModel.js";

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    io.on("connection", (socket)=>{
        console.log(`Client Connected: ${socket.id} `)

        socket.on("join", async (data)=>{
            const {userId, userType} = data;

            if(userType === 'user'){
               const updatedUser = await User.findByIdAndUpdate(userId, {socketId: socket.id}, {new: true})
               console.log("updatedUser", updatedUser);
               
            } else if(userType === 'captain'){
                await Captain.findByIdAndUpdate(userId, {socketId: socket.id})
            }
        })

        socket.on("disconnect", ()=>{
            console.log(`Client disconnected: ${socket.id} `)
        })
    })
};

export const sendMessageToSocketId = (socketId, info) => {
    if(io){
        io.to(socketId).emit(info.message, info.data)
    } else {
        console.log("Socket.io is not initialized!")
    }
}
