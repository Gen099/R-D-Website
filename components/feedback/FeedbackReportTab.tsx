'use client'

import { useState, useEffect } from 'react'
import styles from './FeedbackReport.module.css'
import MediaPreview from './MediaPreview'
import { getMediaType } from '@/lib/utils/mediaUtils'

export default function FeedbackReportTab() {
    const [viewMode, setViewMode] = useState<'formatted' | 'sheet'>('formatted')
    const [reportData, setReportData] = useState<any>(null)
    const [expandedJobs, setExpandedJobs] = useState<Set<number>>(new Set())
    const [filterType, setFilterType] = useState<string>('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [fullscreenSheet, setFullscreenSheet] = useState(false)

    useEffect(() => {
        fetch('/data/feedback-report.json')
            .then(res => res.json())
            .then(data => setReportData(data))
    }, [])

    if (!reportData) {
        return <div className={styles.loading}>Đang tải dữ liệu...</div>
    }

    const toggleJob = (jobId: number) => {
        const newExpanded = new Set(expandedJobs)
        if (newExpanded.has(jobId)) {
            newExpanded.delete(jobId)
        } else {
            newExpanded.add(jobId)
        }
        setExpandedJobs(newExpanded)
    }

    const filteredJobs = reportData.jobs.filter((job: any) => {
        const matchesFilter = filterType === 'all' || job.errorType === filterType
        const matchesSearch = job.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.effect.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesFilter && matchesSearch
    })

    return (
        <div className={styles.container}>
            {/* Header with View Toggle */}
            <div className={styles.header}>
                <div>
                    <h1>📊 Báo Cáo Feedback AI Video</h1>
                    <p>Chi tiết 22 jobs feedback từ khách hàng - {reportData.overview.period}</p>
                </div>
                <div className={styles.viewToggle}>
                    <button
                        className={viewMode === 'formatted' ? styles.active : ''}
                        onClick={() => setViewMode('formatted')}
                    >
                        📝 Formatted View
                    </button>
                    <button
                        className={viewMode === 'sheet' ? styles.active : ''}
                        onClick={() => setViewMode('sheet')}
                    >
                        📄 Google Sheet
                    </button>
                </div>
            </div>

            {/* Formatted View */}
            {viewMode === 'formatted' && (
                <>
                    {/* Statistics Dashboard */}
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>📊</div>
                            <div className={styles.statValue}>{reportData.overview.totalJobs}</div>
                            <div className={styles.statLabel}>Tổng Jobs</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>✅</div>
                            <div className={styles.statValue}>{reportData.overview.confirmed}</div>
                            <div className={styles.statLabel}>Đã xác nhận</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>❌</div>
                            <div className={styles.statValue}>{reportData.overview.rejected}</div>
                            <div className={styles.statLabel}>Từ chối</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>📝</div>
                            <div className={styles.statValue}>{reportData.overview.noted}</div>
                            <div className={styles.statLabel}>Ghi nhận</div>
                        </div>
                    </div>

                    {/* Error Distribution */}
                    <div className={styles.errorDist}>
                        <h2>📊 Phân Bố Loại Lỗi</h2>
                        <div className={styles.errorBars}>
                            {reportData.errorDistribution.map((error: any, i: number) => (
                                <div key={i} className={styles.errorBar}>
                                    <div className={styles.errorLabel}>
                                        <span>{error.type}</span>
                                        <span className={styles.errorCount}>{error.count} ({error.percentage}%)</span>
                                    </div>
                                    <div className={styles.barContainer}>
                                        <div
                                            className={styles.bar}
                                            style={{
                                                width: `${error.percentage * 2.5}%`,
                                                background: error.color
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Filters & Search */}
                    <div className={styles.controls}>
                        <div className={styles.filterGroup}>
                            <label>Lọc theo loại lỗi:</label>
                            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                <option value="all">Tất cả</option>
                                {reportData.errorDistribution.map((error: any, i: number) => (
                                    <option key={i} value={error.type}>{error.type}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.searchGroup}>
                            <input
                                type="text"
                                placeholder="🔍 Tìm job code hoặc effect..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Job Cards */}
                    <div className={styles.jobsSection}>
                        <h2>🗂️ Chi Tiết Từng Job ({filteredJobs.length})</h2>
                        <div className={styles.jobsList}>
                            {filteredJobs.map((job: any) => (
                                <div key={job.id} className={styles.jobCard}>
                                    <div
                                        className={styles.jobHeader}
                                        onClick={() => toggleJob(job.id)}
                                    >
                                        <div className={styles.jobTitle}>
                                            <span className={styles.jobCode}>{job.code}</span>
                                            <span className={styles.jobEffect}>{job.effect}</span>
                                        </div>
                                        <div className={styles.jobMeta}>
                                            {job.status === 'confirmed' && <span className={`${styles.badge} ${styles.confirmed}`}>✓ Xác nhận</span>}
                                            {job.person && <span className={`${styles.badge} ${styles.person}`}>👤 {job.person}</span>}
                                            <span className={`${styles.badge} ${styles.error}`}>{job.errorType}</span>
                                            <span className={styles.expandIcon}>
                                                {expandedJobs.has(job.id) ? '▼' : '▶'}
                                            </span>
                                        </div>
                                    </div>

                                    {expandedJobs.has(job.id) && (
                                        <div className={styles.jobDetails}>
                                            {job.inputUrl && (
                                                <div className={styles.detailRow}>
                                                    <strong>📥 Input:</strong>
                                                    <MediaPreview
                                                        url={job.inputUrl}
                                                        type={getMediaType(job.inputUrl)}
                                                        alt={`Input for ${job.code}`}
                                                    />
                                                    <a href={job.inputUrl} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                                                        🔗 Mở trong Dropbox
                                                    </a>
                                                </div>
                                            )}
                                            {job.outputUrl && (
                                                <div className={styles.detailRow}>
                                                    <strong>📤 Output:</strong>
                                                    <MediaPreview
                                                        url={job.outputUrl}
                                                        type={getMediaType(job.outputUrl)}
                                                        alt={`Output for ${job.code}`}
                                                    />
                                                    <a href={job.outputUrl} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                                                        🔗 Xem trong Dropbox
                                                    </a>
                                                </div>
                                            )}
                                            {job.feedback && (
                                                <div className={styles.detailRow}>
                                                    <strong>💬 Feedback:</strong>
                                                    <p className={styles.feedback}>{job.feedback}</p>
                                                </div>
                                            )}
                                            {job.promptImageUrl && (
                                                <div className={styles.detailRow}>
                                                    <strong>🖼️ Prompt ảnh:</strong>
                                                    <a href={job.promptImageUrl} target="_blank" rel="noopener noreferrer">
                                                        Xem prompt
                                                    </a>
                                                </div>
                                            )}
                                            {job.promptVideo && (
                                                <div className={styles.detailRow}>
                                                    <strong>🎬 Prompt video:</strong>
                                                    <pre className={styles.promptCode}>{job.promptVideo}</pre>
                                                </div>
                                            )}
                                            {job.note && (
                                                <div className={styles.detailRow}>
                                                    <strong>📌 Ghi chú:</strong>
                                                    <p className={styles.note}>{job.note}</p>
                                                </div>
                                            )}
                                            {job.sampleUrl && (
                                                <div className={styles.detailRow}>
                                                    <strong>🔗 Sample:</strong>
                                                    <MediaPreview
                                                        url={job.sampleUrl}
                                                        type="instagram"
                                                        alt="Sample reference"
                                                    />
                                                    <a href={job.sampleUrl} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                                                        🔗 Xem trong Instagram
                                                    </a>
                                                </div>
                                            )}
                                            {job.details && (
                                                <div className={styles.detailRow}>
                                                    <strong>ℹ️ Chi tiết:</strong>
                                                    <p className={styles.details}>{job.details}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Person Stats */}
                    <div className={styles.personStats}>
                        <h2>👥 Thống Kê Theo Người Làm</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Người làm</th>
                                    <th>Số jobs</th>
                                    <th>Job codes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.personStats.map((person: any, i: number) => (
                                    <tr key={i}>
                                        <td><strong>{person.person}</strong></td>
                                        <td>{person.count}</td>
                                        <td className={styles.jobCodes}>
                                            {person.jobs.length > 0 ? person.jobs.join(', ') : 'Các job còn lại'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Samples */}
                    <div className={styles.samples}>
                        <h2>📺 Samples Tham Khảo</h2>
                        <div className={styles.sampleGrid}>
                            {reportData.samples.map((sample: any, i: number) => (
                                <a
                                    key={i}
                                    href={sample.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.sampleCard}
                                >
                                    <span className={styles.sampleIcon}>🎬</span>
                                    <span>{sample.title}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Sheet View */}
            {viewMode === 'sheet' && (
                <div className={`${styles.sheetView} ${fullscreenSheet ? styles.fullscreen : ''}`}>
                    <div className={styles.sheetControls}>
                        <button onClick={() => setFullscreenSheet(!fullscreenSheet)}>
                            {fullscreenSheet ? '🗗 Exit Fullscreen' : '⛶ Fullscreen'}
                        </button>
                        <a
                            href="https://docs.google.com/spreadsheets/d/1ulrICF3uoc0p8fsJFYqMMNZ-yraZF-z6w303uYaCmmo/edit?gid=0#gid=0"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            🔗 Mở trong Google Sheets
                        </a>
                    </div>
                    <iframe
                        src="https://docs.google.com/spreadsheets/d/1ulrICF3uoc0p8fsJFYqMMNZ-yraZF-z6w303uYaCmmo/preview?widget=true&headers=false"
                        title="Feedback Report Google Sheet"
                    />
                </div>
            )}
        </div>
    )
}
