import React, { useState } from 'react';
import AuthFooter from './AuthFooter';

const ForgotPassword = ({ onBackToLogin, onEmailSent }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (value && !validateEmail(value)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!email) {
            setEmailError('Email is required');
            setLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        try {
            // Here you would make the API call to send password reset email
            // const response = await fetch('/api/forgot-password', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ email }),
            // });

            // For now, simulate success
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call delay
            onEmailSent && onEmailSent(email);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Logo + Header */}
                    <div className="text-center mb-8">
                        <div className="mb-6">
                            <img src="/logo.svg" alt="QDK Tool" className="mx-auto h-16 w-16"/>
                        </div>
                        <h1 className="text-2xl font-bold text-sf-dark-blue font-poppins mb-2">
                            Forgot your password?
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <i className="fas fa-exclamation-circle text-red-400"></i>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-800">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Reset Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-envelope text-gray-400"></i>
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Enter your email address"
                                    required
                                    className={`block w-full pl-10 pr-3 py-3 border ${
                                        emailError ? 'border-red-300' : 'border-gray-300'
                                    } rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sf-blue-600 focus:border-transparent transition-colors duration-200`}
                                />
                            </div>
                            {emailError && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <i className="fas fa-exclamation-triangle mr-1"></i>
                                    {emailError}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={loading || !email || emailError}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sf-blue-600 hover:bg-sf-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sf-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none"
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Sending...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <i className="fas fa-paper-plane mr-2"></i>
                                        Send reset link
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Back to Login */}
                    <div className="mt-6 text-center">
                        <button 
                            onClick={onBackToLogin}
                            className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                            ← Back to sign in
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <AuthFooter />
        </div>
    );
};

export default ForgotPassword;
