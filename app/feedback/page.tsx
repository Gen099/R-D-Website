'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'
import Script from 'next/script'

export default function FeedbackPage() {
    const [data, setData] = useState<any>(null)
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        fetch('/data/feedback.json')
            .then((res) => res.json())
            .then(setData)
    }, [])

    useEffect(() => {
        if (data && typeof window !== 'undefined' && (window as any).Chart) {
            initCharts()
        }
    }, [data, activeTab])

    const initCharts = () => {
        const Chart = (window as any).Chart
        if (!Chart || !data) return

        // Error Type Chart
        const errorTypeCtx = document.getElementById('errorTypeChart') as any
        if (errorTypeCtx) {
            new Chart(errorTypeCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: data.errorTypes.map((e: any) => e.name),
                    datasets: [
                        {
                            label: 'Tỷ lệ %',
                            data: data.errorTypes.map((e: any) => e.percentage),
                            backgroundColor: '#1976d2',
                            borderRadius: 3,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 40,
                            ticks: { callback: (value: any) => value + '%' },
                        },
                    },
                },
            })
        }

        // Project Status Chart
        const projectStatusCtx = document.getElementById('projectStatusChart') as any
        if (projectStatusCtx) {
            new Chart(projectStatusCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Có lỗi (82%)', 'Không lỗi (18%)'],
                    datasets: [
                        {
                            data: [data.overview.errorJobs, data.overview.noErrorJobs],
                            backgroundColor: ['#d32f2f', '#388e3c'],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'bottom' } },
                },
            })
        }

        // Error Category Chart
        const errorCategoryCtx = document.getElementById('errorCategoryChart') as any
        if (errorCategoryCtx) {
            new Chart(errorCategoryCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: data.errorCategories.map((e: any) => e.name),
                    datasets: [
                        {
                            label: 'Số lượng job',
                            data: data.errorCategories.map((e: any) => e.count),
                            backgroundColor: '#1976d2',
                            borderRadius: 3,
                        },
                    ],
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { x: { beginAtZero: true, max: 8 } },
                },
            })
        }
    }

    if (!data) {
        return <div className={styles.loading}>Loading...</div>
    }

    const {
        overview,
        errorTypes,
        requirementErrors,
        technicalErrors,
        goals,
        qcChecklist,
        tools,
        promptGuide,
        toolSelection,
        preGenerateChecklist,
        postGenerateChecklist,
    } = data

    return (
        <>
            <Script
                src="https://cdn.jsdelivr.net/npm/chart.js"
                strategy="afterInteractive"
                onLoad={() => {
                    if (data) initCharts()
                }}
            />
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
                                <div className={styles.statNumber} style={{ color: '#333' }}>
                                    {overview.totalJobs}
                                </div>
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

                        {/* Charts Row */}
                        <div className={styles.twoCol}>
                            <div className={styles.chartContainer}>
                                <h2 className={styles.chartTitle}>Phân bố loại lỗi</h2>
                                <canvas id="errorTypeChart"></canvas>
                            </div>
                            <div className={styles.chartContainer}>
                                <h2 className={styles.chartTitle}>Tỷ lệ dự án</h2>
                                <canvas id="projectStatusChart"></canvas>
                            </div>
                        </div>

                        {/* Error Categories */}
                        <div className={styles.chartContainer}>
                            <h2 className={styles.chartTitle}>Chi tiết lỗi theo nhóm</h2>
                            <canvas id="errorCategoryChart"></canvas>
                        </div>

                        {/* Requirement Errors Table */}
                        <div className={styles.errorTable}>
                            <h2 className={styles.chartTitle}>Lỗi hiểu sai yêu cầu - Top cases</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Mã Job</th>
                                        <th>Yêu cầu</th>
                                        <th>Thực tế làm</th>
                                        <th>Vấn đề</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requirementErrors.map((error: any, i: number) => (
                                        <tr key={i}>
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

                        {/* Technical Errors Table */}
                        <div className={styles.errorTable}>
                            <h2 className={styles.chartTitle}>Lỗi kỹ thuật AI</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Mã Job</th>
                                        <th>Lỗi cụ thể</th>
                                        <th>Mức độ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {technicalErrors.map((error: any, i: number) => (
                                        <tr key={i}>
                                            <td>
                                                <strong>{error.jobCode}</strong>
                                            </td>
                                            <td>{error.error}</td>
                                            <td
                                                className={
                                                    error.severity === 'high' ? styles.severityHigh : styles.severityMedium
                                                }
                                            >
                                                {error.severity === 'high' ? 'Nghiêm trọng' : 'Trung bình'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Goals Comparison */}
                        <div className={styles.chartContainer}>
                            <h2 className={styles.chartTitle}>Mục tiêu cải thiện (30 ngày)</h2>
                            <div className={styles.goalComparison}>
                                {goals.map((goal: any, i: number) => (
                                    <div key={i} className={styles.goalCard}>
                                        <div className={styles.goalTitle}>{goal.name}</div>
                                        <div className={styles.goalBars}>
                                            <div className={styles.goalBar}>
                                                <span className={styles.barLabel}>Hiện tại</span>
                                                <div className={styles.barFill}>
                                                    <div
                                                        className={styles.barProgress}
                                                        style={{ width: `${goal.current}%`, background: '#d32f2f' }}
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
                                                        style={{ width: `${goal.target}%`, background: '#388e3c' }}
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
                        <div className={styles.checklist}>
                            <h2 className={styles.chartTitle}>Checklist QC trước gửi khách</h2>
                            {qcChecklist.map((item: string, i: number) => (
                                <div key={i} className={styles.checklistItem}>
                                    {item}
                                </div>
                            ))}
                        </div>

                        <div className={styles.footer}>
                            <p>Cập nhật: {overview.period}</p>
                        </div>
                    </div>
                )}

                {/* Tab 2: Prompt Guide */}
                {activeTab === 1 && (
                    <div className={styles.tabContent}>
                        <div className={styles.header}>
                            <h1>🎯 Hướng Dẫn Tối Ưu Prompt & Fix Lỗi</h1>
                            <p>Best practices và template prompt cho từng loại lỗi</p>
                        </div>

                        {/* Tools Overview */}
                        <div className={styles.guideSection}>
                            <h2>Công cụ khả dụng</h2>
                            <table className={styles.toolTable}>
                                <thead>
                                    <tr>
                                        <th>Công cụ</th>
                                        <th>Chức năng chính</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tools.map((tool: any, i: number) => (
                                        <tr key={i}>
                                            <td>
                                                <strong>{tool.name}</strong>
                                            </td>
                                            <td>{tool.function}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Prompt Guide Examples */}
                        {promptGuide.map((guide: any, i: number) => (
                            <div key={i} className={styles.guideSection}>
                                <h2>
                                    Lỗi {i + 1}: {guide.title}
                                </h2>
                                <p>
                                    <strong>Case:</strong> {guide.case}
                                </p>

                                {guide.badPrompt && (
                                    <>
                                        <h4>
                                            <span className={styles.labelBad}>Prompt sai</span>
                                        </h4>
                                        <div className={styles.codeBlock}>{guide.badPrompt}</div>
                                    </>
                                )}

                                <h4>
                                    <span className={styles.labelGood}>Prompt tối ưu</span>
                                    {guide.tool && <span className={styles.labelTool}>{guide.tool}</span>}
                                </h4>
                                <div className={styles.codeBlock}>{guide.goodPrompt}</div>

                                {guide.workflow && (
                                    <div className={styles.workflowBox}>
                                        <strong>Workflow:</strong> {guide.workflow}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Master Template */}
                        <div className={styles.guideSection}>
                            <h2>Master Prompt Template</h2>
                            <div className={styles.codeBlock}>
                                {`[SCENE DESCRIPTION]
→ Bối cảnh, thời gian, ánh sáng

[SUBJECTS]
→ Người/vật, đặc điểm cụ thể, vị trí

[ACTIONS/MOTION]
→ Hành động CHI TIẾT, timing, sequence

[CONSTRAINTS]
→ Giới hạn vật lý, logic, phải tuân thủ

[CAMERA]
→ Góc quay, movement, stability

[NEGATIVE PROMPT]
→ Những gì KHÔNG ĐƯỢC xuất hiện`}
                            </div>
                        </div>

                        {/* Tool Selection */}
                        <div className={styles.guideSection}>
                            <h2>Chọn công cụ theo loại lỗi</h2>
                            <table className={styles.toolTable}>
                                <thead>
                                    <tr>
                                        <th>Loại lỗi</th>
                                        <th>Công cụ chính</th>
                                        <th>Công cụ hỗ trợ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {toolSelection.map((item: any, i: number) => (
                                        <tr key={i}>
                                            <td>{item.errorType}</td>
                                            <td>{item.mainTool}</td>
                                            <td>{item.supportTool}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Checklists */}
                        <div className={styles.checklist}>
                            <h2 className={styles.chartTitle}>Checklist trước khi generate</h2>
                            {preGenerateChecklist.map((item: string, i: number) => (
                                <div key={i} className={styles.checklistItem}>
                                    {item}
                                </div>
                            ))}
                        </div>

                        <div className={styles.checklist}>
                            <h2 className={styles.chartTitle}>Checklist sau khi generate</h2>
                            {postGenerateChecklist.map((item: string, i: number) => (
                                <div key={i} className={styles.checklistItem}>
                                    {item}
                                </div>
                            ))}
                        </div>

                        <div className={styles.footer}>
                            <p>Template version 1.0 • Cập nhật: 31/01/2026</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
