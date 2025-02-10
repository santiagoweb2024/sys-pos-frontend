// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const API_ENDPOINTS = {
    PRODUCTS: {
        BASE: `${API_BASE_URL}/products`,
        GET_ALL: `${API_BASE_URL}/products`,
        GET_BY_ID: (id: string) => `${API_BASE_URL}/products/${id}`,
        CREATE: `${API_BASE_URL}/products`,
        UPDATE: (id: string) => `${API_BASE_URL}/products/${id}`,
        DELETE: (id: string) => `${API_BASE_URL}/products/${id}`,
    }
};
