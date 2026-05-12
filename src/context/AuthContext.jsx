import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for admin user
    const storedAdmin = localStorage.getItem('adminUser');
    const adminToken = localStorage.getItem('adminToken');
    
    // Check for customer user (from your Login.jsx)
    const storedCustomer = localStorage.getItem('user');
    
    if (storedAdmin && adminToken) {
      setUser(JSON.parse(storedAdmin));
      setIsAuthenticated(true);
    } else if (storedCustomer) {
      setUser(JSON.parse(storedCustomer));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Admin credentials
  const adminCredentials = {
    email: 'admin@thenumber.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'super_admin'
  };

  const login = async (email, password) => {
    // Check for admin first
    if (email === adminCredentials.email && password === adminCredentials.password) {
      const userData = {
        email: adminCredentials.email,
        name: adminCredentials.name,
        role: adminCredentials.role
      };
      const token = 'admin_' + Date.now() + '_token';
      
      localStorage.setItem('adminUser', JSON.stringify(userData));
      localStorage.setItem('adminToken', token);
      setUser(userData);
      setIsAuthenticated(true);
      toast.success('Welcome back, Admin!');
      return true;
    }
    
    // Check if customer data is already in localStorage (from your Login.jsx)
    const existingCustomer = localStorage.getItem('user');
    if (existingCustomer) {
      const customerData = JSON.parse(existingCustomer);
      setUser(customerData);
      setIsAuthenticated(true);
      toast.success(`Welcome back, ${customerData.name}!`);
      return true;
    }
    
    toast.error('Invalid credentials');
    return false;
  };

  const logout = () => {
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('user'); // Remove customer user
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  // Check if user is admin
  const isAdmin = user?.role === 'super_admin' || user?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isAdmin,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};