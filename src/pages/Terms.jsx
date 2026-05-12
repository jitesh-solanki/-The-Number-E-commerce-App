import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Last updated: December 2024</p>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-600 dark:text-gray-400">By accessing and using The Number website, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Products and Pricing</h2>
              <p className="text-gray-600 dark:text-gray-400">We strive to display accurate product information and pricing. However, errors may occur. We reserve the right to correct any errors and cancel orders if necessary.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Orders and Payment</h2>
              <p className="text-gray-600 dark:text-gray-400">All orders are subject to acceptance and availability. We accept major credit cards and secure payment methods. You agree to provide accurate payment information.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Shipping and Delivery</h2>
              <p className="text-gray-600 dark:text-gray-400">Shipping times are estimates and may vary. We are not responsible for delays caused by carriers or customs. Risk of loss passes to you upon delivery.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Returns and Refunds</h2>
              <p className="text-gray-600 dark:text-gray-400">We accept returns within 30 days of delivery. Items must be unused and in original condition. Refunds will be processed to the original payment method.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. User Accounts</h2>
              <p className="text-gray-600 dark:text-gray-400">You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately of any unauthorized use.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Intellectual Property</h2>
              <p className="text-gray-600 dark:text-gray-400">All content on this site is our property and protected by copyright laws. You may not reproduce or distribute without permission.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Limitation of Liability</h2>
              <p className="text-gray-600 dark:text-gray-400">The Number is not liable for indirect, incidental, or consequential damages arising from use of our products or services.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Modifications</h2>
              <p className="text-gray-600 dark:text-gray-400">We reserve the right to modify these terms at any time. Continued use constitutes acceptance of updated terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-400">Questions about these Terms? Contact us at legal@thenumber.com</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;