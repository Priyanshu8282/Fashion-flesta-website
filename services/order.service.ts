import apiClient, { ApiResponse } from './index';

export interface OrderItem {
    product: string;
    name?: string;
    price?: number;
    quantity: number;
    size: string;
}

export interface ShippingAddress {
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    country?: string;
}

export interface Order {
    _id: string;
    orderNumber: string;
    customer: string;
    items: OrderItem[];
    totalAmount: number;
    shippingAddress: ShippingAddress;
    paymentMethod: 'UPI' | 'COD';
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
    orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    upiTransactionId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface PlaceOrderData {
    items: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: 'UPI' | 'COD';
    upiTransactionId?: string;
}

class OrderService {
    /**
     * Place a new order
     * @param orderData - Order data
     * @returns Promise with order data
     */
    async placeOrder(orderData: PlaceOrderData): Promise<{ order: Order; message: string }> {
        try {
            const response = await apiClient.post<ApiResponse<Order>>('/orders', orderData);
            return {
                order: response.data.data,
                message: response.data.message || 'Order placed successfully'
            };
        } catch (error) {
            console.error('Failed to place order:', error);
            throw error;
        }
    }

    /**
     * Get user's order history
     * @returns Promise with orders array
     */
    async getMyOrders(): Promise<Order[]> {
        try {
            const response = await apiClient.get<ApiResponse<Order[]>>('/orders/my-orders');
            return response.data.data;
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            throw error;
        }
    }

    /**
     * Get order by ID
     * @param orderId - Order ID
     * @returns Promise with order data
     */
    async getOrderById(orderId: string): Promise<Order> {
        try {
            const response = await apiClient.get<ApiResponse<Order>>(`/orders/${orderId}`);
            return response.data.data;
        } catch (error) {
            console.error('Failed to fetch order:', error);
            throw error;
        }
    }
}

export default new OrderService();
