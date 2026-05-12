import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';

const RecentlyViewed = ({ recentItems }) => {
  if (!recentItems || recentItems.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <FiClock className="text-2xl text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Recently Viewed</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recentItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link to={`/product/${product.id}`}>
                <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="p-3">
                    <p className="text-sm font-semibold truncate dark:text-white">{product.name}</p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">${product.price}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;