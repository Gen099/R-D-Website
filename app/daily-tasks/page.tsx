'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import styles from './page.module.css'
import type { DailyTask, DailySummary } from '@/types/daily-tasks'

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

    const loadTasks = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/daily-tasks?date=${currentDate}`)
            if (!response.ok) {
                throw new Error('Failed to fetch tasks')
            }
            const data = await response.json()
            setSummary(data)
        } catch (error) {
            console.error('Failed to load tasks:', error)
            // Set empty summary on error
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
            const response = await fetch('/api/daily-tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: currentDate,
                    task: editingTask ? { ...taskData, id: editingTask.id } : taskData
                })
            })

            if (!response.ok) {
                throw new Error('Failed to save task')
            }

            // Reload tasks and close form
            await loadTasks()
            setShowTaskForm(false)
            setEditingTask(null)
        } catch (error) {
            console.error('Failed to save task:', error)
            alert('Lỗi khi lưu task. Vui lòng thử lại.')
            throw error // Re-throw so TaskForm knows it failed
        }
    }

    const handleDeleteTask = async (taskId: string) => {
        if (!confirm('Xóa task này?')) return

        try {
            const response = await fetch(`/api/daily-tasks?date=${currentDate}&taskId=${taskId}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                await loadTasks()
            }
        } catch (error) {
            console.error('Failed to delete task:', error)
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
                <button className={styles.pdfBtn}>
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
