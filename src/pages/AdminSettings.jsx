import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import { FiUpload, FiSave, FiGlobe, FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const { settings, updateSettings, updateLogo } = useSettings();
  const [previewLogo, setPreviewLogo] = useState(settings.logoUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogo(reader.result);
        updateLogo(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Settings saved successfully!');
    }, 500);
  };

  const resetToDefault = () => {
    if (window.confirm('Reset all settings to default?')) {
      const defaultSettings = {
        websiteName: 'The Number',
        logoUrl: '/vite.svg',
        primaryColor: '#6366f1',
        secondaryColor: '#7c3aed',
        accentColor: '#ec4899',
        contactEmail: 'hello@thenumber.com',
        contactPhone: '+1 (555) 123-4567',
        contactAddress: '123 Luxury Street, NY 10001',
        socialLinks: { facebook: '', instagram: '', twitter: '', youtube: '' }
      };
      updateSettings(defaultSettings);
      setPreviewLogo('/vite.svg');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Website Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your store branding and information</p>
        </div>
        <button
          onClick={resetToDefault}
          className="px-4 py-2 border border-yellow-500 text-yellow-600 rounded-xl flex items-center gap-2 hover:bg-yellow-50 transition"
        >
          <FiRefreshCw /> Reset to Default
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Branding Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
              <FiGlobe /> Branding
            </h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Website Logo</label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center overflow-hidden">
                  <img src={previewLogo} alt="Logo" className="max-w-full max-h-full object-contain" />
                </div>
                <label className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition flex items-center gap-2">
                  <FiUpload /> Upload Logo
                  <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2">Recommended size: 200x200px. PNG or JPG.</p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Website Name</label>
              <input
                type="text"
                value={settings.websiteName}
                onChange={(e) => updateSettings({ websiteName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
              <p className="text-xs text-gray-500 mt-1">Preview: <span className="font-bold" style={{ color: settings.primaryColor }}>{settings.websiteName}</span></p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Primary Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => updateSettings({ primaryColor: e.target.value })}
                    className="w-12 h-10 rounded border cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.primaryColor}
                    onChange={(e) => updateSettings({ primaryColor: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Secondary Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.secondaryColor}
                    onChange={(e) => updateSettings({ secondaryColor: e.target.value })}
                    className="w-12 h-10 rounded border cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.secondaryColor}
                    onChange={(e) => updateSettings({ secondaryColor: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
              <FiMail /> Contact Information
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <FiMail /> Email
              </label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => updateSettings({ contactEmail: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <FiPhone /> Phone
              </label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => updateSettings({ contactPhone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <FiMapPin /> Address
              </label>
              <textarea
                value={settings.contactAddress}
                onChange={(e) => updateSettings({ contactAddress: e.target.value })}
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Social Media Links */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
              Social Media Links
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <FiFacebook className="text-blue-600" /> Facebook
              </label>
              <input
                type="url"
                value={settings.socialLinks?.facebook || ''}
                onChange={(e) => updateSettings({ socialLinks: { ...settings.socialLinks, facebook: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="https://facebook.com/yourstore"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <FiInstagram className="text-pink-600" /> Instagram
              </label>
              <input
                type="url"
                value={settings.socialLinks?.instagram || ''}
                onChange={(e) => updateSettings({ socialLinks: { ...settings.socialLinks, instagram: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="https://instagram.com/yourstore"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <FiTwitter className="text-blue-400" /> Twitter
              </label>
              <input
                type="url"
                value={settings.socialLinks?.twitter || ''}
                onChange={(e) => updateSettings({ socialLinks: { ...settings.socialLinks, twitter: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="https://twitter.com/yourstore"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <FiYoutube className="text-red-600" /> YouTube
              </label>
              <input
                type="url"
                value={settings.socialLinks?.youtube || ''}
                onChange={(e) => updateSettings({ socialLinks: { ...settings.socialLinks, youtube: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="https://youtube.com/yourstore"
              />
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Live Preview</h2>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <img src={previewLogo} alt="Logo" className="w-8 h-8" />
                <span className="font-bold text-lg" style={{ color: settings.primaryColor }}>
                  {settings.websiteName}
                </span>
              </div>
              <div className="flex gap-2 text-sm text-gray-500">
                <span>{settings.contactEmail}</span>
                <span>•</span>
                <span>{settings.contactPhone}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
          >
            <FiSave /> {isLoading ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;   