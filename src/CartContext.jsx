import React, { createContext, useState, useMemo } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

   const addToCart = (product, quantity) => {
   const existingItemIndex = cart.findIndex(item => item.product._id === product._id);

   if (existingItemIndex !== -1) {
    const updatedCart = [...cart];
    updatedCart[existingItemIndex].quantity += quantity;
    setCart(updatedCart);
    } else {
      setCart([...cart, { product, quantity }]);
    }
  };

    const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => String(item.product._id) !== String(productId));
    setCart(updatedCart);
    };

    const resetCart = () => {
      setCart([]); // Set the cart to an empty array
    };


  const totalPrice = useMemo(() => {
  const calculatedTotal = cart.reduce((acc, item) => {
    const itemPrice = item.product?.sellPrice; // Optional chaining to handle undefined price
    const itemQuantity = item.quantity || 0; // Handle undefined or falsy quantities

    if (typeof itemPrice === 'number' && !isNaN(itemPrice)) {
      return acc + (itemPrice * itemQuantity);
    }
    return acc; // Skip invalid items
  }, 0);

  return calculatedTotal;
}, [cart]);

  const totalNetPrice = useMemo(() => {
  const calculatedTotal = cart.reduce((acc, item) => {
    const itemPrice = item.product?.netPrice; // Optional chaining to handle undefined price
    const itemQuantity = item.quantity || 0; // Handle undefined or falsy quantities

    if (typeof itemPrice === 'number' && !isNaN(itemPrice)) {
      return acc + (itemPrice * itemQuantity);
    }
    return acc; // Skip invalid items
  }, 0);

  return calculatedTotal;
}, [cart]);



  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice, totalNetPrice, resetCart }}>
      {children}
    </CartContext.Provider>
  );
};
