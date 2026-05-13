import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { trackAddToWishlist, trackRemoveFromWishlist } from '../utils/analytics';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      const exists = prevItems.some(item => item.id === product.id);
      if (exists) {
        toast.error(`${product.name} already in wishlist`);
        return prevItems;
      }
      toast.success(`${product.name} added to wishlist`);
      trackAddToWishlist(product);
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId) => {
    const product = wishlistItems.find(item => item.id === productId);
    if (product) {
      trackRemoveFromWishlist(product);
    }
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.success('Item removed from wishlist');
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast.success('Wishlist cleared');
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};