import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiTrendingUp, FiTruck, FiShield } from 'react-icons/fi';

const HeroBanner = () => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full mb-6"
            >
              <FiTrendingUp className="text-indigo-600 dark:text-indigo-400" />
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">Summer Sale is Live</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-display font-extrabold leading-tight mb-6 dark:text-white"
            >
              Upgrade Your Style with{' '}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">The Number</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 dark:text-gray-300 text-lg mb-8"
            >
              Discover the latest trends in electronics, fashion, and accessories. 
              Get up to 50% off on selected items with free worldwide shipping.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/shop" className="group bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 inline-flex items-center gap-2">
                Shop Now 
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/shop" className="border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-500 hover:text-white transition-all duration-300">
                View Collections
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <FiTruck className="text-2xl text-indigo-600 dark:text-indigo-400" />
                <div>
                  <p className="font-semibold dark:text-white">Free Shipping</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">On orders $50+</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiShield className="text-2xl text-indigo-600 dark:text-indigo-400" />
                <div>
                  <p className="font-semibold dark:text-white">Secure Payment</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">100% Protected</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600" 
                alt="Shopping"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-5 -right-5 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl"
            >
              <p className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent font-bold text-2xl">50% OFF</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Limited Time</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;