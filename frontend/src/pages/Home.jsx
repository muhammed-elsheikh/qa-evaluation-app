import React from 'react';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Welcome to the QA Evaluation App</h1>
            <p className="text-lg mb-8">This application allows you to submit evaluations and manage them effectively.</p>
            <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Go to Login
            </a>
        </div>
    );
};

export default Home;