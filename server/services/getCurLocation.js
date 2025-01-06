export default {
  // Function to get user's current location
  CurrentLocation: (latitude, longitude) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          // Pass latitude and longitude to LocationIQ API
          const apiKey = process.env.LOCATION_IQ_API; // Replace with your API key
          const url = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;

          try {
            const response = await fetch(url);
            const data = await response.json();
            console.log("Location details:", data);
          } catch (error) {
            console.error("Error fetching location details:", error);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  },

  PlaceLocation: async (placeName) => {
    const apiKey = process.env.LOCATION_IQ_API; // Replace with your API key
    const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(
      placeName
    )}&format=json`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data[0]) {
        const latitude = data[0].lat;
        const longitude = data[0].lon;
        console.log(`Place: ${placeName}`);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        return { latitude, longitude };
      } else {
        console.error("No results found for the place.");
      }
    } catch (error) {
      console.error("Error fetching place location:", error);
    }
  },

  RouteAndDistance: async (startCoords, endCoords) => {
    const apiKey = process.env.LOCATION_IQ_API; // Replace with your API key
    const url = `https://us1.locationiq.com/v1/directions/driving/${startCoords.lat},${startCoords.lon};${endCoords.lat},${endCoords.lon}?key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes[0]) {
        const route = data.routes[0];
        const distance = route.distance / 1000; // Convert meters to kilometers
        const duration = route.duration / 60; // Convert seconds to minutes
        console.log(`Distance: ${distance.toFixed(2)} km`);
        console.log(`Estimated Travel Time: ${duration.toFixed(2)} minutes`);
        console.log("Route:", route.geometry);

        return { distance, duration, route: route.geometry };
      } else {
        console.error("No route found between the given locations.");
      }
    } catch (error) {
      console.error("Error fetching route and distance:", error);
    }
  },

  // // Example usage
  // const startCoords = { lat: 48.8588443, lon: 2.2943506 }; // Eiffel Tower
  // const endCoords = { lat: 48.8566, lon: 2.3522 }; // Notre-Dame Cathedral
  // getRouteAndDistance(startCoords, endCoords);
};
