import axios from 'axios';
import { API_BASE_URL } from './api.config';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para manejar errores globalmente
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Aquí puedes manejar errores globalmente
        if (error.response) {
            // Error de respuesta del servidor
            console.error('Error de respuesta:', error.response.data);
        } else if (error.request) {
            // Error de red
            console.error('Error de red:', error.request);
        } else {
            // Otros errores
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
