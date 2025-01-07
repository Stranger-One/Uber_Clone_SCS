import express from "express"
import rideController from "../controllers/rideController.js";

const router = express.Router()


router.post("/create", rideController.createRide)


export default router;