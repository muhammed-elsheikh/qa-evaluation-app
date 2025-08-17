import React from 'react';

const FooterBar = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'About', href: '#' },
    { label: 'Docs', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Support', href: '#' }
  ];

  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Links */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          {footerLinks.map((link, index) => (
            <React.Fragment key={link.label}>
              <a 
                href={link.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
              {index < footerLinks.length - 1 && (
                <span className="text-gray-300">·</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500">
          © {currentYear} QDK Tool. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
