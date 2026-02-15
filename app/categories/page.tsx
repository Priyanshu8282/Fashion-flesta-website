"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import categoryService, { Category } from "@/services/category.service";
import productService, { Product } from "@/services/product.service";
import { getImageUrl } from "@/services/index";

interface CategorySection {
  category: Category;
  products: any[];
}

export default function AllCategoriesPage() {
  const [categorySections, setCategorySections] = useState<CategorySection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        // Fetch all categories
        const categories = await categoryService.getAllCategories();
        
        // For each category, fetch first 4 products
        const sectionsPromises = categories.map(async (category: Category) => {
          try {
            const products = await productService.getProductsByCategory(category._id);
            
            // Map first 4 products
            const mappedProducts = products.slice(0, 4).map((product: Product) => ({
              id: product._id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: getImageUrl(product.coverImage),
              badge: product.isFeatured ? "TRENDING" : product.stock < 15 ? "LIMITED" : undefined,
            }));

            return {
              category,
              products: mappedProducts,
            };
          } catch (error) {
            console.error(`Failed to fetch products for category ${category.name}:`, error);
            return {
              category,
              products: [],
            };
          }
        });

        const sections = await Promise.all(sectionsPromises);
        setCategorySections(sections);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Loading categories...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Convert category name to URL-friendly format
  const getCategoryLink = (categoryName: string) => {
    return `/categories/${categoryName.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Page Header with Banner Image */}
        <section className="relative bg-gradient-to-r from-rose-100 to-pink-100 py-12 md:py-16 overflow-hidden">
          {/* Background Banner Image */}
          <Image
            src="/categories-banner.png"
            alt="Shop by Category"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-100/80 to-pink-100/80" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Shop by Category
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our complete collection organized by style and occasion
              </p>
              <p className="mt-4 text-sm text-gray-500">
                {categorySections.length} Categories
              </p>
            </div>
          </div>
        </section>

        {/* Category Sections */}
        {categorySections.length > 0 ? (
          categorySections.map((section, index) => (
            <section
              key={section.category._id}
              className={`py-12 ${
                index % 2 === 0 ? "bg-white" : "bg-rose-50"
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Category Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div className="flex items-center gap-4">
                    {/* Category Icon */}
                    <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-md flex-shrink-0">
                      <Image
                        src={getImageUrl(section.category.image)}
                        alt={section.category.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                        {section.category.name}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {section.category.description || `Explore our ${section.category.name} collection`}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={getCategoryLink(section.category.name)}
                    className="flex items-center text-rose-500 hover:text-rose-600 font-semibold transition-colors group"
                  >
                    View All
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Products Grid */}
                {section.products.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {section.products.map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No products in this category yet.
                    </p>
                  </div>
                )}
              </div>
            </section>
          ))
        ) : (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-gray-500 text-lg">
                No categories available at the moment.
              </p>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
