import React, { useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewContext';
import toast from 'react-hot-toast';

const ReviewForm = ({ productId, productName, onClose }) => {
  const { user } = useAuth();
  const { addReview } = useReviews();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      toast.error('Please write a review');
      return;
    }

    setIsSubmitting(true);
    
    addReview(productId, {
      userName: user?.name || 'Anonymous User',
      userEmail: user?.email || 'guest@example.com',
      rating: rating,
      comment: comment.trim()
    });
    
    setRating(5);
    setComment('');
    onClose();
    setIsSubmitting(false);
    toast.success('Review submitted!');
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 border dark:border-gray-600">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold dark:text-white">Write a Review for {productName}</h4>
        <button 
          type="button"
          onClick={onClose} 
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-gray-500 dark:text-gray-400"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Rating Stars */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 dark:text-white">Your Rating *</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none cursor-pointer"
              >
                <FiStar
                  size={28}
                  className={`transition-all ${
                    star <= rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {rating === 5 ? 'Excellent!' : rating === 4 ? 'Very Good' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
            </span>
          </div>
        </div>

        {/* Review Comment */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 dark:text-white">Your Review *</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            placeholder="Share your experience with this product..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-white resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;