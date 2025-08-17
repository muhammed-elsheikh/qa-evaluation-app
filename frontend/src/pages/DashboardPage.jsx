import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardOverview from './DashboardOverview';

const DashboardPage = ({ user, onLogout }) => {
    return (
        <DashboardLayout user={user} onLogout={onLogout}>
            <DashboardOverview />
        </DashboardLayout>
    );
};

export default DashboardPage;