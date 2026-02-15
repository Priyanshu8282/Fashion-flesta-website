import apiClient, { ApiResponse } from './index';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    message?: string;
    data: {
        token: string;
        user: {
            _id: string;
            name: string;
            email: string;
            role?: string;
            phone?: string;
            address?: {
                street?: string;
                city?: string;
                state?: string;
                pincode?: string;
                country?: string;
            };
            isActive?: boolean;
            createdAt?: string;
            updatedAt?: string;
        };
    };
}

class AuthService {
    /**
     * Login user
     * @param email - User email
     * @param password - User password
     * @returns Promise with authentication data
     */
    async login(email: string, password: string): Promise<AuthResponse> {
        try {
            const response = await apiClient.post<AuthResponse>('/auth/login', {
                email,
                password
            });
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    /**
     * Register new user
     * @param name - User name
     * @param email - User email
     * @param password - User password
     * @returns Promise with authentication data
     */
    async register(name: string, email: string, password: string): Promise<AuthResponse> {
        try {
            const response = await apiClient.post<AuthResponse>('/auth/register', {
                name,
                email,
                password
            });
            return response.data;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    }

    /**
     * Get current user profile
     * @returns Promise with user data
     */
    async getProfile(): Promise<any> {
        try {
            const response = await apiClient.get('/auth/profile');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch profile:', error);
            throw error;
        }
    }

    /**
     * Logout user (client-side)
     */
    logout(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
}

export default new AuthService();
