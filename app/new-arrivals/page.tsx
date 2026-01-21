import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { SlidersHorizontal, Sparkles } from "lucide-react";

export default function NewArrivalsPage() {
  // New arrival products
  const newArrivals = [
    {
      id: "9",
      name: "Cozy Beige Cardigan",
      price: 1299,
      originalPrice: 2199,
      image: "/product-cardigan.png",
      badge: "NEW",
    },
    {
      id: "10",
      name: "High-Waisted Denim Jeans",
      price: 1599,
      originalPrice: 2499,
      image: "/product-jeans.png",
      badge: "NEW",
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
      id: "12",
      name: "Silk Bow Blouse",
      price: 1099,
      originalPrice: 1899,
      image: "/product-blouse.png",
      badge: "NEW",
    },
    {
      id: "13",
      name: "Mint Green Palazzo Pants",
      price: 899,
      originalPrice: 1599,
      image: "/product-palazzo.png",
      badge: "NEW",
    },
    {
      id: "14",
      name: "Elegant Wool Coat",
      price: 3499,
      originalPrice: 5999,
      image: "/product-coat.png",
      badge: "NEW",
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
      id: "8",
      name: "Evening Black Jumpsuit",
      price: 1899,
      originalPrice: 2999,
      image: "/product-jumpsuit.png",
      badge: "NEW",
    },
    {
      id: "5",
      name: "Traditional Pink Kurti",
      price: 799,
      originalPrice: 1499,
      image: "/product-kurti.png",
      badge: "NEW",
    },
    {
      id: "6",
      name: "Pleated Midi Skirt",
      price: 999,
      originalPrice: 1699,
      image: "/product-skirt.png",
      badge: "NEW",
    },
    {
      id: "7",
      name: "Linen Tailored Blazer",
      price: 2299,
      originalPrice: 3999,
      image: "/product-blazer.png",
      badge: "NEW",
    },
    {
      id: "1",
      name: "Vintage Silk Floral Dress",
      price: 1299,
      originalPrice: 2499,
      image: "/product-dress1.png",
      badge: "NEW",
    },
  ];

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
              {newArrivals.length} New Products
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
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Best Selling</option>
                  <option>Featured</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
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
