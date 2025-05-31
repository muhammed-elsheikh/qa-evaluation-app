import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [evaluations, setEvaluations] = useState([]);

    useEffect(() => {
        fetchEvaluations();
    }, []);

    const fetchEvaluations = async () => {
        try {
            const response = await fetch('/api/evaluations');
            const data = await response.json();
            setEvaluations(data);
        } catch (error) {
            console.error('Error fetching evaluations:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Evaluations Dashboard</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Evaluator</th>
                        <th className="py-2 px-4 border-b">Comments</th>
                        <th className="py-2 px-4 border-b">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {evaluations.map(evaluation => (
                        <tr key={evaluation.id}>
                            <td className="py-2 px-4 border-b">{evaluation.id}</td>
                            <td className="py-2 px-4 border-b">{evaluation.evaluator}</td>
                            <td className="py-2 px-4 border-b">{evaluation.comments}</td>
                            <td className="py-2 px-4 border-b">{new Date(evaluation.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;