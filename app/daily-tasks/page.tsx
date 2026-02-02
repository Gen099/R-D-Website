'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import styles from './page.module.css'
import type { DailyTask, DailySummary } from '@/types/daily-tasks'
import { getTasks, saveTask, deleteTask } from '@/lib/taskStorage'

// Dynamic import to fix client-side errors
const TaskForm = dynamic(
    () => import('@/components/daily-tasks/TaskForm'),
    { ssr: false }
)

export default function DailyTasksPage() {
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0])
    const [summary, setSummary] = useState<DailySummary | null>(null)
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [editingTask, setEditingTask] = useState<DailyTask | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadTasks()
    }, [currentDate])

    const loadTasks = () => {
        setLoading(true)
        try {
            const data = getTasks(currentDate)
            setSummary(data)
        } catch (error) {
            console.error('Failed to load tasks:', error)
            setSummary({
                date: currentDate,
                tasks: [],
                totalDuration: 0,
                completedTasks: 0,
                totalTasks: 0,
                collaborators: [],
                categoryBreakdown: {},
                productivity: 0,
            })
        } finally {
            setLoading(false)
        }
    }

    const handleSaveTask = async (taskData: any) => {
        try {
            const taskToSave = editingTask ? { ...taskData, id: editingTask.id } : taskData
            const updatedSummary = saveTask(currentDate, taskToSave)
            setSummary(updatedSummary)
            setShowTaskForm(false)
            setEditingTask(null)
        } catch (error) {
            console.error('Failed to save task:', error)
            alert('Lỗi khi lưu task. Vui lòng thử lại.')
            throw error
        }
    }

    const handleDeleteTask = async (taskId: string) => {
        if (!confirm('Xóa task này?')) return

        try {
            const updatedSummary = deleteTask(currentDate, taskId)
            setSummary(updatedSummary)
        } catch (error) {
            console.error('Failed to delete task:', error)
            alert('Lỗi khi xóa task')
        }
    }

    const generatePDF = () => {
        if (!summary || summary.tasks.length === 0) {
            alert('Không có task nào để export!')
            return
        }

        try {
            // Create a simple HTML-based PDF
            const printWindow = window.open('', '', 'height=800,width=600')
            if (!printWindow) {
                alert('Vui lòng cho phép popup để download PDF')
                return
            }

            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Daily Tasks - ${formatDate(currentDate)}</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { color: #4285f4; border-bottom: 3px solid #4285f4; padding-bottom: 10px; }
                        .summary { background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 8px; }
                        .summary-item { display: inline-block; margin-right: 30px; }
                        .task { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px; }
                        .task-header { font-weight: bold; font-size: 1.1em; color: #333; margin-bottom: 10px; }
                        .task-time { color: #666; }
                        .task-description { margin: 10px 0; }
                        .status { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 0.9em; }
                        .status.completed { background: #e8f5e9; color: #2e7d32; }
                        .status.in-progress { background: #fff3e0; color: #e65100; }
                        .status.pending { background: #e3f2fd; color: #1565c0; }
                    </style>
                </head>
                <body>
                    <h1>📋 Daily Tasks Report</h1>
                    <p><strong>Ngày:</strong> ${formatDate(currentDate)}</p>
                    
                    <div class="summary">
                        <div class="summary-item"><strong>Tổng tasks:</strong> ${summary.totalTasks}</div>
                        <div class="summary-item"><strong>Hoàn thành:</strong> ${summary.completedTasks}</div>
                        <div class="summary-item"><strong>Tổng thời gian:</strong> ${formatDuration(summary.totalDuration)}</div>
                        <div class="summary-item"><strong>Hiệu suất:</strong> ${summary.productivity}%</div>
                    </div>

                    <h2>Chi tiết Tasks</h2>
                    ${summary.tasks.map(task => `
                        <div class="task">
                            <div class="task-header">
                                ${task.title}
                                <span class="status ${task.status}">${task.status}</span>
                            </div>
                            <div class="task-time">
                                ⏰ ${task.startTime} - ${task.endTime} (${formatDuration(task.duration)})
                            </div>
                            ${task.description ? `<div class="task-description">📝 ${task.description}</div>` : ''}
                            ${task.result ? `<div class="task-description">✅ ${task.result}</div>` : ''}
                            ${task.collaborators.length > 0 ? `<div>👥 ${task.collaborators.join(', ')}</div>` : ''}
                        </div>
                    `).join('')}

                    <script>
                        window.print()
                        setTimeout(() => window.close(), 100)
                    </script>
                </body>
                </html>
            `

            printWindow.document.write(html)
            printWindow.document.close()
        } catch (error) {
            console.error('PDF generation error:', error)
            alert('Lỗi khi tạo PDF')
        }
    }

    const changeDate = (days: number) => {
        const newDate = new Date(currentDate)
        newDate.setDate(newDate.getDate() + days)
        setCurrentDate(newDate.toISOString().split('T')[0])
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        return date.toLocaleDateString('vi-VN', options)
    }

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        if (hours === 0) return `${mins}m`
        if (mins === 0) return `${hours}h`
        return `${hours}h ${mins}m`
    }

    const getCategoryIcon = (category: string) => {
        const icons: Record<string, string> = {
            meeting: '🤝',
            coding: '💻',
            research: '🔍',
            design: '🎨',
            planning: '📋',
            review: '✅',
            other: '📌'
        }
        return icons[category] || '📌'
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>📅 Daily Task Manager</h1>
                    <p className={styles.subtitle}>Track, organize, and review your daily work</p>
                </div>
            </header>

            {/* Date Navigation */}
            <div className={styles.dateNav}>
                <button onClick={() => changeDate(-1)} className={styles.navBtn}>
                    ← Prev Day
                </button>
                <div className={styles.currentDate}>
                    <span className={styles.dateLabel}>{formatDate(currentDate)}</span>
                    <button
                        onClick={() => setCurrentDate(new Date().toISOString().split('T')[0])}
                        className={styles.todayBtn}
                    >
                        Today
                    </button>
                </div>
                <button onClick={() => changeDate(1)} className={styles.navBtn}>
                    Next Day →
                </button>
            </div>

            {/* Summary Cards */}
            {summary && (
                <div className={styles.summaryCards}>
                    <div className={styles.card}>
                        <div className={styles.cardIcon}>📊</div>
                        <div className={styles.cardContent}>
                            <div className={styles.cardValue}>{summary.totalTasks}</div>
                            <div className={styles.cardLabel}>Total Tasks</div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardIcon}>✅</div>
                        <div className={styles.cardContent}>
                            <div className={styles.cardValue}>{summary.completedTasks}/{summary.totalTasks}</div>
                            <div className={styles.cardLabel}>Completed</div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardIcon}>⏱️</div>
                        <div className={styles.cardContent}>
                            <div className={styles.cardValue}>{formatDuration(summary.totalDuration)}</div>
                            <div className={styles.cardLabel}>Total Time</div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardIcon}>🎯</div>
                        <div className={styles.cardContent}>
                            <div className={styles.cardValue}>{summary.productivity}%</div>
                            <div className={styles.cardLabel}>Productivity</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className={styles.actions}>
                <button
                    onClick={() => {
                        setEditingTask(null)
                        setShowTaskForm(true)
                    }}
                    className={styles.addBtn}
                >
                    ➕ New Task
                </button>
                <button onClick={generatePDF} className={styles.pdfBtn}>
                    📄 Generate PDF
                </button>
            </div>

            {/* Tasks Timeline */}
            <div className={styles.timeline}>
                <h2>Timeline</h2>
                {loading ? (
                    <div className={styles.loading}>Loading...</div>
                ) : summary && summary.tasks.length > 0 ? (
                    <div className={styles.tasksList}>
                        {summary.tasks
                            .sort((a, b) => a.startTime.localeCompare(b.startTime))
                            .map(task => (
                                <div key={task.id} className={`${styles.taskCard} ${styles[task.status]}`}>
                                    <div className={styles.taskTime}>
                                        {task.startTime} - {task.endTime}
                                        <span className={styles.duration}>
                                            {formatDuration(task.duration)}
                                        </span>
                                    </div>
                                    <div className={styles.taskContent}>
                                        <div className={styles.taskHeader}>
                                            <span className={styles.categoryIcon}>
                                                {getCategoryIcon(task.category)}
                                            </span>
                                            <h3>{task.title}</h3>
                                            <span className={`${styles.statusBadge} ${styles[task.status]}`}>
                                                {task.status}
                                            </span>
                                        </div>
                                        {task.description && (
                                            <p className={styles.description}>{task.description}</p>
                                        )}
                                        {task.collaborators.length > 0 && (
                                            <div className={styles.collaborators}>
                                                👥 With: {task.collaborators.join(', ')}
                                            </div>
                                        )}
                                        {task.result && (
                                            <div className={styles.result}>
                                                📌 Result: {task.result}
                                            </div>
                                        )}
                                        {task.tags.length > 0 && (
                                            <div className={styles.tags}>
                                                {task.tags.map(tag => (
                                                    <span key={tag} className={styles.tag}>{tag}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.taskActions}>
                                        <button
                                            onClick={() => {
                                                setEditingTask(task)
                                                setShowTaskForm(true)
                                            }}
                                            className={styles.editBtn}
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTask(task.id)}
                                            className={styles.deleteBtn}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>📭</div>
                        <p>No tasks for this day</p>
                        <button
                            onClick={() => setShowTaskForm(true)}
                            className={styles.addFirstBtn}
                        >
                            Add your first task
                        </button>
                    </div>
                )}
            </div>

            {/* Task Form Modal */}
            {showTaskForm && (
                <TaskForm
                    task={editingTask}
                    onClose={() => {
                        setShowTaskForm(false)
                        setEditingTask(null)
                    }}
                    onSubmit={handleSaveTask}
                />
            )}
        </div>
    )
}
