import styles from './page.module.css'

export default function WorkPlanPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerTop}>
                    <h1>📋 KẾ HOẠCH CÔNG VIỆC R&D AI VIDEO</h1>
                    <div className={styles.badge}>FOTOBER - 2026</div>
                </div>
                <div className={styles.headerInfo}>
                    <span>👤 R&D Specialist - AI Video & Prompt Engineering</span>
                    <span>📅 Ngày lập: 01/02/2026</span>
                    <span>🎯 Phạm vi: Nghiên cứu, tối ưu quy trình AI Video, chuyển giao cho Team Video</span>
                </div>
            </header>

            <div className={styles.content}>
                {/* Phase Overview */}
                <section className={styles.phaseOverview}>
                    <h2>⏱️ TIMELINE TỔNG HỢP</h2>
                    <div className={styles.timelineViz}>
                        <div className={styles.timelineBar}>
                            <div className={styles.phase1} style={{ width: '12.5%' }}>
                                <span>G1</span>
                                <small>Tuần 1-2</small>
                            </div>
                            <div className={styles.phase2} style={{ width: '25%' }}>
                                <span>G2</span>
                                <small>Tuần 3-6</small>
                            </div>
                            <div className={styles.phase3} style={{ width: '25%' }}>
                                <span>G3</span>
                                <small>Tuần 7-10</small>
                            </div>
                            <div className={styles.phase4} style={{ width: '25%' }}>
                                <span>G4</span>
                                <small>Tuần 11-14</small>
                            </div>
                            <div className={styles.phase5} style={{ width: '12.5%' }}>
                                <span>G5</span>
                                <small>Tuần 15-16</small>
                            </div>
                        </div>
                    </div>
                    <div className={styles.phaseLabels}>
                        <div><span className={styles.dot1}>●</span> Thiết lập nền tảng</div>
                        <div><span className={styles.dot2}>●</span> Bài toán 1 & 2</div>
                        <div><span className={styles.dot3}>●</span> Phân tích Prompt</div>
                        <div><span className={styles.dot4}>●</span> Quy trình & Automation</div>
                        <div><span className={styles.dot5}>●</span> Chuyển giao</div>
                    </div>
                </section>

                {/* Phases */}
                <section className={styles.section}>
                    <h2>📊 DANH SÁCH CÔNG VIỆC THEO GIAI ĐOẠN</h2>

                    {/* Phase 1 */}
                    <div className={styles.phaseCard}>
                        <div className={styles.phaseHeader}>
                            <h3>GIAI ĐOẠN 1: THIẾT LẬP NỀN TẢNG</h3>
                            <span className={styles.duration}>Tuần 1-2</span>
                        </div>
                        <div className={styles.taskGrid}>
                            <div className={styles.taskItem}>
                                <h4>1.1 Phân tích dữ liệu hiện có</h4>
                                <ul>
                                    <li>Đọc và phân loại 23 job codes từ Feedback AI</li>
                                    <li>Ghi chú prompt gốc (lấy từ Team Video)</li>
                                    <li>Liệt kê các loại effect và kết quả</li>
                                    <li>Xác định case bị từ chối và lý do</li>
                                </ul>
                            </div>
                            <div className={styles.taskItem}>
                                <h4>1.2 Thiết lập môi trường</h4>
                                <ul>
                                    <li>Đăng ký: Kling AI, Veo, Runway Gen-4.5, Pika, Luma</li>
                                    <li>Công cụ audio: ElevenLabs</li>
                                    <li>Automation: Python, crawl libraries</li>
                                    <li>Storage và file management</li>
                                </ul>
                            </div>
                            <div className={styles.taskItem}>
                                <h4>1.3 Hệ thống theo dõi</h4>
                                <ul>
                                    <li>Prompt Testing Sheet (Google Sheet/Notion)</li>
                                    <li>Folder structure cho input/output</li>
                                    <li>Quy cách đặt tên file</li>
                                </ul>
                            </div>
                            <div className={styles.taskItem}>
                                <h4>1.4 Thu thập tài liệu</h4>
                                <ul>
                                    <li>Tutorials về AI Video tools</li>
                                    <li>Best practices prompt engineering</li>
                                    <li>Research papers</li>
                                    <li>Bookmark YouTube, Discord, Reddit</li>
                                </ul>
                            </div>
                            <div className={styles.taskItem}>
                                <h4>1.5 Automation Crawler</h4>
                                <ul>
                                    <li>Script crawl đối thủ (Esoft, BoxBrownie, Phixer)</li>
                                    <li>Crawl samples từ Instagram, TikTok</li>
                                    <li>Schedule chạy tự động</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Phase 2 */}
                    <div className={styles.phaseCard}>
                        <div className={styles.phaseHeader}>
                            <h3>GIAI ĐOẠN 2: GIẢI QUYẾT BÀI TOÁN 1 & 2</h3>
                            <span className={styles.duration}>Tuần 3-6</span>
                        </div>
                        <div className={styles.twoCol}>
                            <div className={styles.problemBox}>
                                <h4>🎯 Bài toán 1: Thay Agent trong video có sẵn</h4>
                                <div className={styles.steps}>
                                    <div className={styles.step}>
                                        <strong>Bước 1:</strong> Download input footage + video done từ Dropbox
                                    </div>
                                    <div className={styles.step}>
                                        <strong>Bước 2:</strong> Phân tích video gốc, ảnh Agent mới
                                    </div>
                                    <div className={styles.step}>
                                        <strong>Bước 3:</strong> Thử nghiệm 3 phương pháp
                                        <ul>
                                            <li>Face Swap + Lip-sync</li>
                                            <li>Roto + AI Generate + Composite</li>
                                            <li>Full AI Regeneration</li>
                                        </ul>
                                    </div>
                                    <div className={styles.step}>
                                        <strong>Bước 4:</strong> Thực hiện 4 Actions
                                        <ul>
                                            <li>Action 1: Living area (8-10s)</li>
                                            <li>Action 2: Kitchen (8-10s)</li>
                                            <li>Action 3: Patio (8-10s)</li>
                                            <li>Action 4: CTA (6-8s)</li>
                                        </ul>
                                    </div>
                                    <div className={styles.step}>
                                        <strong>Bước 5:</strong> Đánh giá, viết quy trình, ghi nhận prompt
                                    </div>
                                </div>
                            </div>
                            <div className={styles.problemBox}>
                                <h4>🎯 Bài toán 2: Tạo video từ ảnh tĩnh</h4>
                                <div className={styles.steps}>
                                    <div className={styles.step}>
                                        <strong>Bước 1:</strong> Download ảnh Agent + 6 Scenes, output mẫu
                                    </div>
                                    <div className={styles.step}>
                                        <strong>Bước 2:</strong> Chuẩn bị script, tạo audio voice-over
                                    </div>
                                    <div className={styles.step}>
                                        <strong>Bước 3:</strong> Test 3 công cụ
                                        <ul>
                                            <li>Kling AI → lip-sync quality</li>
                                            <li>Veo 3.1 → cinematic quality</li>
                                            <li>Runway Gen-3 → consistency</li>
                                        </ul>
                                    </div>
                                    <div className={styles.step}>
                                        <strong>Bước 4:</strong> Tạo footage cho 6 Scenes
                                        <ul>
                                            <li>Intro, Entryway, Kitchen</li>
                                            <li>Entertainment, Wellness, Ski Room</li>
                                        </ul>
                                    </div>
                                    <div className={styles.step}>
                                        <strong>Bước 5:</strong> So sánh, tối ưu, viết prompt template
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phase 3 */}
                    <div className={styles.phaseCard}>
                        <div className={styles.phaseHeader}>
                            <h3>GIAI ĐOẠN 3: PHÂN TÍCH & CẢI THIỆN PROMPT</h3>
                            <span className={styles.duration}>Tuần 7-10</span>
                        </div>
                        <div className={styles.process}>
                            <div className={styles.processStep}>
                                <div className={styles.stepNum}>1</div>
                                <div>
                                    <h4>Thu thập prompt hiện tại</h4>
                                    <p>Liên hệ Team Video lấy prompt đã dùng cho 23 jobs, phân loại theo effect</p>
                                </div>
                            </div>
                            <div className={styles.arrow}>→</div>
                            <div className={styles.processStep}>
                                <div className={styles.stepNum}>2</div>
                                <div>
                                    <h4>Phân tích pattern lỗi</h4>
                                    <p>Mapping: lỗi output → nguyên nhân trong prompt, tổng hợp lỗi phổ biến</p>
                                </div>
                            </div>
                            <div className={styles.arrow}>→</div>
                            <div className={styles.processStep}>
                                <div className={styles.stepNum}>3</div>
                                <div>
                                    <h4>Tái tạo & cải tiến</h4>
                                    <p>Chọn 10-15 case, chạy lại prompt gốc, viết prompt cải tiến, so sánh A/B test</p>
                                </div>
                            </div>
                            <div className={styles.arrow}>→</div>
                            <div className={styles.processStep}>
                                <div className={styles.stepNum}>4</div>
                                <div>
                                    <h4>Document kết quả</h4>
                                    <p>Bảng so sánh, ghi nhận thay đổi, rút ra nguyên tắc viết prompt</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phase 4 */}
                    <div className={styles.phaseCard}>
                        <div className={styles.phaseHeader}>
                            <h3>GIAI ĐOẠN 4: PROMPT LIBRARY & AUTOMATION</h3>
                            <span className={styles.duration}>Tuần 7-14</span>
                        </div>
                        <div className={styles.twoCol}>
                            <div>
                                <h4>📚 Prompt Library</h4>
                                <div className={styles.library}>
                                    <div className={styles.folder}>📁 01_DAY_TO_NIGHT</div>
                                    <div className={styles.folder}>📁 02_SEASON_CHANGE</div>
                                    <div className={styles.folder}>📁 03_LIFESTYLE</div>
                                    <div className={styles.folder}>📁 04_FURNITURE_ANIMATION</div>
                                    <div className={styles.folder}>📁 05_AGENT_COMPOSITE</div>
                                    <div className={styles.folder}>📁 06_WEATHER_EFFECTS</div>
                                    <div className={styles.folder}>📁 07_SKY_REPLACEMENT</div>
                                    <div className={styles.folder}>📁 00_GUIDELINES</div>
                                </div>
                            </div>
                            <div>
                                <h4>🤖 Automation Tools</h4>
                                <div className={styles.toolList}>
                                    <div className={styles.tool}>
                                        <strong>Crawler đối thủ</strong>
                                        <p>Thu thập dịch vụ, samples, blog từ Esoft, BoxBrownie, Phixer</p>
                                    </div>
                                    <div className={styles.tool}>
                                        <strong>Crawler mạng xã hội</strong>
                                        <p>Video viral, hashtags trending từ Instagram, TikTok, YouTube</p>
                                    </div>
                                    <div className={styles.tool}>
                                        <strong>Prompt Testing Pipeline</strong>
                                        <p>Batch run prompts, log kết quả, báo cáo so sánh</p>
                                    </div>
                                    <div className={styles.tool}>
                                        <strong>Dashboard tổng hợp</strong>
                                        <p>Metrics, KPIs, tiến độ R&D</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phase 5 */}
                    <div className={styles.phaseCard}>
                        <div className={styles.phaseHeader}>
                            <h3>GIAI ĐOẠN 5: QUY TRÌNH & CHUYỂN GIAO</h3>
                            <span className={styles.duration}>Tuần 11-16</span>
                        </div>
                        <div className={styles.workflowGrid}>
                            <div className={styles.workflowItem}>
                                <h4>📋 Workflow chuẩn</h4>
                                <div className={styles.miniFlow}>
                                    Brief → Confirm → Chuẩn bị → Generate → QC → Output
                                </div>
                            </div>
                            <div className={styles.workflowItem}>
                                <h4>✅ QC Checklist</h4>
                                <ul>
                                    <li>Kỹ thuật: độ phân giải, artifacts</li>
                                    <li>Nhân vật: mặt, tay, lip-sync</li>
                                    <li>Bối cảnh: background, ánh sáng</li>
                                    <li>Vật lý/logic: chuyển động hợp lý</li>
                                </ul>
                            </div>
                            <div className={styles.workflowItem}>
                                <h4>📝 SOP cho từng Effect</h4>
                                <ul>
                                    <li>Day-to-Night</li>
                                    <li>Season Change</li>
                                    <li>Lifestyle (1-2 người)</li>
                                    <li>Furniture Animation</li>
                                </ul>
                            </div>
                            <div className={styles.workflowItem}>
                                <h4>🎓 Training & Pilot</h4>
                                <ul>
                                    <li>Họp chuyển giao Team Video</li>
                                    <li>Training hands-on</li>
                                    <li>Pilot run 5-10 jobs</li>
                                    <li>Báo cáo kết quả</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Công cụ & Resources */}
                <section className={styles.section}>
                    <h2>🛠️ CÔNG CỤ VÀ NGUỒN NGHIÊN CỨU</h2>
                    <div className={styles.resourceGrid}>
                        <div className={styles.resourceCard}>
                            <h4>AI Video Tools</h4>
                            <ul>
                                <li>Kling AI - Lip-sync, Image-to-Video</li>
                                <li>Veo - Cinematic generation</li>
                                <li>Runway Gen-4.5 - Fast generation</li>
                                <li>Pika Labs - Stylized motion</li>
                                <li>Luma - 3D understanding</li>
                                <li>ElevenLabs - Voice generation</li>
                            </ul>
                        </div>
                        <div className={styles.resourceCard}>
                            <h4>Nghiên cứu Prompt</h4>
                            <ul>
                                <li>Runway Prompt Guide (docs.runwayml.com)</li>
                                <li>Kling AI Tutorials (YouTube)</li>
                                <li>r/StableDiffusion (Reddit)</li>
                                <li>Civitai, PromptHero</li>
                                <li>AI Video Community Discord</li>
                            </ul>
                        </div>
                        <div className={styles.resourceCard}>
                            <h4>Đối thủ theo dõi</h4>
                            <ul>
                                <li>Esoft (esoft.com)</li>
                                <li>BoxBrownie (boxbrownie.com)</li>
                                <li>Phixer (phixer.net)</li>
                                <li>PhotoUp (photoup.net)</li>
                                <li>Imagtor, Beatcolor (Vietnam)</li>
                            </ul>
                        </div>
                        <div className={styles.resourceCard}>
                            <h4>Trends Hashtags</h4>
                            <ul>
                                <li>#realestatevideo</li>
                                <li>#aivideo, #propertyvideo</li>
                                <li>#virtualstaging</li>
                                <li>#aieffects</li>
                                <li>"AI video real estate"</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Metrics */}
                <section className={styles.section}>
                    <h2>📈 METRICS & KPIs</h2>
                    <div className={styles.metricsGrid}>
                        <div className={styles.metric}>
                            <div className={styles.metricLabel}>Prompt Templates</div>
                            <div className={styles.metricValue}>≥ 20</div>
                            <div className={styles.metricTarget}>Mục tiêu: Prompt Library</div>
                        </div>
                        <div className={styles.metric}>
                            <div className={styles.metricLabel}>Tỷ lệ thành công</div>
                            <div className={styles.metricValue}>≥ 70%</div>
                            <div className={styles.metricTarget}>Output đạt QC / Tổng generate</div>
                        </div>
                        <div className={styles.metric}>
                            <div className={styles.metricLabel}>Jobs phân tích</div>
                            <div className={styles.metricValue}>≥ 15</div>
                            <div className={styles.metricTarget}>Báo cáo so sánh R&D vs Team</div>
                        </div>
                        <div className={styles.metric}>
                            <div className={styles.metricLabel}>SOPs chuyển giao</div>
                            <div className={styles.metricValue}>≥ 5</div>
                            <div className={styles.metricTarget}>Team Video áp dụng</div>
                        </div>
                        <div className={styles.metric}>
                            <div className={styles.metricLabel}>Thời gian giảm</div>
                            <div className={styles.metricValue}>≥ 20%</div>
                            <div className={styles.metricTarget}>So sánh trước/sau</div>
                        </div>
                        <div className={styles.metric}>
                            <div className={styles.metricLabel}>Automation Tools</div>
                            <div className={styles.metricValue}>≥ 3</div>
                            <div className={styles.metricTarget}>Tools chạy ổn định</div>
                        </div>
                    </div>
                </section>

                {/* Data Reference */}
                <section className={styles.section}>
                    <h2>📊 DỮ LIỆU THAM CHIẾU</h2>
                    <div className={styles.dataGrid}>
                        <div className={styles.dataCard}>
                            <h4>23 Job Feedbacks - Phân nhóm lỗi</h4>
                            <div className={styles.errorChart}>
                                <div className={styles.errorBar}>
                                    <div className={styles.barLabel}>Nhóm A: Hiểu sai yêu cầu</div>
                                    <div className={styles.bar} style={{ width: '35%', background: '#f44336' }}>35%</div>
                                </div>
                                <div className={styles.errorBar}>
                                    <div className={styles.barLabel}>Nhóm B: Chất lượng AI</div>
                                    <div className={styles.bar} style={{ width: '26%', background: '#ff9800' }}>26%</div>
                                </div>
                                <div className={styles.errorBar}>
                                    <div className={styles.barLabel}>Nhóm C: Trễ deadline</div>
                                    <div className={styles.bar} style={{ width: '22%', background: '#ffc107' }}>22%</div>
                                </div>
                                <div className={styles.errorBar}>
                                    <div className={styles.barLabel}>Nhóm D: Vật lý/Logic</div>
                                    <div className={styles.bar} style={{ width: '17%', background: '#4caf50' }}>17%</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.dataCard}>
                            <h4>Tỷ lệ lỗi theo Effect</h4>
                            <table className={styles.miniTable}>
                                <tr>
                                    <td>Day-to-Night</td>
                                    <td><span className={styles.good}>33%</span></td>
                                </tr>
                                <tr>
                                    <td>Sky Replacement</td>
                                    <td><span className={styles.medium}>50%</span></td>
                                </tr>
                                <tr>
                                    <td>Season Change</td>
                                    <td><span className={styles.bad}>75%</span></td>
                                </tr>
                                <tr>
                                    <td>Lifestyle</td>
                                    <td><span className={styles.bad}>71%</span></td>
                                </tr>
                                <tr>
                                    <td>Object Animation</td>
                                    <td><span className={styles.critical}>100%</span></td>
                                </tr>
                                <tr>
                                    <td>Agent Composite</td>
                                    <td><span className={styles.critical}>100%</span></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </section>

                <div className={styles.footer}>
                    <p><em>*Nguồn dữ liệu: Feedback AI.xlsx, Bài toán AI_Fotober.docx, Video-Price_Updated.xlsx, fotober.com</em></p>
                    <p><strong>Ghi chú:</strong> Kế hoạch này là danh sách đầu mục công việc. Thời gian và metrics cụ thể sẽ được xác định trong quá trình thực hiện. Kế hoạch có thể điều chỉnh dựa trên thực tế triển khai.</p>
                </div>
            </div>
        </div>
    )
}
