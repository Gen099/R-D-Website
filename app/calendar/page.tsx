'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function CalendarPage() {
    const [showInstructions, setShowInstructions] = useState(false)

    // Default embed - User can replace this with their own calendar
    const defaultCalendarSrc = "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FHo_Chi_Minh&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=1&mode=WEEK"

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div>
                        <h1>📅 Lịch Làm Việc</h1>
                        <p className={styles.subtitle}>Google Calendar - Đồng bộ tự động trên mọi thiết bị ☁️</p>
                    </div>
                    <button
                        onClick={() => setShowInstructions(!showInstructions)}
                        className={styles.instructionBtn}
                    >
                        {showInstructions ? '❌ Đóng' : '⚙️ Cài đặt'}
                    </button>
                </div>
            </header>

            {showInstructions && (
                <div className={styles.instructionsPanel}>
                    <h3>📖 Hướng dẫn sử dụng Google Calendar của bạn</h3>

                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <strong>Bước 1:</strong> Mở <a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer">Google Calendar</a>
                        </div>
                        <div className={styles.step}>
                            <strong>Bước 2:</strong> Click vào ⚙️ Settings (góc trên bên phải)
                        </div>
                        <div className={styles.step}>
                            <strong>Bước 3:</strong> Chọn calendar bạn muốn embed (bên trái sidebar)
                        </div>
                        <div className={styles.step}>
                            <strong>Bước 4:</strong> Scroll xuống phần <strong>"Integrate calendar"</strong>
                        </div>
                        <div className={styles.step}>
                            <strong>Bước 5:</strong> Click <strong>"Customize"</strong> để chỉnh view, màu sắc
                        </div>
                        <div className={styles.step}>
                            <strong>Bước 6:</strong> Copy <strong>iframe code</strong>
                        </div>
                        <div className={styles.step}>
                            <strong>Bước 7:</strong> Gửi link trong iframe cho tôi để update vào code
                        </div>
                    </div>

                    <div className={styles.note}>
                        <strong>⚠️ Lưu ý:</strong>
                        <ul>
                            <li>Calendar phải được set <strong>Public</strong> mới embed được</li>
                            <li>Hoặc share specific với email domain công ty</li>
                            <li>Mọi thay đổi trên Google Calendar sẽ tự động sync</li>
                        </ul>
                    </div>

                    <div className={styles.benefits}>
                        <h4>✅ Lợi ích khi dùng Google Calendar:</h4>
                        <ul>
                            <li>📱 Có app mobile iOS & Android</li>
                            <li>🔔 Nhận thông báo trước sự kiện</li>
                            <li>🌐 Sync tự động trên mọi thiết bị</li>
                            <li>👥 Chia sẻ lịch với team</li>
                            <li>📧 Tích hợp với Gmail, Meet</li>
                            <li>🔄 Import/Export events dễ dàng</li>
                        </ul>
                    </div>
                </div>
            )}

            <div className={styles.calendarWrapper}>
                <iframe
                    src={defaultCalendarSrc}
                    className={styles.calendarFrame}
                    frameBorder="0"
                    scrolling="no"
                ></iframe>
            </div>

            <div className={styles.quickLinks}>
                <a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    🔗 Mở Google Calendar
                </a>
                <a href="https://calendar.google.com/calendar/u/0/r/settings" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    ⚙️ Calendar Settings
                </a>
                <a href="https://support.google.com/calendar/answer/41207" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    📚 Hướng dẫn embed
                </a>
            </div>
        </div>
    )
}
