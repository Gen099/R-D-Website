'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

interface ErrorGroup {
    name: string
    count: number
    percentage: number
    color: string
}

interface FeedbackData {
    overview: {
        totalJobs: number
        dataSource: string
        period: string
        errorGroups: {
            A: ErrorGroup
            B: ErrorGroup
            C: ErrorGroup
            D: ErrorGroup
        }
    }
    errorRateByEffect: Array<{
        effect: string
        totalJobs: number
        errors: number
        errorRate: number
    }>
}

export default function FeedbackPage() {
    const [data, setData] = useState<FeedbackData | null>(null)

    useEffect(() => {
        fetch('/data/feedback.json')
            .then(res => res.json())
            .then(setData)
    }, [])

    if (!data) {
        return <div className={styles.loading}>Loading...</div>
    }

    const { overview, errorRateByEffect } = data

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>📈 Phân tích Feedback và Lỗi</h1>
                <p className={styles.subtitle}>
                    Nguồn: {overview.dataSource} | Thời điểm: {overview.period}
                </p>
            </header>

            {/* Overview Metrics */}
            <section className={styles.section}>
                <h2>Tổng quan</h2>
                <div className={styles.metricsGrid}>
                    <div className={styles.metricCard}>
                        <div className={styles.metricValue}>{overview.totalJobs}</div>
                        <div className={styles.metricLabel}>Tổng số jobs</div>
                    </div>
                    <div className={styles.metricCard}>
                        <div className={styles.metricValue}>4</div>
                        <div className={styles.metricLabel}>Nhóm lỗi</div>
                    </div>
                    <div className={styles.metricCard}>
                        <div className={styles.metricValue}>100%</div>
                        <div className={styles.metricLabel}>Có feedback</div>
                    </div>
                </div>
            </section>

            {/* Error Distribution */}
            <section className={styles.section}>
                <h2>Phân bố lỗi theo nhóm</h2>
                <div className={styles.errorGroups}>
                    {Object.entries(overview.errorGroups).map(([key, group]) => (
                        <div key={key} className={styles.errorGroup}>
                            <div className={styles.errorHeader}>
                                <span className={styles.errorBadge} style={{ backgroundColor: group.color }}>
                                    Nhóm {key}
                                </span>
                                <span className={styles.errorPercentage}>{group.percentage}%</span>
                            </div>
                            <h3>{group.name}</h3>
                            <div className={styles.errorBar}>
                                <div
                                    className={styles.errorBarFill}
                                    style={{
                                        width: `${group.percentage}%`,
                                        backgroundColor: group.color
                                    }}
                                />
                            </div>
                            <p className={styles.errorCount}>{group.count} cases</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Error Rate by Effect */}
            <section className={styles.section}>
                <h2>Tỷ lệ lỗi theo loại hiệu ứng</h2>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Loại hiệu ứng</th>
                                <th>Tổng jobs</th>
                                <th>Số lỗi</th>
                                <th>Tỷ lệ lỗi</th>
                                <th>Đánh giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {errorRateByEffect.map((item, index) => (
                                <tr key={index}>
                                    <td className={styles.effectName}>{item.effect}</td>
                                    <td>{item.totalJobs}</td>
                                    <td>{item.errors}</td>
                                    <td>
                                        <span className={`${styles.badge} ${item.errorRate >= 75 ? styles.badgeError :
                                                item.errorRate >= 50 ? styles.badgeWarning :
                                                    styles.badgeSuccess
                                            }`}>
                                            {item.errorRate}%
                                        </span>
                                    </td>
                                    <td>
                                        {item.errorRate === 100 ? '❌ Không nên nhận' :
                                            item.errorRate >= 75 ? '⚠️ Rủi ro cao' :
                                                item.errorRate >= 50 ? '⚡ Cần cẩn thận' :
                                                    '✅ Ổn định'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Root Cause Analysis */}
            <section className={styles.section}>
                <h2>Root Cause Analysis</h2>
                <div className={styles.rootCauseGrid}>
                    <div className={styles.rootCauseCard}>
                        <h3>⚙️ PROCESS</h3>
                        <p>Thiếu xác nhận brief; Thiếu QC checklist; Không có multi-take policy</p>
                    </div>
                    <div className={styles.rootCauseCard}>
                        <h3>👥 PEOPLE</h3>
                        <p>Thiếu domain knowledge; Thiếu training về AI tools</p>
                    </div>
                    <div className={styles.rootCauseCard}>
                        <h3>🔧 TOOLS</h3>
                        <p>AI hallucination; Giới hạn của công nghệ hiện tại</p>
                    </div>
                    <div className={styles.rootCauseCard}>
                        <h3>📥 INPUT</h3>
                        <p>Brief không rõ ràng; Reference không đầy đủ</p>
                    </div>
                    <div className={styles.rootCauseCard}>
                        <h3>📤 OUTPUT</h3>
                        <p>QC không nghiêm ngặt; Không có tiêu chuẩn rõ ràng</p>
                    </div>
                </div>
            </section>

            {/* Action Items */}
            <section className={styles.section}>
                <h2>Hành động ưu tiên</h2>
                <div className={styles.actionItems}>
                    <div className={styles.actionItem}>
                        <span className={styles.actionPriority}>🔴 Cao</span>
                        <div>
                            <strong>Brief Confirmation bắt buộc</strong>
                            <p>Giảm 35% lỗi nhóm A</p>
                        </div>
                    </div>
                    <div className={styles.actionItem}>
                        <span className={styles.actionPriority}>🟡 Trung bình</span>
                        <div>
                            <strong>Multi-take policy</strong>
                            <p>Tạo 3-5 takes cho AI effects</p>
                        </div>
                    </div>
                    <div className={styles.actionItem}>
                        <span className={styles.actionPriority}>🟢 Thấp</span>
                        <div>
                            <strong>Prompt Library</strong>
                            <p>Sử dụng template đã test</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
