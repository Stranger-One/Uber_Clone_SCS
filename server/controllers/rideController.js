import Ride from "../models/rideModel.js";
import captainService from "../services/captainService.js";
import mapService from "../services/mapService.js";
import otpService from "../services/otpService.js";

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

    try {
      const newRide = new Ride({
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
        10
      );
  
      console.log("nearByCaptains", nearByCaptains);
      
    } catch (error) {
      console.error(error);
      
    }
  },
};
