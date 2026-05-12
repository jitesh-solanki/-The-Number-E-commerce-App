import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign, FiTrendingUp, FiStar, FiArrowRight } from 'react-icons/fi';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { allProducts } = useStore();
  
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    productGrowth: '+0%',
    orderGrowth: '+0%',
    userGrowth: '+0%',
    revenueGrowth: '+0%'
  });
  
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  // Load all data
  useEffect(() => {
    loadDashboardData();
  }, [allProducts]);

  const loadDashboardData = () => {
    // Load products
    const products = allProducts || [];
    const totalProducts = products.length;
    
    // Load orders from localStorage
    const savedOrders = localStorage.getItem('shopOrders');
    const orders = savedOrders ? JSON.parse(savedOrders) : [];
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    
    // Load users from localStorage
    const savedUsers = localStorage.getItem('shopUsers');
    let users = savedUsers ? JSON.parse(savedUsers) : [];
    
    // Add demo users if none exist
    if (users.length === 0) {
      users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'customer', status: 'active', orders: 5, joined: '2024-01-01' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'customer', status: 'active', orders: 12, joined: '2023-12-15' },
        { id: 3, name: 'Admin User', email: 'admin@thenumber.com', role: 'admin', status: 'active', orders: 0, joined: '2024-01-01' },
      ];
      localStorage.setItem('shopUsers', JSON.stringify(users));
    }
    
    const totalUsers = users.filter(u => u.role !== 'admin').length;
    
    // Calculate growth (mock data - in real app, compare with previous period)
    const calculateGrowth = (current, previous) => {
      if (previous === 0) return '+100%';
      const growth = ((current - previous) / previous) * 100;
      return `${growth > 0 ? '+' : ''}${growth.toFixed(0)}%`;
    };
    
    // Get recent orders (last 5)
    const recent = [...orders]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
    
    // Calculate top products by quantity sold
    const productSales = {};
    orders.forEach(order => {
      order.items?.forEach(item => {
        if (productSales[item.id]) {
          productSales[item.id].quantity += item.quantity;
        } else {
          productSales[item.id] = {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity
          };
        }
      });
    });
    
    const topProductsList = Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)
      .map(p => ({
        ...p,
        rating: products.find(prod => prod.id === p.id)?.rating || 4.5
      }));
    
    setStats({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue,
      productGrowth: calculateGrowth(totalProducts, totalProducts - 5),
      orderGrowth: calculateGrowth(totalOrders, totalOrders - 10),
      userGrowth: calculateGrowth(totalUsers, totalUsers - 8),
      revenueGrowth: calculateGrowth(totalRevenue, totalRevenue - 5000)
    });
    
    setRecentOrders(recent);
    setTopProducts(topProductsList.length > 0 ? topProductsList : products.slice(0, 5));
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'Processing':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'Shipped':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const statCards = [
    { title: 'Total Products', value: stats.totalProducts, icon: FiPackage, color: 'from-indigo-500 to-indigo-600', growth: stats.productGrowth },
    { title: 'Total Orders', value: stats.totalOrders, icon: FiShoppingBag, color: 'from-green-500 to-green-600', growth: stats.orderGrowth },
    { title: 'Total Users', value: stats.totalUsers, icon: FiUsers, color: 'from-purple-500 to-purple-600', growth: stats.userGrowth },
    { title: 'Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: FiDollarSign, color: 'from-yellow-500 to-yellow-600', growth: stats.revenueGrowth },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.name}!</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-2 dark:text-white">{stat.value}</p>
                <p className="text-xs text-green-500 mt-1">{stat.growth} growth</p>
              </div>
              <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl shadow-lg`}>
                <stat.icon className="text-2xl text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold dark:text-white">Recent Orders</h2>
            <Link to="/admin/orders" className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm flex items-center gap-1">
              View All <FiArrowRight />
            </Link>
          </div>
          
          {recentOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <FiShoppingBag className="text-4xl mx-auto mb-2 opacity-50" />
              <p>No orders yet</p>
              <p className="text-sm">Orders will appear here when customers make purchases</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b dark:border-gray-700">
                  <tr className="text-left text-gray-600 dark:text-gray-400 text-sm">
                    <th className="pb-2">Order ID</th>
                    <th className="pb-2">Customer</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b dark:border-gray-700 last:border-0">
                      <td className="py-2 font-semibold dark:text-white text-sm">#{order.id}</td>
                      <td className="py-2 dark:text-gray-300 text-sm">{order.customerName || order.customer}</td>
                      <td className="py-2 text-indigo-600 font-semibold text-sm">${order.total.toFixed(2)}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold dark:text-white">Top Products</h2>
            <Link to="/admin/products" className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm flex items-center gap-1">
              Manage <FiArrowRight />
            </Link>
          </div>
          
          {topProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <FiPackage className="text-4xl mx-auto mb-2 opacity-50" />
              <p>No products yet</p>
              <p className="text-sm">Add products to see them here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/500x500?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm dark:text-white">{product.name}</p>
                    <p className="text-xs text-indigo-600 font-semibold">${product.price}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiStar className="text-yellow-400 fill-current" />
                    <span className="text-sm dark:text-gray-300">{product.rating || 4.5}</span>
                  </div>
                  {product.quantity && (
                    <div className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      Sold: {product.quantity}
                    </div>
                  )}
                  <FiTrendingUp className="text-green-500" />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Link 
          to="/admin/products" 
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
        >
          Manage Products
        </Link>
        <Link 
          to="/admin/orders" 
          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-center py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
        >
          View Orders ({stats.totalOrders})
        </Link>
        <Link 
          to="/admin/users" 
          className="border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 text-center py-3 rounded-xl font-semibold hover:bg-indigo-500 hover:text-white transition-all duration-300"
        >
          Manage Users ({stats.totalUsers})
        </Link>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;