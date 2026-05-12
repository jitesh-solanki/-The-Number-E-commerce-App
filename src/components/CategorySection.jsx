import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../data/products';

const CategorySection = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-3 text-lg text-gray-900 dark:text-white">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onCategoryChange(category.name === 'All' ? '' : category.name)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2 rounded-xl transition-all font-medium ${
              (selectedCategory === '' && category.name === 'All') || selectedCategory === category.name
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;