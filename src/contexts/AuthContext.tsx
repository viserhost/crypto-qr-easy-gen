
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";

type User = { 
  email: string;
  name?: string;
  avatar?: string;
  earnings?: number;
  adsClicked?: number;
  referrals?: number;
  referralLink?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string) => Promise<void>;
  register: (email: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("authUser");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  // Add demo user data
  const addUserData = (email: string): User => {
    return {
      email,
      name: email.split('@')[0],
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
      earnings: 152.75,
      adsClicked: 487,
      referrals: 12,
      referralLink: `https://clickgain.com/ref/${email.split('@')[0].toLowerCase()}${Math.floor(Math.random() * 1000)}`
    };
  };

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = addUserData(email);
      setUser(userData);
      localStorage.setItem("authUser", JSON.stringify(userData));
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = addUserData(email);
      setUser(userData);
      localStorage.setItem("authUser", JSON.stringify(userData));
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
