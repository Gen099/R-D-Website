import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { api, Document } from '../../services/api';

export const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: '🌐 Tất cả', icon: 'fa-globe' },
    { value: 'analysis', label: '📊 Phân tích', icon: 'fa-chart-bar' },
    { value: 'plan', label: '📋 Kế hoạch', icon: 'fa-calendar-alt' },
    { value: 'technical', label: '⚙️ Kỹ thuật', icon: 'fa-cogs' },
    { value: 'operation', label: '🔧 Vận hành', icon: 'fa-tasks' },
    { value: 'design', label: '🎨 Thiết kế', icon: 'fa-laptop-code' },
    { value: 'demo', label: '🎬 Demo', icon: 'fa-video' },
    { value: 'tool', label: '🛠️ Tool', icon: 'fa-tools' },
  ];

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const docs = await api.getDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDocument = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newDoc = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      embed_url: formData.get('embed_url') as string,
      summary: formData.get('summary') as string,
    };

    try {
      await api.addDocument(newDoc);
      setShowAddForm(false);
      form.reset();
      loadDocuments();
    } catch (error) {
      console.error('Error adding document:', error);
      alert('Lỗi khi thêm tài liệu!');
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa tài liệu này?')) return;

    try {
      await api.deleteDocument(id);
      loadDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Lỗi khi xóa tài liệu!');
    }
  };

  const filteredDocuments = selectedCategory === 'all'
    ? documents
    : documents.filter(doc => doc.category === selectedCategory);

  const stats = {
    total: documents.length,
    views: documents.reduce((sum, doc) => sum + doc.views, 0),
    downloads: documents.reduce((sum, doc) => sum + doc.downloads, 0),
    size: (documents.reduce((sum, doc) => sum + doc.file_size, 0) / (1024 * 1024)).toFixed(2),
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                <i className="fas fa-folder-open text-orange-500 mr-3"></i>
                Thư viện Tài liệu
              </h2>
              <p className="text-gray-600">Quản lý và truy cập tài liệu R&D từ Google Drive, Canva, Dropbox</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition shadow-lg"
              >
                <i className="fas fa-plus mr-2"></i>Thêm Tài liệu
              </button>
              <button
                onClick={loadDocuments}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition shadow-lg"
              >
                <i className="fas fa-sync-alt mr-2"></i>Làm mới
              </button>
            </div>
          </div>

          {/* Add Document Form */}
          {showAddForm && (
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border-2 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  <i className="fas fa-file-plus text-blue-600 mr-2"></i>
                  Thêm Tài liệu Mới
                </h3>
                <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <form onSubmit={handleAddDocument} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <i className="fas fa-heading mr-2 text-blue-500"></i>Tiêu đề *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                    placeholder="VD: Báo cáo Phân tích AI Video Q1/2026"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <i className="fas fa-tag mr-2 text-green-500"></i>Danh mục *
                  </label>
                  <select
                    name="category"
                    required
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.slice(1).map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <i className="fas fa-link mr-2 text-purple-500"></i>Embed URL (Google Drive / Canva) *
                  </label>
                  <input
                    type="url"
                    name="embed_url"
                    required
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                    placeholder="https://drive.google.com/file/d/... hoặc https://www.canva.com/design/..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    💡 Hỗ trợ: Google Docs/Drive, Canva, Dropbox. File cần được share public.
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <i className="fas fa-align-left mr-2 text-orange-500"></i>Mô tả
                  </label>
                  <textarea
                    name="summary"
                    rows={3}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                    placeholder="Mô tả ngắn gọn nội dung tài liệu..."
                  />
                </div>

                <div className="md:col-span-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition shadow-lg font-semibold"
                  >
                    <i className="fas fa-save mr-2"></i>Lưu Tài liệu
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                  >
                    <i className="fas fa-ban mr-2"></i>Hủy
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Tổng tài liệu</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
                </div>
                <i className="fas fa-file-alt text-4xl text-blue-400"></i>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Lượt xem</p>
                  <p className="text-3xl font-bold text-green-600">{stats.views}</p>
                </div>
                <i className="fas fa-eye text-4xl text-green-400"></i>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Lượt tải</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.downloads}</p>
                </div>
                <i className="fas fa-download text-4xl text-purple-400"></i>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Dung lượng</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.size} MB</p>
                </div>
                <i className="fas fa-database text-4xl text-orange-400"></i>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                  selectedCategory === cat.value
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Documents Grid */}
          {loading ? (
            <div className="text-center py-12">
              <i className="fas fa-spinner fa-spin text-4xl text-orange-500 mb-4"></i>
              <p className="text-gray-600">Đang tải tài liệu...</p>
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-folder-open text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600">Chưa có tài liệu nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map(doc => (
                <div key={doc.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{doc.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{doc.summary}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span><i className="fas fa-eye mr-1"></i>{doc.views}</span>
                        <span><i className="fas fa-download mr-1"></i>{doc.downloads}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/document/${doc.id}`}
                      className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-center"
                    >
                      <i className="fas fa-eye mr-2"></i>Xem
                    </Link>
                    <button
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
