import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import { SettingsProvider } from './context/SettingsContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ReviewProvider } from './context/ReviewContext';
import { QnAProvider } from './context/QnAContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Breadcrumbs from './components/common/Breadcrumbs';
import RecentlyViewed from './components/RecentlyViewed';
import AdminRoute from './components/AdminRoute';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

// Google Analytics
const GA_MEASUREMENT_ID = 'G-0VP874DZV5';

// Lazy load pages for better performance - code splitting
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));
const Orders = lazy(() => import('./pages/Orders'));
const OrderTracking = lazy(() => import('./pages/OrderTracking'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminProducts = lazy(() => import('./pages/AdminProducts'));
const AdminOrders = lazy(() => import('./pages/AdminOrders'));
const AdminUsers = lazy(() => import('./pages/AdminUsers'));
const AdminSettings = lazy(() => import('./pages/AdminSettings'));
const AdminSubscribers = lazy(() => import('./pages/AdminSubscribers'));

// Analytics component to track page views
const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view with Google Analytics
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
    // Also log to console for debugging
    console.log(`Page viewed: ${location.pathname}`);
  }, [location]);

  return null;
};

// This component has access to theme because it's inside ThemeProvider
const AppContent = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Analytics />
      <Navbar />
      <main className="flex-grow">
        <Breadcrumbs />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/track-order" element={<OrderTracking />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/products" element={
              <AdminRoute>
                <AdminProducts />
              </AdminRoute>
            } />
            <Route path="/admin/orders" element={
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            } />
            <Route path="/admin/users" element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            } />
            <Route path="/admin/settings" element={
              <AdminRoute>
                <AdminSettings />
              </AdminRoute>
            } />
            <Route path="/admin/subscribers" element={
              <AdminRoute>
                <AdminSubscribers />
              </AdminRoute>
            } />
          </Routes>
        </Suspense>
      </main>
      <RecentlyViewed />
      <Footer />
      <BackToTop />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: darkMode ? '#1f2937' : '#fff',
            color: darkMode ? '#fff' : '#1f2937',
          },
        }}
      />
    </div>
  );
};

// Main App component - providers wrap AppContent
function App() {
  return (
    <HelmetProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ThemeProvider>
          <SettingsProvider>
            <AuthProvider>
              <StoreProvider>
                <CartProvider>
                  <ReviewProvider>
                    <QnAProvider>
                      <RecentlyViewedProvider>
                        <SubscriptionProvider>
                          <WishlistProvider>
                            <ErrorBoundary>
                              <AppContent />
                            </ErrorBoundary>
                          </WishlistProvider>
                        </SubscriptionProvider>
                      </RecentlyViewedProvider>
                    </QnAProvider>
                  </ReviewProvider>
                </CartProvider>
              </StoreProvider>
            </AuthProvider>
          </SettingsProvider>
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;