import React from 'react';
import { ArrowUp, ArrowDown, User } from 'lucide-react';

const ItemList = ({ title, items = [], isLoading = false }) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="space-y-3">
          {Array(5).fill(null).map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="w-12 h-6 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {title}
        </h3>
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <User className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm">No items to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {title}
      </h3>

      {/* Items List */}
      <div className="space-y-3">
        {items.map((item, index) => {
          const isPositive = item.delta?.direction === 'up';
          const DeltaIcon = isPositive ? ArrowUp : ArrowDown;
          
          return (
            <div 
              key={item.id || index}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              {/* Avatar/Thumbnail */}
              <div className="flex-shrink-0">
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className={`w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center ${item.avatar ? 'hidden' : 'flex'}`}
                >
                  <User className="w-4 h-4 text-blue-600" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                  {item.name}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {item.meta}
                </div>
              </div>

              {/* Delta */}
              {item.delta && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                  isPositive 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-red-50 text-red-700'
                }`}>
                  <DeltaIcon className="w-3 h-3" />
                  <span>{item.delta.value}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* View More Link */}
      {items.length >= 5 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
            View all items →
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemList;
