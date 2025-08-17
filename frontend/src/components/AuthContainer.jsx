import React, { useState } from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import ForgotPassword from '../components/ForgotPassword';
import CheckEmail from '../components/CheckEmail';
import ResetPassword from '../components/ResetPassword';

const AuthContainer = ({ onAuthSuccess }) => {
    const [currentView, setCurrentView] = useState('login'); // 'login', 'signup', 'forgot-password', 'check-email', 'reset-password'
    const [resetEmail, setResetEmail] = useState('');
    const [resetToken, setResetToken] = useState('');

    const handleSwitchToLogin = () => setCurrentView('login');
    const handleSwitchToSignup = () => setCurrentView('signup');
    const handleSwitchToForgotPassword = () => setCurrentView('forgot-password');
    
    const handleEmailSent = (email) => {
        setResetEmail(email);
        setCurrentView('check-email');
    };

    const handlePasswordReset = () => {
        // Redirect to login with success message
        setCurrentView('login');
        // You could add a success message state here
    };

    const handleResendEmail = () => {
        setCurrentView('forgot-password');
    };

    switch (currentView) {
        case 'signup':
            return <SignUp onSwitchToLogin={handleSwitchToLogin} />;
        case 'forgot-password':
            return <ForgotPassword onBackToLogin={handleSwitchToLogin} onEmailSent={handleEmailSent} />;
        case 'check-email':
            return (
                <CheckEmail 
                    email={resetEmail}
                    onBackToLogin={handleSwitchToLogin}
                    onResendEmail={handleResendEmail}
                />
            );
        case 'reset-password':
            return (
                <ResetPassword 
                    token={resetToken}
                    onPasswordReset={handlePasswordReset}
                    onBackToLogin={handleSwitchToLogin}
                />
            );
        case 'login':
        default:
            return (
                <Login 
                    onAuthSuccess={onAuthSuccess}
                    onSwitchToSignup={handleSwitchToSignup}
                    onSwitchToForgotPassword={handleSwitchToForgotPassword}
                />
            );
    }
};

export default AuthContainer;
