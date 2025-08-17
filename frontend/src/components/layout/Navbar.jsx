import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Globe, 
  ChevronDown, 
  Menu,
  Settings,
  User,
  LogOut
} from 'lucide-react';

const Navbar = ({ onMenuClick, user, onLogout }) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Menu Button */}
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">QDK</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              QDK Tool
            </span>
          </div>

          {/* Global Search */}
          <div className="hidden md:block relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Globe className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700 hidden sm:block">
                {selectedLanguage.code.toUpperCase()}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {isLanguageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setIsLanguageDropdownOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.name}</span>
                    {selectedLanguage.code === lang.code && (
                      <span className="ml-auto text-blue-600">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
              )}
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-gray-900">
                  {user?.name || 'User'}
                </div>
                <div className="text-xs text-gray-500">
                  {user?.email || ''}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
            </button>

            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="text-sm font-medium text-gray-900">
                    {user?.name || 'User'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.email || ''}
                  </div>
                </div>
                
                <div className="py-1">
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <User className="w-4 h-4" />
                    <span>View Profile</span>
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                </div>
                
                <div className="border-t border-gray-100 py-1">
                  <button 
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                      onLogout && onLogout();
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mt-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
