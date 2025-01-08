import axios from "axios";

export default {
  getCoordsFromPlace: async (address) => {
    const apiKey = process.env.LOCATION_IQ_API; // Replace with your API key
    const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${address}&format=json`;

    try {
      const response = await axios.get(url);
    //   console.log(response.data);
      
      return {
        ltd: response.data[0].lat,
        lng: response.data[0].lon
      }
    } catch (error) {
        return null
    }
  },
};
