import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { FiMinus, FiPlus, FiTrash2, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const subtotal = getCartTotal();
  const shipping = subtotal > 5000 ? 0 : 500;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  // Fallback image URL
  const fallbackImage = 'https://placehold.co/500x500/e2e8f0/1e293b?text=No+Image';

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-display font-bold mb-4 dark:text-white">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Looks like you haven't added any items yet.</p>
            <Link to="/shop" className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-display font-bold mb-8 flex items-center gap-3 dark:text-white">
          <FiShoppingBag className="text-indigo-600 dark:text-indigo-400" />
          Shopping Cart
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 font-semibold">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>
              
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b dark:border-gray-700 items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="md:col-span-6 flex gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover rounded-xl"
                      onError={(e) => {
                        e.target.src = fallbackImage;
                      }}
                    />
                    <div>
                      <h3 className="font-semibold text-lg dark:text-white">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-sm hover:text-red-700 mt-2 flex items-center gap-1 transition-colors"
                      >
                        <FiTrash2 /> Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="text-center">
                      <span className="md:hidden font-semibold mr-2 block mb-1 text-gray-600 dark:text-gray-400">Price:</span>
                      <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">₹{formatPrice(item.price)}</span>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <FiMinus />
                      </button>
                      <span className="w-12 text-center font-semibold text-lg dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="text-center">
                      <span className="md:hidden font-semibold mr-2 block mb-1 text-gray-600 dark:text-gray-400">Total:</span>
                      <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                        ₹{formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 flex justify-between flex-wrap gap-4">
                <Link to="/shop" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-2 font-semibold">
                  <FiArrowLeft /> Continue Shopping
                </Link>
                <button onClick={clearCart} className="text-red-500 hover:text-red-700 font-semibold">
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24"
            >
              <h2 className="text-2xl font-display font-bold mb-4 dark:text-white">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="font-semibold">{shipping === 0 ? 'Free' : `₹${formatPrice(shipping)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">₹{formatPrice(tax)}</span>
                </div>
                <div className="border-t dark:border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between text-2xl font-bold">
                    <span className="dark:text-white">Total</span>
                    <span className="text-indigo-600 dark:text-indigo-400">₹{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              
              {shipping > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-3 mb-4">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Add ₹{formatPrice(5000 - subtotal)} more to get free shipping!
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all" style={{ width: `${Math.min((subtotal / 5000) * 100, 100)}%` }}></div>
                  </div>
                </div>
              )}
              
              <Link to="/checkout">
                <button className="w-full py-4 text-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300">
                  Proceed to Checkout
                </button>
              </Link>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Secure payment powered by The Number</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;