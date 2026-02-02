// Daily Task Management Types

export interface DailyTask {
    id: string
    date: string // "2026-02-02"
    title: string
    description?: string
    startTime: string // "09:00"
    endTime: string // "17:00"
    duration: number // minutes
    collaborators: string[]
    category: 'meeting' | 'coding' | 'research' | 'design' | 'planning' | 'review' | 'other'
    status: 'completed' | 'in-progress' | 'blocked' | 'cancelled'
    result: string
    tags: string[]
    createdAt: string
    updatedAt: string
}

export interface DailySummary {
    date: string
    tasks: DailyTask[]
    totalDuration: number // minutes
    completedTasks: number
    totalTasks: number
    collaborators: string[]
    categoryBreakdown: Record<string, number>
    productivity: number // 0-100
}

export interface WeeklySummary {
    week: string // "2026-W05"
    startDate: string
    endDate: string
    totalTasks: number
    totalHours: number
    completedTasks: number
    completionRate: number
    topCollaborators: Array<{ name: string; count: number }>
    categoryBreakdown: Record<string, number>
    achievements: string[]
    dailySummaries: DailySummary[]
}

export interface TaskFormData {
    title: string
    description?: string
    startTime: string
    endTime: string
    collaborators: string[]
    category: DailyTask['category']
    status: DailyTask['status']
    result: string
    tags: string[]
}
