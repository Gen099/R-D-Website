import Link from 'next/link'
import styles from './page.module.css'

export default function HomePage() {
    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>R&D Specialist Dashboard</h1>
                <p className={styles.subtitle}>Fotober AI Video Intelligence Platform</p>
            </header>

            <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>📊</div>
                    <div className={styles.metricContent}>
                        <h3>Total Jobs Analyzed</h3>
                        <p className={styles.metricValue}>23</p>
                        <p className={styles.metricLabel}>Tháng 1/2026</p>
                    </div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>❌</div>
                    <div className={styles.metricContent}>
                        <h3>Error Rate</h3>
                        <p className={styles.metricValue}>100%</p>
                        <p className={styles.metricLabel}>Cần cải thiện</p>
                    </div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>🎯</div>
                    <div className={styles.metricContent}>
                        <h3>Top Error Group</h3>
                        <p className={styles.metricValue}>Nhóm A</p>
                        <p className={styles.metricLabel}>35% - Hiểu sai brief</p>
                    </div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>⏱️</div>
                    <div className={styles.metricContent}>
                        <h3>On-time Delivery</h3>
                        <p className={styles.metricValue}>78%</p>
                        <p className={styles.metricLabel}>18/23 jobs</p>
                    </div>
                </div>
            </div>

            <div className={styles.modulesGrid}>
                <Link href="/feedback" className={styles.moduleCard}>
                    <div className={styles.moduleIcon}>📈</div>
                    <h3>Phân tích Feedback</h3>
                    <p>23 jobs, 4 nhóm lỗi, phân tích chi tiết</p>
                </Link>

                <Link href="/ai-problems" className={styles.moduleCard}>
                    <div className={styles.moduleIcon}>🤖</div>
                    <h3>Bài toán AI Agent</h3>
                    <p>2 bài toán: Agent Replacement & Image-to-Video</p>
                </Link>

                <Link href="/effects" className={styles.moduleCard}>
                    <div className={styles.moduleIcon}>✨</div>
                    <h3>Danh mục Hiệu ứng</h3>
                    <p>Motion Graphics, Special Effects, Transitions</p>
                </Link>

                <Link href="/competition" className={styles.moduleCard}>
                    <div className={styles.moduleIcon}>🎯</div>
                    <h3>Phân tích Cạnh tranh</h3>
                    <p>Top 10 ranking, SWOT analysis, feature comparison</p>
                </Link>


                <Link href="/operations" className={styles.moduleCard}>
                    <div className={styles.moduleIcon}>⚙️</div>
                    <h3>Quy trình Vận hành</h3>
                    <p>QC checklists, metrics, workflows</p>
                </Link>

                <Link href="/platform" className={styles.moduleCard}>
                    <div className={styles.moduleIcon}>🏗️</div>
                    <h3>AI Platform Design</h3>
                    <p>System architecture, modules, roadmap</p>
                </Link>

                <Link href="/resources" className={styles.moduleCard}>
                    <div className={styles.moduleIcon}>📚</div>
                    <h3>Tài nguyên</h3>
                    <p>Links, documents, tools, references</p>
                </Link>
            </div>

            <div className={styles.quickInsights}>
                <h2>Quick Insights</h2>
                <div className={styles.insightsList}>
                    <div className={styles.insightItem}>
                        <span className={styles.insightIcon}>⚠️</span>
                        <div>
                            <strong>Highest Risk Effects:</strong>
                            <p>Object Animation (100%), Creative/Fantasy (100%), Agent Composite (100%)</p>
                        </div>
                    </div>
                    <div className={styles.insightItem}>
                        <span className={styles.insightIcon}>✅</span>
                        <div>
                            <strong>Most Stable Effect:</strong>
                            <p>Day-to-Night (33% error rate, 67% success)</p>
                        </div>
                    </div>
                    <div className={styles.insightItem}>
                        <span className={styles.insightIcon}>🔧</span>
                        <div>
                            <strong>Top Priority Fix:</strong>
                            <p>Implement Brief Confirmation Checklist (giảm 35% lỗi nhóm A)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
