import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthContainer from './components/AuthContainer';
import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated (e.g., from localStorage)
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
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

  return (
    <Router>
      <Routes>
        {/* If user is not authenticated, show authentication container */}
        <Route 
          path="/" 
          element={
            user ? 
            <Navigate to="/dashboard" replace /> : 
            <AuthContainer onAuthSuccess={handleAuthSuccess} />
          } 
        />
        
        {/* Protected routes - redirect to login if not authenticated */}
        <Route 
          path="/dashboard" 
          element={
            user ? 
            <DashboardPage user={user} onLogout={handleLogout} /> : 
            <Navigate to="/" replace />
          } 
        />
        
        <Route 
          path="/home" 
          element={
            user ? 
            <Home user={user} onLogout={handleLogout} /> : 
            <Navigate to="/" replace />
          } 
        />

        {/* Redirect any other routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;