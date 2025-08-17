import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import FooterBar from './FooterBar';

const DashboardLayout = ({ children, user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar 
        onMenuClick={handleMenuClick} 
        user={user} 
        onLogout={onLogout} 
      />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={handleSidebarClose}
          user={user}
        />
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] lg:ml-0">
          <div className="flex-1">
            <div className="p-6">
              {children}
            </div>
          </div>
          
          {/* Footer */}
          <FooterBar />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;