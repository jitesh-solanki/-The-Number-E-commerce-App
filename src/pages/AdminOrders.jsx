import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiPackage, FiTruck, FiCheckCircle, FiClock, FiPhone, FiMail, FiMapPin, FiDollarSign, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  // Fallback image URL
  const fallbackImage = 'https://placehold.co/100x100/e2e8f0/1e293b?text=No+Image';

  // Load orders from localStorage on mount
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const savedOrders = localStorage.getItem('shopOrders');
    if (savedOrders && JSON.parse(savedOrders).length > 0) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Demo orders for testing
      const demoOrders = [
        {
          id: 'ORD-1001',
          customerName: 'John Doe',
          customerEmail: 'john@example.com',
          customerPhone: '+91 98765 43210',
          shippingAddress: '123 Main St, New York, NY 10001',
          items: [
            { id: 1, name: 'Wireless Headphones', price: 7999, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100' },
            { id: 2, name: 'Smart Watch', price: 19999, quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100' }
          ],
          subtotal: 27998,
          shipping: 500,
          tax: 2800,
          total: 31298,
          status: 'Delivered',
          date: '2024-01-15',
          paymentMethod: 'Credit Card'
        },
        {
          id: 'ORD-1002',
          customerName: 'Jane Smith',
          customerEmail: 'jane@example.com',
          customerPhone: '+91 87654 32109',
          shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
          items: [
            { id: 3, name: 'Running Shoes', price: 6499, quantity: 2, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' }
          ],
          subtotal: 12998,
          shipping: 0,
          tax: 1300,
          total: 14298,
          status: 'Processing',
          date: '2024-01-14',
          paymentMethod: 'PayPal'
        },
        {
          id: 'ORD-1003',
          customerName: 'Mike Johnson',
          customerEmail: 'mike@example.com',
          customerPhone: '+91 76543 21098',
          shippingAddress: '789 Pine Rd, Chicago, IL 60601',
          items: [
            { id: 4, name: 'Backpack', price: 7499, quantity: 1, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100' },
            { id: 5, name: 'Sunglasses', price: 12999, quantity: 1, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100' }
          ],
          subtotal: 20498,
          shipping: 500,
          tax: 2050,
          total: 23048,
          status: 'Shipped',
          date: '2024-01-14',
          paymentMethod: 'Credit Card'
        },
        {
          id: 'ORD-1004',
          customerName: 'Sarah Wilson',
          customerEmail: 'sarah@example.com',
          customerPhone: '+91 65432 10987',
          shippingAddress: '321 Elm St, Houston, TX 77001',
          items: [
            { id: 6, name: 'Leather Wallet', price: 2999, quantity: 1, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100' }
          ],
          subtotal: 2999,
          shipping: 500,
          tax: 300,
          total: 3799,
          status: 'Pending',
          date: '2024-01-13',
          paymentMethod: 'Credit Card'
        }
      ];
      setOrders(demoOrders);
      localStorage.setItem('shopOrders', JSON.stringify(demoOrders));
    }
  };

  const saveOrders = (updatedOrders) => {
    setOrders(updatedOrders);
    localStorage.setItem('shopOrders', JSON.stringify(updatedOrders));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    saveOrders(updatedOrders);
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
    
    // If modal is open, update selected order
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <FiClock className="text-yellow-500" />;
      case 'Processing': return <FiPackage className="text-blue-500" />;
      case 'Shipped': return <FiTruck className="text-purple-500" />;
      case 'Delivered': return <FiCheckCircle className="text-green-500" />;
      default: return <FiPackage />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Processing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'Shipped': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'Delivered': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    processing: orders.filter(o => o.status === 'Processing').length,
    shipped: orders.filter(o => o.status === 'Shipped').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    revenue: orders.reduce((sum, o) => sum + o.total, 0)
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Manage Orders
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Track and manage customer orders</p>
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
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-indigo-600">₹{formatPrice(stats.revenue)}</p>
          <p className="text-xs text-indigo-600">Revenue</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              filterStatus === 'all' 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setFilterStatus('Pending')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              filterStatus === 'Pending' ? 'bg-yellow-500 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilterStatus('Processing')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              filterStatus === 'Processing' ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Processing
          </button>
          <button
            onClick={() => setFilterStatus('Shipped')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              filterStatus === 'Shipped' ? 'bg-purple-500 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Shipped
          </button>
          <button
            onClick={() => setFilterStatus('Delivered')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              filterStatus === 'Delivered' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Delivered
          </button>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-white w-64"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-x-auto"
      >
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No orders found</p>
            <p className="text-sm text-gray-400 mt-1">Orders will appear here when customers make purchases</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-700">
              <tr className="text-left">
                <th className="p-4 dark:text-white">Order ID</th>
                <th className="p-4 dark:text-white">Customer</th>
                <th className="p-4 dark:text-white">Date</th>
                <th className="p-4 dark:text-white text-center">Items</th>
                <th className="p-4 dark:text-white">Total</th>
                <th className="p-4 dark:text-white">Status</th>
                <th className="p-4 dark:text-white text-center">Actions</th>
               </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="p-4 font-semibold dark:text-white">{order.id}</td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium dark:text-white">{order.customerName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{order.customerEmail}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm dark:text-gray-300">{order.date}</td>
                  <td className="p-4 text-center dark:text-gray-300">{order.items?.length || 0}</td>
                  <td className="p-4 font-semibold text-indigo-600 dark:text-indigo-400">₹{formatPrice(order.total)}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold border-0 cursor-pointer ${getStatusColor(order.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsModalOpen(true);
                      }}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all duration-300"
                      title="View Details"
                    >
                      <FiEye />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                      Order Details
                    </h2>
                    <span className={`px-3 py-1 rounded-xl text-sm font-semibold flex items-center gap-1 ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      {selectedOrder.status}
                    </span>
                  </div>

                  {/* Order Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Order ID</p>
                      <p className="font-semibold dark:text-white">{selectedOrder.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Order Date</p>
                      <p className="font-semibold dark:text-white">{selectedOrder.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Payment Method</p>
                      <p className="font-semibold dark:text-white">{selectedOrder.paymentMethod || 'Credit Card'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Payment Status</p>
                      <p className="font-semibold text-green-600">Paid</p>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <h3 className="text-lg font-semibold mb-3 dark:text-white">Customer Information</h3>
                  <div className="space-y-2 mb-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                    <div className="flex items-center gap-2">
                      <FiUser className="text-gray-400" />
                      <span className="dark:text-white">{selectedOrder.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMail className="text-gray-400" />
                      <span className="dark:text-white">{selectedOrder.customerEmail}</span>
                    </div>
                    {selectedOrder.customerPhone && (
                      <div className="flex items-center gap-2">
                        <FiPhone className="text-gray-400" />
                        <span className="dark:text-white">{selectedOrder.customerPhone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-gray-400" />
                      <span className="dark:text-white">{selectedOrder.shippingAddress}</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <h3 className="text-lg font-semibold mb-3 dark:text-white">Order Items</h3>
                  <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                    {selectedOrder.items?.map((item) => (
                      <div key={item.id} className="flex gap-3 p-3 border dark:border-gray-700 rounded-xl">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = fallbackImage;
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

                  {/* Order Summary */}
                  <div className="border-t dark:border-gray-700 pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="dark:text-white">₹{formatPrice(selectedOrder.subtotal || (selectedOrder.total - 500 - selectedOrder.total * 0.1))}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Shipping</span>
                        <span className="dark:text-white">{selectedOrder.shipping === 0 ? 'Free' : `₹${formatPrice(selectedOrder.shipping || 500)}`}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Tax (10%)</span>
                        <span className="dark:text-white">₹{formatPrice(selectedOrder.tax || (selectedOrder.total * 0.1))}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t dark:border-gray-700">
                        <span className="dark:text-white">Total</span>
                        <span className="text-indigo-600">₹{formatPrice(selectedOrder.total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Update Status Section */}
                  <div className="mt-6 pt-4 border-t dark:border-gray-700">
                    <label className="block text-sm font-semibold mb-2 dark:text-white">Update Order Status</label>
                    <div className="flex gap-3">
                      <select
                        value={selectedOrder.status}
                        onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminOrders;