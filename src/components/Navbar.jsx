import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';
import { FiShoppingCart, FiHeart, FiSearch, FiMenu, FiX, FiUser, FiLogOut, FiSettings, FiShield, FiSun, FiMoon } from 'react-icons/fi';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { getCartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  // Check if user is admin
  const isAdmin = user?.role === 'super_admin' || user?.role === 'admin';

  return (
    <>
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-all duration-300 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Dynamic from settings */}
            <Link to="/" className="flex items-center gap-2 group">
              {settings.logoUrl && settings.logoUrl !== '/vite.svg' ? (
                <img src={settings.logoUrl} alt={settings.websiteName} className="h-8 w-auto object-contain" />
              ) : (
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  {settings.websiteName || 'The Number'}
                </span>
              )}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link 
                to="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                Shop
              </Link>
              {isAdmin && (
                <Link 
                  to="/admin/dashboard" 
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 flex items-center gap-1"
                >
                  <FiShield className="text-sm" />
                  Admin
                </Link>
              )}
            </div>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-all duration-300 group-hover:shadow-md"
                />
                <button type="submit" className="absolute right-3 top-2.5">
                  <FiSearch className="text-gray-400 hover:text-indigo-500 transition-colors" />
                </button>
              </div>
            </form>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle Button - Only in navbar */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
              </button>

              <Link to="/wishlist" className="relative group">
                <FiHeart className="text-2xl text-gray-700 dark:text-gray-300 group-hover:text-red-500 transition-colors duration-300" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              
              <button onClick={() => setIsDrawerOpen(true)} className="relative group">
                <FiShoppingCart className="text-2xl text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors duration-300" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition-colors"
                >
                  <FiUser className="text-2xl" />
                </button>
                
                {isDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-2 z-50 border border-gray-200 dark:border-gray-700 overflow-hidden">
                      {isAuthenticated && user ? (
                        <>
                          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
                            <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                            {isAdmin && (
                              <span className="inline-block mt-1 text-xs bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-2 py-0.5 rounded-full">
                                Administrator
                              </span>
                            )}
                          </div>
                          {isAdmin && (
                            <>
                              <Link
                                to="/admin/dashboard"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors"
                                onClick={() => setIsDropdownOpen(false)}
                              >
                                <FiShield /> Admin Dashboard
                              </Link>
                              <Link
                                to="/admin/settings"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors"
                                onClick={() => setIsDropdownOpen(false)}
                              >
                                <FiSettings /> Website Settings
                              </Link>
                            </>
                          )}
                          <Link
                            to="/profile"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <FiUser /> My Profile
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 text-red-500 transition-colors"
                          >
                            <FiLogOut /> Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Customer Login / Register
                          </Link>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-700 dark:text-gray-300"
              >
                {isMobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
              </button>
            </div>
          </div>

          {/* Mobile menu - REMOVED duplicate dark mode toggle */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                  />
                  <button type="submit" className="absolute right-3 top-2.5">
                    <FiSearch className="text-gray-400" />
                  </button>
                </div>
              </form>
              
              {/* Dark mode toggle REMOVED from mobile menu - only in navbar now */}
              
              <Link
                to="/"
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              {isAdmin && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FiShield /> Admin Panel
                  </Link>
                  <Link
                    to="/admin/settings"
                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FiSettings /> Website Settings
                  </Link>
                </>
              )}
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Customer Login
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-red-500 hover:text-red-600 transition-colors flex items-center gap-2"
                >
                  <FiLogOut /> Logout
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      <CartDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default Navbar;