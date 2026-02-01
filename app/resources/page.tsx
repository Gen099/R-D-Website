'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'
import DocumentViewer from '@/components/DocumentViewer'

export default function ResourcesPage() {
    const [data, setData] = useState<any>(null)
    const [activeCategory, setActiveCategory] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedType, setSelectedType] = useState('all')
    const [viewerOpen, setViewerOpen] = useState(false)
    const [viewerUrl, setViewerUrl] = useState('')
    const [viewerTitle, setViewerTitle] = useState('')


    useEffect(() => {
        fetch('/data/resources.json')
            .then((res) => res.json())
            .then(setData)
    }, [])

    if (!data) {
        return <div className={styles.loading}>Loading...</div>
    }

    const { categories, metadata } = data

    // Get all resources
    const allResources = categories.flatMap((cat: any) =>
        cat.resources.map((res: any) => ({ ...res, categoryId: cat.id, categoryIcon: cat.icon }))
    )

    // Filter resources
    const filteredResources = allResources.filter((resource: any) => {
        const matchesCategory = activeCategory === 'all' || resource.categoryId === activeCategory
        const matchesSearch =
            resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.titleVi.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesType = selectedType === 'all' || resource.type === selectedType
        return matchesCategory && matchesSearch && matchesType
    })

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'template':
                return '📄'
            case 'workflow':
                return '🔄'
            case 'form':
                return '📋'
            case 'library':
                return '📚'
            default:
                return '📌'
        }
    }

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'template':
                return styles.badgeTemplate
            case 'workflow':
                return styles.badgeWorkflow
            case 'form':
                return styles.badgeForm
            case 'library':
                return styles.badgeLibrary
            default:
                return styles.badgeDefault
        }
    }

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <h1>🚀 Fotober R&D Hub</h1>
                <p>Trung tâm quản lý tài liệu R&D - {metadata.totalResources} tài nguyên</p>
            </div>

            {/* Stats */}
            <div className={styles.stats}>
                {categories.map((cat: any) => (
                    <div key={cat.id} className={styles.statCard}>
                        <div className={styles.statIcon}>{cat.icon}</div>
                        <div className={styles.statInfo}>
                            <div className={styles.statValue}>{cat.resources.length}</div>
                            <div className={styles.statLabel}>{cat.nameVi}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className={styles.filters}>
                <div className={styles.filterGroup}>
                    <label>🔍 Tìm kiếm:</label>
                    <input
                        type="text"
                        placeholder="Tìm theo tên hoặc mô tả..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <label>📂 Danh mục:</label>
                    <select
                        className={styles.filterSelect}
                        value={activeCategory}
                        onChange={(e) => setActiveCategory(e.target.value)}
                    >
                        <option value="all">Tất cả danh mục</option>
                        {categories.map((cat: any) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.icon} {cat.nameVi}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label>🏷️ Loại:</label>
                    <select
                        className={styles.filterSelect}
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="all">Tất cả loại</option>
                        <option value="template">📄 Template</option>
                        <option value="workflow">🔄 Workflow</option>
                        <option value="form">📋 Form</option>
                        <option value="library">📚 Library</option>
                    </select>
                </div>
            </div>

            {/* Results count */}
            <div className={styles.resultsCount}>
                Hiển thị <strong>{filteredResources.length}</strong> tài liệu
            </div>

            {/* Resources Grid */}
            <div className={styles.resourcesGrid}>
                {filteredResources.length > 0 ? (
                    filteredResources.map((resource: any) => (
                        <div key={resource.id} className={styles.resourceCard}>
                            <div className={styles.cardHeader}>
                                <span className={styles.categoryIcon}>{resource.categoryIcon}</span>
                                <span className={`${styles.typeBadge} ${getTypeBadge(resource.type)}`}>
                                    {getTypeIcon(resource.type)} {resource.type}
                                </span>
                            </div>

                            <h3>{resource.titleVi}</h3>
                            <div className={styles.titleEn}>{resource.title}</div>

                            <p className={styles.description}>{resource.description}</p>

                            <div className={styles.tags}>
                                {resource.tags.map((tag: string, i: number) => (
                                    <span key={i} className={styles.tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className={styles.cardActions}>
                                <button
                                    onClick={() => {
                                        setViewerUrl(resource.url)
                                        setViewerTitle(resource.titleVi)
                                        setViewerOpen(true)
                                    }}
                                    className={styles.previewButton}
                                >
                                    👁️ Preview
                                </button>
                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.openButton}
                                >
                                    📖 Mở trong Notion →
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.noResults}>
                        <div className={styles.noResultsIcon}>🔍</div>
                        <h3>Không tìm thấy tài liệu</h3>
                        <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                    </div>
                )}
            </div>

            {/* Categories Section */}
            <div className={styles.categoriesSection}>
                <h2>📚 Danh Mục Tài Liệu</h2>
                <div className={styles.categoriesGrid}>
                    {categories.map((cat: any) => (
                        <div key={cat.id} className={styles.categoryCard}>
                            <div className={styles.categoryHeader}>
                                <span className={styles.categoryIconLarge}>{cat.icon}</span>
                                <h3>{cat.nameVi}</h3>
                            </div>
                            <p>{cat.description}</p>
                            <div className={styles.categoryStats}>
                                <span>{cat.resources.length} tài liệu</span>
                                <button
                                    className={styles.viewButton}
                                    onClick={() => setActiveCategory(cat.id)}
                                >
                                    Xem tất cả →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Info */}
            <div className={styles.footerInfo}>
                <p>
                    📅 Cập nhật lần cuối: {metadata.lastUpdated} | Version {metadata.version}
                </p>
                <p>
                    💡 Tất cả tài liệu được lưu trữ trên Notion. Click vào từng tài liệu để xem chi tiết.
                </p>
            </div>

            {/* Document Viewer Modal */}
            {viewerOpen && (
                <DocumentViewer
                    url={viewerUrl}
                    type="notion"
                    title={viewerTitle}
                    onClose={() => setViewerOpen(false)}
                />
            )}
        </div>
    )
}

