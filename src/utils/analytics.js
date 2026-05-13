// Google Analytics Event Tracking

// Track page view
export const trackPageView = (pagePath, pageTitle) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', 'G-0VP874DZV5', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

// Track general events
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
    console.log(`📊 Event tracked: ${eventName}`, eventParams);
  }
};

// Track Add to Cart
export const trackAddToCart = (product, quantity = 1) => {
  trackEvent('add_to_cart', {
    currency: 'INR',
    value: product.price * quantity,
    items: [{
      item_id: product.id.toString(),
      item_name: product.name,
      price: product.price,
      quantity: quantity,
      item_category: product.category,
      item_brand: product.brand || 'The Number',
    }]
  });
};

// Track Remove from Cart
export const trackRemoveFromCart = (product, quantity = 1) => {
  trackEvent('remove_from_cart', {
    currency: 'INR',
    value: product.price * quantity,
    items: [{
      item_id: product.id.toString(),
      item_name: product.name,
      price: product.price,
      quantity: quantity,
      item_category: product.category,
    }]
  });
};

// Track Product View
export const trackProductView = (product) => {
  trackEvent('view_item', {
    currency: 'INR',
    value: product.price,
    items: [{
      item_id: product.id.toString(),
      item_name: product.name,
      price: product.price,
      item_category: product.category,
      item_brand: product.brand || 'The Number',
    }]
  });
};

// Track Begin Checkout
export const trackBeginCheckout = (cartItems, total) => {
  trackEvent('begin_checkout', {
    currency: 'INR',
    value: total,
    items: cartItems.map(item => ({
      item_id: item.id.toString(),
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
      item_category: item.category,
    }))
  });
};

// Track Purchase (E-commerce)
export const trackPurchase = (order) => {
  trackEvent('purchase', {
    transaction_id: order.id,
    currency: 'INR',
    value: order.total,
    tax: order.tax,
    shipping: order.shipping,
    items: order.items.map(item => ({
      item_id: item.id.toString(),
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
      item_category: item.category,
    }))
  });
};

// Track Search
export const trackSearch = (searchQuery, resultsCount) => {
  trackEvent('search', {
    search_term: searchQuery,
    results_count: resultsCount,
  });
};

// Track Add to Wishlist
export const trackAddToWishlist = (product) => {
  trackEvent('add_to_wishlist', {
    currency: 'INR',
    value: product.price,
    items: [{
      item_id: product.id.toString(),
      item_name: product.name,
      price: product.price,
      item_category: product.category,
    }]
  });
};

// Track Remove from Wishlist
export const trackRemoveFromWishlist = (product) => {
  trackEvent('remove_from_wishlist', {
    items: [{
      item_id: product.id.toString(),
      item_name: product.name,
    }]
  });
};

// Track Login
export const trackLogin = (method = 'email') => {
  trackEvent('login', { method });
};

// Track Sign Up
export const trackSignUp = (method = 'email') => {
  trackEvent('sign_up', { method });
};