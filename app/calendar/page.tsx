'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [activeTab, setActiveTab] = useState<'todo' | 'timesheet' | 'diary' | 'meeting'>('todo')

    // Notes data structure
    const [notes, setNotes] = useState<{ [key: string]: any }>({})

    // Calendar logic
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']

    const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

    // Simple Lunar calendar conversion (approximate)
    const getLunarDate = (date: Date) => {
        // This is a simplified version - for production use a proper library like lunar-javascript
        const dayDiff = Math.floor((date.getTime() - new Date(2000, 0, 1).getTime()) / (1000 * 60 * 60 * 24))
        const lunarDay = (dayDiff % 30) + 1
        return lunarDay
    }

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1))
    }

    const selectDate = (day: number) => {
        setSelectedDate(new Date(year, month, day))
    }

    const getDateKey = (date: Date) => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }

    const selectedDateKey = selectedDate ? getDateKey(selectedDate) : null
    const todayKey = getDateKey(new Date())

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>📅 Lịch Làm Việc</h1>
                <p className={styles.subtitle}>Âm Lịch & Dương Lịch • Todo • Chấm công • Nhật ký • Họp</p>
            </header>

            <div className={styles.calendarLayout}>
                {/* Calendar Section */}
                <div className={styles.calendarSection}>
                    <div className={styles.calendarHeader}>
                        <button onClick={prevMonth} className={styles.navBtn}>←</button>
                        <h2>{monthNames[month]} {year}</h2>
                        <button onClick={nextMonth} className={styles.navBtn}>→</button>
                    </div>

                    <div className={styles.calendar}>
                        <div className={styles.weekDays}>
                            {weekDays.map(day => (
                                <div key={day} className={styles.weekDay}>{day}</div>
                            ))}
                        </div>
                        <div className={styles.days}>
                            {Array.from({ length: firstDay }).map((_, i) => (
                                <div key={`empty-${i}`} className={styles.emptyDay}></div>
                            ))}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1
                                const date = new Date(year, month, day)
                                const dateKey = getDateKey(date)
                                const isToday = dateKey === todayKey
                                const isSelected = selectedDate && dateKey === selectedDateKey
                                const lunarDay = getLunarDate(date)

                                return (
                                    <div
                                        key={day}
                                        className={`${styles.day} ${isToday ? styles.today : ''} ${isSelected ? styles.selected : ''}`}
                                        onClick={() => selectDate(day)}
                                    >
                                        <div className={styles.solarDay}>{day}</div>
                                        <div className={styles.lunarDay}>{lunarDay}</div>
                                        {notes[dateKey] && <div className={styles.hasNotes}>•</div>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Notes Section */}
                <div className={styles.notesSection}>
                    <div className={styles.dateDisplay}>
                        {selectedDate ? (
                            <>
                                <h3>{selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}</h3>
                                <p>Âm lịch: {getLunarDate(selectedDate)}</p>
                            </>
                        ) : (
                            <h3>Chọn ngày để xem chi tiết</h3>
                        )}
                    </div>

                    {selectedDate && (
                        <>
                            <div className={styles.tabs}>
                                <button
                                    className={`${styles.tab} ${activeTab === 'todo' ? styles.activeTab : ''}`}
                                    onClick={() => setActiveTab('todo')}
                                >
                                    ✓ Todo
                                </button>
                                <button
                                    className={`${styles.tab} ${activeTab === 'timesheet' ? styles.activeTab : ''}`}
                                    onClick={() => setActiveTab('timesheet')}
                                >
                                    ⏱ Chấm công
                                </button>
                                <button
                                    className={`${styles.tab} ${activeTab === 'diary' ? styles.activeTab : ''}`}
                                    onClick={() => setActiveTab('diary')}
                                >
                                    📔 Nhật ký
                                </button>
                                <button
                                    className={`${styles.tab} ${activeTab === 'meeting' ? styles.activeTab : ''}`}
                                    onClick={() => setActiveTab('meeting')}
                                >
                                    📞 Lịch họp
                                </button>
                            </div>

                            <div className={styles.noteContent}>
                                {activeTab === 'todo' && (
                                    <div className={styles.todoList}>
                                        <h4>Todo List</h4>
                                        <textarea
                                            className={styles.textarea}
                                            placeholder="- [ ] Task 1&#10;- [ ] Task 2&#10;- [x] Completed task"
                                            rows={10}
                                        ></textarea>
                                    </div>
                                )}

                                {activeTab === 'timesheet' && (
                                    <div className={styles.timesheet}>
                                        <h4>Chấm công</h4>
                                        <div className={styles.timeInputs}>
                                            <label>
                                                Giờ vào: <input type="time" className={styles.timeInput} />
                                            </label>
                                            <label>
                                                Giờ ra: <input type="time" className={styles.timeInput} />
                                            </label>
                                        </div>
                                        <textarea
                                            className={styles.textarea}
                                            placeholder="Ghi chú công việc trong ngày..."
                                            rows={6}
                                        ></textarea>
                                    </div>
                                )}

                                {activeTab === 'diary' && (
                                    <div className={styles.diary}>
                                        <h4>Nhật ký</h4>
                                        <textarea
                                            className={styles.textarea}
                                            placeholder="Viết nhật ký công việc..."
                                            rows={10}
                                        ></textarea>
                                    </div>
                                )}

                                {activeTab === 'meeting' && (
                                    <div className={styles.meeting}>
                                        <h4>Lịch họp</h4>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            placeholder="Tiêu đề cuộc họp"
                                        />
                                        <div className={styles.timeInputs}>
                                            <label>
                                                Giờ bắt đầu: <input type="time" className={styles.timeInput} />
                                            </label>
                                            <label>
                                                Giờ kết thúc: <input type="time" className={styles.timeInput} />
                                            </label>
                                        </div>
                                        <textarea
                                            className={styles.textarea}
                                            placeholder="Nội dung cuộc họp, người tham gia..."
                                            rows={6}
                                        ></textarea>
                                    </div>
                                )}

                                <button className={styles.saveBtn}>💾 Lưu</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
