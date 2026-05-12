import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { FiZap, FiShoppingCart } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AIRecommendations = () => {
  const { cartItems, addToCart } = useCart();
  
  // AI-like recommendation logic (based on cart items)
  const getRecommendations = () => {
    if (cartItems.length === 0) {
      return products.slice(0, 4);
    }
    
    const categories = [...new Set(cartItems.map(item => item.category))];
    let recommended = products.filter(p => 
      categories.includes(p.category) && 
      !cartItems.some(cart => cart.id === p.id)
    );
    
    return recommended.slice(0, 4);
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-full mb-4 shadow-lg"
          >
            <FiZap /> AI Powered - The Number
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 dark:text-white">Recommended For You</h2>
          <p className="text-gray-600 dark:text-gray-400">Based on your shopping behavior</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300"
            >
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
              </Link>
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold mb-2 dark:text-white hover:text-indigo-600 transition-colors line-clamp-1">{product.name}</h3>
                </Link>
                <p className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent font-bold text-xl">${product.price}</p>
                <div className="mt-3 flex gap-2">
                  <button 
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart /> Quick Shop
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIRecommendations;