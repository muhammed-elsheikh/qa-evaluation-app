import React from 'react';
import { 
  UserGroupIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';
import StatsCard from './StatsCard';

interface DashboardContentProps {
  user?: {
    name: string;
    email: string;
  };
}

const DashboardContent: React.FC<DashboardContentProps> = ({ user }) => {
  const statsData = [
    {
      title: 'Total Users',
      value: '2,543',
      change: { value: 12, trend: 'up' as const },
      icon: UserGroupIcon,
      color: 'blue' as const,
    },
    {
      title: 'Active Sessions',
      value: '1,834',
      change: { value: 8, trend: 'up' as const },
      icon: ClockIcon,
      color: 'green' as const,
    },
    {
      title: 'Total Reports',
      value: '847',
      change: { value: 3, trend: 'down' as const },
      icon: DocumentTextIcon,
      color: 'yellow' as const,
    },
    {
      title: 'Performance Score',
      value: '94%',
      change: { value: 5, trend: 'up' as const },
      icon: ChartBarIcon,
      color: 'purple' as const,
    },
  ];

  const recentActivities = [
    { id: 1, action: 'New user registered', time: '2 minutes ago', type: 'user' },
    { id: 2, action: 'Report generated', time: '15 minutes ago', type: 'report' },
    { id: 3, action: 'System backup completed', time: '1 hour ago', type: 'system' },
    { id: 4, action: 'Performance alert resolved', time: '2 hours ago', type: 'alert' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          {user ? `Welcome back, ${user.name}!` : 'Welcome to QA Dashboard'}
        </h1>
        <p className="text-blue-100">
          Here's what's happening with your quality assurance metrics today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <ChartBarIcon className="w-12 h-12 mx-auto mb-2" />
                <p>Chart visualization would go here</p>
                <p className="text-sm">(Integration with charting library needed)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'user' ? 'bg-blue-500' :
                  activity.type === 'report' ? 'bg-green-500' :
                  activity.type === 'system' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
