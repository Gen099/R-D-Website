import styles from './page.module.css'

export default function PlatformPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>🏗️ AI Platform Design</h1>
                <p className={styles.subtitle}>Kiến trúc hệ thống và Roadmap phát triển</p>
            </header>

            {/* System Architecture */}
            <section className={styles.section}>
                <h2>Kiến trúc hệ thống</h2>
                <div className={styles.architectureGrid}>
                    <div className={styles.archCard}>
                        <div className={styles.archIcon}>🎨</div>
                        <h3>Frontend Layer</h3>
                        <ul>
                            <li>Next.js 15 (App Router)</li>
                            <li>React 18 + TypeScript</li>
                            <li>CSS Modules + Variables</li>
                            <li>Responsive Design</li>
                        </ul>
                    </div>

                    <div className={styles.archCard}>
                        <div className={styles.archIcon}>⚙️</div>
                        <h3>Backend Layer</h3>
                        <ul>
                            <li>Next.js API Routes</li>
                            <li>PostgreSQL (Vercel)</li>
                            <li>RESTful APIs</li>
                            <li>Authentication (Future)</li>
                        </ul>
                    </div>

                    <div className={styles.archCard}>
                        <div className={styles.archIcon}>🤖</div>
                        <h3>AI Integration</h3>
                        <ul>
                            <li>Kling AI API</li>
                            <li>Veo 2/3.1 API</li>
                            <li>Runway Gen-3 API</li>
                            <li>Custom Prompt Engine</li>
                        </ul>
                    </div>

                    <div className={styles.archCard}>
                        <div className={styles.archIcon}>💾</div>
                        <h3>Data Storage</h3>
                        <ul>
                            <li>JSON Files (Current)</li>
                            <li>PostgreSQL (Future)</li>
                            <li>Vercel Blob Storage</li>
                            <li>CDN for Assets</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Core Modules */}
            <section className={styles.section}>
                <h2>Core Modules</h2>
                <div className={styles.modulesGrid}>
                    <div className={styles.moduleCard}>
                        <h3>📊 Dashboard</h3>
                        <p>Metrics overview, quick insights, module navigation</p>
                        <span className={styles.statusBadge} style={{ background: 'var(--color-success)' }}>✅ Live</span>
                    </div>

                    <div className={styles.moduleCard}>
                        <h3>📈 Feedback Analysis</h3>
                        <p>Error tracking, root cause analysis, action items</p>
                        <span className={styles.statusBadge} style={{ background: 'var(--color-success)' }}>✅ Live</span>
                    </div>

                    <div className={styles.moduleCard}>
                        <h3>🤖 AI Problems</h3>
                        <p>Research problems, workflows, prompt examples</p>
                        <span className={styles.statusBadge} style={{ background: 'var(--color-success)' }}>✅ Live</span>
                    </div>

                    <div className={styles.moduleCard}>
                        <h3>✨ Effects Catalog</h3>
                        <p>Motion graphics, special effects, pricing tiers</p>
                        <span className={styles.statusBadge} style={{ background: 'var(--color-success)' }}>✅ Live</span>
                    </div>

                    <div className={styles.moduleCard}>
                        <h3>🎯 Competition</h3>
                        <p>Competitor analysis, SWOT, feature comparison</p>
                        <span className={styles.statusBadge} style={{ background: 'var(--color-success)' }}>✅ Live</span>
                    </div>

                    <div className={styles.moduleCard}>
                        <h3>💼 Job Description</h3>
                        <p>Role overview, responsibilities, deliverables</p>
                        <span className={styles.statusBadge} style={{ background: 'var(--color-success)' }}>✅ Live</span>
                    </div>

                    <div className={styles.moduleCard}>
                        <h3>⚙️ Operations</h3>
                        <p>Workflow, QC checklist, metrics tracking</p>
                        <span className={styles.statusBadge} style={{ background: 'var(--color-success)' }}>✅ Live</span>
                    </div>

                    <div className={styles.moduleCard}>
                        <h3>📚 Resources</h3>
                        <p>Links, documents, tools, references</p>
                        <span className={styles.statusBadge} style={{ background: 'var(--color-warning)' }}>🚧 In Progress</span>
                    </div>
                </div>
            </section>

            {/* API Endpoints */}
            <section className={styles.section}>
                <h2>API Endpoints (Future)</h2>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Endpoint</th>
                                <th>Method</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>/api/feedback</code></td>
                                <td><span className={styles.methodBadge}>GET</span></td>
                                <td>Lấy dữ liệu feedback analysis</td>
                                <td><span className={styles.statusDot} style={{ background: 'var(--color-warning)' }}>●</span> Planned</td>
                            </tr>
                            <tr>
                                <td><code>/api/effects</code></td>
                                <td><span className={styles.methodBadge}>GET</span></td>
                                <td>Lấy danh mục effects</td>
                                <td><span className={styles.statusDot} style={{ background: 'var(--color-warning)' }}>●</span> Planned</td>
                            </tr>
                            <tr>
                                <td><code>/api/prompts</code></td>
                                <td><span className={styles.methodBadge}>GET</span></td>
                                <td>Lấy prompt library</td>
                                <td><span className={styles.statusDot} style={{ background: 'var(--color-warning)' }}>●</span> Planned</td>
                            </tr>
                            <tr>
                                <td><code>/api/prompts</code></td>
                                <td><span className={styles.methodBadge} style={{ background: 'var(--color-success)' }}>POST</span></td>
                                <td>Tạo prompt mới</td>
                                <td><span className={styles.statusDot} style={{ background: 'var(--color-warning)' }}>●</span> Planned</td>
                            </tr>
                            <tr>
                                <td><code>/api/ai/generate</code></td>
                                <td><span className={styles.methodBadge} style={{ background: 'var(--color-success)' }}>POST</span></td>
                                <td>Trigger AI video generation</td>
                                <td><span className={styles.statusDot} style={{ background: 'var(--color-error)' }}>●</span> Future</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Roadmap */}
            <section className={styles.section}>
                <h2>Development Roadmap</h2>
                <div className={styles.roadmap}>
                    <div className={styles.phase}>
                        <div className={styles.phaseHeader} style={{ background: 'var(--color-success)' }}>
                            <h3>Phase 1: Foundation</h3>
                            <span className={styles.phaseStatus}>✅ Completed</span>
                        </div>
                        <div className={styles.phaseContent}>
                            <ul>
                                <li>✅ Setup Next.js project structure</li>
                                <li>✅ Design system với CSS variables</li>
                                <li>✅ Navigation và routing</li>
                                <li>✅ 8 core modules (Dashboard + 7 modules)</li>
                                <li>✅ JSON-based data storage</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.phase}>
                        <div className={styles.phaseHeader} style={{ background: 'var(--color-primary)' }}>
                            <h3>Phase 2: Enhancement</h3>
                            <span className={styles.phaseStatus}>🚧 In Progress</span>
                        </div>
                        <div className={styles.phaseContent}>
                            <ul>
                                <li>🚧 Content editing functionality</li>
                                <li>⏳ Search và filter features</li>
                                <li>⏳ Charts library (Recharts)</li>
                                <li>⏳ Export/Import data (CSV, JSON)</li>
                                <li>⏳ Dark mode toggle</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.phase}>
                        <div className={styles.phaseHeader} style={{ background: 'var(--color-info)' }}>
                            <h3>Phase 3: Backend Integration</h3>
                            <span className={styles.phaseStatus}>📋 Planned</span>
                        </div>
                        <div className={styles.phaseContent}>
                            <ul>
                                <li>⏳ PostgreSQL database setup</li>
                                <li>⏳ RESTful API endpoints</li>
                                <li>⏳ Authentication system</li>
                                <li>⏳ User roles và permissions</li>
                                <li>⏳ Real-time updates</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.phase}>
                        <div className={styles.phaseHeader} style={{ background: 'var(--color-warning)' }}>
                            <h3>Phase 4: AI Integration</h3>
                            <span className={styles.phaseStatus}>💡 Future</span>
                        </div>
                        <div className={styles.phaseContent}>
                            <ul>
                                <li>⏳ Kling AI API integration</li>
                                <li>⏳ Veo 2/3.1 API integration</li>
                                <li>⏳ Prompt testing automation</li>
                                <li>⏳ Video generation dashboard</li>
                                <li>⏳ Quality scoring AI</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className={styles.section}>
                <h2>Technology Stack</h2>
                <div className={styles.techStack}>
                    <div className={styles.techCategory}>
                        <h3>Frontend</h3>
                        <div className={styles.techBadges}>
                            <span className={styles.techBadge}>Next.js 15</span>
                            <span className={styles.techBadge}>React 18</span>
                            <span className={styles.techBadge}>TypeScript</span>
                            <span className={styles.techBadge}>CSS Modules</span>
                        </div>
                    </div>

                    <div className={styles.techCategory}>
                        <h3>Backend (Future)</h3>
                        <div className={styles.techBadges}>
                            <span className={styles.techBadge}>Node.js</span>
                            <span className={styles.techBadge}>PostgreSQL</span>
                            <span className={styles.techBadge}>Vercel</span>
                            <span className={styles.techBadge}>NextAuth</span>
                        </div>
                    </div>

                    <div className={styles.techCategory}>
                        <h3>AI Tools</h3>
                        <div className={styles.techBadges}>
                            <span className={styles.techBadge}>Kling AI</span>
                            <span className={styles.techBadge}>Veo 2/3.1</span>
                            <span className={styles.techBadge}>Runway Gen-3</span>
                            <span className={styles.techBadge}>Midjourney</span>
                        </div>
                    </div>

                    <div className={styles.techCategory}>
                        <h3>DevOps</h3>
                        <div className={styles.techBadges}>
                            <span className={styles.techBadge}>Git</span>
                            <span className={styles.techBadge}>GitHub</span>
                            <span className={styles.techBadge}>Vercel Deploy</span>
                            <span className={styles.techBadge}>CI/CD</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
