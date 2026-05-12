import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RecentlyViewedContext = createContext();

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider');
  }
  return context;
};

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) {
      setRecentlyViewed(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever recentlyViewed changes
  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed.slice(0, 8)));
  }, [recentlyViewed]);

  // Add a product to recently viewed - wrapped in useCallback
  const addToRecentlyViewed = useCallback((product) => {
    if (!product) return;
    setRecentlyViewed(prev => {
      // Remove if already exists
      const filtered = prev.filter(item => item.id !== product.id);
      // Add to beginning
      return [product, ...filtered].slice(0, 8);
    });
  }, []);

  // Clear recently viewed - wrapped in useCallback
  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
  }, []);

  // Remove a specific product - wrapped in useCallback
  const removeFromRecentlyViewed = useCallback((productId) => {
    setRecentlyViewed(prev => prev.filter(item => item.id !== productId));
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{
      recentlyViewed,
      addToRecentlyViewed,
      clearRecentlyViewed,
      removeFromRecentlyViewed
    }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};