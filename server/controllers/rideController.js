import Ride from "../models/rideModel.js";
import captainService from "../services/captainService.js";
import mapService from "../services/mapService.js";
import otpService from "../services/otpService.js";
import { sendMessageToSocketId } from "../socket.js";
import rideService from "../services/rideService.js";

export default {
  createRide: async (req, res) => {
    const { pickup, destination, vehicle } = req.body;
    const user = req.user;
    if (!user || !pickup || !destination || !vehicle) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    let newRide;

    try {
      newRide = new Ride({
        user: user._id,
        pickup,
        destination,
        fare: vehicle.fare,
        otp: otpService.getOtp(6),
      });
      await newRide.save();

      if (!newRide) {
        return res.status(400).json({
          success: false,
          message: "Failed to create ride",
        });
      }

      res.status(200).json({
        success: true,
        message: "Ride created successfully",
        ride: newRide,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create ride",
        error,
      });
    }

    try {
      const coords = await mapService.getCoordsFromPlace(pickup);
      console.log("coords", coords);

      const nearByCaptains = await captainService.getNearByCaptains(
        coords.ltd,
        coords.lng,
        20
      );

      
      const ride = await Ride.find({_id: newRide._id}).populate("user")
      
      nearByCaptains.map((captain) => {
        sendMessageToSocketId(captain.socketId, ride);
      });
      console.log("nearByCaptains", nearByCaptains);
    } catch (error) {
      console.error(error);
    }
  },

  updateRide: async (req, res) => {
    try {
      const { rideId } = req.params;
      const { status } = req.body;
      const captain = req.captain;

      if (!rideId || !status || !captain) {
        return res.status(400).json({
          success: false,
          message: "Invalid request parameters"
        });
      }

      const validStatuses = ['accepted', 'ongoing', "out for pickup", 'completed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status"
        });
      }

      const updatedRide = await rideService.updateRideStatus(rideId, status, captain._id);

      res.status(200).json({
        success: true,
        message: "Ride updated successfully",
        ride: updatedRide
      });

    } catch (error) {
      console.error("Update ride error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to update ride",
        error
      });
    }
  }
};
