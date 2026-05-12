import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';

const Wishlist = () => {
  const { wishlistItems, clearWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <FiHeart className="text-8xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-3xl font-display font-bold mb-4 dark:text-white">Your wishlist is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Save your favorite items here!</p>
            <Link to="/shop" className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              Start Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const addAllToCart = () => {
    wishlistItems.forEach(item => addToCart(item));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold flex items-center gap-3 dark:text-white">
              <FiHeart className="text-red-500" />
              My Wishlist
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{wishlistItems.length} items saved</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={addAllToCart}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
            >
              <FiShoppingCart /> Add All to Cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearWishlist}
              className="px-6 py-3 border-2 border-red-500 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all font-semibold flex items-center gap-2"
            >
              <FiTrash2 /> Clear All
            </motion.button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <FiTrash2 />
              </button>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;