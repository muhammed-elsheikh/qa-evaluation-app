import React, { useState } from 'react';

const QDKForm = () => {
    const [formData, setFormData] = useState({
        userName: '',
        entryDate: '',
        score: '',
        comments: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/v1/qdk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // Handle successful submission (e.g., reset form, show success message)
                setFormData({
                    userName: '',
                    entryDate: '',
                    score: '',
                    comments: ''
                });
            } else {
                // Handle error response
                console.error('Failed to submit QDK entry');
            }
        } catch (error) {
            console.error('Error submitting QDK entry:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">User Name</label>
                <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Entry Date</label>
                <input
                    type="date"
                    name="entryDate"
                    value={formData.entryDate}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Score</label>
                <input
                    type="number"
                    name="score"
                    value={formData.score}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Comments</label>
                <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Submit QDK Entry</button>
        </form>
    );
};

export default QDKForm;