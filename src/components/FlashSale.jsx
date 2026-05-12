import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { FiClock } from 'react-icons/fi';

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  const saleProducts = products.slice(0, 4).map(p => ({
    ...p,
    flashPrice: (p.price * 0.6).toFixed(2)
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 dark:from-red-900 dark:via-red-800 dark:to-orange-900">
      <div className="container mx-auto px-4">
        <div className="text-center text-white mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-4"
          >
            🔥 FLASH SALE - The Number Exclusive 🔥
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Limited Time Offer</h2>
          <p className="text-xl opacity-90">Up to 40% OFF on selected items</p>
          
          <div className="flex justify-center gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[80px]">
              <div className="text-3xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-sm">Hours</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[80px]">
              <div className="text-3xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-sm">Minutes</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[80px]">
              <div className="text-3xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-sm">Seconds</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  -40%
                </div>
                <div className="absolute bottom-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-red-600 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  FLASH SALE
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 dark:text-white line-clamp-1">{product.name}</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-bold text-red-500 dark:text-red-400">${product.flashPrice}</span>
                  <span className="text-gray-400 line-through">${product.price}</span>
                </div>
                <Link 
                  to={`/product/${product.id}`} 
                  className="block w-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-center py-2 rounded-xl font-semibold hover:shadow-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;