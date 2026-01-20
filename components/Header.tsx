"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Heart, User, Menu, X, Search, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-rose-50 py-2 px-4 text-center text-sm text-gray-700">
        <p>✨ Free Shipping on Orders Above ₹999 | Shop Now!</p>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Fashion Flesta"
              width={400}
              height={200}
              className="h-24 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-rose-500 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-rose-500 transition-colors font-medium"
            >
              Categories
            </Link>
            <Link
              href="/new-arrivals"
              className="text-gray-700 hover:text-rose-500 transition-colors font-medium"
            >
              New Arrivals
            </Link>
            <Link
              href="/trending"
              className="text-gray-700 hover:text-rose-500 transition-colors font-medium"
            >
              Trending
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon - Hidden on mobile */}
            <button
              className="hidden sm:block text-gray-700 hover:text-rose-500 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="text-gray-700 hover:text-rose-500 transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="text-gray-700 hover:text-rose-500 transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile Dropdown */}
            <div className="relative hidden sm:block" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="text-gray-700 hover:text-rose-500 transition-colors flex items-center gap-1"
                aria-label="User Profile"
              >
                <User className="h-5 w-5" />
                <ChevronDown className={`h-3 w-3 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      alert("Logged out successfully!");
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 hover:text-rose-500 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-rose-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="block py-2 text-gray-700 hover:text-rose-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/new-arrivals"
              className="block py-2 text-gray-700 hover:text-rose-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              New Arrivals
            </Link>
            <Link
              href="/trending"
              className="block py-2 text-gray-700 hover:text-rose-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Trending
            </Link>
            <Link
              href="/account"
              className="block py-2 text-gray-700 hover:text-rose-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              My Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
