import React, { useState } from 'react';
import { Globe, ChevronDown, HelpCircle } from 'lucide-react';

const AuthFooter = () => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const languages = [
    { code: 'en-US', name: 'English (US)', region: 'United States' },
    { code: 'en-GB', name: 'English (UK)', region: 'United Kingdom' },
    { code: 'es-ES', name: 'Español', region: 'España' },
    { code: 'fr-FR', name: 'Français', region: 'France' },
    { code: 'de-DE', name: 'Deutsch', region: 'Deutschland' },
    { code: 'ja-JP', name: '日本語', region: '日本' },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          {/* Left section */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 text-xs sm:text-sm text-gray-500">
            <span>© QDK Tool {currentYear}</span>
            <span className="hidden sm:inline">·</span>
            <a 
              href="/privacy" 
              className="text-blue-600 hover:text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm px-1 py-1 min-h-[44px] sm:min-h-0 sm:px-0 sm:py-0 flex items-center transition-colors duration-200"
              aria-label="Privacy Policy"
            >
              Privacy
            </a>
            <span className="hidden sm:inline text-gray-300">·</span>
            <a 
              href="/terms" 
              className="text-blue-600 hover:text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm px-1 py-1 min-h-[44px] sm:min-h-0 sm:px-0 sm:py-0 flex items-center transition-colors duration-200"
              aria-label="Terms of Service"
            >
              Terms
            </a>
            <span className="hidden sm:inline text-gray-300">·</span>
            <a 
              href="/docs" 
              className="text-blue-600 hover:text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm px-1 py-1 min-h-[44px] sm:min-h-0 sm:px-0 sm:py-0 flex items-center transition-colors duration-200"
              aria-label="Documentation"
            >
              Docs
            </a>
          </div>

          {/* Right section */}
          <div className="flex items-center justify-center sm:justify-end gap-3">
            {/* Language/Region Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm px-2 py-2 min-h-[44px] sm:min-h-0 transition-colors duration-200"
                aria-label={`Language and region selector. Currently set to ${selectedLanguage.name}`}
                aria-expanded={isLanguageDropdownOpen}
                aria-haspopup="listbox"
              >
                <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{selectedLanguage.code}</span>
                <span className="sm:hidden">{selectedLanguage.code.split('-')[0].toUpperCase()}</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>

              {isLanguageDropdownOpen && (
                <>
                  {/* Mobile/Desktop Overlay */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsLanguageDropdownOpen(false)}
                  />
                  
                  <div 
                    className="absolute right-0 bottom-full mb-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    role="listbox"
                  >
                    <div className="px-3 py-2 text-xs font-medium text-gray-900 border-b border-gray-100">
                      Select Language & Region
                    </div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200 min-h-[44px]"
                        role="option"
                        aria-selected={selectedLanguage.code === lang.code}
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{lang.name}</span>
                          <span className="text-xs text-gray-500">{lang.region}</span>
                        </div>
                        {selectedLanguage.code === lang.code && (
                          <span className="text-blue-600 text-sm">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Help Link */}
            <a 
              href="/help" 
              className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm px-2 py-2 min-h-[44px] sm:min-h-0 transition-colors duration-200"
              aria-label="Help and Support"
            >
              <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Help</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AuthFooter;
