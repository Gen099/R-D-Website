import styles from './page.module.css'

export default function WorkPlanPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>📋 Kế hoạch & Tiến độ Công việc</h1>
                <p className={styles.subtitle}>R&D Specialist - Workflow & Timeline</p>
            </header>

            <div className={styles.content}>
                {/* Phần 1: Vai trò */}
                <section className={styles.section}>
                    <h2>1. XÁC ĐỊNH VAI TRÒ VÀ PHẠM VI</h2>
                    <div className={styles.box}>
                        <h3>R&D SPECIALIST - AI VIDEO</h3>
                        <div className={styles.list}>
                            <h4>NHIỆM VỤ CHÍNH:</h4>
                            <ul>
                                <li>Nghiên cứu & phát triển Prompt cho AI Video</li>
                                <li>Tối ưu hóa quy trình tạo video AI</li>
                                <li>Giải quyết các bài toán kỹ thuật (Bài 1 & Bài 2)</li>
                                <li>So sánh output R&D vs Team Video → Chuyển giao quy trình</li>
                                <li>Xây dựng hệ thống automation thu thập thông tin</li>
                            </ul>
                            <h4>KHÔNG BAO GỒM:</h4>
                            <ul>
                                <li>Định giá dịch vụ</li>
                                <li>Bán hàng, tư vấn khách hàng</li>
                                <li>Quản lý nhân sự</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Phần 2: TODO List */}
                <section className={styles.section}>
                    <h2>2. DANH SÁCH CÔNG VIỆC (TODO LIST)</h2>

                    <div className={styles.phase}>
                        <h3>GIAI ĐOẠN 1: THIẾT LẬP NỀN TẢNG (Tuần 1-2)</h3>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Công việc</th>
                                    <th>Chi tiết</th>
                                    <th>Ưu tiên</th>
                                    <th>Thời gian</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1.1</td>
                                    <td>Phân tích 23 job feedback</td>
                                    <td>Đọc kỹ từng case, phân loại pattern lỗi, ghi chú prompt gốc</td>
                                    <td><span className={styles.prioHigh}>Cao</span></td>
                                    <td>2 ngày</td>
                                </tr>
                                <tr>
                                    <td>1.2</td>
                                    <td>Thiết lập môi trường AI</td>
                                    <td>Đăng ký/cấu hình: Kling, Veo, Runway Gen-3, Pika, Luma</td>
                                    <td><span className={styles.prioHigh}>Cao</span></td>
                                    <td>1 ngày</td>
                                </tr>
                                <tr>
                                    <td>1.3</td>
                                    <td>Tạo Prompt Testing Sheet</td>
                                    <td>Google Sheet theo dõi: prompt → output → đánh giá</td>
                                    <td><span className={styles.prioHigh}>Cao</span></td>
                                    <td>0.5 ngày</td>
                                </tr>
                                <tr>
                                    <td>1.4</td>
                                    <td>Xây dựng Automation Crawler</td>
                                    <td>Code tool thu thập thông tin từ đối thủ và mạng xã hội</td>
                                    <td><span className={styles.prioMed}>Trung bình</span></td>
                                    <td>3 ngày</td>
                                </tr>
                                <tr>
                                    <td>1.5</td>
                                    <td>Tạo thư viện tài liệu</td>
                                    <td>Tổng hợp tutorial, research paper, best practices</td>
                                    <td><span className={styles.prioMed}>Trung bình</span></td>
                                    <td>1 ngày</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.phase}>
                        <h3>GIAI ĐOẠN 2: GIẢI QUYẾT BÀI TOÁN 1 & 2 (Tuần 3-6)</h3>
                        <h4>Bài toán 1: Thay Agent trong video có sẵn</h4>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Công việc</th>
                                    <th>Chi tiết</th>
                                    <th>Thời gian</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2.1.1</td>
                                    <td>Tải và phân tích input</td>
                                    <td>Download footage, phân tích video gốc: độ dài, chất lượng, ánh sáng</td>
                                    <td>0.5 ngày</td>
                                </tr>
                                <tr>
                                    <td>2.1.2</td>
                                    <td>Nghiên cứu kỹ thuật</td>
                                    <td>Tìm hiểu: Face swap, body transfer, roto + composite</td>
                                    <td>2 ngày</td>
                                </tr>
                                <tr>
                                    <td>2.1.3-5</td>
                                    <td>Thử nghiệm phương pháp</td>
                                    <td>Test Face Swap, Roto+AI, Full AI Regeneration</td>
                                    <td>6 ngày</td>
                                </tr>
                                <tr>
                                    <td>2.1.6</td>
                                    <td>Viết quy trình</td>
                                    <td>Document step-by-step với prompt templates</td>
                                    <td>1 ngày</td>
                                </tr>
                            </tbody>
                        </table>

                        <h4>Bài toán 2: Tạo video từ ảnh tĩnh (Image-to-Video)</h4>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Công việc</th>
                                    <th>Chi tiết</th>
                                    <th>Thời gian</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2.2.1-2</td>
                                    <td>Chuẩn bị input</td>
                                    <td>Download ảnh, tạo audio từ script (ElevenLabs)</td>
                                    <td>1 ngày</td>
                                </tr>
                                <tr>
                                    <td>2.2.3-5</td>
                                    <td>Test công cụ AI</td>
                                    <td>Thử nghiệm Kling AI, Veo 3.1, Runway Gen-3</td>
                                    <td>5 ngày</td>
                                </tr>
                                <tr>
                                    <td>2.2.6-7</td>
                                    <td>So sánh & tối ưu</td>
                                    <td>Bảng so sánh, viết prompt template cho 6 cảnh</td>
                                    <td>3 ngày</td>
                                </tr>
                                <tr>
                                    <td>2.2.8-9</td>
                                    <td>Output cuối cùng</td>
                                    <td>Tạo 5-7 footage, viết quy trình</td>
                                    <td>3 ngày</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.phase}>
                        <h3>GIAI ĐOẠN 3: PHÂN TÍCH & CẢI THIỆN PROMPT (Tuần 7-10)</h3>
                        <ul>
                            <li>Thu thập prompt gốc từ Team Video (23 jobs)</li>
                            <li>Phân loại theo loại effect: Lifestyle, Season, Day-Night, Object, Creative, Agent</li>
                            <li>Xác định pattern lỗi trong prompt</li>
                            <li>Viết prompt cải tiến cho từng case</li>
                            <li>Xây dựng Prompt Library với 20+ templates</li>
                            <li>Document hướng dẫn sử dụng</li>
                        </ul>
                    </div>

                    <div className={styles.phase}>
                        <h3>GIAI ĐOẠN 4: XÂY DỰNG QUY TRÌNH & AUTOMATION (Tuần 11-14)</h3>
                        <div className={styles.grid2}>
                            <div>
                                <h4>Chuẩn hóa Workflow:</h4>
                                <ul>
                                    <li>Workflow chuẩn: Brief → Output</li>
                                    <li>Brief Confirmation Template</li>
                                    <li>QC Checklist cho AI Output</li>
                                    <li>SOP cho từng loại Effect</li>
                                    <li>Training document cho Team Video</li>
                                </ul>
                            </div>
                            <div>
                                <h4>Automation Tools:</h4>
                                <ul>
                                    <li>Crawler đối thủ</li>
                                    <li>Crawler mạng xã hội (trends)</li>
                                    <li>Prompt Testing Pipeline</li>
                                    <li>Quality Scoring Tool</li>
                                    <li>Dashboard theo dõi research</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={styles.phase}>
                        <h3>GIAI ĐOẠN 5: CHUYỂN GIAO & THEO DÕI (Tuần 15-16)</h3>
                        <ul>
                            <li>Họp chuyển giao với Team Video</li>
                            <li>Training session hands-on</li>
                            <li>Pilot run với 5 job mới</li>
                            <li>Thu thập feedback và điều chỉnh</li>
                            <li>Báo cáo kết quả R&D</li>
                        </ul>
                    </div>
                </section>

                {/* Phần 3: Công cụ & Resources */}
                <section className={styles.section}>
                    <h2>3. NGUỒN NGHIÊN CỨU VÀ CÔNG CỤ</h2>
                    <div className={styles.grid2}>
                        <div className={styles.card}>
                            <h3>🛠️ Công cụ AI Video</h3>
                            <ul>
                                <li><strong>Kling AI:</strong> Lip-sync, Image-to-Video</li>
                                <li><strong>Veo 2/3.1:</strong> Cinematic video generation</li>
                                <li><strong>Runway Gen-3:</strong> Fast generation</li>
                                <li><strong>Pika Labs:</strong> Stylized motion</li>
                                <li><strong>Luma:</strong> 3D understanding</li>
                                <li><strong>ElevenLabs:</strong> Voice generation</li>
                            </ul>
                        </div>
                        <div className={styles.card}>
                            <h3>📚 Nguồn học tập</h3>
                            <ul>
                                <li>Runway Prompt Guide (Official docs)</li>
                                <li>Kling AI Tutorials (YouTube)</li>
                                <li>r/StableDiffusion (Reddit)</li>
                                <li>Civitai, PromptHero</li>
                                <li>AI Video Community Discord</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Phần 4: Timeline */}
                <section className={styles.section}>
                    <h2>4. TIMELINE TỔNG HỢP</h2>
                    <div className={styles.timeline}>
                        <div className={styles.timelineItem}>
                            <div className={styles.timelineLabel}>Tuần 1-2</div>
                            <div className={styles.timelineBar} style={{ width: '12.5%', background: '#4CAF50' }}>Thiết lập nền tảng</div>
                        </div>
                        <div className={styles.timelineItem}>
                            <div className={styles.timelineLabel}>Tuần 3-6</div>
                            <div className={styles.timelineBar} style={{ width: '25%', background: '#2196F3' }}>Bài toán 1 & 2</div>
                        </div>
                        <div className={styles.timelineItem}>
                            <div className={styles.timelineLabel}>Tuần 7-10</div>
                            <div className={styles.timelineBar} style={{ width: '25%', background: '#FF9800' }}>Phân tích Prompt</div>
                        </div>
                        <div className={styles.timelineItem}>
                            <div className={styles.timelineLabel}>Tuần 11-14</div>
                            <div className={styles.timelineBar} style={{ width: '25%', background: '#9C27B0' }}>Quy trình & Automation</div>
                        </div>
                        <div className={styles.timelineItem}>
                            <div className={styles.timelineLabel}>Tuần 15-16</div>
                            <div className={styles.timelineBar} style={{ width: '12.5%', background: '#F44336' }}>Chuyển giao</div>
                        </div>
                    </div>

                    <h3>Milestones chính:</h3>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Tuần</th>
                                <th>Milestone</th>
                                <th>Deliverable</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2</td>
                                <td>Hoàn thành thiết lập</td>
                                <td>Automation Crawler v1.0, Prompt Testing Sheet</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Hoàn thành Bài toán 1</td>
                                <td>Output video với Agent mới, Quy trình documented</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>Hoàn thành Bài toán 2</td>
                                <td>5-7 footage, Prompt templates cho 6 cảnh</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>Hoàn thành Prompt Library</td>
                                <td>20+ templates, Hướng dẫn sử dụng</td>
                            </tr>
                            <tr>
                                <td>14</td>
                                <td>Hoàn thành Workflow</td>
                                <td>SOP, QC Checklist, Training document</td>
                            </tr>
                            <tr>
                                <td>16</td>
                                <td>Hoàn thành chuyển giao</td>
                                <td>Team Video áp dụng quy trình mới, Báo cáo kết quả</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                {/* Phần 5: KPIs */}
                <section className={styles.section}>
                    <h2>5. METRICS ĐO LƯỜNG</h2>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Metric</th>
                                <th>Cách đo</th>
                                <th>Mục tiêu sau 4 tháng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Số prompt templates hoàn thành</td>
                                <td>Đếm trong Prompt Library</td>
                                <td>≥ 20 templates</td>
                            </tr>
                            <tr>
                                <td>Tỷ lệ thành công prompt</td>
                                <td>Output đạt QC / Tổng lần generate</td>
                                <td>≥ 70%</td>
                            </tr>
                            <tr>
                                <td>Số job được phân tích</td>
                                <td>Đếm báo cáo so sánh</td>
                                <td>≥ 15 jobs</td>
                            </tr>
                            <tr>
                                <td>Số quy trình chuyển giao</td>
                                <td>Đếm SOP được Team Video áp dụng</td>
                                <td>≥ 5 SOPs</td>
                            </tr>
                            <tr>
                                <td>Thời gian giảm cho Team Video</td>
                                <td>So sánh trước/sau quy trình mới</td>
                                <td>Giảm ≥ 20%</td>
                            </tr>
                            <tr>
                                <td>Automation tools hoạt động</td>
                                <td>Đếm tools chạy ổn định</td>
                                <td>≥ 3 tools</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    )
}
