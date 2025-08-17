import React from 'react';
import { 
  DollarSign, 
  ShoppingCart, 
  Eye, 
  TrendingUp, 
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Loader2
} from 'lucide-react';

const iconMap = {
  'DollarSign': DollarSign,
  'ShoppingCart': ShoppingCart,
  'Eye': Eye,
  'TrendingUp': TrendingUp,
  'TrendingDown': TrendingDown,
  'Loader': Loader2
};

const KpiCard = ({ title, value, delta, icon, isLoading = false }) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="w-20 h-8 bg-gray-200 rounded mb-2"></div>
        <div className="w-12 h-4 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const IconComponent = iconMap[icon] || TrendingUp;
  const isPositive = delta?.direction === 'up';
  const DeltaIcon = isPositive ? ArrowUp : ArrowDown;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header with Icon and Delta */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full">
          <IconComponent className="w-5 h-5 text-blue-600" />
        </div>
        
        {delta && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            isPositive 
              ? 'bg-green-50 text-green-700' 
              : 'bg-red-50 text-red-700'
          }`}>
            <DeltaIcon className="w-3 h-3" />
            <span>{delta.value}</span>
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-2">
        <div className="text-2xl font-bold text-gray-900">
          {value}
        </div>
      </div>

      {/* Title */}
      <div className="text-sm text-gray-500 font-medium">
        {title}
      </div>
    </div>
  );
};

export default KpiCard;
