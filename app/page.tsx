import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategorySlider from "@/components/CategorySlider";
import HeroSlider from "@/components/HeroSlider";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Tag, TrendingUp } from "lucide-react";

export default function Home() {
  // Categories data - 5 categories
  const categories = [
    {
      id: "1",
      name: "Dresses",
      image: "/category-dresses.png",
      link: "/categories/dresses",
    },
    {
      id: "2",
      name: "Designer Tops",
      image: "/category-tops.png",
      link: "/categories/tops",
    },
    {
      id: "3",
      name: "Ethnic Wear",
      image: "/category-ethnic.png",
      link: "/categories/ethnic",
    },
    {
      id: "4",
      name: "Western Wear",
      image: "/category-western.png",
      link: "/categories/western",
    },
    {
      id: "5",
      name: "Accessories",
      image: "/category-accessories.png",
      link: "/categories/accessories",
    },
  ];

  // Featured Collection - 8 products
  const featuredProducts = [
    {
      id: "1",
      name: "Vintage Silk Floral Dress",
      price: 1299,
      originalPrice: 2499,
      image: "/product-dress1.png",
      badge: "SALE",
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
      id: "3",
      name: "Elegant Linen Trousers",
      price: 1199,
      originalPrice: 1999,
      image: "/product-trousers.png",
    },
    {
      id: "4",
      name: "Embroidered Organza Top",
      price: 1499,
      originalPrice: 2499,
      image: "/product-top.png",
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
      id: "6",
      name: "Pleated Midi Skirt",
      price: 999,
      originalPrice: 1699,
      image: "/product-skirt.png",
    },
    {
      id: "7",
      name: "Linen Tailored Blazer",
      price: 2299,
      originalPrice: 3999,
      image: "/product-blazer.png",
    },
    {
      id: "8",
      name: "Evening Black Jumpsuit",
      price: 1899,
      originalPrice: 2999,
      image: "/product-jumpsuit.png",
      badge: "NEW",
    },
  ];

  // Latest Arrivals - 8 products
  const latestArrivals = [
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
    },
    {
      id: "13",
      name: "Mint Green Palazzo Pants",
      price: 899,
      originalPrice: 1599,
      image: "/product-palazzo.png",
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
      id: "15",
      name: "Pink Cashmere Sweater",
      price: 899,
      originalPrice: 1599,
      image: "/product-sweater.png",
    },
    {
      id: "16",
      name: "Designer Tailored Trousers",
      price: 1199,
      originalPrice: 1999,
      image: "/product-trousers.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Slider Section - Auto-sliding */}
        <HeroSlider />

        {/* Shop by Category Section with Slider */}
        <section className="py-16 bg-rose-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  Shop by Category
                </h2>
                <p className="text-gray-600">
                  Discover styles perfect for every occasion
                </p>
              </div>
              <Link
                href="/categories"
                className="hidden md:flex items-center text-rose-500 hover:text-rose-600 font-semibold"
              >
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <CategorySlider categories={categories} />

            <div className="mt-8 text-center md:hidden">
              <Link
                href="/categories"
                className="inline-flex items-center text-rose-500 hover:text-rose-600 font-semibold"
              >
                View All Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Collection Section - 8 Products in 2 rows */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Featured Collection
              </h2>
              <p className="text-gray-600">
                Handpicked favorites you'll absolutely love
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/products"
                className="inline-flex items-center bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="py-20 relative overflow-hidden">
          {/* Background Image */}
          <Image
            src="/seasonal-sale-bg.png"
            alt="Seasonal Sale"
            fill
            className="object-cover"
          />
          {/* Lighter Gradient Overlay - to show more background */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/60 via-pink-500/50 to-rose-400/60" />
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-20 text-9xl">🎁</div>
            <div className="absolute bottom-10 right-20 text-9xl">✨</div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <Tag className="h-4 w-4" />
                  <span className="text-sm font-semibold">Limited Time Offer</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Seasonal Sale
                </h2>
                <p className="text-xl mb-6 text-white/90">
                  Get up to 50% off on selected items. Don't miss out on our biggest sale of the season!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/categories"
                    className="bg-white text-rose-500 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center transform hover:scale-105"
                  >
                    Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    href="/new-arrivals"
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center border-2 border-white"
                  >
                    View Collection
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white transform hover:scale-105 transition-transform">
                    <TrendingUp className="h-8 w-8 mb-3" />
                    <h3 className="text-2xl font-bold mb-2">2000+</h3>
                    <p className="text-white/80">Happy Customers</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white transform hover:scale-105 transition-transform mt-8">
                    <Tag className="h-8 w-8 mb-3" />
                    <h3 className="text-2xl font-bold mb-2">50%</h3>
                    <p className="text-white/80">Discount</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white transform hover:scale-105 transition-transform">
                    <span className="text-3xl mb-3 block">⭐</span>
                    <h3 className="text-2xl font-bold mb-2">4.9</h3>
                    <p className="text-white/80">Rating</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white transform hover:scale-105 transition-transform mt-8">
                    <span className="text-3xl mb-3 block">🚚</span>
                    <h3 className="text-2xl font-bold mb-2">Free</h3>
                    <p className="text-white/80">Delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Arrivals Section - 8 Products in 2 rows */}
        <section className="py-16 bg-gradient-to-b from-rose-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Latest Arrivals
              </h2>
              <p className="text-gray-600">
                Fresh styles just landed - be the first to own them
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestArrivals.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/new-arrivals"
                className="inline-flex items-center bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                View All Arrivals <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-rose-100 to-pink-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-500 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Join the Luxe List
            </h2>
            <p className="text-gray-600 mb-8">
              Subscribe to receive the latest updates, exclusive offers, and
              styling tips, sent straight to your inbox.
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
