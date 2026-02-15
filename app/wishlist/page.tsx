"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getImageUrl } from "@/services/index";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait a moment for wishlist to load
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-16">
            <p className="text-gray-600">Loading wishlist...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!wishlist || wishlist.products.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-600 mb-8">
              Save your favorite items here to purchase them later.
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
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
        {/* Page Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-2">
              {wishlist.products.length} {wishlist.products.length === 1 ? "item" : "items"} saved
            </p>
          </div>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              slug={product.slug}
              name={product.name}
              price={product.price}
              image={getImageUrl(product.images[0])}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
