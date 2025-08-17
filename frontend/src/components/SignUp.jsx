import React, { useState } from 'react';
import AuthFooter from './AuthFooter';

const SignUp = ({ onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (!agreedToTerms) {
            errors.terms = 'Please agree to the terms and conditions';
        }

        return errors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear field error when user starts typing
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        try {
            // Here you would make the API call to register the user
            // const response = await fetch('/api/register', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         name: formData.name,
            //         email: formData.email,
            //         password: formData.password
            //     }),
            // });

            // For now, simulate success and redirect to login
            alert('Account created successfully! Please sign in.');
            onSwitchToLogin();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
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
                            <img src="/logo.svg" alt="QA Evaluation App" className="mx-auto h-16 w-16"/>
                        </div>
                        <h1 className="text-2xl font-bold text-sf-dark-blue font-poppins mb-2">
                            Create Your Account
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Join us today and start your journey
                        </p>
                    </div>

                    {/* Social Registration */}
                    <div className="space-y-3 mb-6">
                        <button 
                            type="button"
                            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sf-blue-600 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 23 23" fill="none">
                                <path fill="#f25022" d="M1 1h10v10H1z"/>
                                <path fill="#00a4ef" d="M12 1h10v10H12z"/>
                                <path fill="#7fba00" d="M1 12h10v10H1z"/>
                                <path fill="#ffb900" d="M12 12h10v10H12z"/>
                            </svg>
                            Continue with Microsoft
                        </button>
                        <button 
                            type="button"
                            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sf-blue-600 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continue with Google
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
                        </div>
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

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-user text-gray-400"></i>
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    required
                                    className={`block w-full pl-10 pr-3 py-3 border ${
                                        fieldErrors.name ? 'border-red-300' : 'border-gray-300'
                                    } rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sf-blue-600 focus:border-transparent transition-colors duration-200`}
                                />
                            </div>
                            {fieldErrors.name && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <i className="fas fa-exclamation-triangle mr-1"></i>
                                    {fieldErrors.name}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-envelope text-gray-400"></i>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="name@company.com"
                                    required
                                    className={`block w-full pl-10 pr-3 py-3 border ${
                                        fieldErrors.email ? 'border-red-300' : 'border-gray-300'
                                    } rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sf-blue-600 focus:border-transparent transition-colors duration-200`}
                                />
                            </div>
                            {fieldErrors.email && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <i className="fas fa-exclamation-triangle mr-1"></i>
                                    {fieldErrors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-lock text-gray-400"></i>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Create a password"
                                    required
                                    className={`block w-full pl-10 pr-10 py-3 border ${
                                        fieldErrors.password ? 'border-red-300' : 'border-gray-300'
                                    } rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sf-blue-600 focus:border-transparent transition-colors duration-200`}
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200"
                                >
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                            {fieldErrors.password && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <i className="fas fa-exclamation-triangle mr-1"></i>
                                    {fieldErrors.password}
                                </p>
                            )}
                            <p className="mt-1 text-sm text-gray-500">
                                Must be at least 6 characters long.
                            </p>
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-lock text-gray-400"></i>
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm your password"
                                    required
                                    className={`block w-full pl-10 pr-10 py-3 border ${
                                        fieldErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                                    } rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sf-blue-600 focus:border-transparent transition-colors duration-200`}
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200"
                                >
                                    <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                            {fieldErrors.confirmPassword && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <i className="fas fa-exclamation-triangle mr-1"></i>
                                    {fieldErrors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Terms Agreement */}
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input 
                                    id="terms"
                                    type="checkbox" 
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="h-4 w-4 text-sf-blue-600 focus:ring-sf-blue-600 border-gray-300 rounded"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="text-gray-700">
                                    I agree to the{' '}
                                    <a href="/terms" className="text-sf-blue-600 hover:text-sf-blue-700 underline">
                                        Terms and Conditions
                                    </a>{' '}
                                    and{' '}
                                    <a href="/privacy" className="text-sf-blue-600 hover:text-sf-blue-700 underline">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>
                        </div>
                        {fieldErrors.terms && (
                            <p className="text-sm text-red-600 flex items-center">
                                <i className="fas fa-exclamation-triangle mr-1"></i>
                                {fieldErrors.terms}
                            </p>
                        )}

                        {/* Sign Up Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sf-blue-600 hover:bg-sf-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sf-blue-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span className="flex items-center">
                                    <i className="fas fa-user-plus mr-2"></i>
                                    Create Account
                                </span>
                            </button>
                        </div>
                    </form>

                    {/* Sign In Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <button 
                                onClick={onSwitchToLogin}
                                className="font-medium text-sf-blue-600 hover:text-sf-blue-700 hover:underline focus:outline-none focus:underline transition-colors duration-200"
                            >
                                Sign In
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <AuthFooter />
        </div>
    );
};

export default SignUp;
