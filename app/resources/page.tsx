import styles from './page.module.css'

export default function ResourcesPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>📚 Tài nguyên R&D</h1>
                <p className={styles.subtitle}>Links, Documents, Tools, và References</p>
            </header>

            {/* AI Video Tools */}
            <section className={styles.section}>
                <h2>🤖 AI Video Generation Tools</h2>
                <div className={styles.resourcesGrid}>
                    <div className={styles.resourceCard}>
                        <div className={styles.resourceHeader}>
                            <h3>Kling AI</h3>
                            <span className={styles.tierBadge} style={{ background: 'var(--color-primary)' }}>Primary</span>
                        </div>
                        <p>Text-to-Video, Image-to-Video, Lip-sync</p>
                        <div className={styles.resourceLinks}>
                            <a href="https://klingai.com" target="_blank" rel="noopener noreferrer">🌐 Website</a>
                            <a href="https://docs.klingai.com" target="_blank" rel="noopener noreferrer">📖 Docs</a>
                        </div>
                    </div>

                    <div className={styles.resourceCard}>
                        <div className={styles.resourceHeader}>
                            <h3>Veo 2 / 3.1</h3>
                            <span className={styles.tierBadge} style={{ background: 'var(--color-info)' }}>Alternative</span>
                        </div>
                        <p>Google's video generation model</p>
                        <div className={styles.resourceLinks}>
                            <a href="https://deepmind.google/technologies/veo/" target="_blank" rel="noopener noreferrer">🌐 Website</a>
                        </div>
                    </div>

                    <div className={styles.resourceCard}>
                        <div className={styles.resourceHeader}>
                            <h3>Runway Gen-3</h3>
                            <span className={styles.tierBadge} style={{ background: 'var(--color-info)' }}>Alternative</span>
                        </div>
                        <p>Advanced video generation and editing</p>
                        <div className={styles.resourceLinks}>
                            <a href="https://runwayml.com" target="_blank" rel="noopener noreferrer">🌐 Website</a>
                            <a href="https://docs.runwayml.com" target="_blank" rel="noopener noreferrer">📖 Docs</a>
                        </div>
                    </div>

                    <div className={styles.resourceCard}>
                        <div className={styles.resourceHeader}>
                            <h3>Pika Labs</h3>
                            <span className={styles.tierBadge} style={{ background: 'var(--color-success)' }}>Testing</span>
                        </div>
                        <p>Text-to-Video with creative controls</p>
                        <div className={styles.resourceLinks}>
                            <a href="https://pika.art" target="_blank" rel="noopener noreferrer">🌐 Website</a>
                        </div>
                    </div>

                    <div className={styles.resourceCard}>
                        <div className={styles.resourceHeader}>
                            <h3>Luma Dream Machine</h3>
                            <span className={styles.tierBadge} style={{ background: 'var(--color-success)' }}>Testing</span>
                        </div>
                        <p>Fast video generation</p>
                        <div className={styles.resourceLinks}>
                            <a href="https://lumalabs.ai" target="_blank" rel="noopener noreferrer">🌐 Website</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Generation */}
            <section className={styles.section}>
                <h2>🎨 Image Generation Tools</h2>
                <div className={styles.resourcesGrid}>
                    <div className={styles.resourceCard}>
                        <div className={styles.resourceHeader}>
                            <h3>Nano Banana Pro</h3>
                            <span className={styles.tierBadge} style={{ background: 'var(--color-primary)' }}>Primary</span>
                        </div>
                        <p>High-quality image generation</p>
                        <div className={styles.resourceLinks}>
                            <a href="https://nanobanana.ai" target="_blank" rel="noopener noreferrer">🌐 Website</a>
                        </div>
                    </div>

                    <div className={styles.resourceCard}>
                        <div className={styles.resourceHeader}>
                            <h3>Midjourney</h3>
                            <span className={styles.tierBadge} style={{ background: 'var(--color-primary)' }}>Primary</span>
                        </div>
                        <p>Creative AI image generation</p>
                        <div className={styles.resourceLinks}>
                            <a href="https://midjourney.com" target="_blank" rel="noopener noreferrer">🌐 Website</a>
                            <a href="https://docs.midjourney.com" target="_blank" rel="noopener noreferrer">📖 Docs</a>
                        </div>
                    </div>

                    <div className={styles.resourceCard}>
                        <div className={styles.resourceHeader}>
                            <h3>DALL-E 3</h3>
                            <span className={styles.tierBadge} style={{ background: 'var(--color-info)' }}>Alternative</span>
                        </div>
                        <p>OpenAI's image generation</p>
                        <div className={styles.resourceLinks}>
                            <a href="https://openai.com/dall-e-3" target="_blank" rel="noopener noreferrer">🌐 Website</a>
                        </div>
                    </div>

                    <div className={styles.resourceCard}>
                        <div className={styles.resourceHeader}>
                            <h3>Stable Diffusion</h3>
                            <span className={styles.tierBadge} style={{ background: 'var(--color-success)' }}>Open Source</span>
                        </div>
                        <p>Open-source image generation</p>
                        <div className={styles.resourceLinks}>
                            <a href="https://stability.ai" target="_blank" rel="noopener noreferrer">🌐 Website</a>
                            <a href="https://github.com/Stability-AI/stablediffusion" target="_blank" rel="noopener noreferrer">💻 GitHub</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Learning Resources */}
            <section className={styles.section}>
                <h2>📖 Learning Resources</h2>
                <div className={styles.linksGrid}>
                    <div className={styles.linkCard}>
                        <h3>Prompt Engineering</h3>
                        <ul>
                            <li><a href="https://www.promptingguide.ai" target="_blank" rel="noopener noreferrer">Prompt Engineering Guide</a></li>
                            <li><a href="https://learnprompting.org" target="_blank" rel="noopener noreferrer">Learn Prompting</a></li>
                            <li><a href="https://platform.openai.com/docs/guides/prompt-engineering" target="_blank" rel="noopener noreferrer">OpenAI Prompt Engineering</a></li>
                        </ul>
                    </div>

                    <div className={styles.linkCard}>
                        <h3>AI Video Tutorials</h3>
                        <ul>
                            <li><a href="https://www.youtube.com/@runwayml" target="_blank" rel="noopener noreferrer">Runway ML YouTube</a></li>
                            <li><a href="https://www.youtube.com/@pikalabs" target="_blank" rel="noopener noreferrer">Pika Labs Tutorials</a></li>
                            <li><a href="https://www.youtube.com/results?search_query=kling+ai+tutorial" target="_blank" rel="noopener noreferrer">Kling AI Tutorials</a></li>
                        </ul>
                    </div>

                    <div className={styles.linkCard}>
                        <h3>Real Estate Video</h3>
                        <ul>
                            <li><a href="https://www.nar.realtor/video-marketing" target="_blank" rel="noopener noreferrer">NAR Video Marketing</a></li>
                            <li><a href="https://www.inman.com/category/video/" target="_blank" rel="noopener noreferrer">Inman Video Resources</a></li>
                            <li><a href="https://www.youtube.com/results?search_query=real+estate+video+best+practices" target="_blank" rel="noopener noreferrer">Best Practices</a></li>
                        </ul>
                    </div>

                    <div className={styles.linkCard}>
                        <h3>Communities</h3>
                        <ul>
                            <li><a href="https://discord.gg/runwayml" target="_blank" rel="noopener noreferrer">Runway Discord</a></li>
                            <li><a href="https://www.reddit.com/r/StableDiffusion/" target="_blank" rel="noopener noreferrer">r/StableDiffusion</a></li>
                            <li><a href="https://www.reddit.com/r/ArtificialInteligence/" target="_blank" rel="noopener noreferrer">r/ArtificialIntelligence</a></li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Internal Documents */}
            <section className={styles.section}>
                <h2>📄 Internal Documents</h2>
                <div className={styles.documentsGrid}>
                    <div className={styles.documentCard}>
                        <div className={styles.docIcon}>📋</div>
                        <h3>Prompt Library</h3>
                        <p>Collection of tested prompts for different effects</p>
                        <a href="/data/prompts.json" className={styles.docLink}>View JSON</a>
                    </div>

                    <div className={styles.documentCard}>
                        <div className={styles.docIcon}>✨</div>
                        <h3>Effects Catalog</h3>
                        <p>Complete list of available effects and pricing</p>
                        <a href="/effects" className={styles.docLink}>View Catalog</a>
                    </div>

                    <div className={styles.documentCard}>
                        <div className={styles.docIcon}>📊</div>
                        <h3>Feedback Analysis</h3>
                        <p>Error tracking and root cause analysis</p>
                        <a href="/feedback" className={styles.docLink}>View Analysis</a>
                    </div>

                    <div className={styles.documentCard}>
                        <div className={styles.docIcon}>⚙️</div>
                        <h3>Operations Manual</h3>
                        <p>Workflow, QC checklist, and metrics</p>
                        <a href="/operations" className={styles.docLink}>View Manual</a>
                    </div>

                    <div className={styles.documentCard}>
                        <div className={styles.docIcon}>🎯</div>
                        <h3>Competition Analysis</h3>
                        <p>Competitor research and SWOT analysis</p>
                        <a href="/competition" className={styles.docLink}>View Analysis</a>
                    </div>

                    <div className={styles.documentCard}>
                        <div className={styles.docIcon}>💼</div>
                        <h3>Job Description</h3>
                        <p>R&D Specialist role and responsibilities</p>
                        <a href="/job-description" className={styles.docLink}>View JD</a>
                    </div>
                </div>
            </section>

            {/* Quick Links */}
            <section className={styles.section}>
                <h2>🔗 Quick Links</h2>
                <div className={styles.quickLinks}>
                    <a href="https://www.dropbox.com/scl/fo/hxrm9ggzzoiqh9a7cusdk/ALSujZioqdzdFqS5elMvJag" target="_blank" rel="noopener noreferrer" className={styles.quickLink}>
                        <span className={styles.quickLinkIcon}>📂</span>
                        <div>
                            <strong>Bài toán 1 - Input</strong>
                            <p>Agent Replacement footage</p>
                        </div>
                    </a>

                    <a href="https://www.dropbox.com/scl/fo/f3btrh1him55m8f2l5nmx/AFmiDU-TBIQNJo3OwvixwZI" target="_blank" rel="noopener noreferrer" className={styles.quickLink}>
                        <span className={styles.quickLinkIcon}>📂</span>
                        <div>
                            <strong>Bài toán 2 - Input</strong>
                            <p>Image-to-Video assets</p>
                        </div>
                    </a>

                    <a href="https://www.dropbox.com/scl/fi/hg8k7r8z09slci6avwiz2/MHOCT29005_output.mp4" target="_blank" rel="noopener noreferrer" className={styles.quickLink}>
                        <span className={styles.quickLinkIcon}>🎥</span>
                        <div>
                            <strong>Bài toán 1 - Output</strong>
                            <p>Completed video sample</p>
                        </div>
                    </a>

                    <a href="https://www.dropbox.com/scl/fi/wl6w0pz3mjjj121ltl5gq/Output.mp4" target="_blank" rel="noopener noreferrer" className={styles.quickLink}>
                        <span className={styles.quickLinkIcon}>🎥</span>
                        <div>
                            <strong>Bài toán 2 - Output</strong>
                            <p>Completed video sample</p>
                        </div>
                    </a>
                </div>
            </section>

            {/* Keywords */}
            <section className={styles.section}>
                <h2>🏷️ Keywords & Tags</h2>
                <div className={styles.keywordCloud}>
                    <span className={styles.keyword}>AI Video</span>
                    <span className={styles.keyword}>Prompt Engineering</span>
                    <span className={styles.keyword}>Real Estate</span>
                    <span className={styles.keyword}>Kling AI</span>
                    <span className={styles.keyword}>Image-to-Video</span>
                    <span className={styles.keyword}>Text-to-Video</span>
                    <span className={styles.keyword}>Lip Sync</span>
                    <span className={styles.keyword}>Agent Replacement</span>
                    <span className={styles.keyword}>Motion Graphics</span>
                    <span className={styles.keyword}>Special Effects</span>
                    <span className={styles.keyword}>Video Editing</span>
                    <span className={styles.keyword}>After Effects</span>
                    <span className={styles.keyword}>Premiere Pro</span>
                    <span className={styles.keyword}>Quality Control</span>
                    <span className={styles.keyword}>Workflow Optimization</span>
                    <span className={styles.keyword}>R&D</span>
                    <span className={styles.keyword}>Automation</span>
                    <span className={styles.keyword}>Machine Learning</span>
                </div>
            </section>
        </div>
    )
}
