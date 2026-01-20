"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  MapPin,
  Plus,
  Edit2,
  Trash2,
  CreditCard,
  Wallet,
  ArrowLeft,
} from "lucide-react";

interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal } = useCart();

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "John Doe",
      phone: "+91 9876543210",
      addressLine: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      isDefault: true,
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState<string>("1");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod">("cod");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);

  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <button
              onClick={() => router.push("/categories")}
              className="inline-flex items-center bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Continue Shopping
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddAddress = () => {
    if (!addressForm.name || !addressForm.phone || !addressForm.addressLine || !addressForm.city || !addressForm.state || !addressForm.pincode) {
      alert("Please fill all fields");
      return;
    }

    if (editingAddress) {
      // Edit existing address
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddress
            ? { ...addr, ...addressForm }
            : addr
        )
      );
      setEditingAddress(null);
    } else {
      // Add new address
      const newAddress: Address = {
        id: Date.now().toString(),
        ...addressForm,
        isDefault: addresses.length === 0,
      };
      setAddresses([...addresses, newAddress]);
      if (addresses.length === 0) {
        setSelectedAddress(newAddress.id);
      }
    }

    setAddressForm({
      name: "",
      phone: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
    });
    setShowAddressForm(false);
  };

  const handleEditAddress = (address: Address) => {
    setAddressForm({
      name: address.name,
      phone: address.phone,
      addressLine: address.addressLine,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    });
    setEditingAddress(address.id);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (id: string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses(addresses.filter((addr) => addr.id !== id));
      if (selectedAddress === id && addresses.length > 1) {
        setSelectedAddress(addresses.find((addr) => addr.id !== id)?.id || "");
      }
    }
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    alert(
      `Order placed successfully!\nPayment Method: ${paymentMethod === "upi" ? "UPI" : "Cash on Delivery"}\nTotal: ₹${cartTotal}`
    );
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Address & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-rose-500" />
                  Delivery Address
                </h2>
                <button
                  onClick={() => {
                    setShowAddressForm(!showAddressForm);
                    setEditingAddress(null);
                    setAddressForm({
                      name: "",
                      phone: "",
                      addressLine: "",
                      city: "",
                      state: "",
                      pincode: "",
                    });
                  }}
                  className="flex items-center gap-2 text-rose-500 hover:text-rose-600 font-medium"
                >
                  <Plus className="h-4 w-4" />
                  Add New Address
                </button>
              </div>

              {/* Address Form */}
              {showAddressForm && (
                <div className="mb-6 p-4 border-2 border-rose-200 rounded-lg bg-rose-50">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {editingAddress ? "Edit Address" : "Add New Address"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={addressForm.name}
                      onChange={(e) =>
                        setAddressForm({ ...addressForm, name: e.target.value })
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={addressForm.phone}
                      onChange={(e) =>
                        setAddressForm({ ...addressForm, phone: e.target.value })
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                    <input
                      type="text"
                      placeholder="Address Line"
                      value={addressForm.addressLine}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          addressLine: e.target.value,
                        })
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
                        setAddressForm({
                          ...addressForm,
                          pincode: e.target.value,
                        })
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleAddAddress}
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

              {/* Saved Addresses */}
              <div className="space-y-3">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedAddress === address.id
                        ? "border-rose-500 bg-rose-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedAddress(address.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="radio"
                            checked={selectedAddress === address.id}
                            onChange={() => setSelectedAddress(address.id)}
                            className="text-rose-500"
                          />
                          <h3 className="font-semibold text-gray-900">
                            {address.name}
                          </h3>
                          {address.isDefault && (
                            <span className="text-xs bg-rose-500 text-white px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm ml-6">
                          {address.addressLine}
                        </p>
                        <p className="text-gray-600 text-sm ml-6">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-gray-600 text-sm ml-6">
                          Phone: {address.phone}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditAddress(address);
                          }}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAddress(address.id);
                          }}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-rose-500" />
                Payment Method
              </h2>
              <div className="space-y-3">
                {/* UPI Option */}
                <div
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === "upi"
                      ? "border-rose-500 bg-rose-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="text-rose-500"
                    />
                    <Wallet className="h-5 w-5 text-gray-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">UPI Payment</h3>
                      <p className="text-sm text-gray-600">
                        Pay using Google Pay, PhonePe, Paytm, or any UPI app
                      </p>
                    </div>
                  </div>
                </div>

                {/* COD Option */}
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-rose-500 bg-rose-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="text-rose-500"
                    />
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Cash on Delivery
                      </h3>
                      <p className="text-sm text-gray-600">
                        Pay when you receive your order
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-32">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3">
                    <div className="relative w-16 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-lg font-semibold mt-6 transition-colors"
              >
                Place Order
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing your order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
