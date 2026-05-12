import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { products } from '../data/products';
import LoadingSpinner from '../components/LoadingSpinner';
import SkeletonLoader from '../components/SkeletonLoader';
import ProductReviews from '../components/ProductReviews';
import ProductQnA from '../components/ProductQnA';
import { FiHeart, FiShoppingCart, FiStar, FiTruck, FiRefreshCw, FiShield, FiShare2, FiMinus, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { addToRecentlyViewed } = useRecentlyViewed();

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  // Fallback image URLs (reliable placeholder service)
  const fallbackImage = 'https://placehold.co/500x500/e2e8f0/1e293b?text=No+Image';
  const fallbackThumbnail = 'https://placehold.co/100x100/e2e8f0/1e293b?text=No+Image';

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading or fetch product
    const timer = setTimeout(() => {
      const foundProduct = products.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  // Add to recently viewed when product loads - FIXED: removed addToRecentlyViewed from dependencies
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product]); // <-- FIXED: removed addToRecentlyViewed from dependencies

  const handleShare = async () => {
    if (!product) return;
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} on The Number!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success('Shared successfully!');
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      toast.error('Sharing cancelled');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Image skeleton */}
              <div>
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse mb-4"></div>
                <div className="flex gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
              
              {/* Info skeleton */}
              <div className="space-y-4">
                <SkeletonLoader className="h-8 w-32" />
                <SkeletonLoader className="h-12 w-3/4" />
                <div className="flex gap-2">
                  <SkeletonLoader className="h-6 w-32" />
                  <SkeletonLoader className="h-6 w-40" />
                </div>
                <SkeletonLoader className="h-10 w-48" />
                <SkeletonLoader className="h-24 w-full" />
                <SkeletonLoader className="h-12 w-32" />
                <div className="flex gap-4">
                  <SkeletonLoader className="h-14 w-40" />
                  <SkeletonLoader className="h-14 w-40" />
                  <SkeletonLoader className="h-14 w-14" />
                </div>
                <div className="space-y-3 pt-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <SkeletonLoader className="h-12 w-12 rounded-xl" />
                      <div className="flex-1">
                        <SkeletonLoader className="h-5 w-32 mb-1" />
                        <SkeletonLoader className="h-4 w-48" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Product not found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => navigate('/shop')} 
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              Continue Shopping
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                  src={product.images?.[selectedImage] || product.image}
                  alt={product.name}
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = fallbackImage;
                  }}
                />
              </div>
              {product.images && product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-24 h-24 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImage === index ? 'border-indigo-500 shadow-lg scale-105' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} ${index + 1}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = fallbackThumbnail;
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-semibold mb-3">
                  {product.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-3 dark:text-white">{product.name}</h1>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                      />
                    ))}
                    <span className="ml-2 font-semibold dark:text-gray-300">{product.rating}</span>
                  </div>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-600 dark:text-gray-400">{product.reviews} customer reviews</span>
                </div>
              </div>

              <div className="mb-6">
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-2xl mr-3">₹{formatPrice(product.originalPrice)}</span>
                )}
                <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">₹{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="ml-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                    Save ₹{formatPrice(product.originalPrice - product.price)}
                  </span>
                )}
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Sizes if available */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3">Size:</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm font-semibold hover:border-indigo-500 hover:text-indigo-600 transition-all"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors if available */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3">Color:</label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm font-semibold hover:border-indigo-500 hover:text-indigo-600 transition-all"
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3">Quantity:</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <FiMinus />
                    </button>
                    <span className="text-xl font-semibold w-12 text-center dark:text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(product, quantity)}
                  disabled={!product.inStock}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-lg hover:shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiShoppingCart /> Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToWishlist(product)}
                  className={`px-8 py-3 rounded-xl border-2 transition-all duration-300 flex items-center gap-2 ${
                    isInWishlist(product.id)
                      ? 'bg-red-500 text-white border-red-500'
                      : 'border-gray-300 dark:border-gray-700 hover:border-red-500 hover:text-red-500 dark:text-gray-300'
                  }`}
                >
                  <FiHeart className={`text-xl ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  Wishlist
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleShare}
                  className="px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:border-indigo-500 hover:text-indigo-500 transition-all duration-300 dark:text-gray-300"
                >
                  <FiShare2 className="text-xl" />
                </motion.button>
              </div>

              {/* Features */}
              <div className="border-t dark:border-gray-700 pt-6 space-y-4">
                <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <FiTruck className="text-2xl text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <p className="font-semibold dark:text-white">Free Shipping</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">On orders over ₹5000</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <FiRefreshCw className="text-2xl text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <p className="font-semibold dark:text-white">30-Day Returns</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Money-back guarantee</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <FiShield className="text-2xl text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <p className="font-semibold dark:text-white">Secure Payment</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">100% secure transactions</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <ProductReviews productId={product.id} productName={product.name} />
        </div>

        {/* Q&A Section - ADDED HERE */}
        <div className="mt-8">
          <ProductQnA productId={product.id} productName={product.name} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;