"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Package, 
  User as UserIcon, 
  MapPin, 
  Plus,
  Edit2,
  Trash2
} from "lucide-react";
import orderService, { Order } from "@/services/order.service";
import userService, { User, UpdateProfileData } from "@/services/user.service";
import addressService, { Address, AddressFormData } from "@/services/address.service";
import toast from "react-hot-toast";
import Image from "next/image";
import { getImageUrl } from "@/services/index";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "addresses">("orders");
  const [loading, setLoading] = useState(true);
  
  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Profile state
  const [profile, setProfile] = useState<User | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileForm, setProfileForm] = useState<UpdateProfileData>({
    name: "",
    phone: "",
  });

  // Address state
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState<AddressFormData>({
    fullName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    isDefault: false
  });

  // Fetch data on mount
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchOrders(),
          fetchProfile(),
          fetchAddresses()
        ]);
      } catch (error) {
        console.error("Failed to initialize data:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Fetch orders
  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const orderData = await orderService.getMyOrders();
      setOrders(orderData);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setOrdersLoading(false);
    }
  };

  // Fetch profile
  const fetchProfile = async () => {
    setProfileLoading(true);
    try {
      const userData = await userService.getProfile();
      setProfile(userData);
      setProfileForm({
        name: userData.name,
        phone: userData.phone || "",
      });
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setProfileLoading(false);
    }
  };

  // Fetch addresses
  const fetchAddresses = async () => {
    setAddressesLoading(true);
    try {
      const addressList = await addressService.getAddresses();
      setAddresses(addressList);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
      toast.error("Failed to load addresses");
    } finally {
      setAddressesLoading(false);
    }
  };

  // Update profile
  const handleUpdateProfile = async () => {
    if (!profileForm.name || !profileForm.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const { message } = await userService.updateProfile(profileForm);
      toast.success(message);
      await fetchProfile();
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    }
  };

  // Add or update address
  const handleSaveAddress = async () => {
    if (!addressForm.fullName || !addressForm.phoneNumber || !addressForm.addressLine1 || 
        !addressForm.city || !addressForm.state || !addressForm.pincode) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      if (editingAddress) {
        const { message } = await addressService.updateAddress(editingAddress, addressForm);
        toast.success(message);
      } else {
        const { message } = await addressService.createAddress(addressForm);
        toast.success(message);
      }

      await fetchAddresses();
      setShowAddressForm(false);
      setEditingAddress(null);
      setAddressForm({
        fullName: "",
        phoneNumber: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        isDefault: false
      });
    } catch (error) {
      console.error("Failed to save address:", error);
      toast.error("Failed to save address");
    }
  };

  // Edit address
  const handleEditAddress = (address: Address) => {
    setAddressForm({
      fullName: address.fullName,
      phoneNumber: address.phoneNumber,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
      isDefault: address.isDefault
    });
    setEditingAddress(address._id);
    setShowAddressForm(true);
  };

  // Delete address
  const handleDeleteAddress = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        const { message } = await addressService.deleteAddress(id);
        toast.success(message);
        await fetchAddresses();
      } catch (error) {
        console.error("Failed to delete address:", error);
        toast.error("Failed to delete address");
      }
    }
  };

  // Get order status color and label
  const getOrderStatusStyle = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-2 ${
                  activeTab === "orders"
                    ? "bg-rose-50 text-rose-500"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Package className="h-5 w-5" />
                <span className="font-medium">My Orders</span>
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-2 ${
                  activeTab === "profile"
                    ? "bg-rose-50 text-rose-500"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <UserIcon className="h-5 w-5" />
                <span className="font-medium">Profile Info</span>
              </button>
              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "addresses"
                    ? "bg-rose-50 text-rose-500"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <MapPin className="h-5 w-5" />
                <span className="font-medium">Addresses</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* My Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">My Orders</h2>
                {ordersLoading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Loading orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No orders yet
                    </h3>
                    <p className="text-gray-600">
                      Start shopping to see your orders here
                    </p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order._id} className="bg-white rounded-lg shadow-sm p-6">
                      {/* Order Header */}
                      <div className="flex justify-between items-start mb-4 pb-4 border-b">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            Order #{order.orderNumber}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusStyle(order.orderStatus)}`}
                          >
                            {order.orderStatus}
                          </span>
                          <p className="text-lg font-bold text-gray-900 mt-2">
                            ₹{order.totalAmount}
                          </p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Items:</h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex gap-3">
                              {item.product && typeof item.product === 'object' && 'images' in item.product && (
                                <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                                  <Image
                                    src={getImageUrl(item.product.images[0])}
                                    alt={item.name || 'Product'}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </p>
                                <p className="text-xs text-gray-600">
                                  Qty: {item.quantity} | Size: {item.size} | ₹{item.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Address */}
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Shipping Address:
                        </h4>
                        <p className="text-sm text-gray-600">
                          {order.shippingAddress.name}
                          <br />
                          {order.shippingAddress.street}
                          <br />
                          {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                          <br />
                          Phone: {order.shippingAddress.phone}
                        </p>
                      </div>

                      {/* Payment Info */}
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Payment Method:</span>
                          <span className="font-medium text-gray-900">{order.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-gray-600">Payment Status:</span>
                          <span className={`font-medium ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                            {order.paymentStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Profile Info Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Profile Information
                </h2>
                {profileLoading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Loading profile...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, name: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={profile?.email || ""}
                          disabled
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, phone: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={handleUpdateProfile}
                      className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Saved Addresses
                  </h2>
                  <button 
                    onClick={() => {
                      setShowAddressForm(!showAddressForm);
                      setEditingAddress(null);
                      setAddressForm({
                        fullName: "",
                        phoneNumber: "",
                        addressLine1: "",
                        addressLine2: "",
                        city: "",
                        state: "",
                        pincode: "",
                        country: "India",
                        isDefault: false
                      });
                    }}
                    className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add New Address
                  </button>
                </div>

                {/* Address Form */}
                {showAddressForm && (
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      {editingAddress ? "Edit Address" : "Add New Address"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={addressForm.fullName}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, fullName: e.target.value })
                        }
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={addressForm.phoneNumber}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, phoneNumber: e.target.value })
                        }
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                      <input
                        type="text"
                        placeholder="Address Line 1"
                        value={addressForm.addressLine1}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, addressLine1: e.target.value })
                        }
                        className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={addressForm.city}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, city: e.target.value })
                        }
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={addressForm.state}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, state: e.target.value })
                        }
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                      <input
                        type="text"
                        placeholder="Pincode"
                        value={addressForm.pincode}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, pincode: e.target.value })
                        }
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={handleSaveAddress}
                        className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-medium transition-colors"
                      >
                        {editingAddress ? "Update" : "Save"} Address
                      </button>
                      <button
                        onClick={() => {
                          setShowAddressForm(false);
                          setEditingAddress(null);
                        }}
                        className="px-6 py-2 border border-gray-300 hover:border-gray-400 rounded-lg font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Address List */}
                {addressesLoading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Loading addresses...</p>
                  </div>
                ) : addresses.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No addresses saved
                    </h3>
                    <p className="text-gray-600">
                      Add an address to use for checkout
                    </p>
                  </div>
                ) : (
                  addresses.map((address) => (
                    <div
                      key={address._id}
                      className="bg-white rounded-lg shadow-sm p-6"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">
                              {address.fullName}
                            </h3>
                            {address.isDefault && (
                              <span className="text-xs bg-rose-500 text-white px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600">{address.addressLine1}</p>
                          {address.addressLine2 && (
                            <p className="text-gray-600">{address.addressLine2}</p>
                          )}
                          <p className="text-gray-600">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                          <p className="text-gray-600">Phone: {address.phoneNumber}</p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEditAddress(address)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteAddress(address._id)}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
