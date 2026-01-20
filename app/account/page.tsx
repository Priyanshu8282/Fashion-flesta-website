"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Package, User as UserIcon, MapPin, Settings, ChevronRight } from "lucide-react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "addresses">("orders");

  // Sample data
  const orders = [
    {
      id: "ORD12345",
      date: "2024-01-15",
      total: 2599,
      status: "Delivered",
      items: [
        { name: "Vintage Silk Floral Dress", quantity: 1, price: 1299 },
        { name: "Cashmere Knit Sweater", quantity: 1, price: 1300 },
      ],
      tracking: {
        ordered: { date: "2024-01-15", completed: true },
        shipped: { date: "2024-01-16", completed: true },
        outForDelivery: { date: "2024-01-18", completed: true },
        delivered: { date: "2024-01-19", completed: true },
      },
    },
    {
      id: "ORD12344",
      date: "2024-01-10",
      total: 1799,
      status: "In Transit",
      items: [
        { name: "Floral Maxi Dress", quantity: 1, price: 1799 },
      ],
      tracking: {
        ordered: { date: "2024-01-10", completed: true },
        shipped: { date: "2024-01-11", completed: true },
        outForDelivery: { date: "", completed: false },
        delivered: { date: "", completed: false },
      },
    },
  ];

  const userProfile = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+91 9876543210",
    gender: "Female",
    dob: "1995-06-15",
  };

  const addresses = [
    {
      id: "1",
      name: "Jane Doe",
      phone: "+91 9876543210",
      addressLine: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      isDefault: true,
    },
    {
      id: "2",
      name: "Jane Doe",
      phone: "+91 9876543210",
      addressLine: "456 Park Avenue",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      isDefault: false,
    },
  ];

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
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
                    {/* Order Header */}
                    <div className="flex justify-between items-start mb-4 pb-4 border-b">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          Order #{order.id}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {order.status}
                        </span>
                        <p className="text-lg font-bold text-gray-900 mt-2">
                          ₹{order.total}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Items:</h4>
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm text-gray-600 mb-1">
                          • {item.name} x {item.quantity} - ₹{item.price}
                        </div>
                      ))}
                    </div>

                    {/* Order Tracking */}
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium text-gray-900 mb-4">
                        Order Tracking
                      </h4>
                      <div className="relative">
                        {/* Tracking Timeline */}
                        <div className="space-y-4">
                          {/* Ordered */}
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  order.tracking.ordered.completed
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                                }`}
                              >
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                              </div>
                              <div className="w-0.5 h-12 bg-gray-300"></div>
                            </div>
                            <div className="flex-1 pb-4">
                              <p className="font-medium text-gray-900">
                                Order Placed
                              </p>
                              {order.tracking.ordered.completed && (
                                <p className="text-sm text-gray-600">
                                  {order.tracking.ordered.date}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Shipped */}
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  order.tracking.shipped.completed
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                                }`}
                              >
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                              </div>
                              <div className="w-0.5 h-12 bg-gray-300"></div>
                            </div>
                            <div className="flex-1 pb-4">
                              <p className="font-medium text-gray-900">
                                Shipped
                              </p>
                              {order.tracking.shipped.completed && (
                                <p className="text-sm text-gray-600">
                                  {order.tracking.shipped.date}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Out for Delivery */}
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  order.tracking.outForDelivery.completed
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                                }`}
                              >
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                              </div>
                              <div className="w-0.5 h-12 bg-gray-300"></div>
                            </div>
                            <div className="flex-1 pb-4">
                              <p className="font-medium text-gray-900">
                                Out for Delivery
                              </p>
                              {order.tracking.outForDelivery.completed && (
                                <p className="text-sm text-gray-600">
                                  {order.tracking.outForDelivery.date}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Delivered */}
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  order.tracking.delivered.completed
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                                }`}
                              >
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                Delivered
                              </p>
                              {order.tracking.delivered.completed && (
                                <p className="text-sm text-gray-600">
                                  {order.tracking.delivered.date}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Profile Info Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Profile Information
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={userProfile.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={userProfile.email}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        defaultValue={userProfile.phone}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        defaultValue={userProfile.gender}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      >
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        defaultValue={userProfile.dob}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                  </div>
                  <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Saved Addresses
                  </h2>
                  <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Add New Address
                  </button>
                </div>
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="bg-white rounded-lg shadow-sm p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {address.name}
                          </h3>
                          {address.isDefault && (
                            <span className="text-xs bg-rose-500 text-white px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">{address.addressLine}</p>
                        <p className="text-gray-600">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-gray-600">Phone: {address.phone}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">
                          Edit
                        </button>
                        <button className="text-rose-500 hover:text-rose-600 font-medium text-sm">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
