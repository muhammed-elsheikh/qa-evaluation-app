import React, { useState } from 'react';
import { 
  UserCircleIcon,
  ChevronDownIcon,
  CogIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import AuthModal from './AuthModal';
import { apiService } from '../../services/api';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthSectionProps {
  user?: User;
  onAuthChange: (user: User | undefined) => void;
}

const AuthSection: React.FC<AuthSectionProps> = ({ user, onAuthChange }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleLogout = () => {
    apiService.logout();
    onAuthChange(undefined);
    setIsProfileDropdownOpen(false);
  };

  const handleAuthSuccess = (userData: User) => {
    onAuthChange(userData);
  };

  if (user) {
    return (
      <div className="relative">
        {/* Logged In State */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Online</span>
          
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {getInitials(user.name)}
              </div>
            )}
            <span className="text-sm font-medium text-gray-900">{user.name}</span>
            <ChevronDownIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Profile Dropdown */}
        {isProfileDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-3 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-600">{user.email}</p>
            </div>
            <div className="py-1">
              <a
                href="/settings"
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <CogIcon className="w-4 h-4 mr-2" />
                Account Settings
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {/* Logged Out State */}
      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
      <span className="text-sm text-gray-600">Offline</span>
      
      <button
        onClick={() => setIsAuthModalOpen(true)}
        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        Sign In
      </button>
      <button
        onClick={() => setIsAuthModalOpen(true)}
        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Sign Up
      </button>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default AuthSection;
