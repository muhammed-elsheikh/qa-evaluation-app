import React from 'react';
import AuthFooter from './AuthFooter';

const CheckEmail = ({ email, onBackToLogin, onResendEmail }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-brand-light rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Header */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Check your email
          </h1>
          <p className="text-gray-600 text-sm mb-6">
            We sent a password reset link to
          </p>
          <p className="text-gray-900 font-medium mb-8">
            {email}
          </p>

          {/* Actions */}
          <div className="space-y-4">
            <button
              onClick={onBackToLogin}
              className="w-full sf-button-primary"
            >
              Back to login
            </button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the email?{' '}
                <button
                  onClick={onResendEmail}
                  className="font-medium text-brand hover:text-brand-hover hover:underline focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 rounded-sm px-1 transition-colors duration-200"
                >
                  Click to resend
                </button>
              </p>
            </div>
          </div>

          {/* Help text */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">
              Be sure to check your spam folder. If you still can't find the email, contact support.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <AuthFooter />
    </div>
  );
};

export default CheckEmail;
