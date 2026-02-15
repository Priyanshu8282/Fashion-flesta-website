"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Heart, User, Menu, X, Search, ChevronDown } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import productService, { Product } from "@/services/product.service";
import { getImageUrl } from "@/services/index";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Search with debounce
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        try {
          const results = await productService.searchProducts(searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error("Search failed:", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const handleLogout = () => {
    // Clear all auth-related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Close dropdown
    setIsProfileOpen(false);
    
    // Update login status
    setIsLoggedIn(false);
    
    // Show success message
    toast.success("Logged out successfully!");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close search on ESC key
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
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
            {/* Search Icon with Modal */}
            <div className="relative hidden sm:block" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-700 hover:text-rose-500 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Search Modal */}
              {isSearchOpen && (
                <div className="absolute right-0 mt-3 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                        autoFocus
                      />
                      {isSearching && (
                        <div className="absolute right-3 top-3">
                          <div className="animate-spin h-4 w-4 border-2 border-rose-500 rounded-full border-t-transparent"></div>
                        </div>
                      )}
                    </div>

                    {/* Search Results */}
                    {searchQuery.trim().length >= 2 && (
                      <div className="mt-3 max-h-96 overflow-y-auto">
                        {searchResults.length > 0 ? (
                          <div className="space-y-2">
                            {searchResults.map((product) => (
                              <Link
                                key={product._id}
                                href={`/products/${product.slug}`}
                                onClick={() => {
                                  setIsSearchOpen(false);
                                  setSearchQuery("");
                                }}
                                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                <Image
                                  src={getImageUrl(product.images[0])}
                                  alt={product.name}
                                  width={50}
                                  height={50}
                                  className="rounded object-cover"
                                />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                    {product.name}
                                  </p>
                                  <p className="text-sm text-rose-500 font-semibold">
                                    ₹{product.price}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          !isSearching && (
                            <p className="text-center text-gray-500 py-4">
                              No products found
                            </p>
                          )
                        )}
                      </div>
                    )}

                    {searchQuery.trim().length > 0 && searchQuery.trim().length < 2 && (
                      <p className="text-center text-gray-400 text-sm mt-3">
                        Type at least 2 characters to search
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

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
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/account"
                        className="block px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        className="block px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
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
            
            {/* Conditional mobile menu items */}
            {isLoggedIn ? (
              <>
                <Link
                  href="/account"
                  className="block py-2 text-gray-700 hover:text-rose-500 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-rose-500 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block py-2 text-gray-700 hover:text-rose-500 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block py-2 text-gray-700 hover:text-rose-500 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Account
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
