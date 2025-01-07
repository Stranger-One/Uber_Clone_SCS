import axios from "axios";
import calculateFare from "../services/calculateFare.js";

export default {
  getAddress: async (req, res) => {
    const { lat, lon } = req.query;
    if ((!lat, !lon)) {
      res.status(400).json({
        success: false,
        message: "Please provide both latitude and longitude",
      });
    }

    const apiKey = process.env.LOCATION_IQ_API; // Replace with your API key
    const url = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${lat}&lon=${lon}&format=json`; // coordinates to address

    try {
      const response = await axios.get(url);
      res.status(200).json({
        success: true,
        res: response.data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve address",
      });
    }
  },

  getCoordinates: async (req, res) => {
    const { address } = req.query;
    if (!address) {
      res.status(400).json({
        success: false,
        message: "Please provide an address",
      });
    }

    const apiKey = process.env.LOCATION_IQ_API; // Replace with your API key
    const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${
      address
    }&format=json`; // address to coordinates

    try {
      const response = await axios.get(url);
      res.status(200).json({
        success: true,
        res: response.data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve coordinates",
      });
    }
  },

  getRouteDistance: async (req, res) => {
    const { originLat, originLon, destLat, destLon } = req.query;
    const apiKey = process.env.LOCATION_IQ_API; // Replace with your API key

    if (!originLat || !originLon || !destLat || !destLon) {
      res.status(400).json({
        success: false,
        message: "Please provide origin and destination",
      });
    }
    

    const directionsUrl = `https://us1.locationiq.com/v1/directions/driving/${originLon},${originLat};${destLon},${destLat}?key=${apiKey}`;

    try {
      const response = await axios.get(directionsUrl);
      const fare = calculateFare.getFare(response.data.routes[0].distance, response.data.routes[0].duration)
      response.data.routes[0].fare = fare
      if (response) {
        res.status(200).json({
          success: true,
          route: response.data.routes[0] 
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve route distance",
      });
    }
  },

  getSuggestions: async (req, res) => {
    const { query } = req.query;

    if (!query) {
      res.status(400).json({
        success: false,
        message: "Please provide a query",
      });
    }

    const apiKey = process.env.LOCATION_IQ_API; // Replace with your API key
    const url = `https://us1.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${query}&limit=5&format=json`;

    try {
      const response = await axios.get(url);
      if (response) {
        res.status(200).json({
          success: true,
          suggestions: response.data,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve suggestions",
      });
    }
  },
};
