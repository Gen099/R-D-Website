'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

interface Competitor {
    name: string
    founded: string | number
    employees?: string
    turnaround: string
    headquarters?: string
    highlights: string
    certifications?: string[]
    notableClients?: string[]
}

interface CompetitionData {
    vietnam: Competitor[]
    global: Competitor[]
    featureComparison: {
        features: string[]
        companies: Record<string, (boolean | string)[]>
    }
    top10Ranking: Array<{
        rank: number
        company: string
        founded: number
        turnaround: string
        notableClients: string[]
        certifications: string[]
    }>
    swotAnalysis: {
        strengths: string[]
        weaknesses: string[]
        opportunities: string[]
        threats: string[]
    }
}

export default function CompetitionPage() {
    const [data, setData] = useState<CompetitionData | null>(null)
    const [activeTab, setActiveTab] = useState('vietnam')

    useEffect(() => {
        fetch('/data/competition.json')
            .then(res => res.json())
            .then(setData)
    }, [])

    if (!data) {
        return <div className={styles.loading}>Loading...</div>
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>🎯 Phân tích Cạnh tranh</h1>
                <p className={styles.subtitle}>Đối thủ Việt Nam, Toàn cầu, và SWOT Analysis</p>
            </header>

            {/* Tabs */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'vietnam' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('vietnam')}
                >
                    Việt Nam
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'global' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('global')}
                >
                    Toàn cầu
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'features' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('features')}
                >
                    So sánh Features
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'top10' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('top10')}
                >
                    Top 10 Ranking
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'swot' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('swot')}
                >
                    SWOT Analysis
                </button>
            </div>

            {/* Vietnam Competitors */}
            {activeTab === 'vietnam' && (
                <div className={styles.content}>
                    <h2>Đối thủ tại Việt Nam</h2>
                    <div className={styles.competitorsGrid}>
                        {data.vietnam.map((comp, index) => (
                            <div key={index} className={styles.competitorCard}>
                                <h3>{comp.name}</h3>
                                <div className={styles.compInfo}>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Thành lập:</span>
                                        <span>{comp.founded}</span>
                                    </div>
                                    {comp.employees && (
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Nhân sự:</span>
                                            <span>{comp.employees}</span>
                                        </div>
                                    )}
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Turnaround:</span>
                                        <span className={styles.badge}>{comp.turnaround}</span>
                                    </div>
                                    {comp.headquarters && (
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>HQ:</span>
                                            <span>{comp.headquarters}</span>
                                        </div>
                                    )}
                                </div>
                                <p className={styles.highlights}>{comp.highlights}</p>
                                {comp.certifications && comp.certifications.length > 0 && (
                                    <div className={styles.certs}>
                                        {comp.certifications.map((cert, i) => (
                                            <span key={i} className={styles.certBadge}>{cert}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Global Competitors */}
            {activeTab === 'global' && (
                <div className={styles.content}>
                    <h2>Đối thủ Toàn cầu</h2>
                    <div className={styles.competitorsGrid}>
                        {data.global.map((comp, index) => (
                            <div key={index} className={styles.competitorCard}>
                                <h3>{comp.name}</h3>
                                <div className={styles.compInfo}>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>HQ:</span>
                                        <span>{comp.headquarters}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Turnaround:</span>
                                        <span className={styles.badge}>{comp.turnaround}</span>
                                    </div>
                                </div>
                                <p className={styles.highlights}>{comp.highlights}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Feature Comparison */}
            {activeTab === 'features' && (
                <div className={styles.content}>
                    <h2>So sánh Features</h2>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    {Object.keys(data.featureComparison.companies).map((company) => (
                                        <th key={company}>{company}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.featureComparison.features.map((feature, index) => (
                                    <tr key={index}>
                                        <td className={styles.featureName}>{feature}</td>
                                        {Object.values(data.featureComparison.companies).map((values, compIndex) => (
                                            <td key={compIndex} className={styles.featureCell}>
                                                {values[index] === true ? '✅' :
                                                    values[index] === false ? '❌' :
                                                        values[index]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Top 10 Ranking */}
            {activeTab === 'top10' && (
                <div className={styles.content}>
                    <h2>Top 10 Real Estate Photo Editing Companies 2026</h2>
                    <div className={styles.rankingList}>
                        {data.top10Ranking.map((company) => (
                            <div key={company.rank} className={styles.rankingCard}>
                                <div className={styles.rankNumber}>{company.rank}</div>
                                <div className={styles.rankContent}>
                                    <h3>{company.company}</h3>
                                    <div className={styles.rankInfo}>
                                        <span>Thành lập: {company.founded}</span>
                                        <span>•</span>
                                        <span>Turnaround: {company.turnaround}</span>
                                    </div>
                                    {company.notableClients.length > 0 && (
                                        <div className={styles.clients}>
                                            <strong>Khách hàng:</strong> {company.notableClients.join(', ')}
                                        </div>
                                    )}
                                    {company.certifications.length > 0 && (
                                        <div className={styles.certs}>
                                            {company.certifications.map((cert, i) => (
                                                <span key={i} className={styles.certBadge}>{cert}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* SWOT Analysis */}
            {activeTab === 'swot' && (
                <div className={styles.content}>
                    <h2>SWOT Analysis - Fotober</h2>
                    <div className={styles.swotGrid}>
                        <div className={styles.swotCard} style={{ borderColor: 'var(--color-success)' }}>
                            <h3 style={{ color: 'var(--color-success)' }}>💪 Strengths (Điểm mạnh)</h3>
                            <ul>
                                {data.swotAnalysis.strengths.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.swotCard} style={{ borderColor: 'var(--color-error)' }}>
                            <h3 style={{ color: 'var(--color-error)' }}>⚠️ Weaknesses (Điểm yếu)</h3>
                            <ul>
                                {data.swotAnalysis.weaknesses.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.swotCard} style={{ borderColor: 'var(--color-info)' }}>
                            <h3 style={{ color: 'var(--color-info)' }}>🚀 Opportunities (Cơ hội)</h3>
                            <ul>
                                {data.swotAnalysis.opportunities.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.swotCard} style={{ borderColor: 'var(--color-warning)' }}>
                            <h3 style={{ color: 'var(--color-warning)' }}>⚡ Threats (Mối đe dọa)</h3>
                            <ul>
                                {data.swotAnalysis.threats.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
