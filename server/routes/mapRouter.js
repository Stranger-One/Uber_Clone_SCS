import express from 'express';
import mapController from '../controllers/mapController.js';

const router = express.Router()

router.get("/getAdderss", mapController.getAddress)
router.get("/getCoords", mapController.getCoordinates)
router.get("/getRoute", mapController.getRouteDistance)
router.get("/getSuggestions", mapController.getSuggestions)

export default router
