import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';
import toast from 'react-hot-toast';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [storeSettings, setStoreSettings] = useState({
    name: 'The Number',
    logo: null,
    primaryColor: '#6366f1',
    secondaryColor: '#7c3aed',
    accentColor: '#ec4899',
  });

  // Load products from localStorage or initial data
  useEffect(() => {
    loadProducts();
    loadSettings();
  }, []);

  const loadProducts = () => {
    const savedProducts = localStorage.getItem('adminProducts');
    if (savedProducts && JSON.parse(savedProducts).length > 0) {
      setProducts(JSON.parse(savedProducts));
      setFilteredProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialProducts);
      setFilteredProducts(initialProducts);
      localStorage.setItem('adminProducts', JSON.stringify(initialProducts));
    }
    setLoading(false);
  };

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('storeSettings');
    if (savedSettings) {
      setStoreSettings(JSON.parse(savedSettings));
    }
  };

  // Filter products based on category and search
  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, products]);

  const updateStoreSettings = (settings) => {
    setStoreSettings(prev => ({ ...prev, ...settings }));
    localStorage.setItem('storeSettings', JSON.stringify({ ...storeSettings, ...settings }));
  };

  // Product management functions (sync with localStorage)
  const addProduct = (product) => {
    const newProducts = [...products, product];
    setProducts(newProducts);
    localStorage.setItem('adminProducts', JSON.stringify(newProducts));
    toast.success('Product added successfully!');
  };

  const updateProduct = (updatedProduct) => {
    const newProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    setProducts(newProducts);
    localStorage.setItem('adminProducts', JSON.stringify(newProducts));
    toast.success('Product updated successfully!');
  };

  const deleteProduct = (productId) => {
    const newProducts = products.filter(p => p.id !== productId);
    setProducts(newProducts);
    localStorage.setItem('adminProducts', JSON.stringify(newProducts));
    toast.success('Product deleted successfully!');
  };

  const getProductById = (id) => {
    return products.find(p => p.id === parseInt(id));
  };

  const getProductsByCategory = (category) => {
    if (!category) return products;
    return products.filter(p => p.category === category);
  };

  const getFeaturedProducts = () => {
    return products.slice(0, 4);
  };

  const getNewArrivals = () => {
    return products.slice(4, 8);
  };

  const refreshProducts = () => {
    loadProducts();
  };

  useEffect(() => {
    const savedSettings = localStorage.getItem('storeSettings');
    if (savedSettings) {
      setStoreSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <StoreContext.Provider value={{
      products: filteredProducts,
      allProducts: products,
      filteredProducts,
      storeSettings,
      selectedCategory,
      searchQuery,
      loading,
      setSelectedCategory,
      setSearchQuery,
      updateStoreSettings,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      getProductsByCategory,
      getFeaturedProducts,
      getNewArrivals,
      refreshProducts
    }}>
      {children}
    </StoreContext.Provider>
  );
};