import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSubscription } from '../context/SubscriptionContext';
import { FiMail, FiTrash2, FiDownload, FiUsers, FiCalendar } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminSubscribers = () => {
  const { subscribers, removeSubscriber, getSubscriberCount } = useSubscription();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubscribers = subscribers.filter(sub =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ['Email', 'Name', 'Subscribed Date', 'Status'];
    const csvData = subscribers.map(sub => [
      sub.email,
      sub.name,
      new Date(sub.subscribedAt).toLocaleDateString(),
      sub.status
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Exported to CSV!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Email Subscribers
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your newsletter subscribers</p>
        </div>
        <button
          onClick={exportToCSV}
          disabled={subscribers.length === 0}
          className="px-4 py-2 bg-green-600 text-white rounded-xl flex items-center gap-2 hover:bg-green-700 transition disabled:opacity-50"
        >
          <FiDownload /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Subscribers</p>
              <p className="text-2xl font-bold text-indigo-600">{getSubscriberCount()}</p>
            </div>
            <FiUsers className="text-3xl text-indigo-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">This Month</p>
              <p className="text-2xl font-bold text-purple-600">
                {subscribers.filter(sub => new Date(sub.subscribedAt).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
            <FiCalendar className="text-3xl text-purple-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Campaigns</p>
              <p className="text-2xl font-bold text-pink-600">1</p>
            </div>
            <FiMail className="text-3xl text-pink-500" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search subscribers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Subscribers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-x-auto">
        {subscribers.length === 0 ? (
          <div className="text-center py-12">
            <FiMail className="text-5xl text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No subscribers yet</p>
            <p className="text-sm text-gray-400 mt-1">Subscribe from the footer to test</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-700">
              <tr className="text-left">
                <th className="p-4 dark:text-white">Email</th>
                <th className="p-4 dark:text-white">Name</th>
                <th className="p-4 dark:text-white">Subscribed Date</th>
                <th className="p-4 dark:text-white">Status</th>
                <th className="p-4 dark:text-white text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.map((subscriber, index) => (
                <motion.tr
                  key={subscriber.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FiMail className="text-indigo-500" />
                      <span className="dark:text-white">{subscriber.email}</span>
                    </div>
                  </td>
                  <td className="p-4 dark:text-gray-300">{subscriber.name}</td>
                  <td className="p-4 text-sm dark:text-gray-300">
                    {new Date(subscriber.subscribedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      {subscriber.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => removeSubscriber(subscriber.email)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminSubscribers;