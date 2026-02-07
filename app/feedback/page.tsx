'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import FeedbackReportTab from '@/components/feedback/FeedbackReportTab'
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
                            AI Video Effects Database
                        </button>
                        <button
                            className={`${styles.tabButton} ${activeTab === 1 ? styles.active : ''}`}
                            onClick={() => setActiveTab(1)}
                        >
                            Hướng Dẫn Prompt
                        </button>
                        <button
                            className={`${styles.tabButton} ${activeTab === 2 ? styles.active : ''}`}
                            onClick={() => setActiveTab(2)}
                        >
                            GGsheet
                        </button>
                    </div>
                </div>

                {/* Tab 1: AI Video Effects Database */}
                {activeTab === 0 && (
                    <div className={styles.tabContent}>
                        <div style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '60px 40px',
                            textAlign: 'center',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                        }}>
                            <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#1e293b' }}>
                                🎬 AI Video Effects Database v2.0
                            </h2>
                            <p style={{ fontSize: '1.1em', color: '#64748b', marginBottom: '30px' }}>
                                Công cụ & Quy trình
                            </p>
                            <a
                                href="/ai-video-effects.html"
                                target="_blank"
                                style={{
                                    display: 'inline-block',
                                    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                                    color: 'white',
                                    padding: '15px 40px',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    fontSize: '1.1em',
                                    fontWeight: 600,
                                    boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
                                    transition: 'transform 0.3s ease'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                Mở AI Video Effects Database →
                            </a>
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


                {/* Tab 3: GGsheet - Full Feedback Report */}
                {activeTab === 2 && <FeedbackReportTab />}


            </div>
        </>
    )
}
