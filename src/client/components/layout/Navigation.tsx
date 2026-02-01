import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/documents', icon: 'fa-book', label: 'Tài liệu' },
  { path: '/analytics', icon: 'fa-chart-line', label: 'Phân tích' },
  { path: '/ai-tools', icon: 'fa-robot', label: 'AI Tools' },
  { path: '/history', icon: 'fa-history', label: 'Lịch sử' },
];

export const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="gradient-orange text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition">
              <i className="fas fa-video text-3xl"></i>
              <div>
                <h1 className="text-2xl font-bold">Fotober R&D Intelligence Hub</h1>
                <p className="text-sm opacity-90">AI Video Knowledge Base & Analytics Platform</p>
              </div>
            </Link>
          </div>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg transition ${
                  isActive(item.path)
                    ? 'bg-white text-orange-600 font-semibold shadow-lg'
                    : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                }`}
              >
                <i className={`fas ${item.icon} mr-2`}></i>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
