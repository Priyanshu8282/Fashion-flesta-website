"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { Heart, Share2, ShoppingCart, Star, Truck, RefreshCw, Shield } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Sample product data with multiple images
  const product = {
    id: params.id,
    name: "Vintage Silk Floral Dress",
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    rating: 4.5,
    reviews: 127,
    inStock: true,
    images: [
      "/product-dress1.png",
      "/product-maxi-dress.png",
      "/product-skirt.png",
      "/product-dress1.png",
    ],
    description:
      "Elevate your wardrobe with this exquisite vintage silk floral dress. Featuring a timeless floral print and luxurious silk fabric, this dress is perfect for both casual and formal occasions. The elegant cut and comfortable fit make it a versatile addition to any fashion-forward woman's closet.",
    features: [
      "Premium quality silk fabric",
      "Elegant floral print design",
      "Comfortable and breathable",
      "Perfect for all seasons",
      "Easy to care and maintain",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Beige", "Pink", "Blue"],
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const { addToCart } = useCart();

  // Related products
  const relatedProducts = [
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
  ];

  const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-rose-500">
            Home
          </a>
          <span className="mx-2">/</span>
          <a href="/categories" className="hover:text-rose-500">
            Categories
          </a>
          <span className="mx-2">/</span>
          <a href="/categories/dresses" className="hover:text-rose-500">
            Dresses
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {/* Filter Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Search</h3>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {/* Category Filter */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Category</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-rose-500 border-gray-300 rounded focus:ring-rose-500"
                  />
                  <span className="text-gray-700">Dresses</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-rose-500 border-gray-300 rounded focus:ring-rose-500"
                  />
                  <span className="text-gray-700">Designer Tops</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-rose-500 border-gray-300 rounded focus:ring-rose-500"
                    defaultChecked
                  />
                  <span className="text-gray-700">Ethnic Wear</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-rose-500 border-gray-300 rounded focus:ring-rose-500"
                  />
                  <span className="text-gray-700">Western Wear</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-rose-500 border-gray-300 rounded focus:ring-rose-500"
                  />
                  <span className="text-gray-700">Accessories</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-rose-500 border-gray-300 rounded focus:ring-rose-500"
                  />
                  <span className="text-gray-700">Footwear</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-rose-500 border-gray-300 rounded focus:ring-rose-500"
                  />
                  <span className="text-gray-700">Other Items</span>
                </label>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="0"
                    defaultValue="0"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <input
                    type="number"
                    placeholder="1500000"
                    defaultValue="1500000"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="1500000"
                  defaultValue="750000"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>₹0</span>
                  <span>₹15,00,000</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Content - Takes 3 columns on large screens */}
          <div className="lg:col-span-3">
            {/* Product Main Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image with Zoom */}
            <div
              className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden cursor-crosshair"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleImageHover}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300"
                style={{
                  transform: isZoomed ? "scale(2)" : "scale(1)",
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
                priority
              />
              {isZoomed && (
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                  Hover to zoom
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-rose-500 scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="text-lg text-rose-500 font-semibold">
                  {product.discount}% OFF
                </span>
              </div>

              {/* Stock Status */}
              <p className="text-green-600 font-medium mb-6">
                ✓ In Stock - Ready to Ship
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Select Size
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 border-2 rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? "border-rose-500 bg-rose-50 text-rose-600"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Select Color: {selectedColor}
              </label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-2 border-2 rounded-lg font-medium transition-all ${
                      selectedColor === color
                        ? "border-rose-500 bg-rose-50 text-rose-600"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-gray-400 font-semibold"
                >
                  -
                </button>
                <span className="w-16 text-center font-semibold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-gray-400 font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={() => {
                  if (!selectedSize) {
                    alert("Please select a size");
                    return;
                  }
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    quantity,
                    size: selectedSize,
                    color: selectedColor,
                  });
                  alert(`${product.name} (Size: ${selectedSize}, Color: ${selectedColor}) added to cart!`);
                }}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
              >                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="border-2 border-rose-500 text-rose-500 hover:bg-rose-50 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5" />
                  Wishlist
                </button>
                <button className="border-2 border-gray-300 hover:border-gray-400 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Share
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <Truck className="h-5 w-5 text-rose-500" />
                <span>Free delivery on orders above ₹999</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <RefreshCw className="h-5 w-5 text-rose-500" />
                <span>7 days easy return & exchange</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Shield className="h-5 w-5 text-rose-500" />
                <span>100% Authentic Products</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description & Features */}
        <div className="mb-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Product Description
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Key Features
            </h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-rose-500 mt-1">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
