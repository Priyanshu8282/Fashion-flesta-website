"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { Heart, Share2, ShoppingCart, Star, Truck, RefreshCw, Shield } from "lucide-react";
import cartService from "@/services/cart.service";
import productService, { Product } from "@/services/product.service";
import { getImageUrl } from "@/services/index";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";

interface PageParams {
  slug: string;
}

export default function ProductDetailPage({ params }: { params: PageParams }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const { refreshCartCount } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch product by slug
        const productData = await productService.getProductBySlug(params.slug);
        setProduct(productData);

        // Fetch related products
        const related = await productService.getRelatedProducts(productData._id, 4);
        const mappedRelated = related.map((p) => ({
          id: p._id,
          slug: p.slug,
          name: p.name,
          price: p.price,
          image: getImageUrl(p.coverImage),
        }));
        setRelatedProducts(mappedRelated);
      } catch (error) {
        console.error("Failed to load product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [params.slug]);

  const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Loading product...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryName = typeof product.category === 'string' ? 'Category' : product.category.name;
  const allImages = product.coverImage 
    ? [product.coverImage, ...product.images.filter(img => img !== product.coverImage)]
    : product.images;
  const processedImages = allImages.map(img => getImageUrl(img));

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-rose-500">Home</a>
          <span className="mx-2">/</span>
          <a href="/categories" className="hover:text-rose-500">Categories</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
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
                src={processedImages[selectedImage] || '/placeholder.png'}
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
            {processedImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {processedImages.map((image, index) => (
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
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-4">Category: {categoryName}</p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price}
                </span>
              </div>

              {/* Stock Status */}
              <p className={`font-medium mb-6 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `✓ In Stock (${product.stock} available)` : '✗ Out of Stock'}
              </p>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
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
            )}

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
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-gray-400 font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={async () => {
                  if (product.sizes.length > 0 && !selectedSize) {
                    toast.error("Please select a size");
                    return;
                  }
                  if (product.stock === 0) {
                    toast.error("Product is out of stock");
                    return;
                  }
                  try {
                    const result = await cartService.addToCart(product._id, quantity, selectedSize);
                    toast.success(result.message);
                    await refreshCartCount();
                  } catch (error) {
                    console.error("Failed to add to cart:", error);
                    toast.error("Failed to add to cart. Please try again.");
                  }
                }}
                disabled={product.stock === 0}
                className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
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

        {/* Product Description */}
        <div className="mb-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Product Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} {...relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
