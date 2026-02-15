import apiClient, { ApiResponse } from './index';

export interface WishlistProduct {
    _id: string;
    name: string;
    price: number;
    images: string[];
    stock?: number;
    slug?: string;
    category?: string;
}

export interface Wishlist {
    _id: string;
    user: string;
    products: WishlistProduct[];
    createdAt: string;
    updatedAt: string;
}

class WishlistService {
    /**
     * Get user's wishlist
     * @returns Promise with wishlist data
     */
    async getWishlist(): Promise<Wishlist> {
        try {
            const response = await apiClient.get<ApiResponse<Wishlist>>('/wishlist');
            return response.data.data;
        } catch (error) {
            console.error('Failed to fetch wishlist:', error);
            throw error;
        }
    }

    /**
     * Add product to wishlist
     * @param productId - Product ID
     * @returns Promise with updated wishlist and message
     */
    async addToWishlist(productId: string): Promise<{ wishlist: Wishlist; message: string }> {
        try {
            const response = await apiClient.post<ApiResponse<Wishlist>>('/wishlist', {
                products: [productId]
            });
            return {
                wishlist: response.data.data,
                message: response.data.message || 'Added to wishlist'
            };
        } catch (error) {
            console.error('Failed to add to wishlist:', error);
            throw error;
        }
    }

    /**
     * Remove product from wishlist
     * @param productId - Product ID
     * @returns Promise with updated wishlist and message
     */
    async removeFromWishlist(productId: string): Promise<{ wishlist: Wishlist; message: string }> {
        try {
            const response = await apiClient.delete<ApiResponse<Wishlist>>(`/wishlist/${productId}`);
            return {
                wishlist: response.data.data,
                message: response.data.message || 'Removed from wishlist'
            };
        } catch (error) {
            console.error('Failed to remove from wishlist:', error);
            throw error;
        }
    }

    /**
     * Check if product is in wishlist
     * @param productId - Product ID
     * @param wishlist - Current wishlist
     * @returns boolean
     */
    isInWishlist(productId: string, wishlist: Wishlist | null): boolean {
        if (!wishlist) return false;
        return wishlist.products.some(item => item._id === productId);
    }
}

export default new WishlistService();
