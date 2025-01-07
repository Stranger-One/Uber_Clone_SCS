import express from "express"
import rideController from "../controllers/rideController.js";
import authMiddlewar from "../middlewares/authMiddlewar.js";

const router = express.Router()


router.post("/create", authMiddlewar.authUser , rideController.createRide)


export default router;