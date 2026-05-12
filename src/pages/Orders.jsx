import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiXCircle, FiDownload, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { generateInvoice } from '../utils/invoice';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  useEffect(() => {
    loadOrders();
  }, [user]);

  const loadOrders = () => {
    const savedOrders = localStorage.getItem('shopOrders');
    if (savedOrders) {
      const allOrders = JSON.parse(savedOrders);
      const userOrders = allOrders.filter(order => order.customerEmail === user?.email);
      setOrders(userOrders);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setIsCancelling(true);
      
      setTimeout(() => {
        const updatedOrders = orders.map(order => {
          if (order.id === orderId && (order.status === 'Pending' || order.status === 'Processing')) {
            return { ...order, status: 'Cancelled' };
          }
          return order;
        });
        
        setOrders(updatedOrders);
        
        const savedOrders = localStorage.getItem('shopOrders');
        if (savedOrders) {
          const allOrders = JSON.parse(savedOrders);
          const updatedAllOrders = allOrders.map(order => {
            if (order.id === orderId && (order.status === 'Pending' || order.status === 'Processing')) {
              return { ...order, status: 'Cancelled' };
            }
            return order;
          });
          localStorage.setItem('shopOrders', JSON.stringify(updatedAllOrders));
        }
        
        toast.success(`Order ${orderId} cancelled successfully`);
        setIsCancelling(false);
        setIsModalOpen(false);
      }, 500);
    }
  };

  const handleDownloadInvoice = async (order) => {
    setIsDownloading(true);
    await generateInvoice(order, user);
    setIsDownloading(false);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <FiClock className="text-yellow-500" />;
      case 'Processing': return <FiPackage className="text-blue-500" />;
      case 'Shipped': return <FiTruck className="text-purple-500" />;
      case 'Delivered': return <FiCheckCircle className="text-green-500" />;
      case 'Cancelled': return <FiXCircle className="text-red-500" />;
      default: return <FiPackage />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Processing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Shipped': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'Delivered': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'Cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const canCancel = (status) => {
    return status === 'Pending' || status === 'Processing';
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    processing: orders.filter(o => o.status === 'Processing').length,
    shipped: orders.filter(o => o.status === 'Shipped').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    cancelled: orders.filter(o => o.status === 'Cancelled').length
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Please Login</h2>
          <Link to="/login" className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              My Orders
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Track and manage your orders</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center shadow-md">
              <p className="text-2xl font-bold dark:text-white">{stats.total}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-xs text-yellow-600">Pending</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
              <p className="text-xs text-blue-600">Processing</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.shipped}</p>
              <p className="text-xs text-purple-600">Shipped</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
              <p className="text-xs text-green-600">Delivered</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
              <p className="text-xs text-red-600">Cancelled</p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  filter === status
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {status === 'all' ? 'All Orders' : status}
              </button>
            ))}
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <FiPackage className="text-5xl text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No orders found</p>
              <Link to="/shop" className="inline-block mt-3 text-indigo-600 hover:underline">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="p-6">
                    {/* Order Header */}
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="font-semibold dark:text-white">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="dark:text-gray-300">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="text-xl font-bold text-indigo-600">₹{formatPrice(order.total)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="border-t dark:border-gray-700 pt-4">
                      <div className="flex flex-wrap gap-4">
                        {order.items?.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-12 h-12 object-cover rounded-lg"
                              onError={(e) => {
                                e.target.src = 'https://placehold.co/100x100/e2e8f0/1e293b?text=No+Image';
                              }}
                            />
                            <div>
                              <p className="text-sm font-semibold dark:text-white">{item.name}</p>
                              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                        {order.items?.length > 3 && (
                          <div className="flex items-center">
                            <p className="text-sm text-gray-500">+{order.items.length - 3} more items</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="border-t dark:border-gray-700 pt-4 mt-4 flex flex-wrap gap-3 justify-end">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsModalOpen(true);
                        }}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                      >
                        <FiEye /> View Details
                      </button>
                      <button
                        onClick={() => handleDownloadInvoice(order)}
                        disabled={isDownloading}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-green-600 transition disabled:opacity-50"
                      >
                        <FiDownload /> {isDownloading ? 'Generating...' : 'Invoice'}
                      </button>
                      {canCancel(order.status) && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          disabled={isCancelling}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-red-600 transition disabled:opacity-50"
                        >
                          <FiXCircle /> Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold dark:text-white">Order Details</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm text-gray-500">Order ID</p><p className="font-semibold">{selectedOrder.id}</p></div>
                  <div><p className="text-sm text-gray-500">Date</p><p className="font-semibold">{selectedOrder.date}</p></div>
                  <div><p className="text-sm text-gray-500">Payment Method</p><p className="font-semibold">{selectedOrder.paymentMethod || 'Credit Card'}</p></div>
                  <div><p className="text-sm text-gray-500">Status</p><span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedOrder.status)}`}>{selectedOrder.status}</span></div>
                </div>

                <div><h3 className="font-semibold mb-2">Customer Info</h3><p>{selectedOrder.customerName}</p><p>{selectedOrder.customerEmail}</p><p>{selectedOrder.shippingAddress}</p></div>

                <div><h3 className="font-semibold mb-2">Items</h3><div className="space-y-2">{selectedOrder.items?.map((item) => (<div key={item.id} className="flex justify-between items-center border-b pb-2"><div><p className="font-semibold">{item.name}</p><p className="text-sm text-gray-500">Qty: {item.quantity}</p></div><p className="font-semibold">₹{formatPrice(item.price * item.quantity)}</p></div>))}</div></div>

                <div className="border-t pt-3"><div className="flex justify-between"><span>Subtotal</span><span>₹{formatPrice(selectedOrder.subtotal)}</span></div><div className="flex justify-between"><span>Shipping</span><span>{selectedOrder.shipping === 0 ? 'Free' : `₹${formatPrice(selectedOrder.shipping)}`}</span></div><div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-indigo-600">₹{formatPrice(selectedOrder.total)}</span></div></div>

                <div className="flex gap-3 pt-4">
                  <button onClick={() => handleDownloadInvoice(selectedOrder)} className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2">
                    <FiDownload /> Download Invoice
                  </button>
                  {canCancel(selectedOrder.status) && (
                    <button onClick={() => handleCancelOrder(selectedOrder.id)} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition">
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;