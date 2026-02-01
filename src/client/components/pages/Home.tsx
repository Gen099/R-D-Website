import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../layout/Layout';

interface StatCard {
  label: string;
  value: string;
  icon: string;
  color: string;
}

interface ModuleCard {
  title: string;
  description: string;
  icon: string;
  link: string;
  linkText: string;
}

const stats: StatCard[] = [
  { label: 'Tổng tài liệu', value: '5', icon: 'fa-file-alt', color: '#FB923C' },
  { label: 'Job Codes phân tích', value: '23', icon: 'fa-tasks', color: '#F97316' },
  { label: 'Loại AI Effects', value: '25+', icon: 'fa-magic', color: '#EA580C' },
  { label: 'AI Models', value: '4', icon: 'fa-brain', color: '#C2410C' },
];

const modules: ModuleCard[] = [
  {
    title: 'Báo cáo Phân tích Hiện trạng',
    description: 'Phân tích toàn diện về AI Video trong lĩnh vực bất động sản - 23 job codes phản hồi',
    icon: 'fa-chart-bar',
    link: '/document/analysis-report',
    linkText: 'Xem chi tiết',
  },
  {
    title: 'Kế hoạch Công việc R&D',
    description: 'Lộ trình chi tiết cho vị trí R&D Specialist - AI Video & Prompt Engineering Q1/2026',
    icon: 'fa-calendar-alt',
    link: '/document/work-plan',
    linkText: 'Xem chi tiết',
  },
  {
    title: 'Tài liệu Kỹ thuật Video',
    description: 'Danh mục đầy đủ hiệu ứng, motion, add-on và quy trình sản xuất video',
    icon: 'fa-cogs',
    link: '/document/technical-doc',
    linkText: 'Xem chi tiết',
  },
  {
    title: 'Tài liệu Vận hành R&D',
    description: 'Quy trình giao tiếp, đánh giá và chuyển giao kỹ thuật chi tiết',
    icon: 'fa-tasks',
    link: '/document/operation-doc',
    linkText: 'Xem chi tiết',
  },
  {
    title: 'Thiết kế Hệ thống Platform',
    description: 'Kiến trúc và thiết kế R&D AI Video Intelligence Platform',
    icon: 'fa-laptop-code',
    link: '/document/platform-design',
    linkText: 'Xem chi tiết',
  },
  {
    title: 'AI Analysis Tools',
    description: 'Công cụ phân tích thông minh với Gemini, GLM, OpenAI, Claude',
    icon: 'fa-robot',
    link: '/ai-tools',
    linkText: 'Sử dụng ngay',
  },
];

export const Home: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 card-hover">
          <div className="text-center">
            <h2 className="text-4xl font-bold section-title mb-4">
              Chào mừng đến với Nền tảng Tri thức R&D AI Video
            </h2>
            <p className="text-gray-600 text-lg">
              Hệ thống quản lý, phân tích và tối ưu hóa quy trình sản xuất AI Video cho Fotober
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="stat-label">{stat.label}</p>
                  <p className="stat-value">{stat.value}</p>
                </div>
                <i className={`fas ${stat.icon} text-4xl`} style={{ color: stat.color }}></i>
              </div>
            </div>
          ))}
        </div>

        {/* Main Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <Link
              key={index}
              to={module.link}
              className="bg-white rounded-xl shadow-lg p-6 card-hover cursor-pointer block"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full gradient-orange flex items-center justify-center text-white mr-4">
                  <i className={`fas ${module.icon} text-xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{module.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{module.description}</p>
              <div className="flex items-center text-orange-600 font-semibold">
                <span>{module.linkText}</span>
                <i className="fas fa-arrow-right ml-2"></i>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};
