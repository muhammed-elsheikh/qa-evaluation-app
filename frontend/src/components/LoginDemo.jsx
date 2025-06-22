import React from 'react';
import Login from './Login';

const LoginDemo = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-sf-dark-blue mb-4">
                        Salesforce-Inspired Login Page
                    </h1>
                    <div className="max-w-4xl mx-auto text-left bg-white rounded-lg shadow-sm p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-sf-blue-600">✅ Features Implemented</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-medium text-gray-800 mb-2">🎨 Design Elements</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Salesforce blue color scheme (#0176D3, #00A1E0)</li>
                                    <li>• Clean white background with subtle shadows</li>
                                    <li>• Professional Poppins font typography</li>
                                    <li>• Custom QA evaluation logo</li>
                                    <li>• Mobile-responsive layout</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800 mb-2">⚡ Interactive Features</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Email validation with error states</li>
                                    <li>• Password toggle (show/hide)</li>
                                    <li>• Form validation & disabled states</li>
                                    <li>• Hover effects & micro-animations</li>
                                    <li>• Focus states for accessibility</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800 mb-2">🔐 Authentication Options</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Microsoft SSO integration ready</li>
                                    <li>• Google SSO integration ready</li>
                                    <li>• Email/password login</li>
                                    <li>• Remember me functionality</li>
                                    <li>• Forgot password link</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800 mb-2">📱 UX Enhancements</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Generous 1.5rem spacing</li>
                                    <li>• Professional error messaging</li>
                                    <li>• Smooth transitions (200ms)</li>
                                    <li>• Accessible focus indicators</li>
                                    <li>• Footer with legal links</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Login Component */}
                <Login />
            </div>
        </div>
    );
};

export default LoginDemo;
