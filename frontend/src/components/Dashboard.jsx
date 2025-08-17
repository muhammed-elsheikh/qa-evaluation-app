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
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">User</th>
                        <th className="py-2 px-4 border-b">Comments</th>
                        <th className="py-2 px-4 border-b">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {qdkEntries.map(entry => (
                        <tr key={entry.id}>
                            <td className="py-2 px-4 border-b">{entry.id}</td>
                            <td className="py-2 px-4 border-b">{entry.user}</td>
                            <td className="py-2 px-4 border-b">{entry.comments}</td>
                            <td className="py-2 px-4 border-b">{new Date(entry.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;