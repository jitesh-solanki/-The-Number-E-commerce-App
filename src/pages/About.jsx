import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiTruck, FiShield, FiAward, FiUsers, FiGlobe } from 'react-icons/fi';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            About The Number
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Founded in 2024, The Number began with a simple vision: to bring premium, 
              stylish, and high-quality products to fashion enthusiasts around the world. 
              What started as a small online boutique has grown into a destination for 
              those who appreciate the finer things in life.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Today, we curate collections from emerging designers and established brands, 
              ensuring every piece meets our exacting standards for quality, style, and 
              sustainability. Our commitment to exceptional customer service and unique 
              product selection sets us apart.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              whileHover={{ y: -5 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeart className="text-2xl text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Passion for Quality</h3>
              <p className="text-gray-600 dark:text-gray-400">We're passionate about curating only the finest products for our customers.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-2xl text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer First</h3>
              <p className="text-gray-600 dark:text-gray-400">Your satisfaction is our top priority, and we're here for you every step of the way.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiGlobe className="text-2xl text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600 dark:text-gray-400">We're committed to ethical sourcing and reducing our environmental impact.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="text-center">
            <FiTruck className="text-3xl text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold">Free Shipping</h3>
            <p className="text-sm text-gray-500">On orders $50+</p>
          </div>
          <div className="text-center">
            <FiShield className="text-3xl text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold">Secure Payment</h3>
            <p className="text-sm text-gray-500">100% protected</p>
          </div>
          <div className="text-center">
            <FiAward className="text-3xl text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold">Premium Quality</h3>
            <p className="text-sm text-gray-500">Curated selection</p>
          </div>
          <div className="text-center">
            <FiHeart className="text-3xl text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold">Easy Returns</h3>
            <p className="text-sm text-gray-500">30-day guarantee</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;