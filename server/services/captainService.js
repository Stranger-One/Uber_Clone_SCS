import Captain from "../models/captainModel.js";

export default {
  getNearByCaptains: async (ltd, lng, radius) => {
    console.log("getNearByCaptains", {ltd: Number(ltd), lng: Number(lng), radius});
    
    const captains = await Captain.find({
      location: {
        $geoWithin: {
          $centerSphere: [[Number(ltd), Number(lng)], radius / 6371], 
        },
      },
    });
    return captains;
  },
};