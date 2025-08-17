import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DashboardContent from '../Dashboard/DashboardContent';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleAuthChange = (userData: User | undefined) => {
    if (!userData) {
      onLogout();
    }
  };

  const breadcrumbs = ['Dashboard', 'Overview'];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar 
          breadcrumbs={breadcrumbs}
          user={user}
          onAuthChange={handleAuthChange}
        />
        
        <main className="flex-1 overflow-y-auto">
          <DashboardContent user={user} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
