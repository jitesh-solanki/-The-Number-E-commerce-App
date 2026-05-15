import React, { useState } from 'react';
import { loadRazorpayScript, openRazorpayPayment } from '../utils/razorpay';
import { FiCreditCard } from 'react-icons/fi';
import toast from 'react-hot-toast';

const RazorpayButton = ({ orderDetails, onPaymentSuccess, amount, disabled }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Load Razorpay script
    const isScriptLoaded = await loadRazorpayScript();
    
    if (!isScriptLoaded) {
      toast.error('Payment gateway failed to load. Please try again.');
      setIsProcessing(false);
      return;
    }
    
    // Open Razorpay payment modal
    openRazorpayPayment(
      orderDetails,
      (response) => {
        toast.success('Payment successful!');
        onPaymentSuccess(response);
        setIsProcessing(false);
      },
      (error) => {
        toast.error(error || 'Payment failed. Please try again.');
        setIsProcessing(false);
      }
    );
  };

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || isProcessing}
      className="w-full mt-6 py-4 text-lg bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      <FiCreditCard className="text-xl" />
      {isProcessing ? 'Processing...' : `Pay ₹${amount} via Razorpay`}
    </button>
  );
};

export default RazorpayButton;