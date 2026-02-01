import styles from './page.module.css'

export default function OperationsPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>⚙️ Quy trình Vận hành</h1>
                <p className={styles.subtitle}>Workflow, QC Checklist, và Metrics Tracking</p>
            </header>

            {/* Workflow Overview */}
            <section className={styles.section}>
                <h2>Workflow tổng quan</h2>
                <div className={styles.workflowDiagram}>
                    <div className={styles.workflowStep}>
                        <div className={styles.stepNumber}>1</div>
                        <div className={styles.stepContent}>
                            <h3>📥 Nhận Brief</h3>
                            <p>Client gửi brief + reference</p>
                            <span className={styles.stepTime}>15 phút</span>
                        </div>
                    </div>
                    <div className={styles.workflowArrow}>→</div>

                    <div className={styles.workflowStep}>
                        <div className={styles.stepNumber}>2</div>
                        <div className={styles.stepContent}>
                            <h3>✅ Brief Confirmation</h3>
                            <p>Xác nhận yêu cầu với client</p>
                            <span className={styles.stepTime}>30 phút</span>
                        </div>
                    </div>
                    <div className={styles.workflowArrow}>→</div>

                    <div className={styles.workflowStep}>
                        <div className={styles.stepNumber}>3</div>
                        <div className={styles.stepContent}>
                            <h3>🎨 Asset Preparation</h3>
                            <p>Chuẩn bị ảnh, audio, script</p>
                            <span className={styles.stepTime}>1-2 giờ</span>
                        </div>
                    </div>
                    <div className={styles.workflowArrow}>→</div>

                    <div className={styles.workflowStep}>
                        <div className={styles.stepNumber}>4</div>
                        <div className={styles.stepContent}>
                            <h3>🤖 AI Generation</h3>
                            <p>Tạo 3-5 takes với AI tools</p>
                            <span className={styles.stepTime}>2-4 giờ</span>
                        </div>
                    </div>
                    <div className={styles.workflowArrow}>→</div>

                    <div className={styles.workflowStep}>
                        <div className={styles.stepNumber}>5</div>
                        <div className={styles.stepContent}>
                            <h3>✂️ Editing & QC</h3>
                            <p>Chọn best takes, composite</p>
                            <span className={styles.stepTime}>2-3 giờ</span>
                        </div>
                    </div>
                    <div className={styles.workflowArrow}>→</div>

                    <div className={styles.workflowStep}>
                        <div className={styles.stepNumber}>6</div>
                        <div className={styles.stepContent}>
                            <h3>📤 Delivery</h3>
                            <p>Export và gửi client</p>
                            <span className={styles.stepTime}>30 phút</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* QC Checklist */}
            <section className={styles.section}>
                <h2>QC Checklist (3 cấp độ)</h2>

                <div className={styles.qcLevels}>
                    {/* Level 1 */}
                    <div className={styles.qcLevel}>
                        <div className={styles.qcHeader} style={{ background: 'var(--color-success-light)' }}>
                            <h3 style={{ color: 'var(--color-success)' }}>Level 1: Basic QC</h3>
                            <span className={styles.qcBadge} style={{ background: 'var(--color-success)' }}>Bắt buộc</span>
                        </div>
                        <div className={styles.qcContent}>
                            <div className={styles.checklistItem}>
                                <input type="checkbox" id="qc1-1" />
                                <label htmlFor="qc1-1">Video không bị crop/cut nội dung quan trọng</label>
                            </div>
                            <div className={styles.checklistItem}>
                                <input type="checkbox" id="qc1-2" />
                                <label htmlFor="qc1-2">Không có watermark AI (Kling, Veo, etc.)</label>
                            </div>
                            <div className={styles.checklistItem}>
                                <input type="checkbox" id="qc1-3" />
                                <label htmlFor="qc1-3">Resolution đúng yêu cầu (1080p/4K)</label>
                            </div>
                            <div className={styles.checklistItem}>
                                <input type="checkbox" id="qc1-4" />
                                <label htmlFor="qc1-4">Aspect ratio đúng (16:9, 9:16, 1:1)</label>
                            </div>
                            <div className={styles.checklistItem}>
                                <input type="checkbox" id="qc1-5" />
                                <label htmlFor="qc1-5">Audio sync (nếu có voice)</label>
                            </div>
                        </div>
                    </div>

                    {/* Level 2 */}
                    <div className={styles.qcLevel}>
                        <div className={styles.qcHeader} style={{ background: 'var(--color-warning-light)' }}>
                            <h3 style={{ color: 'var(--color-warning)' }}>Level 2: Quality QC</h3>
                            <span className={styles.qcBadge} style={{ background: 'var(--color-warning)' }}>Khuyến nghị</span>
                        </div>
                        <div className={styles.qcContent}>
                            <div className={styles.checklistItem}>
                                <input type="checkbox" id="qc2-1" />
                                <label htmlFor="qc2-1">Không có face distortion (AI artifacts)</label>
                            </div>
                            <div className={styles.checklistItem}>
                                <input type="checkbox" id="qc2-2" />
                                <label htmlFor="qc2-2">Edge blending mượt mà</label>
                            </div>
                            <div className={styles.checklistItem}>
                                <input type="checkbox" id="qc2-3" />
                                <label htmlFor="qc2-3">Color grading nhất quán</label>
                            </div>
                            <div className={styles.checklistItem}>
                                <input type="checkbox" id="qc2-4" />
                                <label htmlFor="qc2-4">Lighting match với background</label>
                            </div>
                            <div className={styles.checklistItem}>
                                <input type="checkbox" id="qc2-5" />
                                <label htmlFor="qc2-5">Motion smooth (không jittery)</label>
                            </div>
                        </div>
                    </div>

                    {/* Level 3 */}
                    <div className={styles.qcLevel}>
                        <div className={styles.qcHeader} style={{ background: 'var(--color-primary-light)' }}>
                            <h3 style={{ color: 'var(--color-primary)' }}>Level 3: Premium QC</h3>
                            <span className={styles.qcBadge} style={{ background: 'var(--color-primary)' }}>Premium</span>
                        </div>
                        <div className={styles.qcContent}>
                            <div className={styles.checklistItem}>
                                <input type="checkbox" id="qc3-1" />
                                <label htmlFor="qc3-1">Lip-sync hoàn hảo (nếu có voice)</label>
                            </div>
                            <div className={styles.checklistItem}>
                                <input type="checkbox" id="qc3-2" />
                                <label htmlFor="qc3-2">Micro-expressions tự nhiên</label>
                            </div>
                            <div className={styles.checklistItem}>
                                <input type="checkbox" id="qc3-3" />
                                <label htmlFor="qc3-3">Shadow/reflection chính xác</label>
                            </div>
                            <div className={styles.checklistItem}>
                                <input type="checkbox" id="qc3-4" />
                                <label htmlFor="qc3-4">Camera movement cinematic</label>
                            </div>
                            <div className={styles.checklistItem}>
                                <input type="checkbox" id="qc3-5" />
                                <label htmlFor="qc3-5">Storytelling flow mượt mà</label>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Metrics Tracking */}
            <section className={styles.section}>
                <h2>Metrics Tracking</h2>
                <div className={styles.metricsGrid}>
                    <div className={styles.metricCard}>
                        <div className={styles.metricIcon}>⏱️</div>
                        <div className={styles.metricContent}>
                            <h3>Turnaround Time</h3>
                            <div className={styles.metricValue}>6-8 giờ</div>
                            <p className={styles.metricTarget}>Target: &lt; 24 giờ</p>
                        </div>
                    </div>

                    <div className={styles.metricCard}>
                        <div className={styles.metricIcon}>✅</div>
                        <div className={styles.metricContent}>
                            <h3>First-time Approval Rate</h3>
                            <div className={styles.metricValue}>78%</div>
                            <p className={styles.metricTarget}>Target: &gt; 85%</p>
                        </div>
                    </div>

                    <div className={styles.metricCard}>
                        <div className={styles.metricIcon}>🔄</div>
                        <div className={styles.metricContent}>
                            <h3>Revision Rate</h3>
                            <div className={styles.metricValue}>22%</div>
                            <p className={styles.metricTarget}>Target: &lt; 15%</p>
                        </div>
                    </div>

                    <div className={styles.metricCard}>
                        <div className={styles.metricIcon}>⭐</div>
                        <div className={styles.metricContent}>
                            <h3>Client Satisfaction</h3>
                            <div className={styles.metricValue}>4.2/5</div>
                            <p className={styles.metricTarget}>Target: &gt; 4.5/5</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scoring System */}
            <section className={styles.section}>
                <h2>Hệ thống chấm điểm Output</h2>
                <div className={styles.scoringTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>Tiêu chí</th>
                                <th>Trọng số</th>
                                <th>Mô tả</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Technical Quality</td>
                                <td className={styles.weight}>30%</td>
                                <td>Resolution, bitrate, không artifacts</td>
                            </tr>
                            <tr>
                                <td>Visual Accuracy</td>
                                <td className={styles.weight}>25%</td>
                                <td>Đúng brief, không distortion</td>
                            </tr>
                            <tr>
                                <td>Motion & Animation</td>
                                <td className={styles.weight}>20%</td>
                                <td>Smooth, tự nhiên, không jittery</td>
                            </tr>
                            <tr>
                                <td>Audio Sync</td>
                                <td className={styles.weight}>15%</td>
                                <td>Lip-sync, timing chính xác</td>
                            </tr>
                            <tr>
                                <td>Creative Value</td>
                                <td className={styles.weight}>10%</td>
                                <td>Storytelling, cinematic feel</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles.scoreRanges}>
                    <div className={styles.scoreRange} style={{ borderColor: 'var(--color-success)' }}>
                        <strong style={{ color: 'var(--color-success)' }}>90-100:</strong> Excellent - Ship ngay
                    </div>
                    <div className={styles.scoreRange} style={{ borderColor: 'var(--color-info)' }}>
                        <strong style={{ color: 'var(--color-info)' }}>75-89:</strong> Good - Minor tweaks
                    </div>
                    <div className={styles.scoreRange} style={{ borderColor: 'var(--color-warning)' }}>
                        <strong style={{ color: 'var(--color-warning)' }}>60-74:</strong> Acceptable - Cần revision
                    </div>
                    <div className={styles.scoreRange} style={{ borderColor: 'var(--color-error)' }}>
                        <strong style={{ color: 'var(--color-error)' }}>&lt; 60:</strong> Poor - Làm lại
                    </div>
                </div>
            </section>
        </div>
    )
}
