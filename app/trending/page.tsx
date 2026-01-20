import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, TrendingUp, Flame } from "lucide-react";

export default function TrendingPage() {
  // Trending products
  const trendingProducts = [
    {
      id: "4",
      name: "Embroidered Organza Top",
      price: 1499,
      originalPrice: 2499,
      image: "/product-top.png",
      badge: "TRENDING",
    },
    {
      id: "1",
      name: "Vintage Silk Floral Dress",
      price: 1299,
      originalPrice: 2499,
      image: "/product-dress1.png",
      badge: "HOT",
    },
    {
      id: "8",
      name: "Evening Black Jumpsuit",
      price: 1899,
      originalPrice: 2999,
      image: "/product-jumpsuit.png",
      badge: "TRENDING",
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
      id: "7",
      name: "Linen Tailored Blazer",
      price: 2299,
      originalPrice: 3999,
      image: "/product-blazer.png",
      badge: "TRENDING",
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
      id: "2",
      name: "Cashmere Knit Sweater",
      price: 899,
      originalPrice: 1599,
      image: "/product-sweater.png",
      badge: "TRENDING",
    },
    {
      id: "12",
      name: "Silk Bow Blouse",
      price: 1099,
      originalPrice: 1899,
      image: "/product-blouse.png",
      badge: "HOT",
    },
    {
      id: "10",
      name: "High-Waisted Denim Jeans",
      price: 1599,
      originalPrice: 2499,
      image: "/product-jeans.png",
      badge: "TRENDING",
    },
    {
      id: "5",
      name: "Traditional Pink Kurti",
      price: 799,
      originalPrice: 1499,
      image: "/product-kurti.png",
      badge: "SALE",
    },
    {
      id: "3",
      name: "Elegant Linen Trousers",
      price: 1199,
      originalPrice: 1999,
      image: "/product-trousers.png",
      badge: "TRENDING",
    },
    {
      id: "6",
      name: "Pleated Midi Skirt",
      price: 999,
      originalPrice: 1699,
      image: "/product-skirt.png",
      badge: "HOT",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Page Header/Banner */}
        <section className="relative bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 py-16 md:py-20">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Flame className="h-6 w-6 text-white animate-pulse" />
              <span className="text-white text-sm font-semibold tracking-widest uppercase">
                What's Hot
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trending Now
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto opacity-90">
              Shop the most popular styles everyone is loving right now
            </p>
            <p className="mt-4 text-sm text-white opacity-80">
              {trendingProducts.length} Trending Products
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
                <select className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:border-rose-500 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 appearance-none bg-white cursor-pointer">
                  <option>Most Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Best Rating</option>
                  <option>Newest First</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Trending Banner */}
            <div className="bg-gradient-to-r from-orange-100 to-rose-100 rounded-lg p-6 mb-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-rose-500" />
                <h2 className="text-xl font-bold text-gray-900">
                  Customer Favorites
                </h2>
              </div>
              <p className="text-gray-600 text-sm">
                These styles are flying off our shelves! Get them before they're gone.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Our Customers Love Us
              </h2>
              <p className="text-gray-600">
                Join thousands of happy shoppers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flame className="h-8 w-8 text-rose-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Trending Styles
                </h3>
                <p className="text-gray-600">
                  Stay ahead with the hottest fashion trends
                </p>
              </div>
              <div className="text-center">
                <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-rose-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Quality First
                </h3>
                <p className="text-gray-600">
                  Premium materials and excellent craftsmanship
                </p>
              </div>
              <div className="text-center">
                <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  5-Star Reviews
                </h3>
                <p className="text-gray-600">
                  Loved by thousands of happy customers
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
