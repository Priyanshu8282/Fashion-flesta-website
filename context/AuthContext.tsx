"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  requireAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Call actual API
      const response = await authService.login(email, password);
      
      // Store token and user data (token and user are inside response.data)
      const userData: User = {
        id: response.data.user._id,
        name: response.data.user.name,
        email: response.data.user.email,
      };
      
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", response.data.token);
      setUser(userData);
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Call actual API
      const response = await authService.register(name, email, password);
      
      // Store token and user data (token and user are inside response.data)
      const userData: User = {
        id: response.data.user._id,
        name: response.data.user.name,
        email: response.data.user.email,
      };
      
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", response.data.token);
      setUser(userData);
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  const requireAuth = (): boolean => {
    if (!user) {
      router.push("/login");
      return false;
    }
    return true;
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    requireAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
