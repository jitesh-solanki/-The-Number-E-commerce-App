import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import CategorySection from '../components/CategorySection';
import FilterSidebar from '../components/FilterSidebar';
import { useStore } from '../context/StoreContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiGrid, FiList, FiFilter } from 'react-icons/fi';

const Shop = () => {
  const { products, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, loading } = useStore();
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const location = useLocation();

  // Advanced filters state
  const [filters, setFilters] = useState({
    types: [],
    sizes: [],
    colors: [],
    brands: [],
    genders: [],
    minRating: 0,
    maxPrice: 1000,
    searchQuery: ''
  });

  // Update search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    if (search) {
      setSearchQuery(search);
      setFilters(prev => ({ ...prev, searchQuery: search }));
    }
  }, [location.search, setSearchQuery]);

  // Reset filters when category changes
  useEffect(() => {
    setFilters({
      types: [],
      sizes: [],
      colors: [],
      brands: [],
      genders: [],
      minRating: 0,
      maxPrice: 1000,
      searchQuery: searchQuery || ''
    });
  }, [selectedCategory]);

  // Filter products based on all criteria
  let filteredProducts = products.filter(product => {
    // Category filter
    if (selectedCategory && product.category !== selectedCategory) return false;
    
    // Search filter
    if (filters.searchQuery && !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
    
    // Price filter
    if (product.price > filters.maxPrice) return false;
    
    // Rating filter
    if (product.rating < filters.minRating) return false;
    
    // Type filter
    if (filters.types.length > 0 && !filters.types.includes(product.type)) return false;
    
    // Size filter
    if (filters.sizes.length > 0 && product.sizes) {
      const hasSize = filters.sizes.some(size => product.sizes.includes(size));
      if (!hasSize) return false;
    }
    
    // Color filter
    if (filters.colors.length > 0 && product.colors) {
      const hasColor = filters.colors.some(color => product.colors.includes(color));
      if (!hasColor) return false;
    }
    
    // Brand filter
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;
    
    // Gender filter
    if (filters.genders.length > 0 && !filters.genders.includes(product.gender)) return false;
    
    return true;
  });

  // Apply sorting
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.types.length) count += filters.types.length;
    if (filters.sizes.length) count += filters.sizes.length;
    if (filters.colors.length) count += filters.colors.length;
    if (filters.brands.length) count += filters.brands.length;
    if (filters.genders.length) count += filters.genders.length;
    if (filters.minRating > 0) count++;
    if (filters.maxPrice < 1000) count++;
    return count;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Shop Collection
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Discover amazing products at unbeatable prices</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - New Advanced Filter */}
          <FilterSidebar
            products={products}
            filters={filters}
            setFilters={setFilters}
            onClose={() => setIsFilterOpen(false)}
            isOpen={isFilterOpen}
          />

          {/* Products Section */}
          <div className="flex-1">
            {/* Category Section */}
            <div className="mb-6">
              <CategorySection 
                selectedCategory={selectedCategory} 
                onCategoryChange={setSelectedCategory} 
              />
            </div>

            {/* Toolbar */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg mb-6 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                >
                  <FiList />
                </button>
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
                >
                  <FiFilter /> Filters
                  {getActiveFilterCount() > 0 && (
                    <span className="bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-gray-600 dark:text-gray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {getActiveFilterCount() > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                {filters.types.map(type => (
                  <span key={type} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm flex items-center gap-1">
                    {type}
                    <button onClick={() => setFilters({...filters, types: filters.types.filter(t => t !== type)})} className="hover:text-red-500">×</button>
                  </span>
                ))}
                {filters.sizes.map(size => (
                  <span key={size} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm flex items-center gap-1">
                    Size: {size}
                    <button onClick={() => setFilters({...filters, sizes: filters.sizes.filter(s => s !== size)})} className="hover:text-red-500">×</button>
                  </span>
                ))}
                {filters.colors.map(color => (
                  <span key={color} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm flex items-center gap-1">
                    Color: {color}
                    <button onClick={() => setFilters({...filters, colors: filters.colors.filter(c => c !== color)})} className="hover:text-red-500">×</button>
                  </span>
                ))}
                {filters.brands.map(brand => (
                  <span key={brand} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm flex items-center gap-1">
                    {brand}
                    <button onClick={() => setFilters({...filters, brands: filters.brands.filter(b => b !== brand)})} className="hover:text-red-500">×</button>
                  </span>
                ))}
                {filters.minRating > 0 && (
                  <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm flex items-center gap-1">
                    {filters.minRating}★ & above
                    <button onClick={() => setFilters({...filters, minRating: 0})} className="hover:text-red-500">×</button>
                  </span>
                )}
                {filters.maxPrice < 1000 && (
                  <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm flex items-center gap-1">
                    Up to ${filters.maxPrice}
                    <button onClick={() => setFilters({...filters, maxPrice: 1000})} className="hover:text-red-500">×</button>
                  </span>
                )}
                <button
                  onClick={() => setFilters({
                    types: [],
                    sizes: [],
                    colors: [],
                    brands: [],
                    genders: [],
                    minRating: 0,
                    maxPrice: 1000,
                    searchQuery: ''
                  })}
                  className="px-2 py-1 text-red-500 hover:text-red-600 text-sm"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results Info */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Showing <span className="font-semibold text-indigo-600">{filteredProducts.length}</span> products
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory && ` in ${selectedCategory}`}
              </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-500 dark:text-gray-400 text-lg">No products found</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Try adjusting your filters</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('');
                    setSearchQuery('');
                    setFilters({
                      types: [],
                      sizes: [],
                      colors: [],
                      brands: [],
                      genders: [],
                      minRating: 0,
                      maxPrice: 1000,
                      searchQuery: ''
                    });
                  }}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <AnimatePresence>
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid-cols-1 gap-6'}`}>
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;