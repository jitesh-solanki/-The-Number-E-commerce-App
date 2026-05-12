import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  // Don't show on home page
  if (location.pathname === '/') {
    return null;
  }

  // Build breadcrumb items
  const getBreadcrumbs = () => {
    const items = [];
    
    // Always add Shop for product pages
    if (location.pathname.includes('/product')) {
      items.push({ name: 'Shop', path: '/shop' });
      items.push({ name: 'Product Details', path: null });
    }
    // For shop page
    else if (location.pathname === '/shop') {
      items.push({ name: 'Shop', path: null });
    }
    // For other pages
    else {
      pathnames.forEach((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        const displayNames = {
          'shop': 'Shop',
          'cart': 'Cart',
          'wishlist': 'Wishlist',
          'profile': 'My Profile',
          'about': 'About Us',
          'contact': 'Contact',
          'terms': 'Terms of Service',
          'privacy': 'Privacy Policy',
          'login': 'Login',
          'register': 'Register',
          'checkout': 'Checkout',
          'track-order': 'Track Order',
        };
        
        const displayName = displayNames[name] || name.charAt(0).toUpperCase() + name.slice(1);
        
        if (!isLast) {
          items.push({ name: displayName, path: routeTo });
        } else {
          items.push({ name: displayName, path: null });
        }
      });
    }
    
    return items;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="container mx-auto px-4 py-3 mb-4">
      <div className="flex items-center gap-2 text-sm flex-wrap">
        {/* Home Link */}
        <Link 
          to="/" 
          className="flex items-center gap-1 text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <FiHome size={14} />
          <span>Home</span>
        </Link>

        {/* Breadcrumb Items */}
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            <FiChevronRight size={12} className="text-gray-400" />
            {item.path ? (
              <Link 
                to={item.path}
                className="text-gray-500 hover:text-indigo-600 transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                {item.name}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumbs;