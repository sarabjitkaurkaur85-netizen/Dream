import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();


export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((room) => {
    setCartItems((prev) => {
      const exists = prev.find(
        (item) => (item._id || item.id) === (room._id || room.id)
      );
      if (exists) return prev;
      return [...prev, { ...room, quantity: 1 }];
    });
  }, []);


  const removeFromCart = useCallback((roomId) => {
    setCartItems((prev) =>
      prev.filter((item) => (item._id || item.id) !== roomId)
    );
  }, []);

 
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);


  const cartCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;