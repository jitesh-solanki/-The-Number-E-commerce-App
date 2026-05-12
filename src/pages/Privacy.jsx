import React from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Last updated: December 2024</p>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
              <p className="text-gray-600 dark:text-gray-400">We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This may include your name, email, address, and payment information.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
              <p className="text-gray-600 dark:text-gray-400">We use your information to process orders, communicate with you, improve our services, and personalize your experience. We do not sell your personal information to third parties.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Cookies and Tracking</h2>
              <p className="text-gray-600 dark:text-gray-400">We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Data Security</h2>
              <p className="text-gray-600 dark:text-gray-400">We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Third-Party Services</h2>
              <p className="text-gray-600 dark:text-gray-400">We may use third-party services for payment processing, shipping, and analytics. These services have their own privacy policies.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
              <p className="text-gray-600 dark:text-gray-400">You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Children's Privacy</h2>
              <p className="text-gray-600 dark:text-gray-400">Our services are not intended for children under 13. We do not knowingly collect information from children.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Changes to This Policy</h2>
              <p className="text-gray-600 dark:text-gray-400">We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-400">If you have questions about this Privacy Policy, please contact us at privacy@thenumber.com</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;