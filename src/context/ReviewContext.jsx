import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ReviewContext = createContext();

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within ReviewProvider');
  }
  return context;
};

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState({});

  // Load reviews from localStorage
  useEffect(() => {
    const savedReviews = localStorage.getItem('productReviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  // Save reviews to localStorage
  const saveReviews = (newReviews) => {
    setReviews(newReviews);
    localStorage.setItem('productReviews', JSON.stringify(newReviews));
  };

  // Get reviews for a specific product
  const getProductReviews = (productId) => {
    return reviews[productId] || [];
  };

  // Get average rating for a product
  const getAverageRating = (productId) => {
    const productReviews = reviews[productId] || [];
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / productReviews.length;
  };

  // Add a new review
  const addReview = (productId, review) => {
    const currentReviews = reviews[productId] || [];
    const newReview = {
      id: Date.now(),
      ...review,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    };
    const updatedReviews = {
      ...reviews,
      [productId]: [newReview, ...currentReviews]
    };
    saveReviews(updatedReviews);
    toast.success('Review added successfully!');
  };

  // Mark review as helpful
  const markHelpful = (productId, reviewId) => {
    const productReviews = reviews[productId] || [];
    const updatedProductReviews = productReviews.map(review =>
      review.id === reviewId ? { ...review, helpful: (review.helpful || 0) + 1 } : review
    );
    const updatedReviews = { ...reviews, [productId]: updatedProductReviews };
    saveReviews(updatedReviews);
  };

  // Delete a review (admin only)
  const deleteReview = (productId, reviewId) => {
    const productReviews = reviews[productId] || [];
    const updatedProductReviews = productReviews.filter(review => review.id !== reviewId);
    const updatedReviews = { ...reviews, [productId]: updatedProductReviews };
    saveReviews(updatedReviews);
    toast.success('Review deleted');
  };

  return (
    <ReviewContext.Provider value={{
      reviews,
      getProductReviews,
      getAverageRating,
      addReview,
      markHelpful,
      deleteReview
    }}>
      {children}
    </ReviewContext.Provider>
  );
};