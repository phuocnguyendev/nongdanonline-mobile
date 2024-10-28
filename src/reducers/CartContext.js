import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartIconCount, setCartIconCount] = useState(0);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Product already exists, increase quantity
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Product doesn't exist, add new item with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    updateCartIcon();
  };

  const updateCartIcon = () => {
    setCartIconCount((prevCount) => {
      const newCount = cart.reduce((total, item) => total + item.quantity, 0);
      return newCount;
    });
  };

  const removeOneFromCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter((item) => item.quantity > 0);
      return updatedCart;
    });
    updateCartIcon();
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
    updateCartIcon();
  };

  return (
    <CartContext.Provider value={{ cart, cartIconCount, addToCart, updateCartIcon, removeOneFromCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};