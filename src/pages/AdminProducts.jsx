import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiX, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminProducts = () => {
  const { updateProduct: updateStoreProduct, addProduct: addStoreProduct, deleteProduct: deleteStoreProduct } = useStore();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    description: '',
    image: '',
    stock: 'In Stock',
    rating: ''
  });

  // Fallback image URL
  const fallbackImage = 'https://placehold.co/500x500/e2e8f0/1e293b?text=No+Image';

  // Load products from localStorage on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const savedProducts = localStorage.getItem('adminProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Load default products from data file
      import('../data/products').then(module => {
        const defaultProducts = module.products;
        setProducts(defaultProducts);
        localStorage.setItem('adminProducts', JSON.stringify(defaultProducts));
      });
    }
  };

  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem('adminProducts', JSON.stringify(newProducts));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const newProducts = products.filter(p => p.id !== id);
      saveProducts(newProducts);
      deleteStoreProduct(id);
      toast.success('Product deleted successfully');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || '',
      category: product.category,
      description: product.description,
      image: product.image,
      stock: product.inStock ? 'In Stock' : 'Out of Stock',
      rating: product.rating
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      category: '',
      description: '',
      image: '',
      stock: 'In Stock',
      rating: ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : parseFloat(formData.price) * 1.3,
      category: formData.category,
      description: formData.description,
      image: formData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      images: [formData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
      rating: parseFloat(formData.rating) || 4.0,
      reviews: editingProduct?.reviews || 0,
      inStock: formData.stock === 'In Stock'
    };

    if (editingProduct) {
      // Update existing product
      const updatedProduct = { ...editingProduct, ...productData };
      const newProducts = products.map(p =>
        p.id === editingProduct.id ? updatedProduct : p
      );
      saveProducts(newProducts);
      updateStoreProduct(updatedProduct);
      toast.success('Product updated successfully');
    } else {
      // Add new product
      const newId = Math.max(...products.map(p => p.id), 0) + 1;
      const newProduct = { id: newId, ...productData };
      const newProducts = [...products, newProduct];
      saveProducts(newProducts);
      addStoreProduct(newProduct);
      toast.success('Product added successfully');
    }
    setIsModalOpen(false);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all products to default? This will delete all custom products.')) {
      import('../data/products').then(module => {
        const defaultProducts = module.products;
        saveProducts(defaultProducts);
        toast.success('Products reset to default');
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Manage Products
        </h1>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleResetToDefault}
            className="border-2 border-yellow-500 text-yellow-600 dark:text-yellow-400 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all"
          >
            <FiRefreshCw /> Reset to Default
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAdd}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
          >
            <FiPlus /> Add Product
          </motion.button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-all"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-700">
            <tr className="text-left">
              <th className="p-4 dark:text-white">Image</th>
              <th className="p-4 dark:text-white">Name</th>
              <th className="p-4 dark:text-white">Category</th>
              <th className="p-4 dark:text-white">Price</th>
              <th className="p-4 dark:text-white">Stock</th>
              <th className="p-4 dark:text-white">Rating</th>
              <th className="p-4 dark:text-white">Actions</th>
             </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-12 text-gray-500 dark:text-gray-400">
                  No products found. Click "Add Product" to create one.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="p-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-12 h-12 object-cover rounded-lg shadow-md"
                      onError={(e) => {
                        e.target.src = fallbackImage;
                      }}
                    />
                  </td>
                  <td className="p-4 font-semibold dark:text-white">{product.name}</td>
                  <td className="p-4 dark:text-gray-300">{product.category}</td>
                  <td className="p-4">
                    <span className="text-indigo-600 font-bold">${product.price}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-xs text-gray-400 line-through ml-1">${product.originalPrice}</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.inStock ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-4 dark:text-gray-300">{product.rating} ★</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Product Count */}
      <div className="mt-4 text-right text-sm text-gray-500 dark:text-gray-400">
        Total Products: {filteredProducts.length}
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
              <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
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
                      <label className="block text-sm font-semibold mb-2 dark:text-white">Product Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-semibold mb-2 dark:text-white">Price ($) *</label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 dark:text-white">Original Price ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.originalPrice}
                          onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2 dark:text-white">Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Footwear">Footwear</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Home & Living">Home & Living</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2 dark:text-white">Description *</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                        rows="3"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2 dark:text-white">Image URL</label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                        placeholder="https://example.com/image.jpg"
                      />
                      <p className="text-xs text-gray-500 mt-1">Leave empty to use default image</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-semibold mb-2 dark:text-white">Stock Status</label>
                        <select
                          value={formData.stock}
                          onChange={(e) => setFormData({...formData, stock: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                        >
                          <option value="In Stock">In Stock</option>
                          <option value="Out of Stock">Out of Stock</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 dark:text-white">Rating (1-5)</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          value={formData.rating}
                          onChange={(e) => setFormData({...formData, rating: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button 
                        type="submit" 
                        className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                      >
                        {editingProduct ? 'Update' : 'Add'} Product
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

export default AdminProducts;