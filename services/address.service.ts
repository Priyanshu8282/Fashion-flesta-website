import apiClient, { ApiResponse } from './index';

export interface Address {
    _id: string;
    fullName: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    isDefault: boolean;
}

export interface AddressFormData {
    fullName: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country?: string;
    isDefault?: boolean;
}

class AddressService {
    /**
     * Get all addresses for the logged-in user
     * @returns Promise with array of addresses
     */
    async getAddresses(): Promise<Address[]> {
        try {
            const response = await apiClient.get<ApiResponse<Address[]>>('/addresses');
            return response.data.data;
        } catch (error) {
            console.error('Failed to fetch addresses:', error);
            throw error;
        }
    }

    /**
     * Get single address by ID
     * @param id - Address ID
     * @returns Promise with address data
     */
    async getAddressById(id: string): Promise<Address> {
        try {
            const response = await apiClient.get<ApiResponse<Address>>(`/addresses/${id}`);
            return response.data.data;
        } catch (error) {
            console.error(`Failed to fetch address ${id}:`, error);
            throw error;
        }
    }

    /**
     * Create new address
     * @param data - Address data
     * @returns Promise with created address and message
     */
    async createAddress(data: AddressFormData): Promise<{ address: Address; message: string }> {
        try {
            const response = await apiClient.post<ApiResponse<Address>>('/addresses', data);
            return {
                address: response.data.data,
                message: response.data.message || 'Address created successfully'
            };
        } catch (error) {
            console.error('Failed to create address:', error);
            throw error;
        }
    }

    /**
     * Update existing address
     * @param id - Address ID
     * @param data - Updated address data
     * @returns Promise with updated address and message
     */
    async updateAddress(id: string, data: Partial<AddressFormData>): Promise<{ address: Address; message: string }> {
        try {
            const response = await apiClient.put<ApiResponse<Address>>(`/addresses/${id}`, data);
            return {
                address: response.data.data,
                message: response.data.message || 'Address updated successfully'
            };
        } catch (error) {
            console.error(`Failed to update address ${id}:`, error);
            throw error;
        }
    }

    /**
     * Delete address
     * @param id - Address ID
     * @returns Promise with remaining addresses and message
     */
    async deleteAddress(id: string): Promise<{ addresses: Address[]; message: string }> {
        try {
            const response = await apiClient.delete<ApiResponse<Address[]>>(`/addresses/${id}`);
            return {
                addresses: response.data.data,
                message: response.data.message || 'Address deleted successfully'
            };
        } catch (error) {
            console.error(`Failed to delete address ${id}:`, error);
            throw error;
        }
    }

    /**
     * Set address as default
     * @param id - Address ID
     * @returns Promise with updated address and message
     */
    async setDefaultAddress(id: string): Promise<{ address: Address; message: string }> {
        try {
            const response = await apiClient.put<ApiResponse<Address>>(`/addresses/${id}/set-default`);
            return {
                address: response.data.data,
                message: response.data.message || 'Default address updated'
            };
        } catch (error) {
            console.error(`Failed to set default address ${id}:`, error);
            throw error;
        }
    }
}

export default new AddressService();
