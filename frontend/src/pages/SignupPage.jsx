import React from 'react';
import SignUp from '../components/SignUp';

const SignupPage = ({ onSwitchToLogin }) => {
    return <SignUp onSwitchToLogin={onSwitchToLogin} />;
};

export default SignupPage;
