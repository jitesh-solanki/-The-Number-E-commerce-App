import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';

const FilterSidebar = ({ 
  products = [], 
  filters = { types: [], sizes: [], colors: [], brands: [], genders: [], minRating: 0, maxPrice: 1000, searchQuery: '' }, 
  setFilters = () => {}, 
  onClose = () => {}, 
  isOpen = false 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    rating: true,
    gender: true,
    type: true,
    size: true,
    color: true,
    brand: true
  });
  const [isLoading, setIsLoading] = useState(true);

  // Extract all unique values from products
  const [filterOptions, setFilterOptions] = useState({
    types: [],
    sizes: [],
    colors: [],
    brands: [],
    genders: ['men', 'women', 'unisex'],
    priceRange: { min: 0, max: 1000 },
    ratingOptions: [4, 3, 2, 1]
  });

  useEffect(() => {
    if (products && products.length > 0) {
      setIsLoading(true);
      
      const timer = setTimeout(() => {
        // Get unique types
        const types = [...new Set(products.map(p => p?.type).filter(Boolean))];
        
        // Get unique sizes
        const allSizes = products.flatMap(p => p?.sizes || []);
        const sizes = [...new Set(allSizes)].sort();
        
        // Get unique colors
        const allColors = products.flatMap(p => p?.colors || []);
        const colors = [...new Set(allColors)];
        
        // Get unique brands
        const brands = [...new Set(products.map(p => p?.brand).filter(Boolean))];
        
        // Get price range
        const prices = products.map(p => p?.price || 0);
        const priceRange = {
          min: Math.floor(Math.min(...prices)),
          max: Math.ceil(Math.max(...prices))
        };
        
        setFilterOptions({
          types,
          sizes,
          colors,
          brands,
          genders: ['men', 'women', 'unisex'],
          priceRange,
          ratingOptions: [4, 3, 2, 1]
        });
        
        // Set max price filter to actual max price
        if (filters?.maxPrice === 1000 || filters?.maxPrice > priceRange.max) {
          setFilters(prev => ({ ...prev, maxPrice: priceRange.max }));
        }
        
        setIsLoading(false);
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [products]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleTypeChange = (type) => {
    const currentTypes = filters?.types || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    setFilters({ ...filters, types: newTypes });
  };

  const handleSizeChange = (size) => {
    const currentSizes = filters?.sizes || [];
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter(s => s !== size)
      : [...currentSizes, size];
    setFilters({ ...filters, sizes: newSizes });
  };

  const handleColorChange = (color) => {
    const currentColors = filters?.colors || [];
    const newColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color];
    setFilters({ ...filters, colors: newColors });
  };

  const handleBrandChange = (brand) => {
    const currentBrands = filters?.brands || [];
    const newBrands = currentBrands.includes(brand)
      ? currentBrands.filter(b => b !== brand)
      : [...currentBrands, brand];
    setFilters({ ...filters, brands: newBrands });
  };

  const handleGenderChange = (gender) => {
    const currentGenders = filters?.genders || [];
    const newGenders = currentGenders.includes(gender)
      ? currentGenders.filter(g => g !== gender)
      : [...currentGenders, gender];
    setFilters({ ...filters, genders: newGenders });
  };

  const handleRatingChange = (rating) => {
    setFilters({ ...filters, minRating: rating });
  };

  const handlePriceChange = (e) => {
    setFilters({ ...filters, maxPrice: parseInt(e.target.value) });
  };

  const clearAllFilters = () => {
    setFilters({
      types: [],
      sizes: [],
      colors: [],
      brands: [],
      genders: [],
      minRating: 0,
      maxPrice: filterOptions.priceRange.max,
      searchQuery: filters?.searchQuery || ''
    });
  };

  const activeFilterCount = () => {
    let count = 0;
    if (filters?.types?.length) count += filters.types.length;
    if (filters?.sizes?.length) count += filters.sizes.length;
    if (filters?.colors?.length) count += filters.colors.length;
    if (filters?.brands?.length) count += filters.brands.length;
    if (filters?.genders?.length) count += filters.genders.length;
    if (filters?.minRating > 0) count++;
    if (filters?.maxPrice < filterOptions.priceRange.max) count++;
    return count;
  };

  const getGenderLabel = (gender) => {
    switch(gender) {
      case 'men': return '👨 Men';
      case 'women': return '👩 Women';
      case 'unisex': return '👥 Unisex';
      default: return gender;
    }
  };

  // Loading skeleton for filters
  const FilterSkeleton = () => (
    <div className="p-4 space-y-6">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );

  // Desktop filter sidebar content
  const FilterContent = () => (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b dark:border-gray-700">
        <h3 className="text-xl font-bold dark:text-white">Filters</h3>
        {activeFilterCount() > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-red-500 hover:text-red-600 transition-colors"
          >
            Clear All ({activeFilterCount()})
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6 border-b dark:border-gray-700 pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex justify-between items-center w-full font-semibold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors"
        >
          <span>💰 Price Range</span>
          {expandedSections.price ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        <AnimatePresence>
          {expandedSections.price && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3 overflow-hidden"
            >
              <input
                type="range"
                min={filterOptions.priceRange.min}
                max={filterOptions.priceRange.max}
                value={filters?.maxPrice || filterOptions.priceRange.max}
                onChange={handlePriceChange}
                className="w-full accent-indigo-500"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span>${filterOptions.priceRange.min}</span>
                <span className="font-semibold text-indigo-600">Up to ${filters?.maxPrice || filterOptions.priceRange.max}</span>
                <span>${filterOptions.priceRange.max}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rating */}
      <div className="mb-6 border-b dark:border-gray-700 pb-4">
        <button
          onClick={() => toggleSection('rating')}
          className="flex justify-between items-center w-full font-semibold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors"
        >
          <span>⭐ Customer Rating</span>
          {expandedSections.rating ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        <AnimatePresence>
          {expandedSections.rating && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3 space-y-2 overflow-hidden"
            >
              {filterOptions.ratingOptions.map(rating => (
                <label key={rating} className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters?.minRating === rating}
                    onChange={() => handleRatingChange(rating)}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {rating}★ & above
                  </span>
                </label>
              ))}
              <label className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors">
                <input
                  type="radio"
                  name="rating"
                  checked={filters?.minRating === 0}
                  onChange={() => handleRatingChange(0)}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">All ratings</span>
              </label>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gender */}
      {filterOptions.genders.length > 0 && (
        <div className="mb-6 border-b dark:border-gray-700 pb-4">
          <button
            onClick={() => toggleSection('gender')}
            className="flex justify-between items-center w-full font-semibold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors"
          >
            <span>👥 Gender</span>
            {expandedSections.gender ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          <AnimatePresence>
            {expandedSections.gender && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3 space-y-2 overflow-hidden"
              >
                {filterOptions.genders.map(gender => (
                  <label key={gender} className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors">
                    <input
                      type="checkbox"
                      checked={filters?.genders?.includes(gender) || false}
                      onChange={() => handleGenderChange(gender)}
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {getGenderLabel(gender)}
                    </span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Product Type */}
      {filterOptions.types.length > 0 && (
        <div className="mb-6 border-b dark:border-gray-700 pb-4">
          <button
            onClick={() => toggleSection('type')}
            className="flex justify-between items-center w-full font-semibold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors"
          >
            <span>📦 Product Type</span>
            {expandedSections.type ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          <AnimatePresence>
            {expandedSections.type && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3 space-y-2 max-h-48 overflow-y-auto overflow-x-hidden"
              >
                {filterOptions.types.map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors">
                    <input
                      type="checkbox"
                      checked={filters?.types?.includes(type) || false}
                      onChange={() => handleTypeChange(type)}
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Size */}
      {filterOptions.sizes.length > 0 && (
        <div className="mb-6 border-b dark:border-gray-700 pb-4">
          <button
            onClick={() => toggleSection('size')}
            className="flex justify-between items-center w-full font-semibold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors"
          >
            <span>📏 Size</span>
            {expandedSections.size ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          <AnimatePresence>
            {expandedSections.size && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3 flex flex-wrap gap-2 overflow-hidden"
              >
                {filterOptions.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                      filters?.sizes?.includes(size)
                        ? 'bg-indigo-600 text-white shadow-md scale-105'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Color */}
      {filterOptions.colors.length > 0 && (
        <div className="mb-6 border-b dark:border-gray-700 pb-4">
          <button
            onClick={() => toggleSection('color')}
            className="flex justify-between items-center w-full font-semibold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors"
          >
            <span>🎨 Color</span>
            {expandedSections.color ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          <AnimatePresence>
            {expandedSections.color && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3 flex flex-wrap gap-2 overflow-hidden"
              >
                {filterOptions.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                      filters?.colors?.includes(color)
                        ? 'bg-indigo-600 text-white shadow-md scale-105'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Brand */}
      {filterOptions.brands.length > 0 && (
        <div className="mb-6 border-b dark:border-gray-700 pb-4">
          <button
            onClick={() => toggleSection('brand')}
            className="flex justify-between items-center w-full font-semibold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors"
          >
            <span>🏷️ Brand</span>
            {expandedSections.brand ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          <AnimatePresence>
            {expandedSections.brand && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3 space-y-2 max-h-48 overflow-y-auto overflow-x-hidden"
              >
                {filterOptions.brands.map(brand => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors">
                    <input
                      type="checkbox"
                      checked={filters?.brands?.includes(brand) || false}
                      onChange={() => handleBrandChange(brand)}
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{brand}</span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Clear All Button */}
      {activeFilterCount() > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={clearAllFilters}
          className="w-full mt-4 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 hover:shadow-md"
        >
          Clear All Filters ({activeFilterCount()})
        </motion.button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Filter Sidebar - Always visible on lg screens */}
      <aside className="hidden lg:block lg:w-80 flex-shrink-0">
        <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-y-auto max-h-[calc(100vh-100px)]">
          {isLoading ? <FilterSkeleton /> : <FilterContent />}
        </div>
      </aside>

      {/* Mobile Filter Sidebar - Slide-in */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-80 h-full bg-white dark:bg-gray-800 z-50 overflow-y-auto shadow-xl lg:hidden"
            >
              <div className="flex justify-end p-2 sticky top-0 bg-white dark:bg-gray-800 z-10 border-b dark:border-gray-700">
                <button 
                  onClick={onClose} 
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              </div>
              {isLoading ? <FilterSkeleton /> : <FilterContent />}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSidebar;