import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  FolderOpen,
  Megaphone,
  LineChart,
  Brain,
  Briefcase,
  Users,
  Package,
  ShoppingBag,
  User,
  HelpCircle,
  Calendar,
  FileText,
  Mail,
  X
} from 'lucide-react';
import { sidebarNavigation } from '../../data/mockData';

const iconMap = {
  'BarChart3': BarChart3,
  'FolderOpen': FolderOpen,
  'Megaphone': Megaphone,
  'LineChart': LineChart,
  'Brain': Brain,
  'Briefcase': Briefcase,
  'Users': Users,
  'Package': Package,
  'ShoppingBag': ShoppingBag,
  'User': User,
  'HelpCircle': HelpCircle,
  'Calendar': Calendar,
  'FileText': FileText,
  'Mail': Mail
};

const Sidebar = ({ isOpen, onClose, user }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">QDK</span>
            </div>
            <span className="text-lg font-bold text-gray-900">QDK Tool</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 h-full overflow-y-auto">
          <div className="space-y-6">
            {sidebarNavigation.map((group) => (
              <div key={group.group}>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {group.group}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const IconComponent = iconMap[item.icon] || BarChart3;
                    const isActive = item.active || location.pathname === item.path;

                    return (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => {
                          // Close mobile sidebar on navigation
                          if (window.innerWidth < 1024) {
                            onClose();
                          }
                        }}
                        className={`
                          flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                          ${isActive 
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }
                        `}
                      >
                        <IconComponent className={`w-4 h-4 ${
                          isActive ? 'text-blue-700' : 'text-gray-500'
                        }`} />
                        <span className="truncate">{item.label}</span>
                        {isActive && (
                          <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
