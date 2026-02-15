import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001/api';
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'http://localhost:5001';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Add authorization token if available
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        // Handle errors globally
        if (error.response) {
            // Server responded with error status
            console.error('API Error:', error.response.data);

        
        } else if (error.request) {
            // Request made but no response
            console.error('Network Error:', error.message);
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// Generic API response interface
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    count?: number;
    message?: string;
}

// Utility function to get full image URL
export const getImageUrl = (path: string): string => {
    if (!path) return '';

    // If path is already a full URL, return it
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // If path starts with /, prepend the base URL
    if (path.startsWith('/')) {
        return `${IMAGE_BASE_URL}${path}`;
    }

    // Otherwise, construct the full URL
    return `${IMAGE_BASE_URL}/${path}`;
};

export default apiClient;
