import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/ride`,
});

export default {
    createRide: async (rideData, token) => {
        try {
            const response = await axiosInstance.post('/create', rideData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Create ride error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to create ride'
            };
        }
    },

    updateRide: async (rideId, updateData, token) => {
        try {
            const response = await axiosInstance.put(`/update/${rideId}`, updateData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Update ride error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to update ride'
            };
        }
    },

    confirmOtp: async (rideId, otp, token) => {
        try {
            const response = await axiosInstance.post(`/confirm-otp`, {
                rideId,
                otp
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('confirm otp error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to confirm otp'
            };
        }
    },

    getRideDetails: async (rideId, token) => {
        try {
            const response = await axiosInstance.get(`/${rideId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Get ride details error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to get ride details'
            };
        }
    },

    getRideHistory: async (token) => {
        try {
            const response = await axiosInstance.get('/history', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Get ride history error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to get ride history'
            };
        }
    }
};
