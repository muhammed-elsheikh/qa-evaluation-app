import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MainChart = ({ data, title = "Overview", timeframe = "Monthly" }) => {
  const [selectedMetric, setSelectedMetric] = useState('profit');
  
  // Loading state
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const metrics = [
    { key: 'profit', label: 'Profit', color: '#0066CC', strokeWidth: 3 },
    { key: 'orders', label: 'Orders', color: '#00C851', strokeWidth: 2 },
    { key: 'impressions', label: 'Impressions', color: '#FF6900', strokeWidth: 2 },
  ];

  const formatValue = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-gray-600 text-sm mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-gray-700">{entry.name}:</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {formatValue(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{timeframe} performance overview</p>
        </div>
        
        {/* Metric Selector */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key)}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                selectedMetric === metric.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#f0f0f0"
              vertical={false}
            />
            <XAxis 
              dataKey="period" 
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatValue}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Render all metrics or just selected one */}
            {selectedMetric === 'all' ? (
              metrics.map((metric) => (
                <Line
                  key={metric.key}
                  type="monotone"
                  dataKey={metric.key}
                  stroke={metric.color}
                  strokeWidth={metric.strokeWidth}
                  dot={{ fill: metric.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: metric.color, strokeWidth: 2, fill: '#fff' }}
                  name={metric.label}
                />
              ))
            ) : (
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke={metrics.find(m => m.key === selectedMetric)?.color || '#0066CC'}
                strokeWidth={3}
                dot={{ fill: metrics.find(m => m.key === selectedMetric)?.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: metrics.find(m => m.key === selectedMetric)?.color, strokeWidth: 2, fill: '#fff' }}
                name={metrics.find(m => m.key === selectedMetric)?.label}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
        {metrics.map((metric) => (
          <div 
            key={metric.key}
            className={`flex items-center gap-2 cursor-pointer transition-opacity ${
              selectedMetric !== 'all' && selectedMetric !== metric.key 
                ? 'opacity-50 hover:opacity-75' 
                : ''
            }`}
            onClick={() => setSelectedMetric(metric.key)}
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: metric.color }}
            ></div>
            <span className="text-sm text-gray-700">{metric.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainChart;
