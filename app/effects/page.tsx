'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

export default function EffectsPage() {
    const [data, setData] = useState<any>(null)
    const [activeCategory, setActiveCategory] = useState('motion-graphics')
    const [searchTerm, setSearchTerm] = useState('')
    const [complexityFilter, setComplexityFilter] = useState('all')

    useEffect(() => {
        fetch('/data/effects.json')
            .then((res) => res.json())
            .then(setData)
    }, [])

    if (!data) {
        return <div className={styles.loading}>Loading...</div>
    }

    const { packages, surcharges, categories } = data

    // Get active category data
    const category = categories.find((c: any) => c.id === activeCategory)

    // Filter effects
    const filteredEffects = category?.effects?.filter((effect: any) => {
        const matchesSearch =
            effect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            effect.nameVi.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesComplexity =
            complexityFilter === 'all' || effect.complexity?.includes(complexityFilter)
        return matchesSearch && matchesComplexity
    })

    const getComplexityBadge = (complexity: string) => {
        if (!complexity) return null
        if (complexity.includes('low')) return styles.badgeLow
        if (complexity.includes('high')) return styles.badgeHigh
        return styles.badgeMedium
    }

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <h1>📦 Danh mục Hiệu ứng Video</h1>
                <p>Comprehensive catalog of video editing services and effects</p>
            </div>

            {/* Base Packages */}
            <div className={styles.section}>
                <h2>Gói Biên tập Cơ bản</h2>
                <div className={styles.packagesGrid}>
                    {packages.map((pkg: any) => (
                        <div key={pkg.id} className={styles.packageCard}>
                            <h3>{pkg.nameVi}</h3>
                            <div className={styles.packagePrice}>{pkg.price}</div>
                            <div className={styles.packageConditions}>{pkg.conditions}</div>
                            {Array.isArray(pkg.features) && (
                                <div className={styles.featuresList}>
                                    <strong>Bao gồm {pkg.features.length} tính năng:</strong>
                                    <ul>
                                        {pkg.features.slice(0, 5).map((feature: string, i: number) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                        {pkg.features.length > 5 && <li>+ {pkg.features.length - 5} more...</li>}
                                    </ul>
                                </div>
                            )}
                            <div className={styles.revisions}>✓ {pkg.revisions} revisions included</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Surcharges */}
            <div className={styles.section}>
                <h2>Phụ phí</h2>
                <div className={styles.surchargesGrid}>
                    {surcharges.map((item: any, i: number) => (
                        <div key={i} className={styles.surchargeItem}>
                            <span className={styles.surchargeCondition}>{item.condition}</span>
                            <span className={styles.surchargeFee}>{item.fee}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Category Tabs */}
            <div className={styles.categoryTabs}>
                {categories.map((cat: any) => (
                    <button
                        key={cat.id}
                        className={`${styles.categoryTab} ${activeCategory === cat.id ? styles.active : ''
                            }`}
                        onClick={() => setActiveCategory(cat.id)}
                    >
                        {cat.nameVi}
                        {cat.effects && <span className={styles.count}>({cat.effects.length})</span>}
                    </button>
                ))}
            </div>

            {/* Filters */}
            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="🔍 Tìm kiếm hiệu ứng..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className={styles.filterSelect}
                    value={complexityFilter}
                    onChange={(e) => setComplexityFilter(e.target.value)}
                >
                    <option value="all">Tất cả độ phức tạp</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            {/* Category Info */}
            {category && (
                <div className={styles.categoryInfo}>
                    <h2>{category.nameVi}</h2>
                    <p>{category.description}</p>
                    {category.note && (
                        <div className={styles.noteBox}>
                            <strong>⚠️ Lưu ý:</strong> {category.note}
                        </div>
                    )}
                    {category.workflow && (
                        <div className={styles.workflowBox}>
                            <strong>📋 Quy trình:</strong>
                            <ol>
                                {category.workflow.map((step: string, i: number) => (
                                    <li key={i}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    )}
                </div>
            )}

            {/* Effects Grid */}
            <div className={styles.effectsGrid}>
                {filteredEffects && filteredEffects.length > 0 ? (
                    filteredEffects.map((effect: any) => (
                        <div key={effect.id} className={styles.effectCard}>
                            <div className={styles.effectHeader}>
                                {effect.complexity && (
                                    <span className={`${styles.badge} ${getComplexityBadge(effect.complexity)}`}>
                                        {effect.complexity}
                                    </span>
                                )}
                                <span className={styles.price}>{effect.price}</span>
                            </div>

                            <h3>{effect.nameVi}</h3>
                            <div className={styles.effectNameEn}>{effect.name}</div>

                            {effect.description && (
                                <p className={styles.description}>{effect.description}</p>
                            )}

                            {effect.footageRequirements && effect.footageRequirements.length > 0 && (
                                <div className={styles.requirements}>
                                    <strong>📋 Yêu cầu footage:</strong>
                                    <ul>
                                        {effect.footageRequirements.map((req: string, i: number) => (
                                            <li key={i}>{req}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {effect.note && (
                                <div className={styles.effectNote}>
                                    <strong>⚠️</strong> {effect.note}
                                </div>
                            )}

                            {effect.errorRate && (
                                <div className={styles.errorRate}>
                                    <strong>Tỷ lệ lỗi:</strong> {effect.errorRate}%
                                </div>
                            )}

                            <div className={styles.effectLinks}>
                                {effect.sampleLink && (
                                    <a
                                        href={effect.sampleLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.linkButton}
                                    >
                                        📹 View Sample
                                    </a>
                                )}
                                {effect.footageSampleLink && (
                                    <a
                                        href={effect.footageSampleLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.linkButton}
                                    >
                                        📁 Footage Sample
                                    </a>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.noResults}>
                        Không tìm thấy hiệu ứng phù hợp. Thử tìm kiếm khác!
                    </div>
                )}
            </div>

            {/* AI Effects Samples */}
            {activeCategory === 'ai-effects' && category.sampleLinks && (
                <div className={styles.section}>
                    <h3>Sample Links tham khảo:</h3>
                    <div className={styles.sampleLinks}>
                        {category.sampleLinks.map((link: string, i: number) => (
                            <a
                                key={i}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.sampleLink}
                            >
                                Sample {i + 1}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
