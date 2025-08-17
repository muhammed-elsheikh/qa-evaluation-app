import React from 'react';
import ResetPassword from '../components/ResetPassword';

const ResetPasswordPage = ({ token, onPasswordReset, onBackToLogin }) => {
    return <ResetPassword token={token} onPasswordReset={onPasswordReset} onBackToLogin={onBackToLogin} />;
};

export default ResetPasswordPage;
