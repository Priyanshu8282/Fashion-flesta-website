import apiClient, { ApiResponse } from './index';

// Product interface matching backend model
export interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    category: string | {
        _id: string;
        name: string;
        description?: string;
    };
    sizes: string[];
    images: string[];
    coverImage: string;
    stock: number;
    isFeatured: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// Product Service
class ProductService {
    /**
     * Get all products with optional filters
     * @param filters - Optional filters for products
     * @returns Promise with array of products
     */
    async getAllProducts(filters?: {
        category?: string;
        minPrice?: number;
        maxPrice?: number;
        search?: string;
        isFeatured?: boolean;
    }): Promise<Product[]> {
        try {
            const params = new URLSearchParams();
            if (filters) {
                Object.entries(filters).forEach(([key, value]) => {
                    if (value !== undefined) {
                        params.append(key, String(value));
                    }
                });
            }

            const response = await apiClient.get<ApiResponse<Product[]>>(
                `/products?${params.toString()}`
            );
            return response.data.data;
        } catch (error) {
            console.error('Failed to fetch products:', error);
            throw error;
        }
    }

    /**
     * Get featured products
     * @param limit - Number of products to fetch
     * @returns Promise with array of featured products
     */
    async getFeaturedProducts(limit: number = 10): Promise<Product[]> {
        try {
            const response = await apiClient.get<ApiResponse<Product[]>>(
                `/products/featured?limit=${limit}`
            );
            return response.data.data;
        } catch (error) {
            console.error('Failed to fetch featured products:', error);
            throw error;
        }
    }

    /**
     * Get products by category
     * @param categoryId - Category ID
     * @returns Promise with array of products
     */
    async getProductsByCategory(categoryId: string): Promise<Product[]> {
        try {
            const response = await apiClient.get<ApiResponse<Product[]>>(
                `/products/category/${categoryId}`
            );
            return response.data.data;
        } catch (error) {
            console.error(`Failed to fetch products for category ${categoryId}:`, error);
            throw error;
        }
    }

    /**
     * Get single product by ID
     * @param id - Product ID
     * @returns Promise with product data
     */
    async getProductById(id: string): Promise<Product> {
        try {
            const response = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
            return response.data.data;
        } catch (error) {
            console.error(`Failed to fetch product ${id}:`, error);
            throw error;
        }
    }

    /**
     * Get latest arrivals (most recent products)
     * @param limit - Number of products to fetch
     * @returns Promise with array of latest products
     */
    async getLatestProducts(limit: number = 10): Promise<Product[]> {
        try {
            const response = await apiClient.get<ApiResponse<Product[]>>(
                `/products?limit=${limit}`
            );
            return response.data.data;
        } catch (error) {
            console.error('Failed to fetch latest products:', error);
            throw error;
        }
    }

    /**
     * Get product by slug
     * @param slug - Product slug
     * @returns Promise with product data
     */
    async getProductBySlug(slug: string): Promise<Product> {
        try {
            const response = await apiClient.get<ApiResponse<Product>>(`/products/slug/${slug}`);
            return response.data.data;
        } catch (error) {
            console.error(`Failed to fetch product with slug ${slug}:`, error);
            throw error;
        }
    }

    /**
     * Get related products
     * @param productId - Product ID
     * @param limit - Number of related products to fetch
     * @returns Promise with array of related products
     */
    async getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
        try {
            const response = await apiClient.get<ApiResponse<Product[]>>(
                `/products/${productId}/related?limit=${limit}`
            );
            return response.data.data;
        } catch (error) {
            console.error(`Failed to fetch related products for ${productId}:`, error);
            throw error;
        }
    }

    /**
     * Search products by query
     * @param query - Search query string
     * @returns Promise with array of matching products
     */
    async searchProducts(query: string): Promise<Product[]> {
        try {
            if (!query || query.trim() === '') {
                return [];
            }
            const response = await apiClient.get<ApiResponse<Product[]>>(
                `/products/search?q=${encodeURIComponent(query)}`
            );
            return response.data.data;
        } catch (error) {
            console.error('Failed to search products:', error);
            throw error;
        }
    }
}

export default new ProductService();
