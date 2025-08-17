import React from 'react';
import CheckEmail from '../components/CheckEmail';

const CheckEmailPage = ({ email, onBackToLogin, onResendEmail }) => {
    return <CheckEmail email={email} onBackToLogin={onBackToLogin} onResendEmail={onResendEmail} />;
};

export default CheckEmailPage;
