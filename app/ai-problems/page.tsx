import styles from './page.module.css'

export default function AIProblemsPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>🤖 Bài toán Nghiên cứu AI Agent</h1>
                <p className={styles.subtitle}>2 bài toán chính: Agent Replacement và Image-to-Video</p>
            </header>

            {/* Problem 1 */}
            <section className={styles.section}>
                <div className={styles.problemHeader}>
                    <h2>Bài toán 1: Agent Replacement in Existing Video</h2>
                    <span className={styles.feasibilityBadge}>Khả thi: ~70%</span>
                </div>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h3>📋 Yêu cầu</h3>
                        <ul>
                            <li>Background: Giữ nguyên 100%</li>
                            <li>Ánh sáng: Không thay đổi</li>
                            <li>Chất lượng video: Không giảm</li>
                            <li>Agent: Thay mới theo input</li>
                            <li>Voice/Action: Theo nội dung gốc</li>
                        </ul>
                    </div>

                    <div className={styles.card}>
                        <h3>🎬 Breakdown Actions</h3>
                        <div className={styles.actionsList}>
                            <div className={styles.actionItem}>
                                <strong>Action 1:</strong> Living area - Đứng, cử chỉ tay (8-10s)
                            </div>
                            <div className={styles.actionItem}>
                                <strong>Action 2:</strong> Kitchen - Bước nhẹ, chỉ tay (8-10s)
                            </div>
                            <div className={styles.actionItem}>
                                <strong>Action 3:</strong> Patio - Đi bộ nhẹ (8-10s)
                            </div>
                            <div className={styles.actionItem}>
                                <strong>Action 4 (CTA):</strong> Đứng, nhìn camera (6-8s)
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h3>⚠️ Risk Assessment</h3>
                        <div className={styles.risksList}>
                            <div className={styles.riskItem}>
                                <span className={styles.riskHigh}>Cao</span>
                                <span>AI face distortion</span>
                            </div>
                            <div className={styles.riskItem}>
                                <span className={styles.riskMedium}>Trung bình-Cao</span>
                                <span>Lighting mismatch</span>
                            </div>
                            <div className={styles.riskItem}>
                                <span className={styles.riskHigh}>Cao</span>
                                <span>Edge artifacts</span>
                            </div>
                            <div className={styles.riskItem}>
                                <span className={styles.riskMedium}>Trung bình-Cao</span>
                                <span>Lip-sync off</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h3>🔧 Approach</h3>
                        <p><strong>Hybrid:</strong> Roto + Composite + Kling lip-sync</p>
                        <p><strong>Timeline:</strong> 3-5 ngày</p>
                        <p><strong>Tools:</strong> Kling AI, After Effects, Premiere</p>
                    </div>
                </div>

                <div className={styles.resources}>
                    <h3>📁 Tài nguyên</h3>
                    <div className={styles.linksList}>
                        <a href="https://www.dropbox.com/scl/fo/hxrm9ggzzoiqh9a7cusdk/ALSujZioqdzdFqS5elMvJag" target="_blank" rel="noopener noreferrer" className={styles.link}>
                            📂 Input footage
                        </a>
                        <a href="https://www.dropbox.com/scl/fi/hg8k7r8z09slci6avwiz2/MHOCT29005_output.mp4" target="_blank" rel="noopener noreferrer" className={styles.link}>
                            🎥 Video done
                        </a>
                    </div>
                </div>
            </section>

            {/* Problem 2 */}
            <section className={styles.section}>
                <div className={styles.problemHeader}>
                    <h2>Bài toán 2: Image-to-Video Agent Footage</h2>
                    <span className={styles.feasibilityBadge} style={{ background: 'var(--color-success-light)', color: 'var(--color-success)' }}>
                        Khả thi: ~85%
                    </span>
                </div>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h3>📥 Input</h3>
                        <ul>
                            <li>Ảnh Agent</li>
                            <li>Ảnh Scenes (6 cảnh)</li>
                            <li>Script</li>
                            <li>Reference video</li>
                        </ul>
                    </div>

                    <div className={styles.card}>
                        <h3>📤 Output</h3>
                        <ul>
                            <li>5-7 footage clips</li>
                            <li>Agent đứng nói theo script</li>
                            <li>1-2 bước di chuyển nhẹ</li>
                            <li>Lip-sync chuẩn</li>
                            <li>Chất lượng bằng ảnh gốc</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.scenes}>
                    <h3>🎬 6 Scenes chi tiết</h3>
                    <div className={styles.scenesGrid}>
                        <div className={styles.sceneCard}>
                            <div className={styles.sceneNumber}>1</div>
                            <h4>Intro - Cửa chính</h4>
                            <p>Đứng chào, giới thiệu (8-10s)</p>
                        </div>
                        <div className={styles.sceneCard}>
                            <div className={styles.sceneNumber}>2</div>
                            <h4>Entryway - Lối vào</h4>
                            <p>Bước vào, dẫn dắt (8-10s)</p>
                        </div>
                        <div className={styles.sceneCard}>
                            <div className={styles.sceneNumber}>3</div>
                            <h4>Kitchen - Bếp</h4>
                            <p>Đứng, chỉ tay giới thiệu (8-10s)</p>
                        </div>
                        <div className={styles.sceneCard}>
                            <div className={styles.sceneNumber}>4</div>
                            <h4>Entertainment</h4>
                            <p>Di chuyển nhẹ, mô tả (8-10s)</p>
                        </div>
                        <div className={styles.sceneCard}>
                            <div className={styles.sceneNumber}>5</div>
                            <h4>Wellness</h4>
                            <p>Đứng, giới thiệu (8-10s)</p>
                        </div>
                        <div className={styles.sceneCard}>
                            <div className={styles.sceneNumber}>6</div>
                            <h4>Ski Room</h4>
                            <p>Đứng, kết luận + CTA (8-10s)</p>
                        </div>
                    </div>
                </div>

                <div className={styles.workflow}>
                    <h3>⚙️ Workflow đề xuất</h3>
                    <div className={styles.workflowSteps}>
                        <div className={styles.workflowStep}>
                            <div className={styles.stepNumber}>1</div>
                            <div className={styles.stepContent}>
                                <h4>Asset Preparation</h4>
                                <p>Chuẩn bị ảnh, cắt edges, audio (20%)</p>
                            </div>
                        </div>
                        <div className={styles.workflowStep}>
                            <div className={styles.stepNumber}>2</div>
                            <div className={styles.stepContent}>
                                <h4>AI Generation</h4>
                                <p>Kling lip-sync, 3-5 takes/scene (40%)</p>
                            </div>
                        </div>
                        <div className={styles.workflowStep}>
                            <div className={styles.stepNumber}>3</div>
                            <div className={styles.stepContent}>
                                <h4>Composite & Refine</h4>
                                <p>Best takes, color match, edge refine (30%)</p>
                            </div>
                        </div>
                        <div className={styles.workflowStep}>
                            <div className={styles.stepNumber}>4</div>
                            <div className={styles.stepContent}>
                                <h4>Output</h4>
                                <p>ProRes 4K hoặc H.265, organized library (10%)</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.resources}>
                    <h3>📁 Tài nguyên</h3>
                    <div className={styles.linksList}>
                        <a href="https://www.dropbox.com/scl/fo/f3btrh1him55m8f2l5nmx/AFmiDU-TBIQNJo3OwvixwZI" target="_blank" rel="noopener noreferrer" className={styles.link}>
                            📂 Input Bài 2
                        </a>
                        <a href="https://www.dropbox.com/scl/fi/wl6w0pz3mjjj121ltl5gq/Output.mp4" target="_blank" rel="noopener noreferrer" className={styles.link}>
                            🎥 Output mẫu
                        </a>
                    </div>
                </div>
            </section>

            {/* Prompt Strategy */}
            <section className={styles.section}>
                <h2>💡 Prompt Strategy</h2>
                <div className={styles.promptBox}>
                    <h3>Master Prompt Structure</h3>
                    <code className={styles.promptCode}>
                        [SUBJECT] + [ACTION] + [ENVIRONMENT] + [CAMERA] + [STYLE]
                    </code>
                </div>

                <div className={styles.promptExamples}>
                    <div className={styles.promptExample}>
                        <h4>Scene 1 - Intro</h4>
                        <pre className={styles.promptPre}>
                            Steven stands at luxury home entrance, warm smile, gestures welcoming with right hand,
                            afternoon golden hour lighting, medium shot, slight camera push-in,
                            professional real estate presentation style.
                        </pre>
                    </div>
                    <div className={styles.promptExample}>
                        <h4>Scene 3 - Kitchen</h4>
                        <pre className={styles.promptPre}>
                            Steven in modern kitchen, gestures toward countertops and appliances,
                            soft overhead lighting, medium wide shot, subtle orbit camera movement,
                            highlighting premium features, professional narration pose.
                        </pre>
                    </div>
                </div>
            </section>
        </div>
    )
}
