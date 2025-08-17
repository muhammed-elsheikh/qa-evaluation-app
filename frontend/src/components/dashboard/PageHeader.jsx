import React from 'react';
import { ChevronDown } from 'lucide-react';

const PageHeader = ({ 
  title, 
  timeframeOptions = [], 
  selectedTimeframe, 
  onTimeframeChange 
}) => {
  return (
    <div className="flex items-center justify-between">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {title}
        </h1>
      </div>

      {/* Timeframe Selector */}
      {timeframeOptions.length > 0 && (
        <div className="relative">
          <select
            value={selectedTimeframe}
            onChange={(e) => onTimeframeChange && onTimeframeChange(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-sm font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer"
          >
            {timeframeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Custom chevron icon */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
