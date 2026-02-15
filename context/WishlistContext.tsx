"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import wishlistService, { Wishlist } from "@/services/wishlist.service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface WishlistContextType {
  wishlist: Wishlist | null;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  refreshWishlist: () => Promise<void>;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const router = useRouter();

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setWishlist(null);
        return;
      }
      const data = await wishlistService.getWishlist();
      setWishlist(data);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      setWishlist(null);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToWishlist = async (productId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items to wishlist");
      router.push("/login");
      return;
    }

    try {
      const result = await wishlistService.addToWishlist(productId);
      setWishlist(result.wishlist);
      toast.success(result.message);
    } catch (error: any) {
      console.error("Failed to add to wishlist:", error);
      if (error?.response?.status === 401) {
        toast.error("Please login to continue");
        router.push("/login");
      } else {
        toast.error("Failed to add to wishlist");
      }
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      const result = await wishlistService.removeFromWishlist(productId);
      setWishlist(result.wishlist);
      toast.success(result.message);
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      toast.error("Failed to remove from wishlist");
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlistService.isInWishlist(productId, wishlist);
  };

  const refreshWishlist = async () => {
    await fetchWishlist();
  };

  const wishlistCount = wishlist?.products.length || 0;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        refreshWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
