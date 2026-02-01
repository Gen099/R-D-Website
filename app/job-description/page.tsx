import styles from './page.module.css'

export default function JobDescriptionPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>💼 Mô tả Công việc R&D Specialist</h1>
                <p className={styles.subtitle}>AI Video & Prompt Engineering</p>
            </header>

            {/* Overview */}
            <section className={styles.section}>
                <h2>Thông tin vị trí</h2>
                <div className={styles.infoGrid}>
                    <div className={styles.infoCard}>
                        <div className={styles.infoLabel}>Chức danh</div>
                        <div className={styles.infoValue}>R&D Specialist - AI Video & Prompt Engineering</div>
                    </div>
                    <div className={styles.infoCard}>
                        <div className={styles.infoLabel}>Phòng ban</div>
                        <div className={styles.infoValue}>R&D / Production</div>
                    </div>
                    <div className={styles.infoCard}>
                        <div className={styles.infoLabel}>Báo cáo cho</div>
                        <div className={styles.infoValue}>Trưởng phòng R&D / Production Manager</div>
                    </div>
                    <div className={styles.infoCard}>
                        <div className={styles.infoLabel}>Ngày bắt đầu</div>
                        <div className={styles.infoValue}>29/01/2026</div>
                    </div>
                </div>
            </section>

            {/* Overview Description */}
            <section className={styles.section}>
                <h2>Mô tả tổng quan</h2>
                <p className={styles.description}>
                    Chuyên sâu về <strong>Prompt Engineering</strong> cho AI Video, chịu trách nhiệm nghiên cứu, viết và tối ưu hóa prompt,
                    đồng thời xây dựng và chuẩn hóa quy trình tạo video bằng AI cho công ty.
                </p>
            </section>

            {/* Core Responsibilities */}
            <section className={styles.section}>
                <h2>Nhiệm vụ cốt lõi</h2>
                <div className={styles.responsibilitiesGrid}>
                    <div className={styles.respCard}>
                        <div className={styles.respIcon}>🔬</div>
                        <h3>Nghiên cứu & Phát triển Prompt</h3>
                        <ul>
                            <li>Nghiên cứu prompt cho Text-to-Video, Image-to-Video</li>
                            <li>Viết prompt có cấu trúc, logic, dễ tái sử dụng</li>
                            <li>Thử nghiệm và cải tiến prompt</li>
                            <li>Benchmark công cụ: Kling vs Veo vs Runway</li>
                        </ul>
                    </div>

                    <div className={styles.respCard}>
                        <div className={styles.respIcon}>⚙️</div>
                        <h3>Tối ưu hóa & Chuẩn hóa</h3>
                        <ul>
                            <li>Xây dựng template theo từng mục đích</li>
                            <li>Xây dựng Prompt Library cho công ty</li>
                            <li>Chuẩn hóa workflow từ brief đến output</li>
                            <li>Documentation và cập nhật tài liệu</li>
                        </ul>
                    </div>

                    <div className={styles.respCard}>
                        <div className={styles.respIcon}>🎬</div>
                        <h3>Phối hợp tạo Video</h3>
                        <ul>
                            <li>Tạo video trực tiếp bằng AI theo quy trình</li>
                            <li>Phối hợp với editor hoặc tự edit cơ bản</li>
                            <li>Hỗ trợ các bộ phận khác sử dụng prompt</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Problem Solving */}
            <section className={styles.section}>
                <h2>Bài toán cần giải quyết</h2>
                <div className={styles.problemsGrid}>
                    <div className={styles.problemCard}>
                        <h3>1️⃣ Tự sinh output từ input</h3>
                        <ul>
                            <li>Lấy input đầu vào</li>
                            <li>Sử dụng AI tools tạo output đẹp và hoàn chỉnh</li>
                            <li>Ghi nhận quy trình và prompt sử dụng</li>
                        </ul>
                    </div>

                    <div className={styles.problemCard}>
                        <h3>2️⃣ So sánh với team Video</h3>
                        <ul>
                            <li>So sánh chất lượng: AI vs Team Video</li>
                            <li>So sánh tốc độ xử lý</li>
                            <li>So sánh prompt/kỹ thuật khác biệt</li>
                            <li>Ghi nhận kết quả</li>
                        </ul>
                    </div>

                    <div className={styles.problemCard}>
                        <h3>3️⃣ Tối ưu quy trình</h3>
                        <ul>
                            <li>Nếu AI tối ưu hơn: viết lại quy trình</li>
                            <li>Chuyển giao cho team Video</li>
                            <li>Đào tạo và follow-up</li>
                        </ul>
                    </div>

                    <div className={styles.problemCard}>
                        <h3>4️⃣ Xử lý feedback xấu</h3>
                        <ul>
                            <li>Phân tích prompt đã dùng, xác định lỗi</li>
                            <li>Đề xuất prompt mới, test và validate</li>
                            <li>Chuẩn hóa để tránh lặp lại</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Deliverables */}
            <section className={styles.section}>
                <h2>Deliverables (Sản phẩm bàn giao)</h2>
                <div className={styles.deliverablesGrid}>
                    <div className={styles.deliverableItem}>
                        <span className={styles.deliverableIcon}>📋</span>
                        <div>
                            <strong>Todolist công việc</strong>
                            <p>Hàng tuần</p>
                        </div>
                    </div>
                    <div className={styles.deliverableItem}>
                        <span className={styles.deliverableIcon}>📚</span>
                        <div>
                            <strong>Kho tài nguyên nghiên cứu</strong>
                            <p>Liên tục cập nhật</p>
                        </div>
                    </div>
                    <div className={styles.deliverableItem}>
                        <span className={styles.deliverableIcon}>💡</span>
                        <div>
                            <strong>Prompt Library</strong>
                            <p>Liên tục cập nhật</p>
                        </div>
                    </div>
                    <div className={styles.deliverableItem}>
                        <span className={styles.deliverableIcon}>📊</span>
                        <div>
                            <strong>Báo cáo so sánh AI vs Team Video</strong>
                            <p>Theo dự án</p>
                        </div>
                    </div>
                    <div className={styles.deliverableItem}>
                        <span className={styles.deliverableIcon}>📝</span>
                        <div>
                            <strong>SOP mới (nếu AI tối ưu hơn)</strong>
                            <p>Theo nhu cầu</p>
                        </div>
                    </div>
                    <div className={styles.deliverableItem}>
                        <span className={styles.deliverableIcon}>🤖</span>
                        <div>
                            <strong>Tool automation</strong>
                            <p>Theo phase</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools */}
            <section className={styles.section}>
                <h2>Công cụ sử dụng</h2>
                <div className={styles.toolsGrid}>
                    <div className={styles.toolCategory}>
                        <h3>Image Generation</h3>
                        <div className={styles.toolsList}>
                            <span className={styles.toolBadge}>Nano Banana Pro</span>
                            <span className={styles.toolBadge}>Midjourney</span>
                            <span className={styles.toolBadge}>DALL-E 3</span>
                            <span className={styles.toolBadge}>Stable Diffusion</span>
                        </div>
                    </div>

                    <div className={styles.toolCategory}>
                        <h3>Video Generation</h3>
                        <div className={styles.toolsList}>
                            <span className={styles.toolBadge} style={{ background: 'var(--color-primary)', color: 'white' }}>Kling AI</span>
                            <span className={styles.toolBadge}>Veo 2/3.1</span>
                            <span className={styles.toolBadge}>Runway Gen-3</span>
                            <span className={styles.toolBadge}>Pika Labs</span>
                            <span className={styles.toolBadge}>Luma Dream Machine</span>
                        </div>
                    </div>

                    <div className={styles.toolCategory}>
                        <h3>Editing</h3>
                        <div className={styles.toolsList}>
                            <span className={styles.toolBadge}>Adobe Premiere</span>
                            <span className={styles.toolBadge}>After Effects</span>
                            <span className={styles.toolBadge}>DaVinci Resolve</span>
                        </div>
                    </div>

                    <div className={styles.toolCategory}>
                        <h3>Documentation</h3>
                        <div className={styles.toolsList}>
                            <span className={styles.toolBadge}>Notion</span>
                            <span className={styles.toolBadge}>Google Docs</span>
                            <span className={styles.toolBadge}>Markdown</span>
                        </div>
                    </div>

                    <div className={styles.toolCategory}>
                        <h3>Communication</h3>
                        <div className={styles.toolsList}>
                            <span className={styles.toolBadge}>Slack</span>
                            <span className={styles.toolBadge}>Zalo</span>
                            <span className={styles.toolBadge}>Email</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
