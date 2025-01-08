import { Server } from "socket.io";
import User from "./models/userModel.js";
import Captain from "./models/captainModel.js";

let io;

export const initializeSocket = (server) => {
  try {
    io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log(`Client Connected: ${socket.id}`);

      socket.on("join", async (data) => {
        try {
          const { userId, userType } = data;
          console.log("join", { userId, userType, socketId: socket.id });

          if (!userId || !userType) {
            console.error("Invalid join data received");
            return;
          }

          if (userType === "user") {
            await User.findByIdAndUpdate(userId, { socketId: socket.id });
          } else if (userType === "captain") {
            await Captain.findByIdAndUpdate(userId, { socketId: socket.id });
          }
        } catch (error) {
          console.error("Error in join event:", error);
        }
      });

      socket.on("update-captain-location", async (data) => {
        const { captainId, location } = data;
        console.log("update-captain-location", { captainId, location });

        if (!location || !location.ltd || !location.lng) {
          return socket.emit("error", {
            message: "Invalid location details!",
          });
        }

        await Captain.findByIdAndUpdate(captainId, {
          location: {
            ltd: location.ltd,
            lng: location.lng,
          },
        });
      });

      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  } catch (error) {
    console.error("Socket initialization error:", error);
  }
};

export const sendMessageToSocketId = (socketId, message) => {
  if (io) {
    io.to(socketId).emit("message", message);
  } else {
    console.log("Socket.io is not initialized!");
  }
};
