"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { SlidersHorizontal, Sparkles } from "lucide-react";
import productService, { Product } from "@/services/product.service";
import { getImageUrl } from "@/services/index";

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        // Fetch all products (backend returns sorted by createdAt desc)
        const allProducts = await productService.getAllProducts();
        
        // Map products to card format with "NEW" badge
        const mappedProducts = allProducts.map((product: Product) => ({
          id: product._id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: getImageUrl(product.coverImage),
          badge: "NEW",
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to load new arrivals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  // Handle sorting
  const sortProducts = (productsToSort: any[]) => {
    const sorted = [...productsToSort];
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "newest":
      default:
        return sorted; // Already sorted by createdAt desc
    }
  };

  const sortedProducts = sortProducts(products);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Loading new arrivals...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Page Header/Banner with Background Image */}
        <section className="relative bg-gradient-to-r from-rose-500 to-pink-500 py-16 md:py-20 overflow-hidden">
          {/* Background Banner Image */}
          <Image
            src="/new-arrivals-banner.png"
            alt="New Arrivals"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/70 to-pink-500/70" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-white" />
              <span className="text-white text-sm font-semibold tracking-widest uppercase">
                Just Landed
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              New Arrivals
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto opacity-90">
              Discover our latest collection of trendy and stylish pieces
            </p>
            <p className="mt-4 text-sm text-white opacity-80">
              {products.length} New Products
            </p>
          </div>
        </section>

        {/* Filters and Sort Bar */}
        <section className="bg-white border-b border-gray-200 sticky top-24 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Filter Button */}
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-rose-500 transition-colors w-full sm:w-auto justify-center">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="font-medium">Filters</span>
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-gray-600 hidden sm:block">
                  Sort by:
                </span>
                <select 
                  className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:border-rose-500 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 appearance-none bg-white cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  No new arrivals at the moment. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-gradient-to-r from-rose-100 to-pink-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Never Miss a Drop
            </h2>
            <p className="text-gray-600 mb-8">
              Subscribe to get notified about new arrivals, exclusive deals, and
              fashion tips
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
              <button
                type="submit"
                className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
