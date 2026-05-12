import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiCheckCircle, FiShoppingBag, FiHome, FiPackage, FiClock, FiMapPin, FiCreditCard } from 'react-icons/fi';

const OrderSuccess = () => {
  const location = useLocation();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Get order from location state or localStorage
    if (location.state?.order) {
      setOrder(location.state.order);
    } else {
      const lastOrderId = localStorage.getItem('lastOrderId');
      if (lastOrderId) {
        const savedOrders = localStorage.getItem('shopOrders');
        if (savedOrders) {
          const orders = JSON.parse(savedOrders);
          const foundOrder = orders.find(o => o.id === lastOrderId);
          if (foundOrder) {
            setOrder(foundOrder);
          }
        }
      }
    }
  }, [location]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h1 className="text-2xl font-bold mb-4 dark:text-white">Order Not Found</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">We couldn't find your order details.</p>
              <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold">
                <FiShoppingBag /> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Success Header */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FiCheckCircle className="text-6xl text-green-600 dark:text-green-400" />
            </motion.div>
            
            <h1 className="text-3xl font-display font-bold mb-4 dark:text-white">Order Successful! 🎉</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Thank you for your purchase, <span className="font-semibold text-indigo-600">{order.customerName}</span>!
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Your order has been confirmed and will be shipped soon.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Order Number</p>
                <p className="text-xl font-bold dark:text-white">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Order Date</p>
                <p className="text-lg font-semibold dark:text-white flex items-center gap-2">
                  <FiClock className="text-indigo-500" /> {order.date}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Payment Status</p>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
                  {order.paymentStatus || 'Paid'}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 dark:text-white flex items-center gap-2">
                <FiPackage /> Order Items
              </h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 border dark:border-gray-700 rounded-xl">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-semibold dark:text-white">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-indigo-600 font-semibold">${item.price} each</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t dark:border-gray-700 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="dark:text-white">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="dark:text-white">
                    {order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax</span>
                  <span className="dark:text-white">${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t dark:border-gray-700">
                  <span className="dark:text-white">Total</span>
                  <span className="text-indigo-600">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
            <h3 className="text-lg font-semibold mb-3 dark:text-white flex items-center gap-2">
              <FiMapPin /> Shipping Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Customer Name</p>
                <p className="font-semibold dark:text-white">{order.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-semibold dark:text-white">{order.customerEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p className="font-semibold dark:text-white">{order.customerPhone || 'Not provided'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">Shipping Address</p>
                <p className="font-semibold dark:text-white">{order.shippingAddress}</p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
            <h3 className="text-lg font-semibold mb-3 dark:text-white flex items-center gap-2">
              <FiCreditCard /> Payment Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Payment Method</p>
                <p className="font-semibold dark:text-white">{order.paymentMethod || 'Credit Card'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Transaction Status</p>
                <p className="font-semibold text-green-600">Completed</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <FiShoppingBag /> Continue Shopping
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 rounded-xl font-semibold hover:bg-indigo-500 hover:text-white transition-all"
            >
              <FiHome /> Go Home
            </Link>
          </div>

          {/* Email Notice */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            A confirmation email has been sent to <span className="font-semibold">{order.customerEmail}</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;