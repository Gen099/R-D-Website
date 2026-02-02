// Task Storage Utility - localStorage implementation
import { DailyTask, DailySummary } from '@/types/daily-tasks'

const STORAGE_PREFIX = 'fotober_daily_tasks_'

// Get storage key for a date
function getStorageKey(date: string): string {
    return `${STORAGE_PREFIX}${date}`
}

// Calculate task duration
function calculateDuration(startTime: string, endTime: string): number {
    const [startHour, startMin] = startTime.split(':').map(Number)
    const [endHour, endMin] = endTime.split(':').map(Number)
    const startMinutes = startHour * 60 + startMin
    const endMinutes = endHour * 60 + endMin
    return endMinutes - startMinutes
}

// Calculate summary from tasks
function calculateSummary(date: string, tasks: DailyTask[]): DailySummary {
    const totalDuration = tasks.reduce((sum, t) => sum + t.duration, 0)
    const completedTasks = tasks.filter(t => t.status === 'completed').length
    const allCollaborators = tasks.flatMap(t => t.collaborators)
    const uniqueCollaborators = [...new Set(allCollaborators)]

    const categoryBreakdown = tasks.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const productivity = tasks.length > 0
        ? Math.round((completedTasks / tasks.length) * 100)
        : 0

    return {
        date,
        tasks,
        totalDuration,
        completedTasks,
        totalTasks: tasks.length,
        collaborators: uniqueCollaborators,
        categoryBreakdown,
        productivity
    }
}

// Get tasks for a date
export function getTasks(date: string): DailySummary {
    if (typeof window === 'undefined') {
        return {
            date,
            tasks: [],
            totalDuration: 0,
            completedTasks: 0,
            totalTasks: 0,
            collaborators: [],
            categoryBreakdown: {},
            productivity: 0
        }
    }

    const key = getStorageKey(date)
    const stored = localStorage.getItem(key)

    if (!stored) {
        return calculateSummary(date, [])
    }

    try {
        return JSON.parse(stored)
    } catch {
        return calculateSummary(date, [])
    }
}

// Save task
export function saveTask(date: string, taskData: Partial<DailyTask>): DailySummary {
    const summary = getTasks(date)

    const duration = calculateDuration(taskData.startTime!, taskData.endTime!)

    const newTask: DailyTask = {
        id: taskData.id || `task-${Date.now()}`,
        date,
        title: taskData.title!,
        description: taskData.description || '',
        startTime: taskData.startTime!,
        endTime: taskData.endTime!,
        duration,
        collaborators: taskData.collaborators || [],
        category: taskData.category || 'other',
        status: taskData.status || 'in-progress',
        result: taskData.result || '',
        tags: taskData.tags || [],
        createdAt: taskData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    // Add or update
    const existingIndex = summary.tasks.findIndex(t => t.id === newTask.id)
    if (existingIndex >= 0) {
        summary.tasks[existingIndex] = newTask
    } else {
        summary.tasks.push(newTask)
    }

    // Recalculate
    const updatedSummary = calculateSummary(date, summary.tasks)

    // Save to localStorage
    localStorage.setItem(getStorageKey(date), JSON.stringify(updatedSummary))

    return updatedSummary
}

// Delete task
export function deleteTask(date: string, taskId: string): DailySummary {
    const summary = getTasks(date)
    summary.tasks = summary.tasks.filter(t => t.id !== taskId)

    const updatedSummary = calculateSummary(date, summary.tasks)
    localStorage.setItem(getStorageKey(date), JSON.stringify(updatedSummary))

    return updatedSummary
}
