import axios from 'axios';
import { isTokenExpired } from './utils';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(
    config => {
        if (config.url?.includes('login') || config.url?.includes('signup')) {
            return config;
        }
        const token = localStorage.getItem('token');
        if (token && !isTokenExpired(token)) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);
export default api;