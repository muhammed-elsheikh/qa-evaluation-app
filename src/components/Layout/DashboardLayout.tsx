import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DashboardContent from '../Dashboard/DashboardContent';
import { apiService } from '../../services/api';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

const DashboardLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      if (apiService.isAuthenticated()) {
        try {
          const response = await apiService.getProfile();
          setUser(response.user);
        } catch (error) {
          // Token might be invalid, clear it
          apiService.logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleAuthChange = (userData: User | undefined) => {
    setUser(userData);
  };

  const breadcrumbs = ['Dashboard', 'Overview'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
