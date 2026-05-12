import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FiHeart, FiShoppingCart, FiStar, FiEye } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  // Fallback image URL (reliable placeholder service)
  const fallbackImage = 'https://placehold.co/500x500/e2e8f0/1e293b?text=No+Image';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Container - Square box */}
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700 aspect-square">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = fallbackImage;
            }}
          />
        </Link>
        
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg z-10">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">Out of Stock</span>
          </div>
        )}
        
        {/* Hover Overlay Buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            className="bg-white text-indigo-600 p-3 rounded-full hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:text-white transition-all duration-300 shadow-lg"
          >
            <FiShoppingCart className="text-xl" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToWishlist(product)}
            className={`p-3 rounded-full transition-all duration-300 shadow-lg ${
              isInWishlist(product.id) 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white'
            }`}
          >
            <FiHeart className={`text-xl ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
          </motion.button>
          <Link to={`/product/${product.id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-700 p-3 rounded-full hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:text-white transition-all duration-300 shadow-lg"
            >
              <FiEye className="text-xl" />
            </motion.button>
          </Link>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              className={`text-sm ${
                i < Math.floor(product.rating) 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({product.reviews})</span>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1 dark:text-white">
            {product.name}
          </h3>
        </Link>
        
        {/* Brand Name */}
        {product.brand && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-1">
            {product.brand}
          </p>
        )}
        
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">₹{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm">₹{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm hover:shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiShoppingCart />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;