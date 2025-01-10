import Ride from "../models/rideModel.js";
import { sendMessageToSocketId } from "../socket.js";
import User from "../models/userModel.js";

export default {
    updateRideStatus: async (rideId, status, captainId) => {
        const ride = await Ride.findById(rideId);
        if (!ride) {
            throw new Error("Ride not found");
        }

        ride.status = status;
        if (captainId && status === 'accepted') {
            ride.captain = captainId;
        }
        await ride.save();

        const updatedRide = await Ride.findById(rideId)
            .populate('user')
            .populate('captain');

        // Get user to send notification
        const user = await User.findById(ride.user);
        if (user?.socketId) {
            sendMessageToSocketId(user.socketId, {
                type: 'RIDE_UPDATE',
                ride: updatedRide
            });
        }

        return updatedRide;
    }
};
