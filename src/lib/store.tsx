"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "@/types/cart";
import { LandProperty, FinancingPlan } from "@/types/land";

interface StoreContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (property: LandProperty, plan: FinancingPlan, purchaseType: "financed" | "cash") => void;
  removeFromCart: (propertyId: string) => void;
  clearCart: () => void;
  
  savedPropertyIds: string[];
  toggleSavedProperty: (propertyId: string) => void;
  isPropertySaved: (propertyId: string) => boolean;

  comparePropertyIds: string[];
  toggleCompareProperty: (propertyId: string) => void;
  clearCompare: () => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>([]);
  const [comparePropertyIds, setComparePropertyIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ols_saved_properties");
      if (saved) setSavedPropertyIds(JSON.parse(saved));

      const savedCart = localStorage.getItem("ols_cart");
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (e) {
      console.error("Failed to load local storage state", e);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ols_saved_properties", JSON.stringify(savedPropertyIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedPropertyIds]);

  useEffect(() => {
    try {
      localStorage.setItem("ols_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToCart = (property: LandProperty, plan: FinancingPlan, purchaseType: "financed" | "cash") => {
    const dueToday = purchaseType === "cash" 
      ? property.cashPrice 
      : plan.amountDueToday;

    const newItem: CartItem = {
      property,
      selectedPlan: plan,
      purchaseType,
      amountDueToday: dueToday,
    };

    // Replace or add item (only 1 parcel reservation per checkout recommended)
    setCart([newItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (propertyId: string) => {
    setCart((prev) => prev.filter((item) => item.property.id !== propertyId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleSavedProperty = (propertyId: string) => {
    setSavedPropertyIds((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const isPropertySaved = (propertyId: string) => {
    return savedPropertyIds.includes(propertyId);
  };

  const toggleCompareProperty = (propertyId: string) => {
    setComparePropertyIds((prev) => {
      if (prev.includes(propertyId)) {
        return prev.filter((id) => id !== propertyId);
      }
      if (prev.length >= 4) {
        alert("You can compare up to 4 properties at once.");
        return prev;
      }
      return [...prev, propertyId];
    });
  };

  const clearCompare = () => {
    setComparePropertyIds([]);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        clearCart,
        savedPropertyIds,
        toggleSavedProperty,
        isPropertySaved,
        comparePropertyIds,
        toggleCompareProperty,
        clearCompare,
        isCompareModalOpen,
        setIsCompareModalOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
