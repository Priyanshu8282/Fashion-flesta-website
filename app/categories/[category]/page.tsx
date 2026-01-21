import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

// Category data
const categories = {
  dresses: {
    name: "Dresses",
    description: "Discover our elegant collection of dresses for every occasion",
    image: "/category-dresses.png",
  },
  tops: {
    name: "Designer Tops",
    description: "Premium tops and blouses that elevate your style",
    image: "/category-tops.png",
  },
  ethnic: {
    name: "Ethnic Wear",
    description: "Traditional elegance meets modern design",
    image: "/category-ethnic.png",
  },
  western: {
    name: "Western Wear",
    description: "Casual and trendy western outfits",
    image: "/category-western.png",
  },
  accessories: {
    name: "Accessories",
    description: "Complete your look with our curated accessories",
    image: "/category-accessories.png",
  },
};

// Sample products by category
const categoryProducts: Record<string, any[]> = {
  dresses: [
    {
      id: "1",
      name: "Vintage Silk Floral Dress",
      price: 1299,
      originalPrice: 2499,
      image: "/product-dress1.png",
      badge: "SALE",
    },
    {
      id: "11",
      name: "Floral Maxi Dress",
      price: 1799,
      originalPrice: 2999,
      image: "/product-maxi-dress.png",
      badge: "HOT",
    },
    {
      id: "6",
      name: "Pleated Midi Skirt",
      price: 999,
      originalPrice: 1699,
      image: "/product-skirt.png",
    },
    {
      id: "1b",
      name: "Vintage Silk Floral Dress",
      price: 1299,
      originalPrice: 2499,
      image: "/product-dress1.png",
    },
    {
      id: "11b",
      name: "Pink Floral Maxi Dress",
      price: 1799,
      originalPrice: 2999,
      image: "/product-maxi-dress.png",
    },
    {
      id: "6b",
      name: "Rose Pleated Midi Skirt",
      price: 999,
      originalPrice: 1699,
      image: "/product-skirt.png",
      badge: "NEW",
    },
  ],
  tops: [
    {
      id: "4",
      name: "Embroidered Organza Top",
      price: 1499,
      originalPrice: 2499,
      image: "/product-top.png",
      badge: "TRENDING",
    },
    {
      id: "2",
      name: "Cashmere Knit Sweater",
      price: 899,
      originalPrice: 1599,
      image: "/product-sweater.png",
      badge: "NEW",
    },
    {
      id: "12",
      name: "Silk Bow Blouse",
      price: 1099,
      originalPrice: 1899,
      image: "/product-blouse.png",
    },
    {
      id: "4b",
      name: "Designer Organza Top",
      price: 1499,
      originalPrice: 2499,
      image: "/product-top.png",
    },
    {
      id: "2b",
      name: "Pink Cashmere Sweater",
      price: 899,
      originalPrice: 1599,
      image: "/product-sweater.png",
      badge: "SALE",
    },
    {
      id: "12b",
      name: "White Silk Blouse",
      price: 1099,
      originalPrice: 1899,
      image: "/product-blouse.png",
    },
  ],
  ethnic: [
    {
      id: "5",
      name: "Traditional Pink Kurti",
      price: 799,
      originalPrice: 1499,
      image: "/product-kurti.png",
      badge: "SALE",
    },
    {
      id: "13",
      name: "Mint Green Palazzo Pants",
      price: 899,
      originalPrice: 1599,
      image: "/product-palazzo.png",
    },
    {
      id: "4e",
      name: "Embroidered Top",
      price: 1499,
      originalPrice: 2499,
      image: "/product-top.png",
    },
    {
      id: "5b",
      name: "Floral Print Kurti",
      price: 799,
      originalPrice: 1499,
      image: "/product-kurti.png",
    },
    {
      id: "13b",
      name: "Turquoise Palazzo Pants",
      price: 899,
      originalPrice: 1599,
      image: "/product-palazzo.png",
      badge: "NEW",
    },
    {
      id: "4eb",
      name: "Golden Embroidered Top",
      price: 1499,
      originalPrice: 2499,
      image: "/product-top.png",
      badge: "TRENDING",
    },
  ],
  western: [
    {
      id: "10",
      name: "High-Waisted Denim Jeans",
      price: 1599,
      originalPrice: 2499,
      image: "/product-jeans.png",
    },
    {
      id: "7",
      name: "Linen Tailored Blazer",
      price: 2299,
      originalPrice: 3999,
      image: "/product-blazer.png",
    },
    {
      id: "3",
      name: "Elegant Linen Trousers",
      price: 1199,
      originalPrice: 1999,
      image: "/product-trousers.png",
    },
    {
      id: "10b",
      name: "Skinny Fit Jeans",
      price: 1599,
      originalPrice: 2499,
      image: "/product-jeans.png",
      badge: "HOT",
    },
    {
      id: "7b",
      name: "Beige Linen Blazer",
      price: 2299,
      originalPrice: 3999,
      image: "/product-blazer.png",
      badge: "SALE",
    },
    {
      id: "3b",
      name: "Cream Tailored Trousers",
      price: 1199,
      originalPrice: 1999,
      image: "/product-trousers.png",
    },
  ],
  accessories: [
    {
      id: "9",
      name: "Cozy Beige Cardigan",
      price: 1299,
      originalPrice: 2199,
      image: "/product-cardigan.png",
      badge: "NEW",
    },
    {
      id: "14",
      name: "Elegant Wool Coat",
      price: 3499,
      originalPrice: 5999,
      image: "/product-coat.png",
      badge: "SALE",
    },
    {
      id: "8",
      name: "Evening Black Jumpsuit",
      price: 1899,
      originalPrice: 2999,
      image: "/product-jumpsuit.png",
    },
    {
      id: "9b",
      name: "Knit Cardigan",
      price: 1299,
      originalPrice: 2199,
      image: "/product-cardigan.png",
    },
    {
      id: "14b",
      name: "Camel Wool Coat",
      price: 3499,
      originalPrice: 5999,
      image: "/product-coat.png",
    },
    {
      id: "8b",
      name: "Formal Black Jumpsuit",
      price: 1899,
      originalPrice: 2999,
      image: "/product-jumpsuit.png",
      badge: "TRENDING",
    },
  ],
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryKey } = await params;
  const categoryInfo = categories[categoryKey as keyof typeof categories];

  if (!categoryInfo) {
    notFound();
  }

  const products = categoryProducts[categoryKey] || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Category Header/Banner */}
        <section className="bg-gradient-to-r from-rose-100 to-pink-100 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                {categoryInfo.name}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {categoryInfo.description}
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
                <select className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:border-rose-500 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 appearance-none bg-white cursor-pointer">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Best Selling</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {products.map((product) => (
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

// Generate static params for all categories
export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category: category,
  }));
}
