import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user, onLogout }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">QDK Tool Dashboard</h1>
                <p className="text-lg mb-8 text-gray-600">
                    Welcome back, {user?.name || 'User'}! Salesforce Lightning-inspired dashboard with modern analytics and insights.
                </p>
                <div className="space-x-4 mb-6">
                    <Link 
                        to="/dashboard" 
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        View Dashboard
                    </Link>
                </div>
                
                {/* User Info and Logout */}
                <div className="bg-white p-6 rounded-lg shadow-sm max-w-md mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="text-left">
                            <p className="text-sm text-gray-600">Signed in as:</p>
                            <p className="font-medium text-gray-900">{user?.email}</p>
                        </div>
                        <button
                            onClick={onLogout}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;