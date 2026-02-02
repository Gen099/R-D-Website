'use client'

import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import styles from './page.module.css'
import EventForm from '@/components/calendar/EventForm'

export default function CalendarPage() {
    const { data: session, status } = useSession()
    const [showInstructions, setShowInstructions] = useState(false)
    const [showEventForm, setShowEventForm] = useState(false)
    const [events, setEvents] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    // User's calendar with optimized view settings
    const defaultCalendarSrc = "https://calendar.google.com/calendar/embed?src=sonbkdn95%40gmail.com&ctz=Asia%2FHo_Chi_Minh&wkst=1&bgcolor=%23ffffff&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0"

    // Fetch events when logged in
    useEffect(() => {
        if (session) {
            fetchEvents()
        }
    }, [session])

    const fetchEvents = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/calendar/events')
            const data = await response.json()
            setEvents(data.events || [])
        } catch (error) {
            console.error('Failed to fetch events:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateEvent = async (eventData: any) => {
        // Convert datetime-local to ISO string
        const startISO = new Date(eventData.start).toISOString()
        const endISO = new Date(eventData.end).toISOString()

        const response = await fetch('/api/calendar/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...eventData,
                start: startISO,
                end: endISO,
            })
        })

        if (!response.ok) {
            throw new Error('Failed to create event')
        }

        // Refresh events
        await fetchEvents()
        alert('✅ Đã tạo sự kiện thành công!')
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div>
                        <h1>📅 Lịch Làm Việc</h1>
                        <p className={styles.subtitle}>
                            {session ? `Xin chào, ${session.user?.name} ☁️` : 'Google Calendar - Đồng bộ tự động trên mọi thiết bị ☁️'}
                        </p>
                    </div>
                    <div className={styles.headerActions}>
                        {status === 'loading' ? (
                            <button className={styles.authBtn} disabled>⏳ Đang tải...</button>
                        ) : session ? (
                            <>
                                <button
                                    onClick={() => setShowEventForm(true)}
                                    className={styles.createBtn}
                                >
                                    ➕ Tạo sự kiện
                                </button>
                                <button
                                    onClick={() => signOut()}
                                    className={styles.authBtn}
                                >
                                    🚪 Đăng xuất
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => signIn('google')}
                                className={styles.authBtn}
                            >
                                🔐 Đăng nhập Google
                            </button>
                        )}
                        <button
                            onClick={() => setShowInstructions(!showInstructions)}
                            className={styles.instructionBtn}
                        >
                            {showInstructions ? '❌ Đóng' : '⚙️ Cài đặt'}
                        </button>
                    </div>
                </div>
            </header>

            {!session && (
                <div className={styles.loginPrompt}>
                    <h3>🔐 Đăng nhập để tạo sự kiện</h3>
                    <p>Bạn cần đăng nhập với Google để có thể tạo và quản lý sự kiện trực tiếp trên web này.</p>
                    <button onClick={() => signIn('google')} className={styles.loginBtn}>
                        Đăng nhập với Google
                    </button>
                </div>
            )}

            {showInstructions && (
                <div className={styles.instructionsPanel}>
                    <h3>📖 Hướng dẫn sử dụng Google Calendar của bạn</h3>

                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <strong>Bước 1:</strong> Mở <a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer">Google Calendar</a> trên máy tính.
                        </div>
                        <div className={styles.step}>
                            <strong>Bước 2:</strong> Click biểu tượng ⚙️ <strong>Settings</strong> (góc trên bên phải) &gt; chọn <strong>Settings</strong>.
                        </div>
                        <div className={styles.step}>
                            <strong>Bước 3:</strong> ⚠️ <strong>QUAN TRỌNG:</strong> Nhìn cột bên trái, tìm mục "Settings for my calendars". <strong>Click vào TÊN LỊCH</strong> bạn muốn embed (ví dụ: "Lịch cá nhân").
                        </div>
                        <div className={styles.step}>
                            <strong>Bước 4:</strong> Sau khi click tên lịch, màn hình bên phải sẽ đổi. Scroll xuống gần cuối tìm mục <strong>"Integrate calendar"</strong>.
                        </div>
                        <div className={styles.step}>
                            <strong>Bước 5:</strong> Click <strong>"Customize"</strong> để chỉnh màu sắc, bỏ title.
                        </div>
                        <div className={styles.step}>
                            <strong>Bước 6:</strong> Copy đoạn mã trong ô <strong>Embed code</strong>.
                        </div>
                        <div className={styles.step}>
                            <strong>Bước 7:</strong> Gửi đoạn mã đó cho tôi.
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

            {session && events.length > 0 && (
                <div className={styles.eventsList}>
                    <h3>📋 Sự kiện sắp tới ({events.length})</h3>
                    <div className={styles.eventsGrid}>
                        {events.slice(0, 5).map((event: any) => (
                            <div key={event.id} className={styles.eventCard}>
                                <div className={styles.eventTitle}>{event.summary}</div>
                                <div className={styles.eventTime}>
                                    {new Date(event.start?.dateTime || event.start?.date).toLocaleString('vi-VN')}
                                </div>
                                {event.location && (
                                    <div className={styles.eventLocation}>📍 {event.location}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {showEventForm && (
                <EventForm
                    onClose={() => setShowEventForm(false)}
                    onSubmit={handleCreateEvent}
                />
            )}
        </div>
    )
}
