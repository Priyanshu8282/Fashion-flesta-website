"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import categoryService, { Category } from "@/services/category.service";
import productService, { Product } from "@/services/product.service";
import { getImageUrl } from "@/services/index";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        // Fetch category by name
        const categoryData = await categoryService.getCategoryByName(params.category);
        setCategory(categoryData);

        // Fetch products for this category
        const categoryProducts = await productService.getProductsByCategory(categoryData._id);
        
        // Map products to card format
        const mappedProducts = categoryProducts.map((product: Product) => ({
          id: product._id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: getImageUrl(product.coverImage),
          badge: product.stock < 15 ? "LIMITED" : product.isFeatured ? "FEATURED" : undefined,
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to load category:", error);
        setCategory(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [params.category]);

  // Handle sorting
  const sortProducts = (productsToSort: any[]) => {
    const sorted = [...productsToSort];
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "newest":
        return sorted; // Already sorted by createdAt from backend
      default:
        return sorted;
    }
  };

  const sortedProducts = sortProducts(products);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Loading category...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Category Header/Banner */}
        <section className="bg-gradient-to-r from-rose-100 to-pink-100 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                {category.name}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {category.description || `Discover our ${category.name} collection`}
              </p>
              <p className="mt-4 text-sm text-gray-500">
                {products.length} Products
              </p>
            </div>
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
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
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
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
