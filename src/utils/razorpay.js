// Razorpay integration utility
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) {
      resolve(true);
      return;
    }
    
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const openRazorpayPayment = async (orderDetails, onSuccess, onError) => {
  const options = {
    key: 'rzp_test_SpVYZHz0UCJmGD',
    amount: orderDetails.amount,
    currency: 'INR',
    name: 'The Number',
    description: `Order ${orderDetails.orderId}`,
    image: '/vite.svg',
    order_id: orderDetails.razorpayOrderId,
    handler: function (response) {
      onSuccess({
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
        signature: response.razorpay_signature
      });
    },
    prefill: {
      name: orderDetails.customerName,
      email: orderDetails.customerEmail,
      contact: orderDetails.customerPhone
    },
    notes: {
      address: orderDetails.shippingAddress
    },
    theme: {
      color: '#6366f1'
    },
    modal: {
      ondismiss: function() {
        onError('Payment cancelled by user');
      }
    }
  };
  
  const razorpay = new window.Razorpay(options);
  razorpay.open();
};