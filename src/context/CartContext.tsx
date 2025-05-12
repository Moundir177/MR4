'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define cart item type
export interface CartItem {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

// Define cart context interface
interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isInCart: (itemId: string) => boolean;
  getCartTotal: () => number;
}

// Create context with default values
const CartContext = createContext<CartContextProps>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  isInCart: () => false,
  getCartTotal: () => 0,
});

// Create provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('courseCart');
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          setCartItems(parsedCart);
        } catch (error) {
          console.error('Failed to parse cart from localStorage:', error);
          localStorage.removeItem('courseCart');
        }
      }
    }
  }, []);
  
  // Update localStorage when cart changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('courseCart', JSON.stringify(cartItems));
    }
  }, [cartItems]);
  
  // Add item to cart
  const addToCart = (item: CartItem) => {
    if (!isInCart(item.id)) {
      setCartItems(prevItems => [...prevItems, item]);
    }
  };
  
  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };
  
  // Check if item is in cart
  const isInCart = (itemId: string): boolean => {
    return cartItems.some(item => item.id === itemId);
  };
  
  // Calculate cart total
  const getCartTotal = (): number => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };
  
  return (
    <CartContext.Provider 
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext); 