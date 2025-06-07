import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon,
  ChevronRightIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import AuthSection from '../Auth/AuthSection';

interface NavbarProps {
  breadcrumbs: string[];
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const Navbar: React.FC<NavbarProps> = ({ breadcrumbs, user }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-gray-600">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <span className={index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : ''}>
                {crumb}
              </span>
              {index < breadcrumbs.length - 1 && (
                <ChevronRightIcon className="w-4 h-4" />
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <div className={`flex items-center transition-all duration-300 ${
              isSearchExpanded ? 'w-80' : 'w-10'
            }`}>
              <button
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
              </button>
              {isSearchExpanded && (
                <input
                  type="text"
                  placeholder="Search..."
                  className="ml-2 flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                  onBlur={() => setIsSearchExpanded(false)}
                />
              )}
            </div>
          </div>

          {/* Authentication Section */}
          <AuthSection user={user} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
