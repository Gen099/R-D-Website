import { Layout } from '@/components/layout/Layout';

export default function HistoryPage() {
    return (
        <Layout>
            <div className="container mx-auto px-6 py-8">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <i className="fas fa-history text-6xl text-orange-500 mb-4"></i>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Lịch sử Phân tích</h2>
                        <p className="text-gray-600">Theo dõi lịch sử các phân tích đã thực hiện</p>
                    </div>

                    <div className="text-center text-gray-500">
                        <p>Trang History đang được phát triển...</p>
                        <p className="text-sm mt-2">Nội dung sẽ được migrate từ phiên bản cũ</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
