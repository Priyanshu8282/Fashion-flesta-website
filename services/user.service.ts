import apiClient, { ApiResponse } from './index';

export interface User {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateProfileData {
    name?: string;
    phone?: string;
}

class UserService {
    /**
     * Get current user profile
     * @returns Promise with user data
     */
    async getProfile(): Promise<User> {
        try {
            const response = await apiClient.get<ApiResponse<User>>('/user/profile');
            return response.data.data;
        } catch (error) {
            console.error('Failed to fetch profile:', error);
            throw error;
        }
    }

    /**
     * Update user profile
     * @param data - Profile update data
     * @returns Promise with updated user data
     */
    async updateProfile(data: UpdateProfileData): Promise<{ user: User; message: string }> {
        try {
            const response = await apiClient.put<ApiResponse<User>>('/user/profile', data);
            return {
                user: response.data.data,
                message: response.data.message || 'Profile updated successfully'
            };
        } catch (error) {
            console.error('Failed to update profile:', error);
            throw error;
        }
    }
}

export default new UserService();
