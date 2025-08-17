import React, { useState, useEffect } from 'react';
import DashboardLayout from './components/Layout/DashboardLayout';
import AuthContainer from './components/Auth/AuthContainer';
import { apiService } from './services/api';
import './App.css';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

function App() {
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

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    apiService.logout();
    setUser(undefined);
  };

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

  // Show authentication screens if user is not logged in
  if (!user) {
    return <AuthContainer onAuthSuccess={handleAuthSuccess} />;
  }

  // Show dashboard if user is authenticated
  return (
    <div className="App">
      <DashboardLayout user={user} onLogout={handleLogout} />
    </div>
  );
}

export default App;
