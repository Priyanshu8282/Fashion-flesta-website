import apiClient, { ApiResponse } from './index';

export interface CartItem {
    product: {
        _id: string;
        name: string;
        price: number;
        images: string[];
        stock: number;
    };
    quantity: number;
    size: string;
}

export interface Cart {
    _id: string;
    user: string;
    items: CartItem[];
    createdAt: string;
    updatedAt: string;
}

class CartService {
    /**
     * Get user's cart
     * @returns Promise with cart data
     */
    async getCart(): Promise<Cart> {
        try {
            const response = await apiClient.get<ApiResponse<Cart>>('/cart');
            return response.data.data;
        } catch (error) {
            console.error('Failed to fetch cart:', error);
            throw error;
        }
    }

    /**
     * Add product to cart
     * @param productId - Product ID
     * @param quantity - Quantity to add
     * @param size - Product size
     * @returns Promise with updated cart and message
     */
    async addToCart(productId: string, quantity: number, size: string): Promise<{ cart: Cart; message: string }> {
        try {
            const response = await apiClient.post<ApiResponse<Cart>>('/cart', {
                productId,
                quantity,
                size
            });
            return {
                cart: response.data.data,
                message: response.data.message || 'Product added to cart'
            };
        } catch (error) {
            console.error('Failed to add to cart:', error);
            throw error;
        }
    }

    /**
     * Update cart item quantity
     * @param productId - Product ID
     * @param quantity - New quantity
     * @param size - Product size
     * @returns Promise with updated cart and message
     */
    async updateCartItem(productId: string, quantity: number, size: string): Promise<{ cart: Cart; message: string }> {
        try {
            const response = await apiClient.put<ApiResponse<Cart>>(`/cart/${productId}`, {
                quantity,
                size
            });
            return {
                cart: response.data.data,
                message: response.data.message || 'Cart updated'
            };
        } catch (error) {
            console.error('Failed to update cart item:', error);
            throw error;
        }
    }

    /**
     * Remove item from cart
     * @param productId - Product ID 
     * @returns Promise with updated cart and message
     */
    async removeFromCart(productId: string): Promise<{ cart: Cart; message: string }> {
        try {
            const response = await apiClient.delete<ApiResponse<Cart>>(`/cart/${productId}`);
            return {
                cart: response.data.data,
                message: response.data.message || 'Product removed from cart'
            };
        } catch (error) {
            console.error('Failed to remove from cart:', error);
            throw error;
        }
    }

    /**
     * Clear cart
     * @returns Promise with empty cart and message
     */
    async clearCart(): Promise<{ cart: Cart; message: string }> {
        try {
            const response = await apiClient.delete<ApiResponse<Cart>>('/cart');
            return {
                cart: response.data.data,
                message: response.data.message || 'Cart cleared'
            };
        } catch (error) {
            console.error('Failed to clear cart:', error);
            throw error;
        }
    }
}

export default new CartService();
