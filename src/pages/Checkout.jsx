import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FiArrowLeft, FiTruck, FiShield, FiCreditCard, FiMapPin, FiPhone, FiMail, FiUser, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { trackBeginCheckout, trackPurchase } from '../utils/analytics';
import RazorpayButton from '../components/RazorpayButton';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    cardNumber: '',
    expiry: '',
    cvv: '',
    saveInfo: false
  });

  useEffect(() => {
    // Pre-fill user data if logged in
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ')[1] || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  // Track begin checkout when cart items change
  useEffect(() => {
    if (cartItems.length > 0) {
      trackBeginCheckout(cartItems, getCartTotal());
    }
  }, [cartItems]);

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 5000 ? 0 : 500;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateOrderId = () => {
    const prefix = 'ORD';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  };

  const placeOrder = (paymentResponse = null) => {
    // Create order object
    const order = {
      id: generateOrderId(),
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      subtotal: subtotal,
      shipping: shipping,
      tax: tax,
      total: total,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      dateTime: new Date().toISOString(),
      paymentMethod: paymentMethod === 'razorpay' ? 'Razorpay' : 'Credit Card',
      paymentStatus: 'Paid',
      paymentId: paymentResponse?.paymentId || null
    };

    // Save order to localStorage
    const savedOrders = localStorage.getItem('shopOrders');
    let orders = savedOrders ? JSON.parse(savedOrders) : [];
    orders.unshift(order);
    localStorage.setItem('shopOrders', JSON.stringify(orders));

    // Track purchase in analytics
    trackPurchase(order);

    // Clear cart
    clearCart();

    // Save order ID for success page
    localStorage.setItem('lastOrderId', order.id);

    toast.success('Order placed successfully!');
    navigate('/order-success', { state: { order } });
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      placeOrder();
      setLoading(false);
    }, 2000);
  };

  const handleRazorpaySuccess = (paymentResponse) => {
    console.log('Payment success:', paymentResponse);
    placeOrder(paymentResponse);
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <Link to="/cart" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline mb-6">
          <FiArrowLeft /> Back to Cart
        </Link>
        
        <h1 className="text-4xl font-display font-bold mb-8 flex items-center gap-3 dark:text-white">
          <FiCreditCard className="text-indigo-600 dark:text-indigo-400" />
          Checkout
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleCardSubmit}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              {/* Shipping Information */}
              <div className="mb-6">
                <h2 className="text-2xl font-display font-bold mb-4 dark:text-white flex items-center gap-2">
                  <FiMapPin className="text-indigo-600" />
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pl-10 border dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Phone *</label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pl-10 border dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Address *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="col-span-2">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">State *</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">PIN Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="mb-6">
                <h2 className="text-2xl font-display font-bold mb-4 dark:text-white flex items-center gap-2">
                  <FiCreditCard className="text-indigo-600" />
                  Payment Method
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">💳</div>
                      <p className="font-semibold">Credit/Debit Card</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'razorpay'
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">🪙</div>
                      <p className="font-semibold">Razorpay</p>
                      <p className="text-xs text-gray-500">UPI, Cards, NetBanking</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Card Payment Section (only show when card is selected) */}
              {paymentMethod === 'card' && (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-display font-bold mb-4 dark:text-white flex items-center gap-2">
                      <FiCreditCard className="text-indigo-600" />
                      Card Information
                    </h2>
                    <div className="mb-4">
                      <label className="block text-gray-700 dark:text-gray-300 mb-2">Card Number *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        required={paymentMethod === 'card'}
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Expiry Date *</label>
                        <input
                          type="text"
                          name="expiry"
                          required={paymentMethod === 'card'}
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">CVV *</label>
                        <input
                          type="password"
                          name="cvv"
                          required={paymentMethod === 'card'}
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Info Checkbox */}
                  <div className="mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={(e) => setFormData({...formData, saveInfo: e.target.checked})}
                        className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">Save this information for next time</span>
                    </label>
                  </div>
                </>
              )}
            </motion.form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24"
            >
              <h2 className="text-2xl font-display font-bold mb-4 dark:text-white">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="dark:text-gray-300">
                      {item.name} 
                      <span className="text-gray-500"> x{item.quantity}</span>
                    </span>
                    <span className="font-semibold dark:text-white">₹{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              {/* Order Totals */}
              <div className="border-t dark:border-gray-700 pt-3 space-y-2">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${formatPrice(shipping)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (10%)</span>
                  <span>₹{formatPrice(tax)}</span>
                </div>
                <div className="border-t dark:border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between text-2xl font-bold">
                    <span className="dark:text-white">Total</span>
                    <span className="text-indigo-600 dark:text-indigo-400">₹{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              
              {/* Free Shipping Progress */}
              {shipping > 0 && (
                <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl p-3">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Add ₹{formatPrice(5000 - subtotal)} more to get free shipping!
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all" 
                      style={{ width: `${Math.min((subtotal / 5000) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
              
              {/* Place Order Button - Conditional based on payment method */}
              {paymentMethod === 'razorpay' ? (
                <RazorpayButton
                  orderDetails={{
                    amount: Math.round(total * 100),
                    orderId: generateOrderId(),
                    customerName: `${formData.firstName} ${formData.lastName}`,
                    customerEmail: formData.email,
                    customerPhone: formData.phone,
                    shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`
                  }}
                  onPaymentSuccess={handleRazorpaySuccess}
                  amount={total}
                  disabled={loading}
                />
              ) : (
                <button
                  onClick={handleCardSubmit}
                  disabled={loading}
                  className="w-full mt-6 py-4 text-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiCheckCircle /> Place Order • ₹{formatPrice(total)}
                    </>
                  )}
                </button>
              )}
              
              {/* Security Badges */}
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><FiShield /> Secure Payment</span>
                <span className="flex items-center gap-1"><FiTruck /> Free Shipping on ₹5000+</span>
              </div>
              
              <p className="text-center text-xs text-gray-400 mt-3">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;