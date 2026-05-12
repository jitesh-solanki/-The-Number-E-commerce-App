import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import { SettingsProvider } from './context/SettingsContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ReviewProvider } from './context/ReviewContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Breadcrumbs from './components/common/Breadcrumbs';
import RecentlyViewed from './components/RecentlyViewed';
import AdminRoute from './components/AdminRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import OrderTracking from './pages/OrderTracking';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminUsers from './pages/AdminUsers';
import AdminSettings from './pages/AdminSettings';
import AdminSubscribers from './pages/AdminSubscribers';

// This component has access to theme because it's inside ThemeProvider
const AppContent = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Breadcrumbs />
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
                    <RecentlyViewedProvider>
                      <SubscriptionProvider>
                        <WishlistProvider>
                          <ErrorBoundary>
                            <AppContent />
                          </ErrorBoundary>
                        </WishlistProvider>
                      </SubscriptionProvider>
                    </RecentlyViewedProvider>
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