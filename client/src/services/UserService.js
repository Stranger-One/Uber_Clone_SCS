import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/users`,
});

export default {
    registerUser: async (data) => {
        try {
            const response = await axiosInstance.post('/register', data);
            return response.data

        } catch (error) {
            console.error(error);
            return error.response.data
        }
    },
    loginUser: async (data) => {
        try {
            const response = await axiosInstance.post('/login', data);
            return response.data
        } catch (error) {
            console.error(error);
            return error.response.data
        }
    },
    getUserProfile: async (token) => {
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
    logoutUser: async (token) => {
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