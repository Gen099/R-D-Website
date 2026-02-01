import styles from './Footer.module.css'
import Link from 'next/link'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Brand Section */}
                <div className={styles.section}>
                    <h3 className={styles.brand}>🚀 Fotober R&D</h3>
                    <p className={styles.tagline}>AI Video Production Research & Development</p>
                    <p className={styles.description}>
                        Chuyên nghiên cứu và phát triển công nghệ AI Video, tối ưu quy trình sản xuất creative.
                    </p>
                </div>

                {/* Quick Links */}
                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Quick Links</h4>
                    <ul className={styles.links}>
                        <li>
                            <Link href="/">Dashboard</Link>
                        </li>
                        <li>
                            <Link href="/feedback">Feedback Analysis</Link>
                        </li>
                        <li>
                            <Link href="/effects">Effects Catalog</Link>
                        </li>
                        <li>
                            <Link href="/resources">Resources Hub</Link>
                        </li>
                    </ul>
                </div>

                {/* Resources */}
                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Resources</h4>
                    <ul className={styles.links}>
                        <li>
                            <a
                                href="https://www.notion.so/Th-vi-n-Prompt-AI-Video-8e2aa4e47bfb45deb6dea2a6b4de139f"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                AI Video Prompts
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.notion.so/Th-vi-n-Prompt-AI-Image-542e7a0a4dc24f6493d544baec62a5b9"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                AI Image Prompts
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.notion.so/QUY-TR-NH-S-N-XU-T-VIDEO-CREATIVE-2f9da80a59b380ec98dcfc870f1ddbc7"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Production Workflow
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact & Social */}
                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Contact & Social</h4>
                    <ul className={styles.links}>
                        <li>
                            <a href="https://www.facebook.com/soncgvn/" target="_blank" rel="noopener noreferrer">
                                📘 Facebook
                            </a>
                        </li>
                        <li>
                            <a href="https://zalo.me/0868689912" target="_blank" rel="noopener noreferrer">
                                💬 Zalo: 0868689912
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/sonpham07/" target="_blank" rel="noopener noreferrer">
                                💼 LinkedIn
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/Gen099/R-D-Website" target="_blank" rel="noopener noreferrer">
                                💻 GitHub
                            </a>
                        </li>
                    </ul>
                    <div className={styles.version}>
                        <span>Version 1.0.0</span>
                        <span>•</span>
                        <span>Updated Feb 2026</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={styles.bottom}>
                <div className={styles.container}>
                    <p className={styles.copyright}>
                        © {currentYear} Fotober R&D. All rights reserved.
                    </p>
                    <div className={styles.bottomLinks}>
                        <a href="/privacy">Privacy Policy</a>
                        <span>•</span>
                        <a href="/terms">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
