import React, { createContext, useContext, useState, useEffect } from 'react';

const RecentlyViewedContext = createContext();

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  return context;
};

export const RecentlyViewedProvider = ({ children }) => {
  const [recentItems, setRecentItems] = useState(() => {
    const saved = localStorage.getItem('recentlyViewed');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentItems.slice(0, 8)));
  }, [recentItems]);

  const addToRecentlyViewed = (product) => {
    setRecentItems(prev => {
      const filtered = prev.filter(item => item.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentItems, addToRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};