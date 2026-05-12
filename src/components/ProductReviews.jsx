import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiThumbsUp, FiUser, FiClock } from 'react-icons/fi';
import ReviewForm from './ReviewForm';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewContext';

const ProductReviews = ({ productId, productName }) => {
  const { isAuthenticated } = useAuth();
  const { getProductReviews, getAverageRating, markHelpful, deleteReview } = useReviews();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');

  const productReviews = getProductReviews(productId);
  const averageRating = getAverageRating(productId);

  const filteredReviews = filter === 'all' 
    ? productReviews 
    : productReviews.filter(review => review.rating === parseInt(filter));

  const getRatingStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            size={14}
            className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-12">
      {/* Reviews Header */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold dark:text-white">Customer Reviews</h3>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              {getRatingStars(Math.round(averageRating))}
            </div>
            <span className="text-2xl font-bold text-indigo-600">{averageRating.toFixed(1)}</span>
            <span className="text-gray-500">out of 5</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600 dark:text-gray-400">{productReviews.length} reviews</span>
          </div>
        </div>
        {isAuthenticated && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all cursor-pointer"
          >
            {showForm ? 'Cancel' : 'Write a Review'}
          </button>
        )}
      </div>

      {/* Review Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <ReviewForm
              productId={productId}
              productName={productName}
              onClose={() => setShowForm(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rating Filters */}
      {productReviews.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All ({productReviews.length})
          </button>
          {[5, 4, 3, 2, 1].map(rating => {
            const count = productReviews.filter(r => r.rating === rating).length;
            if (count === 0) return null;
            return (
              <button
                key={rating}
                onClick={() => setFilter(rating.toString())}
                className={`px-3 py-1 rounded-full text-sm transition-all flex items-center gap-1 cursor-pointer ${
                  filter === rating.toString()
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {rating}★ ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <div className="text-5xl mb-3">📝</div>
          <h3 className="text-lg font-semibold mb-2 dark:text-white">No reviews yet</h3>
          <p className="text-gray-500 dark:text-gray-400">Be the first to review this product!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5"
            >
              <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <FiUser className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold dark:text-white">{review.userName}</p>
                    <div className="flex items-center gap-2">
                      {getRatingStars(review.rating)}
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <FiClock size={10} /> {review.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-3">{review.comment}</p>
              <button
                onClick={() => markHelpful(productId, review.id)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                <FiThumbsUp /> Helpful ({review.helpful || 0})
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;