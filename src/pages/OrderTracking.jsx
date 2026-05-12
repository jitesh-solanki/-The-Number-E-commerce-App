import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiSearch, FiMapPin, FiCalendar, FiDollarSign, FiUser, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('trackedOrders');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = (order) => {
    const updatedHistory = [order, ...searchHistory.filter(o => o.id !== order.id)].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem('trackedOrders', JSON.stringify(updatedHistory));
  };

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      toast.error('Please enter an order ID');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Get orders from localStorage
      const savedOrders = localStorage.getItem('shopOrders');
      const orders = savedOrders ? JSON.parse(savedOrders) : [];
      const foundOrder = orders.find(order => order.id === orderId.toUpperCase());
      
      if (foundOrder) {
        setTrackedOrder(foundOrder);
        saveToHistory(foundOrder);
        toast.success('Order found!');
      } else {
        toast.error('Order not found. Please check the order ID.');
        setTrackedOrder(null);
      }
      setIsLoading(false);
    }, 800);
  };

  const getOrderStatus = (status) => {
    const steps = [
      { name: 'Order Placed', icon: FiPackage, status: 'pending' },
      { name: 'Processing', icon: FiClock, status: 'processing' },
      { name: 'Shipped', icon: FiTruck, status: 'shipped' },
      { name: 'Delivered', icon: FiCheckCircle, status: 'delivered' }
    ];

    let currentStep = 0;
    switch(status) {
      case 'Pending': currentStep = 0; break;
      case 'Processing': currentStep = 1; break;
      case 'Shipped': currentStep = 2; break;
      case 'Delivered': currentStep = 3; break;
      default: currentStep = 0;
    }

    return { steps, currentStep };
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Processing': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'Shipped': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      case 'Delivered': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Track Your Order
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Enter your order ID to track your package
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <form onSubmit={handleTrack} className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter Order ID (e.g., ORD-1001)"
                className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isLoading ? 'Tracking...' : 'Track Order'}
            </button>
          </form>
        </motion.div>

        {/* Recent Searches */}
        {searchHistory.length > 0 && !trackedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Recent searches:</p>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map(order => (
                <button
                  key={order.id}
                  onClick={() => {
                    setOrderId(order.id);
                    handleTrack({ preventDefault: () => {} });
                  }}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                >
                  {order.id}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Order Details */}
        {trackedOrder && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Order Header */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(trackedOrder.status)}`}>
                    {trackedOrder.status}
                  </span>
                  <h2 className="text-2xl font-bold mt-2 dark:text-white">{trackedOrder.id}</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Ordered on {trackedOrder.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-indigo-600">₹{formatPrice(trackedOrder.total)}</p>
                  <p className="text-sm text-gray-500">{trackedOrder.items?.length || 0} items</p>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-6 dark:text-white">Tracking Timeline</h3>
              <div className="relative">
                {(() => {
                  const { steps, currentStep } = getOrderStatus(trackedOrder.status);
                  return steps.map((step, index) => {
                    const isCompleted = index <= currentStep;
                    const isCurrent = index === currentStep;
                    const Icon = step.icon;
                    
                    return (
                      <div key={step.name} className="relative flex items-start mb-8 last:mb-0">
                        {/* Connector line */}
                        {index < steps.length - 1 && (
                          <div className={`absolute left-5 top-10 w-0.5 h-12 ${
                            isCompleted ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`} />
                        )}
                        
                        {/* Icon */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                          isCompleted 
                            ? 'bg-indigo-500 text-white' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                        } ${isCurrent ? 'ring-4 ring-indigo-200 dark:ring-indigo-900/50' : ''}`}>
                          <Icon size={18} />
                        </div>
                        
                        {/* Content */}
                        <div className="ml-4 flex-1">
                          <h4 className={`font-semibold ${
                            isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-400'
                          }`}>
                            {step.name}
                          </h4>
                          {isCurrent && (
                            <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                              Your order is currently being {step.name.toLowerCase()}
                            </p>
                          )}
                        </div>
                        
                        {/* Date */}
                        {isCompleted && step.name === 'Order Placed' && (
                          <p className="text-sm text-gray-500">{trackedOrder.date}</p>
                        )}
                        {isCompleted && step.name === 'Delivered' && (
                          <p className="text-sm text-gray-500">{trackedOrder.date}</p>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Order Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Info */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Customer Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FiUser className="text-indigo-500" />
                    <span>{trackedOrder.customerName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FiMail className="text-indigo-500" />
                    <span>{trackedOrder.customerEmail}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FiMapPin className="text-indigo-500" />
                    <span>{trackedOrder.shippingAddress}</span>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="dark:text-white">₹{formatPrice(trackedOrder.subtotal || (trackedOrder.total - 500 - trackedOrder.total * 0.1))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="dark:text-white">{trackedOrder.shipping === 0 ? 'Free' : `₹${formatPrice(trackedOrder.shipping || 500)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax (10%)</span>
                    <span className="dark:text-white">₹{formatPrice(trackedOrder.tax || (trackedOrder.total * 0.1))}</span>
                  </div>
                  <div className="border-t dark:border-gray-700 pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span className="dark:text-white">Total</span>
                      <span className="text-indigo-600">₹{formatPrice(trackedOrder.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Order Items</h3>
              <div className="space-y-3">
                {trackedOrder.items?.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 border dark:border-gray-700 rounded-xl">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/100x100/e2e8f0/1e293b?text=No+Image';
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-semibold dark:text-white">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-indigo-600 font-semibold">₹{formatPrice(item.price)} each</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold dark:text-white">₹{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Help */}
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-400">
                Need help? <Link to="/contact" className="text-indigo-600 hover:underline">Contact Support</Link>
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;