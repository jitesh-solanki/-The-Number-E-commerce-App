import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiSettings, FiPackage, FiTag, FiUpload, FiX, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const AdminPanel = () => {
  const { storeSettings, updateStoreSettings, products, addProduct, updateProduct, deleteProduct, categories, addCategory, deleteCategory } = useStore();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('settings');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', icon: '📦' });

  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    gender: 'Unisex',
    sizes: [],
    description: '',
    image: '',
    inStock: true
  });

  const [settingsForm, setSettingsForm] = useState({
    name: storeSettings.name,
    logo: storeSettings.logo,
    primaryColor: storeSettings.primaryColor,
    accentColor: storeSettings.accentColor
  });

  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '7', '8', '9', '10', '11', '12', 'One Size'];
  const genderOptions = ['Male', 'Female', 'Unisex'];

  const handleSettingsUpdate = (e) => {
    e.preventDefault();
    updateStoreSettings(settingsForm);
    toast.success('Store settings updated!');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductForm({ ...productForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettingsForm({ ...settingsForm, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...productForm,
      price: parseFloat(productForm.price),
      originalPrice: productForm.originalPrice ? parseFloat(productForm.originalPrice) : null,
      id: editingProduct ? editingProduct.id : undefined,
      images: [productForm.image],
      dateAdded: new Date().toISOString()
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      toast.success('Product updated!');
    } else {
      addProduct(productData);
      toast.success('Product added!');
    }
    setShowProductForm(false);
    setEditingProduct(null);
    resetProductForm();
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      price: '',
      originalPrice: '',
      category: '',
      gender: 'Unisex',
      sizes: [],
      description: '',
      image: '',
      inStock: true
    });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || '',
      category: product.category,
      gender: product.gender,
      sizes: product.sizes,
      description: product.description,
      image: product.image,
      inStock: product.inStock
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
      toast.success('Product deleted!');
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    addCategory(newCategory);
    setNewCategory({ name: '', icon: '📦' });
    setShowCategoryForm(false);
    toast.success('Category added!');
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(categoryId);
      toast.success('Category deleted!');
    }
  };

  const toggleSize = (size) => {
    if (productForm.sizes.includes(size)) {
      setProductForm({
        ...productForm,
        sizes: productForm.sizes.filter(s => s !== size)
      });
    } else {
      setProductForm({
        ...productForm,
        sizes: [...productForm.sizes, size]
      });
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-gray-600">You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-2 px-4 ${activeTab === 'settings' ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
        >
          <FiSettings className="inline mr-2" /> Store Settings
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-2 px-4 ${activeTab === 'products' ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
        >
          <FiPackage className="inline mr-2" /> Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-2 px-4 ${activeTab === 'categories' ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
        >
          <FiTag className="inline mr-2" /> Categories
        </button>
      </div>

      {/* Store Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Store Settings</h2>
          <form onSubmit={handleSettingsUpdate} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Store Name</label>
              <input
                type="text"
                value={settingsForm.name}
                onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Store Logo</label>
              <div className="flex items-center gap-4">
                {settingsForm.logo && (
                  <img src={settingsForm.logo} alt="Logo" className="h-16 w-auto border rounded" />
                )}
                <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
                  <FiUpload className="inline mr-2" /> Upload Logo
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Primary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settingsForm.primaryColor}
                  onChange={(e) => setSettingsForm({ ...settingsForm, primaryColor: e.target.value })}
                  className="w-12 h-10 border rounded"
                />
                <input
                  type="text"
                  value={settingsForm.primaryColor}
                  onChange={(e) => setSettingsForm({ ...settingsForm, primaryColor: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Accent Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settingsForm.accentColor}
                  onChange={(e) => setSettingsForm({ ...settingsForm, accentColor: e.target.value })}
                  className="w-12 h-10 border rounded"
                />
                <input
                  type="text"
                  value={settingsForm.accentColor}
                  onChange={(e) => setSettingsForm({ ...settingsForm, accentColor: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            
            <button type="submit" className="btn-primary">Save Settings</button>
          </form>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <button
            onClick={() => {
              setEditingProduct(null);
              resetProductForm();
              setShowProductForm(true);
            }}
            className="btn-primary mb-6 flex items-center gap-2"
          >
            <FiPlus /> Add New Product
          </button>

          {showProductForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                    <button onClick={() => setShowProductForm(false)} className="text-gray-500 hover:text-gray-700">
                      <FiX className="text-2xl" />
                    </button>
                  </div>
                  
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Product Name</label>
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Price ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Original Price ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={productForm.originalPrice}
                          onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Category</label>
                        <select
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.filter(c => c.name !== 'All').map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Gender</label>
                        <select
                          value={productForm.gender}
                          onChange={(e) => setProductForm({ ...productForm, gender: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                        >
                          {genderOptions.map(g => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Available Sizes</label>
                      <div className="flex flex-wrap gap-2">
                        {sizeOptions.map(size => (
                          <button
                            type="button"
                            key={size}
                            onClick={() => toggleSize(size)}
                            className={`px-3 py-1 rounded ${
                              productForm.sizes.includes(size)
                                ? 'bg-black text-white'
                                : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Description</label>
                      <textarea
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        rows="4"
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Product Image</label>
                      <div className="flex items-center gap-4">
                        {productForm.image && (
                          <img src={productForm.image} alt="Preview" className="h-24 w-24 object-cover rounded" />
                        )}
                        <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
                          <FiUpload className="inline mr-2" /> Upload Image
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={productForm.inStock}
                          onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                        />
                        <span>In Stock</span>
                      </label>
                    </div>
                    
                    <button type="submit" className="btn-primary w-full">
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-4">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-accent">${product.price}</p>
                  <p className="text-sm text-gray-500">{product.category} • {product.gender}</p>
                  <p className="text-sm text-gray-500">Sizes: {product.sizes.join(', ')}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEditProduct(product)} className="p-2 hover:bg-gray-100 rounded">
                    <FiEdit2 />
                  </button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="p-2 hover:bg-red-100 rounded text-red-500">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div>
          <button
            onClick={() => setShowCategoryForm(true)}
            className="btn-primary mb-6 flex items-center gap-2"
          >
            <FiPlus /> Add New Category
          </button>

          {showCategoryForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">Add Category</h3>
                <form onSubmit={handleAddCategory}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Category Name</label>
                    <input
                      type="text"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Icon (Emoji)</label>
                    <input
                      type="text"
                      value={newCategory.icon}
                      onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="📦"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="btn-primary flex-1">Add</button>
                    <button type="button" onClick={() => setShowCategoryForm(false)} className="btn-secondary flex-1">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="grid gap-3">
            {categories.filter(c => c.name !== 'All').map(category => (
              <div key={category.id} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
                <div>
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <span className="font-semibold">{category.name}</span>
                </div>
                <button onClick={() => handleDeleteCategory(category.id)} className="text-red-500 hover:text-red-700">
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;