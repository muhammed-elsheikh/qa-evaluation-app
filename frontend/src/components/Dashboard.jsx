import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [qdkEntries, setQdkEntries] = useState([]);

    useEffect(() => {
        fetchQdkEntries();
    }, []);

    const fetchQdkEntries = async () => {
        try {
            const response = await fetch('/api/v1/qdk/user/1');
            const data = await response.json();
            setQdkEntries(data);
        } catch (error) {
            console.error('Error fetching QDK entries:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">QDK Dashboard</h1>
            <table className="min-w-full bg-white border border-border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-border">ID</th>
                        <th className="py-2 px-4 border-b border-border">User</th>
                        <th className="py-2 px-4 border-b border-border">Comments</th>
                        <th className="py-2 px-4 border-b border-border">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {qdkEntries.map(entry => (
                        <tr key={entry.id}>
                            <td className="py-2 px-4 border-b border-border">{entry.id}</td>
                            <td className="py-2 px-4 border-b border-border">{entry.user}</td>
                            <td className="py-2 px-4 border-b border-border">{entry.comments}</td>
                            <td className="py-2 px-4 border-b border-border">{new Date(entry.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;