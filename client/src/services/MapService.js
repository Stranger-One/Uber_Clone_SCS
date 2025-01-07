import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/map`,
});

export default {
    getAddress: async (lat, lon) => {
        try {
            const response = await axiosInstance.get(`/getAddress?lat=${lat}&lon=${lon}`);
            return response.data;
        } catch (error) {
            console.error('Error getting address:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to get address'
            };
        }
    },

    getCoordinates: async (address) => {
        try {
            const response = await axiosInstance.get(`/getCoords?address=${encodeURIComponent(address)}`);
            return response.data;
        } catch (error) {
            console.error('Error getting coordinates:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to get coordinates'
            };
        }
    },

    getRoute: async (originLat, originLon, destLat, destLon) => {
        try {
            const response = await axiosInstance.get(`/getRoute`, {
                params: {
                    originLat,
                    originLon,
                    destLat,
                    destLon
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error calculating route:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to calculate route'
            };
        }
    },

    getSuggestions: async (query) => {
        try {
            const response = await axiosInstance.get(`/getSuggestions?query=${encodeURIComponent(query)}`);
            return response.data;
        } catch (error) {
            console.error('Error getting suggestions:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to get suggestions'
            };
        }
    },

    // Helper method to format the display address
    formatAddress: (addressObj) => {
        if (!addressObj) return '';
        
        const components = [];
        if (addressObj.name) components.push(addressObj.name);
        if (addressObj.road) components.push(addressObj.road);
        if (addressObj.city || addressObj.county) components.push(addressObj.city || addressObj.county);
        if (addressObj.state) components.push(addressObj.state);
        if (addressObj.postcode) components.push(addressObj.postcode);
        
        return components.join(', ');
    }
};
