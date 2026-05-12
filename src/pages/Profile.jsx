import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiPackage, FiShoppingBag, FiHeart, FiLogOut, FiEdit2, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [orders, setOrders] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  useEffect(() => {
    // Load user data
    if (user) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setProfileData({
          name: userData.name || user.name || '',
          email: userData.email || user.email || '',
          phone: userData.phone || '',
          address: userData.address || ''
        });
      } else {
        setProfileData({
          name: user.name || '',
          email: user.email || '',
          phone: '',
          address: ''
        });
      }
    }

    // Load user orders
    const savedOrders = localStorage.getItem('shopOrders');
    if (savedOrders) {
      const allOrders = JSON.parse(savedOrders);
      // Filter orders for this user (by email)
      const userOrders = allOrders.filter(order => order.customerEmail === user?.email);
      setOrders(userOrders);
    }

    // Load wishlist count
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const wishlist = JSON.parse(savedWishlist);
      setWishlistCount(wishlist.length);
    }
  }, [user]);

  const handleSaveProfile = () => {
    const updatedUser = { ...profileData, role: user?.role };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    // Show success message (can add toast later)
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'Shipped': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      case 'Processing': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'Pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FiUser className="text-6xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Please Login</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">You need to be logged in to view your profile.</p>
            <Link to="/login" className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all">
              Go to Login
            </Link>
          </motion.div>
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
              My Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account information and orders</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <FiUser className="text-4xl text-white" />
                  </div>
                  <h2 className="text-xl font-bold dark:text-white">{profileData.name || user.name}</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{profileData.email || user.email}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FiMail className="text-indigo-500" />
                    <span className="text-sm">{profileData.email || user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FiPhone className="text-indigo-500" />
                    <span className="text-sm">{profileData.phone || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FiMapPin className="text-indigo-500" />
                    <span className="text-sm">{profileData.address || 'Not provided'}</span>
                  </div>
                </div>

                <div className="border-t dark:border-gray-700 my-6"></div>

                <div className="space-y-2">
                  <Link to="/wishlist" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <FiHeart className="text-red-500" />
                      <span className="dark:text-white">Wishlist</span>
                    </div>
                    <span className="text-indigo-600 font-semibold">{wishlistCount}</span>
                  </Link>
                  <Link to="/orders" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <FiPackage className="text-green-500" />
                      <span className="dark:text-white">My Orders</span>
                    </div>
                    <span className="text-indigo-600 font-semibold">{orders.length}</span>
                  </Link>
                </div>

                <div className="border-t dark:border-gray-700 my-6"></div>

                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Edit Profile Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold dark:text-white">Profile Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-3 py-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                    >
                      <FiEdit2 /> Edit
                    </button>
                  ) : (
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 px-3 py-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                    >
                      <FiCheck /> Save
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 dark:text-white">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300">{profileData.name || user.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 dark:text-white">Email</label>
                    <p className="text-gray-700 dark:text-gray-300">{profileData.email || user.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 dark:text-white">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        placeholder="Add your phone number"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300">{profileData.phone || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 dark:text-white">Shipping Address</label>
                    {isEditing ? (
                      <textarea
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        placeholder="Add your shipping address"
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white resize-none"
                      />
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300">{profileData.address || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Recent Orders Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold dark:text-white">Recent Orders</h2>
                  <Link to="/orders" className="text-indigo-600 text-sm hover:underline">View All</Link>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <FiShoppingBag className="text-4xl text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">No orders yet</p>
                    <Link to="/shop" className="inline-block mt-3 text-indigo-600 hover:underline">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="border dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-all">
                        <div className="flex flex-wrap justify-between items-start gap-4">
                          <div>
                            <p className="font-semibold dark:text-white">{order.id}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          <div>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-indigo-600">₹{formatPrice(order.total)}</p>
                            <p className="text-xs text-gray-500">{order.items?.length || 0} items</p>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {order.items?.slice(0, 3).map((item) => (
                            <div key={item.id} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <span>{item.name}</span>
                              <span>×{item.quantity}</span>
                            </div>
                          ))}
                          {order.items?.length > 3 && (
                            <span className="text-sm text-gray-500">+{order.items.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-4 text-white">
                  <p className="text-sm opacity-90">Total Orders</p>
                  <p className="text-2xl font-bold">{orders.length}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                  <p className="text-sm opacity-90">Total Spent</p>
                  <p className="text-2xl font-bold">₹{formatPrice(orders.reduce((sum, o) => sum + o.total, 0))}</p>
                </div>
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-4 text-white">
                  <p className="text-sm opacity-90">Wishlist Items</p>
                  <p className="text-2xl font-bold">{wishlistCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;