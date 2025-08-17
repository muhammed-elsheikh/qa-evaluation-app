import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const DonutGauge = ({ 
  label, 
  current, 
  target, 
  percent, 
  subtext,
  isLoading = false 
}) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  // Data for the donut chart
  const data = [
    { name: 'Completed', value: percent },
    { name: 'Remaining', value: 100 - percent }
  ];

  // Colors for the chart
  const COLORS = ['#0066CC', '#E5E7EB'];

  const formatValue = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {label}
        </h3>
        {subtext && (
          <p className="text-sm text-gray-500">
            {subtext}
          </p>
        )}
      </div>

      {/* Donut Chart */}
      <div className="relative mb-4">
        <div className="h-32 w-32 mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                startAngle={90}
                endAngle={450}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    stroke="none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-gray-900">
            {percent}%
          </div>
          <div className="text-xs text-gray-500">
            Complete
          </div>
        </div>
      </div>

      {/* Progress details */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Current:</span>
          <span className="font-semibold text-gray-900">
            {formatValue(current)}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Target:</span>
          <span className="font-semibold text-gray-900">
            {formatValue(target)}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Remaining:</span>
          <span className="font-semibold text-gray-900">
            {formatValue(target - current)}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DonutGauge;
