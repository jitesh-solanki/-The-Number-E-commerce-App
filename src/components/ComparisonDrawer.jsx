import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useComparison } from '../context/ComparisonContext';
import { FiX, FiBarChart2, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ComparisonDrawer = ({ isOpen, onClose }) => {
  const { comparisonItems, removeFromComparison, clearComparison } = useComparison();
  const { addToCart } = useCart();

  const addAllToCart = () => {
    comparisonItems.forEach(item => addToCart(item));
    toast.success('All items added to cart');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-4xl bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-4 border-b dark:border-gray-700">
                <h2 className="text-2xl font-bold flex items-center gap-2 dark:text-white">
                  <FiBarChart2 className="text-indigo-600 dark:text-indigo-400" /> Compare Products ({comparisonItems.length}/4)
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                  <FiX className="text-2xl" />
                </button>
              </div>

              {comparisonItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-gray-500 dark:text-gray-400">No products to compare</p>
                  <button onClick={onClose} className="mt-4 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="p-4 text-left dark:text-white">Features</th>
                          {comparisonItems.map(item => (
                            <th key={item.id} className="p-4 text-center min-w-[200px]">
                              <div className="relative">
                                <button
                                  onClick={() => removeFromComparison(item.id)}
                                  className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full p-1 hover:shadow-lg transition-all duration-300"
                                >
                                  <FiX className="text-sm" />
                                </button>
                                <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-lg mx-auto mb-3" />
                                <h3 className="font-semibold dark:text-white">{item.name}</h3>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t dark:border-gray-700">
                          <td className="p-4 font-semibold dark:text-white">Price</td>
                          {comparisonItems.map(item => (
                            <td key={item.id} className="p-4 text-center">
                              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">${item.price}</span>
                              {item.originalPrice && (
                                <span className="text-gray-400 line-through ml-2">${item.originalPrice}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-t dark:border-gray-700">
                          <td className="p-4 font-semibold dark:text-white">Rating</td>
                          {comparisonItems.map(item => (
                            <td key={item.id} className="p-4 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <span className="text-yellow-400">★</span>
                                <span className="dark:text-gray-300">{item.rating}</span>
                                <span className="text-gray-500 dark:text-gray-500">({item.reviews})</span>
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-t dark:border-gray-700">
                          <td className="p-4 font-semibold dark:text-white">Category</td>
                          {comparisonItems.map(item => (
                            <td key={item.id} className="p-4 text-center dark:text-gray-300">{item.category}</td>
                          ))}
                        </tr>
                        <tr className="border-t dark:border-gray-700">
                          <td className="p-4 font-semibold dark:text-white">Stock Status</td>
                          {comparisonItems.map(item => (
                            <td key={item.id} className="p-4 text-center">
                              <span className={item.inStock ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>
                                {item.inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                             </td>
                          ))}
                        </tr>
                        <tr className="border-t dark:border-gray-700">
                          <td className="p-4"></td>
                          {comparisonItems.map(item => (
                            <td key={item.id} className="p-4 text-center">
                              <Link 
                                to={`/product/${item.id}`} 
                                className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300"
                              >
                                View Product
                              </Link>
                             </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 flex justify-between gap-4">
                    <button onClick={clearComparison} className="text-red-500 hover:text-red-700 dark:text-red-400 font-semibold transition-colors">
                      Clear All
                    </button>
                    <button onClick={addAllToCart} className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                      <FiShoppingCart /> Add All to Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ComparisonDrawer;