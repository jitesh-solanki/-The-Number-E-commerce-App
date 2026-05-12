import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiEye, FiClock } from 'react-icons/fi';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

const RecentlyViewed = () => {
  const { recentlyViewed, clearRecentlyViewed, removeFromRecentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <FiClock className="text-indigo-500 text-xl" />
          <h2 className="text-2xl font-bold dark:text-white">Recently Viewed</h2>
        </div>
        <button
          onClick={clearRecentlyViewed}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recentlyViewed.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
          >
            <button
              onClick={() => removeFromRecentlyViewed(product.id)}
              className="absolute top-2 right-2 z-10 bg-white dark:bg-gray-700 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
            >
              <FiX size={12} />
            </button>
            
            <Link to={`/product/${product.id}`}>
              <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/500x500/e2e8f0/1e293b?text=No+Image';
                  }}
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold dark:text-white line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-indigo-600 font-bold text-sm mt-1">
                  ${product.price}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;