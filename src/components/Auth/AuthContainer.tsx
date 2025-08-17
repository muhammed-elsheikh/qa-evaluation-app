import React, { useState } from 'react';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContainerProps {
  onAuthSuccess: (user: User) => void;
}

type AuthView = 'login' | 'signup' | 'forgot-password';

const AuthContainer: React.FC<AuthContainerProps> = ({ onAuthSuccess }) => {
  const [currentView, setCurrentView] = useState<AuthView>('login');

  const handleSwitchToLogin = () => setCurrentView('login');
  const handleSwitchToSignup = () => setCurrentView('signup');
  const handleSwitchToForgotPassword = () => setCurrentView('forgot-password');

  switch (currentView) {
    case 'login':
      return (
        <LoginPage
          onAuthSuccess={onAuthSuccess}
          onSwitchToSignup={handleSwitchToSignup}
          onSwitchToForgotPassword={handleSwitchToForgotPassword}
        />
      );
    case 'signup':
      return (
        <SignupPage
          onAuthSuccess={onAuthSuccess}
          onSwitchToLogin={handleSwitchToLogin}
        />
      );
    case 'forgot-password':
      return (
        <ForgotPasswordPage
          onBackToLogin={handleSwitchToLogin}
        />
      );
    default:
      return (
        <LoginPage
          onAuthSuccess={onAuthSuccess}
          onSwitchToSignup={handleSwitchToSignup}
          onSwitchToForgotPassword={handleSwitchToForgotPassword}
        />
      );
  }
};

export default AuthContainer;
