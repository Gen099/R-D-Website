'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';
import { api, type Document } from '@/lib/api/client';

export default function DocumentViewPage() {
    const params = useParams();
    const id = params.id as string;
    const [document, setDocument] = useState<Document | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadDocument(id);
        }
    }, [id]);

    const loadDocument = async (docId: string) => {
        setLoading(true);
        try {
            const doc = await api.getDocumentById(docId);
            setDocument(doc);
        } catch (error) {
            console.error('Error loading document:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-6 py-8">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    {loading ? (
                        <div className="text-center py-12">
                            <i className="fas fa-spinner fa-spin text-6xl text-orange-400 mb-4"></i>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Đang tải tài liệu...</h1>
                            <p className="text-gray-600">Tài liệu ID: {id}</p>
                        </div>
                    ) : document ? (
                        <div>
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">{document.title}</h1>
                                <p className="text-gray-600">{document.summary}</p>
                                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                                    <span><i className="fas fa-eye mr-2"></i>{document.view_count} lượt xem</span>
                                    <span><i className="fas fa-download mr-2"></i>{document.download_count} lượt tải</span>
                                    <span><i className="fas fa-calendar mr-2"></i>{new Date(document.created_at).toLocaleDateString('vi-VN')}</span>
                                </div>
                            </div>

                            {document.embed_url && (
                                <div className="mb-6">
                                    <iframe
                                        src={document.embed_url}
                                        className="w-full h-[600px] border-2 border-gray-200 rounded-lg"
                                        title={document.title}
                                    />
                                </div>
                            )}

                            <div className="flex gap-4">
                                <Link
                                    href="/documents"
                                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                                >
                                    <i className="fas fa-arrow-left mr-2"></i>Quay lại
                                </Link>
                                {document.embed_url && (
                                    <a
                                        href={document.embed_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                                    >
                                        <i className="fas fa-external-link-alt mr-2"></i>Mở trong tab mới
                                    </a>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <i className="fas fa-file-alt text-6xl text-gray-300 mb-4"></i>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy tài liệu</h1>
                            <p className="text-gray-600 mb-6">Tài liệu ID: {id}</p>
                            <Link
                                href="/documents"
                                className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                            >
                                <i className="fas fa-arrow-left mr-2"></i>Quay lại trang chủ
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
