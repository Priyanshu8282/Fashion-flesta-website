import apiClient, { ApiResponse } from './index';

// Banner interface matching backend model
export interface Banner {
    _id: string;
    title: string;
    description?: string;
    image: string;
    link?: string;
    displayOrder: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// Banner Service
class BannerService {
    /**
     * Get all active banners
     * @returns Promise with array of active banners
     */
    async getAllBanners(): Promise<Banner[]> {
        try {
            const response = await apiClient.get<ApiResponse<Banner[]>>('/banners');
            return response.data.data;
        } catch (error) {
            console.error('Failed to fetch banners:', error);
            throw error;
        }
    }

    /**
     * Get single banner by ID
     * @param id - Banner ID
     * @returns Promise with banner data
     */
    async getBannerById(id: string): Promise<Banner> {
        try {
            const response = await apiClient.get<ApiResponse<Banner>>(`/banners/${id}`);
            return response.data.data;
        } catch (error) {
            console.error(`Failed to fetch banner ${id}:`, error);
            throw error;
        }
    }
}

export default new BannerService();
