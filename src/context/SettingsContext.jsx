import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    websiteName: 'The Number',
    logo: null,
    logoUrl: '/vite.svg',
    favicon: '/vite.svg',
    primaryColor: '#6366f1',
    secondaryColor: '#7c3aed',
    accentColor: '#ec4899',
    contactEmail: 'hello@thenumber.com',
    contactPhone: '+1 (555) 123-4567',
    contactAddress: '123 Luxury Street, NY 10001',
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: ''
    },
    currency: 'USD',
    currencySymbol: '$'
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('websiteSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  };

  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('websiteSettings', JSON.stringify(updated));
    toast.success('Website settings updated!');
    
    // Update CSS variables
    document.documentElement.style.setProperty('--primary-color', updated.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', updated.secondaryColor);
  };

  const updateLogo = (logoFile) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      updateSettings({ logoUrl: reader.result });
    };
    reader.readAsDataURL(logoFile);
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      updateSettings,
      updateLogo,
      websiteName: settings.websiteName,
      logoUrl: settings.logoUrl,
      primaryColor: settings.primaryColor
    }}>
      {children}
    </SettingsContext.Provider>
  );
};