"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import cartService from "@/services/cart.service";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ProductCardProps {
  id: string;
  slug?: string; // Optional for backward compatibility
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
}

export default function ProductCard({
  id,
  slug,
  name,
  price,
  originalPrice,
  image,
  badge,
}: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { requireAuth } = useAuth();
  const { refreshCartCount } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const router = useRouter();
  
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    // Check if user is authenticated
    if (!requireAuth()) return;
    
    setIsAddingToCart(true);
    try {
      // Add to cart via API with default size and quantity
      const result = await cartService.addToCart(id, 1, "M");
      toast.success(result.message);
      // Refresh cart count in header
      await refreshCartCount();
    } catch (error: any) {
      console.error('Failed to add to cart:', error);
      
      // If 401 Unauthorized, redirect to login
      if (error?.response?.status === 401) {
       
        router.push('/login');
        return;
      }
      
      const errorMessage = error?.response?.data?.message || 'Failed to add item to cart';
      toast.error(errorMessage);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleToggleWishlist = async () => {
    // Check if user is authenticated
    if (!requireAuth()) return;
    
    if (isInWishlist(id)) {
      await removeFromWishlist(id);
    } else {
      await addToWishlist(id);
    }
  };

  const inWishlist = isInWishlist(id);

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Badge */}
      {badge && (
        <div className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
          {badge}
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className={`absolute top-3 right-3 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 ${
          inWishlist ? "bg-rose-500" : "bg-white hover:bg-rose-50"
        }`}
        aria-label="Add to wishlist"
      >
        <Heart 
          className={`h-4 w-4 ${
            inWishlist ? "text-white fill-white" : "text-gray-600 hover:text-rose-500"
          }`} 
        />
      </button>

      {/* Product Image */}
      <Link href={`/products/${slug || id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${slug || id}`}>
          <h3 className="text-gray-800 font-medium mb-2 line-clamp-2 hover:text-rose-500 transition-colors">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">₹{price}</span>
          {originalPrice && (
            <>
              <span className="text-sm text-gray-500 line-through">
                ₹{originalPrice}
              </span>
              <span className="text-sm text-rose-500 font-semibold">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="mt-3 w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAddingToCart ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
