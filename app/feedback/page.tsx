'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

export default function FeedbackPage() {
    const [data, setData] = useState<any>(null)
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        fetch('/data/feedback.json')
            .then((res) => res.json())
            .then(setData)
    }, [])

    if (!data) {
        return <div className={styles.loading}>Loading...</div>
    }

    const { overview, errorTypes, requirementErrors, technicalErrors, goals, qcChecklist } = data

    return (
        <div className={styles.container}>
            {/* Tab Navigation */}
            <div className={styles.tabContainer}>
                <div className={styles.tabNav}>
                    <button
                        className={`${styles.tabButton} ${activeTab === 0 ? styles.active : ''}`}
                        onClick={() => setActiveTab(0)}
                    >
                        Phân Tích Lỗi
                    </button>
                    <button
                        className={`${styles.tabButton} ${activeTab === 1 ? styles.active : ''}`}
                        onClick={() => setActiveTab(1)}
                    >
                        Hướng Dẫn Prompt
                    </button>
                </div>
            </div>

            {/* Tab 1: Error Analysis */}
            {activeTab === 0 && (
                <div className={styles.tabContent}>
                    <div className={styles.header}>
                        <h1>📈 Phân Tích Lỗi AI Video</h1>
                        <p>Dashboard tổng hợp chất lượng dự án - {overview.period}</p>
                    </div>

                    {/* Stats Overview */}
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>Tổng dự án</div>
                            <div className={styles.statNumber}>{overview.totalJobs}</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>Có lỗi</div>
                            <div className={styles.statNumber} style={{ color: '#d32f2f' }}>
                                {overview.errorJobs}
                            </div>
                            <div className={styles.statPercentage}>
                                {Math.round((overview.errorJobs / overview.totalJobs) * 100)}%
                            </div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>Không lỗi</div>
                            <div className={styles.statNumber} style={{ color: '#388e3c' }}>
                                {overview.noErrorJobs}
                            </div>
                            <div className={styles.statPercentage}>
                                {Math.round((overview.noErrorJobs / overview.totalJobs) * 100)}%
                            </div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>Trễ deadline</div>
                            <div className={styles.statNumber} style={{ color: '#f57c00' }}>
                                {overview.lateJobs}
                            </div>
                            <div className={styles.statPercentage}>
                                {Math.round((overview.lateJobs / overview.totalJobs) * 100)}%
                            </div>
                        </div>
                    </div>

                    {/* Error Types */}
                    <div className={styles.section}>
                        <h2>Phân bố loại lỗi</h2>
                        <div className={styles.errorTypesGrid}>
                            {errorTypes.map((type: any, index: number) => (
                                <div key={index} className={styles.errorTypeCard}>
                                    <h3>{type.name}</h3>
                                    <div className={styles.errorTypeNumber}>{type.percentage}%</div>
                                    <div className={styles.errorTypeCount}>{type.count} jobs</div>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progressFill}
                                            style={{
                                                width: `${type.percentage}%`,
                                                background: '#1976d2',
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Requirement Errors Table */}
                    <div className={styles.section}>
                        <h2>Lỗi hiểu sai yêu cầu - Top cases</h2>
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Mã Job</th>
                                        <th>Yêu cầu</th>
                                        <th>Thực tế làm</th>
                                        <th>Vấn đề</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requirementErrors.map((error: any, index: number) => (
                                        <tr key={index}>
                                            <td>
                                                <strong>{error.jobCode}</strong>
                                            </td>
                                            <td>{error.requirement}</td>
                                            <td>{error.actual}</td>
                                            <td>{error.issue}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Technical Errors Table */}
                    <div className={styles.section}>
                        <h2>Lỗi kỹ thuật AI</h2>
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Mã Job</th>
                                        <th>Lỗi cụ thể</th>
                                        <th>Mức độ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {technicalErrors.map((error: any, index: number) => (
                                        <tr key={index}>
                                            <td>
                                                <strong>{error.jobCode}</strong>
                                            </td>
                                            <td>{error.error}</td>
                                            <td>
                                                <span
                                                    className={`${styles.badge} ${error.severity === 'high' ? styles.badgeError : styles.badgeWarning
                                                        }`}
                                                >
                                                    {error.severity === 'high' ? 'Nghiêm trọng' : 'Trung bình'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Goals */}
                    <div className={styles.section}>
                        <h2>Mục tiêu cải thiện (30 ngày)</h2>
                        <div className={styles.goalsGrid}>
                            {goals.map((goal: any, index: number) => (
                                <div key={index} className={styles.goalCard}>
                                    <div className={styles.goalTitle}>{goal.name}</div>
                                    <div className={styles.goalBars}>
                                        <div className={styles.goalBar}>
                                            <span className={styles.barLabel}>Hiện tại</span>
                                            <div className={styles.barFill}>
                                                <div
                                                    className={styles.barProgress}
                                                    style={{
                                                        width: `${goal.current}%`,
                                                        background: '#d32f2f',
                                                    }}
                                                >
                                                    {goal.current}%
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.goalBar}>
                                            <span className={styles.barLabel}>Mục tiêu</span>
                                            <div className={styles.barFill}>
                                                <div
                                                    className={styles.barProgress}
                                                    style={{
                                                        width: `${goal.target}%`,
                                                        background: '#388e3c',
                                                    }}
                                                >
                                                    {goal.target}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* QC Checklist */}
                    <div className={styles.section}>
                        <h2>Checklist QC trước gửi khách</h2>
                        <div className={styles.checklist}>
                            {qcChecklist.map((item: string, index: number) => (
                                <div key={index} className={styles.checklistItem}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Tab 2: Prompt Guide */}
            {activeTab === 1 && (
                <div className={styles.tabContent}>
                    <div className={styles.header}>
                        <h1>📝 Hướng Dẫn Tối Ưu Prompt & Fix Lỗi</h1>
                        <p>Best practices và template prompt cho từng loại lỗi</p>
                    </div>

                    <div className={styles.guideSection}>
                        <h2>Đang cập nhật...</h2>
                        <p>Nội dung hướng dẫn prompt đang được bổ sung.</p>
                    </div>
                </div>
            )}
        </div>
    )
}
