'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

interface Effect {
    id: string
    name: string
    description: string
    price: string
    sampleLink?: string
    complexity?: string
    tier?: number
}

interface EffectsData {
    motionGraphics: Effect[]
    specialEffects: Effect[]
    transitions: Effect[]
    audioText: Effect[]
    technicalServices: Effect[]
    aiEffectsPricing: Array<{
        tier: number
        level: string
        price: string
        includes: string
    }>
}

export default function EffectsPage() {
    const [data, setData] = useState<EffectsData | null>(null)
    const [activeTab, setActiveTab] = useState('motionGraphics')

    useEffect(() => {
        fetch('/data/effects.json')
            .then(res => res.json())
            .then(setData)
    }, [])

    if (!data) {
        return <div className={styles.loading}>Loading...</div>
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>✨ Danh mục Hiệu ứng và Bảng giá</h1>
                <p className={styles.subtitle}>
                    Catalog đầy đủ các hiệu ứng video với pricing và độ phức tạp
                </p>
            </header>

            {/* Tabs */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'motionGraphics' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('motionGraphics')}
                >
                    Motion Graphics
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'specialEffects' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('specialEffects')}
                >
                    Special Effects
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'transitions' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('transitions')}
                >
                    Transitions
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'audioText' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('audioText')}
                >
                    Audio & Text
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'technical' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('technical')}
                >
                    Technical
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'aiPricing' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('aiPricing')}
                >
                    AI Pricing
                </button>
            </div>

            {/* Content */}
            <div className={styles.content}>
                {activeTab === 'motionGraphics' && (
                    <EffectsList
                        title="Motion Graphics"
                        effects={data.motionGraphics}
                        showComplexity={false}
                    />
                )}

                {activeTab === 'specialEffects' && (
                    <EffectsList
                        title="Special Effects"
                        effects={data.specialEffects}
                        showComplexity={true}
                    />
                )}

                {activeTab === 'transitions' && (
                    <EffectsList
                        title="Transitions"
                        effects={data.transitions}
                        showComplexity={false}
                    />
                )}

                {activeTab === 'audioText' && (
                    <EffectsList
                        title="Audio & Text"
                        effects={data.audioText}
                        showComplexity={false}
                    />
                )}

                {activeTab === 'technical' && (
                    <EffectsList
                        title="Technical Services"
                        effects={data.technicalServices}
                        showComplexity={false}
                    />
                )}

                {activeTab === 'aiPricing' && (
                    <div className={styles.aiPricing}>
                        <h2>AI Effects Pricing Tiers</h2>
                        <div className={styles.pricingGrid}>
                            {data.aiEffectsPricing.map((tier) => (
                                <div key={tier.tier} className={styles.pricingCard}>
                                    <div className={styles.pricingTier}>Tier {tier.tier}</div>
                                    <h3>{tier.level}</h3>
                                    <div className={styles.pricingPrice}>{tier.price}</div>
                                    <p>{tier.includes}</p>
                                </div>
                            ))}
                        </div>
                        <div className={styles.note}>
                            <strong>Lưu ý:</strong> Giá AI Effects hiện đang yêu cầu "check với team" trước khi nhận; chưa công bố chính thức.
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function EffectsList({
    title,
    effects,
    showComplexity
}: {
    title: string
    effects: Effect[]
    showComplexity: boolean
}) {
    return (
        <div className={styles.effectsList}>
            <h2>{title}</h2>
            <div className={styles.effectsGrid}>
                {effects.map((effect) => (
                    <div key={effect.id} className={styles.effectCard}>
                        <h3>{effect.name}</h3>
                        <p className={styles.effectDescription}>{effect.description}</p>
                        <div className={styles.effectPrice}>{effect.price}</div>
                        {showComplexity && effect.complexity && (
                            <div className={`${styles.complexityBadge} ${effect.complexity === 'Cao' ? styles.complexityHigh :
                                    effect.complexity === 'Trung bình' ? styles.complexityMedium :
                                        styles.complexityLow
                                }`}>
                                {effect.complexity}
                            </div>
                        )}
                        {effect.sampleLink && (
                            <a
                                href={effect.sampleLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.sampleLink}
                            >
                                🎬 Xem mẫu
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
