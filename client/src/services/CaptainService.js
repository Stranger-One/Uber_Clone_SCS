import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/captains`,
});

export default {
    registerCaptain: async (data) => {
        try {
            const response = await axiosInstance.post('/register', data);
            return response.data

        } catch (error) {
            console.error(error);
            return error.response.data
        }
    },
    loginCaptain: async (data) => {
        try {
            const response = await axiosInstance.post('/login', data);
            return response.data
        } catch (error) {
            console.error(error);
            return error.response.data
        }
    },
    getCaptainProfile: async (token) => {
        try {
            const response = await axiosInstance.get('/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data
        } catch (error) {
            console.error(error);
            return error.response.data
        }
    },
    logoutCaptain: async (token) => {
        try {
            const response = await axiosInstance.get('/logout', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data
        } catch (error) {
            console.error(error);
            return error.response.data
        }
    }
}