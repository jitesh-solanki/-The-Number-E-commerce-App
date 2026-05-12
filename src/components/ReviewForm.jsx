import React, { useState, useCallback, memo } from 'react';
import { FiStar } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewContext';
import toast from 'react-hot-toast';

const ReviewForm = memo(({ productId, productName, onClose }) => {
  const { user } = useAuth();
  const { addReview } = useReviews();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoized rating message
  const getRatingMessage = useCallback(() => {
    switch(rating) {
      case 5: return 'Excellent!';
      case 4: return 'Very Good';
      case 3: return 'Good';
      case 2: return 'Fair';
      default: return 'Poor';
    }
  }, [rating]);

  // Handle rating change
  const handleRatingChange = useCallback((star) => {
    setRating(star);
  }, []);

  // Handle comment change
  const handleCommentChange = useCallback((e) => {
    setComment(e.target.value);
  }, []);

  // Handle form submission
  const handleSubmit = useCallback((e) => {
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
  }, [comment, rating, user, addReview, productId, onClose]);

  // Memoized stars to prevent re-renders
  const stars = useCallback(() => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => handleRatingChange(star)}
        className="focus:outline-none cursor-pointer hover:scale-110 transition-transform"
        aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
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
    ));
  }, [rating, handleRatingChange]);

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 border dark:border-gray-600">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold dark:text-white">Write a Review for {productName}</h4>
        <button 
          type="button"
          onClick={onClose} 
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-gray-500 dark:text-gray-400 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Rating Stars */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 dark:text-white">Your Rating *</label>
          <div className="flex items-center gap-2 flex-wrap">
            {stars()}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {getRatingMessage()}
            </span>
          </div>
        </div>

        {/* Review Comment */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 dark:text-white">Your Review *</label>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            rows="4"
            placeholder="Share your experience with this product..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:bg-gray-800 dark:text-white resize-none transition-all"
            required
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Minimum 10 characters
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all disabled:opacity-50 cursor-pointer"
            aria-label="Submit review"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Review'
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-all cursor-pointer"
            aria-label="Cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
});

ReviewForm.displayName = 'ReviewForm';

export default ReviewForm;