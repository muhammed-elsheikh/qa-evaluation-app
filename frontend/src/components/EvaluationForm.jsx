import React, { useState } from 'react';

const EvaluationForm = () => {
    const [formData, setFormData] = useState({
        evaluatorName: '',
        evaluationDate: '',
        evaluationScore: '',
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
            const response = await fetch('/api/v1/evaluations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // Handle successful submission (e.g., reset form, show success message)
                setFormData({
                    evaluatorName: '',
                    evaluationDate: '',
                    evaluationScore: '',
                    comments: ''
                });
            } else {
                // Handle error response
                console.error('Failed to submit evaluation');
            }
        } catch (error) {
            console.error('Error submitting evaluation:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Evaluator Name</label>
                <input
                    type="text"
                    name="evaluatorName"
                    value={formData.evaluatorName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Evaluation Date</label>
                <input
                    type="date"
                    name="evaluationDate"
                    value={formData.evaluationDate}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Evaluation Score</label>
                <input
                    type="number"
                    name="evaluationScore"
                    value={formData.evaluationScore}
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
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Submit Evaluation</button>
        </form>
    );
};

export default EvaluationForm;