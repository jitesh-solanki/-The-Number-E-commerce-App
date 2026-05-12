import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const ComparisonContext = createContext();

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) throw new Error('useComparison must be used within ComparisonProvider');
  return context;
};

export const ComparisonProvider = ({ children }) => {
  const [comparisonItems, setComparisonItems] = useState([]);

  const addToComparison = (product) => {
    if (comparisonItems.length >= 4) {
      toast.error('You can compare up to 4 products only');
      return;
    }
    if (comparisonItems.some(item => item.id === product.id)) {
      toast.error('Product already in comparison');
      return;
    }
    setComparisonItems([...comparisonItems, product]);
    toast.success(`${product.name} added to comparison`);
  };

  const removeFromComparison = (productId) => {
    setComparisonItems(comparisonItems.filter(item => item.id !== productId));
    toast.success('Removed from comparison');
  };

  const clearComparison = () => {
    setComparisonItems([]);
    toast.success('Comparison cleared');
  };

  return (
    <ComparisonContext.Provider value={{
      comparisonItems,
      addToComparison,
      removeFromComparison,
      clearComparison
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};