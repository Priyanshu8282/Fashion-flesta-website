import apiClient, { ApiResponse } from './index';

// Category interface matching backend model
export interface Category {
    _id: string;
    name: string;
    description?: string;
    image: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// Category Service
class CategoryService {
    /**
     * Get all active categories
     * @returns Promise with array of active categories
     */
    async getAllCategories(): Promise<Category[]> {
        try {
            const response = await apiClient.get<ApiResponse<Category[]>>('/categories');
            return response.data.data;
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            throw error;
        }
    }

    /**
     * Get single category by ID
     * @param id - Category ID
     * @returns Promise with category data
     */
    async getCategoryById(id: string): Promise<Category> {
        try {
            const response = await apiClient.get<ApiResponse<Category>>(`/categories/${id}`);
            return response.data.data;
        } catch (error) {
            console.error(`Failed to fetch category ${id}:`, error);
            throw error;
        }
    }

    /**
     * Get category by name
     * @param name - Category name (e.g., "dresses", "designer-tops")
     * @returns Promise with category data
     */
    async getCategoryByName(name: string): Promise<Category> {
        try {
            const response = await apiClient.get<ApiResponse<Category>>(`/categories/name/${name}`);
            return response.data.data;
        } catch (error) {
            console.error(`Failed to fetch category ${name}:`, error);
            throw error;
        }
    }
}

export default new CategoryService();
