import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin, FiHeart, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  const { settings } = useSettings();
  const currentYear = new Date().getFullYear();

  // Social links mapping
  const socialLinks = [
    { name: 'Facebook', icon: FiFacebook, url: settings.socialLinks?.facebook, color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: FiTwitter, url: settings.socialLinks?.twitter, color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: FiInstagram, url: settings.socialLinks?.instagram, color: 'hover:text-pink-500' },
    { name: 'YouTube', icon: FiYoutube, url: settings.socialLinks?.youtube, color: 'hover:text-red-600' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black dark:from-gray-950 dark:to-black text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About - Dynamic from settings */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {settings.websiteName || 'The Number'}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Your ultimate shopping destination for premium quality products at competitive prices. 
              Experience luxury shopping like never before.
            </p>
            <div className="flex mt-4 space-x-4">
              {socialLinks.map((social) => (
                social.url && (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${social.color} transition-colors`}
                  >
                    <social.icon className="text-xl" />
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - Dynamic from settings */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <FiMapPin className="text-indigo-400" />
                <span>{settings.contactAddress || '123 Luxury Street, NY 10001'}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FiPhone className="text-indigo-400" />
                <span>{settings.contactPhone || '+1 (555) 123-4567'}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FiMail className="text-indigo-400" />
                <span>{settings.contactEmail || 'hello@thenumber.com'}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to get special offers and updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-indigo-500"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-r-xl hover:from-indigo-600 hover:to-purple-700 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {currentYear} {settings.websiteName || 'The Number'}. All rights reserved. | Made with <FiHeart className="inline text-red-500" /> for premium shopping</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;