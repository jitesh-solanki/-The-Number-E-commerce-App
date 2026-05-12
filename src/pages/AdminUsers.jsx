import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiTrash2, FiUserPlus, FiShield, FiUser, FiX, FiSearch, FiMail, FiPhone, FiCalendar, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'customer',
    status: 'active'
  });

  // Load users from localStorage on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const savedUsers = localStorage.getItem('shopUsers');
    if (savedUsers && JSON.parse(savedUsers).length > 0) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Demo users
      const demoUsers = [
        { 
          id: 1, 
          name: 'John Doe', 
          email: 'john@example.com', 
          phone: '+1 (555) 123-4567',
          role: 'customer', 
          status: 'active', 
          orders: 5, 
          totalSpent: 890.45,
          joined: '2024-01-01',
          lastLogin: '2024-01-15'
        },
        { 
          id: 2, 
          name: 'Jane Smith', 
          email: 'jane@example.com', 
          phone: '+1 (555) 234-5678',
          role: 'customer', 
          status: 'active', 
          orders: 12, 
          totalSpent: 2340.99,
          joined: '2023-12-15',
          lastLogin: '2024-01-14'
        },
        { 
          id: 3, 
          name: 'Admin User', 
          email: 'admin@thenumber.com', 
          phone: '+1 (555) 345-6789',
          role: 'admin', 
          status: 'active', 
          orders: 0, 
          totalSpent: 0,
          joined: '2024-01-01',
          lastLogin: '2024-01-15'
        },
        { 
          id: 4, 
          name: 'Mike Johnson', 
          email: 'mike@example.com', 
          phone: '+1 (555) 456-7890',
          role: 'customer', 
          status: 'inactive', 
          orders: 2, 
          totalSpent: 156.50,
          joined: '2024-01-10',
          lastLogin: '2024-01-12'
        },
        { 
          id: 5, 
          name: 'Sarah Wilson', 
          email: 'sarah@example.com', 
          phone: '+1 (555) 567-8901',
          role: 'customer', 
          status: 'active', 
          orders: 8, 
          totalSpent: 1245.75,
          joined: '2024-01-05',
          lastLogin: '2024-01-14'
        }
      ];
      setUsers(demoUsers);
      localStorage.setItem('shopUsers', JSON.stringify(demoUsers));
    }
  };

  const saveUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem('shopUsers', JSON.stringify(updatedUsers));
  };

  const handleDelete = (id) => {
    const userToDelete = users.find(u => u.id === id);
    if (userToDelete?.role === 'admin') {
      toast.error('Cannot delete admin users');
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete ${userToDelete?.name}?`)) {
      const newUsers = users.filter(u => u.id !== id);
      saveUsers(newUsers);
      toast.success('User deleted successfully');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      status: user.status
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'customer',
      status: 'active'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }

    // Check if email already exists (for new user)
    if (!editingUser && users.some(u => u.email === formData.email)) {
      toast.error('Email already exists');
      return;
    }
    
    if (editingUser) {
      // Update existing user
      const updatedUser = { 
        ...editingUser, 
        ...formData,
        phone: formData.phone || editingUser.phone
      };
      const newUsers = users.map(u =>
        u.id === editingUser.id ? updatedUser : u
      );
      saveUsers(newUsers);
      toast.success('User updated successfully');
    } else {
      // Add new user
      const newId = Math.max(...users.map(u => u.id), 0) + 1;
      const newUser = { 
        id: newId,
        ...formData,
        phone: formData.phone || '',
        orders: 0,
        totalSpent: 0,
        joined: new Date().toISOString().split('T')[0],
        lastLogin: null
      };
      const newUsers = [...users, newUser];
      saveUsers(newUsers);
      toast.success('User added successfully');
    }
    setIsModalOpen(false);
  };

  const toggleUserStatus = (id) => {
    const user = users.find(u => u.id === id);
    if (user?.role === 'admin') {
      toast.error('Cannot change admin user status');
      return;
    }
    
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    const updatedUsers = users.map(u =>
      u.id === id ? { ...u, status: newStatus } : u
    );
    saveUsers(updatedUsers);
    toast.success(`User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Stats
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    customers: users.filter(u => u.role === 'customer').length,
    admins: users.filter(u => u.role === 'admin').length,
    totalOrders: users.reduce((sum, u) => sum + (u.orders || 0), 0),
    totalRevenue: users.reduce((sum, u) => sum + (u.totalSpent || 0), 0)
  };

  const getRoleClass = (role) => {
    return role === 'admin' 
      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' 
      : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
  };

  const getStatusClass = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
      : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Manage Users
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">View and manage customer accounts</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <FiUserPlus /> Add User
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center shadow-md">
          <p className="text-2xl font-bold dark:text-white">{stats.total}</p>
          <p className="text-xs text-gray-500">Total Users</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          <p className="text-xs text-green-600">Active</p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
          <p className="text-xs text-red-600">Inactive</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.customers}</p>
          <p className="text-xs text-blue-600">Customers</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-purple-600">{stats.admins}</p>
          <p className="text-xs text-purple-600">Admins</p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-indigo-600">${stats.totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-indigo-600">Total Spent</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterRole('all')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              filterRole === 'all' 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            All Roles
          </button>
          <button
            onClick={() => setFilterRole('customer')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              filterRole === 'customer' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Customers
          </button>
          <button
            onClick={() => setFilterRole('admin')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              filterRole === 'admin' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Admins
          </button>
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              filterStatus === 'all' 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            All Status
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              filterStatus === 'active' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilterStatus('inactive')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              filterStatus === 'inactive' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Inactive
          </button>
        </div>
        
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-white w-64"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-x-auto">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No users found</p>
            <p className="text-sm text-gray-400 mt-1">Click "Add User" to create a new account</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-700">
              <tr className="text-left">
                <th className="p-4 dark:text-white">User</th>
                <th className="p-4 dark:text-white">Contact</th>
                <th className="p-4 dark:text-white">Role</th>
                <th className="p-4 dark:text-white">Status</th>
                <th className="p-4 dark:text-white text-center">Orders</th>
                <th className="p-4 dark:text-white">Total Spent</th>
                <th className="p-4 dark:text-white">Joined</th>
                <th className="p-4 dark:text-white text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                        user.role === 'admin' ? 'from-purple-500 to-pink-500' : 'from-indigo-500 to-purple-600'
                      } flex items-center justify-center text-white shadow-md`}>
                        {user.role === 'admin' ? <FiShield size={18} /> : <FiUser size={18} />}
                      </div>
                      <div>
                        <p className="font-semibold dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-sm dark:text-gray-300 flex items-center gap-1">
                        <FiMail size={12} /> {user.email}
                      </p>
                      {user.phone && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                          <FiPhone size={10} /> {user.phone}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleClass(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      disabled={user.role === 'admin'}
                      className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                        getStatusClass(user.status)
                      } ${user.role === 'admin' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}`}
                    >
                      {user.status === 'active' ? <FiCheckCircle size={12} /> : <FiXCircle size={12} />}
                      {user.status}
                    </button>
                  </td>
                  <td className="p-4 text-center dark:text-gray-300">{user.orders || 0}</td>
                  <td className="p-4">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      ${(user.totalSpent || 0).toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm dark:text-gray-300">
                      <FiCalendar size={12} />
                      {user.joined}
                    </div>
                    {user.lastLogin && (
                      <p className="text-xs text-gray-500 mt-1">Last: {user.lastLogin}</p>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition"
                        title="Edit User"
                      >
                        <FiEdit2 />
                      </button>
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition"
                          title="Delete User"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
           </table>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
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
              <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                      {editingUser ? 'Edit User' : 'Add New User'}
                    </h2>
                    <button 
                      onClick={() => setIsModalOpen(false)} 
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
                    >
                      <FiX />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 dark:text-white">Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 dark:text-white">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 dark:text-white">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                        placeholder="Optional"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 dark:text-white">Role</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                      >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 dark:text-white">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button 
                        type="submit" 
                        className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                      >
                        {editingUser ? 'Update' : 'Add'} User
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminUsers;