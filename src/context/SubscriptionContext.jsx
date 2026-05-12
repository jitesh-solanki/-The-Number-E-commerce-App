import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const SubscriptionContext = createContext();

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider = ({ children }) => {
  const [subscribers, setSubscribers] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Load subscribers from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('subscribers');
    if (saved) {
      setSubscribers(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  // Check if email already subscribed
  const checkSubscription = (email) => {
    return subscribers.some(sub => sub.email === email);
  };

  // Add new subscriber
  const addSubscriber = (email, name = '') => {
    if (!email) {
      toast.error('Please enter a valid email');
      return false;
    }

    if (checkSubscription(email)) {
      toast.error('This email is already subscribed!');
      return false;
    }

    const newSubscriber = {
      id: Date.now(),
      email,
      name: name || email.split('@')[0],
      subscribedAt: new Date().toISOString(),
      status: 'active'
    };

    setSubscribers(prev => [newSubscriber, ...prev]);
    toast.success('Successfully subscribed! 🎉');
    return true;
  };

  // Remove subscriber
  const removeSubscriber = (email) => {
    setSubscribers(prev => prev.filter(sub => sub.email !== email));
    toast.success('Unsubscribed successfully');
  };

  // Get total subscribers count
  const getSubscriberCount = () => {
    return subscribers.length;
  };

  return (
    <SubscriptionContext.Provider value={{
      subscribers,
      isSubscribed,
      addSubscriber,
      removeSubscriber,
      checkSubscription,
      getSubscriberCount
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};