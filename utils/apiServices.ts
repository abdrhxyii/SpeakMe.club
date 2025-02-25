import axios from 'axios';
import { baseUrl } from './BaseUrl';
import { getTokens } from './TokenStorage';

const api = axios.create({
    baseURL: baseUrl
})

api.interceptors.request.use(
    async (config)  => {
        const { accessToken } = await getTokens();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

export default api;