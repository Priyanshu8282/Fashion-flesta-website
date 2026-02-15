"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import cartService from "@/services/cart.service";

interface CartContextType {
  cartCount: number;
  refreshCartCount: () => Promise<void>;
  updateCartCount: (delta: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const cart = await cartService.getCart();
      const count = cart.items.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
      setCartCount(0);
    }
  };

  const refreshCartCount = async () => {
    await fetchCartCount();
  };

  const updateCartCount = (delta: number) => {
    setCartCount((prev) => Math.max(0, prev + delta));
  };

  useEffect(() => {
    // Only fetch if user is logged in
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      fetchCartCount();
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
