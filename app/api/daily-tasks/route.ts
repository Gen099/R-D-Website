import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { DailyTask, DailySummary } from '@/types/daily-tasks'

const TASKS_DIR = path.join(process.cwd(), 'data', 'tasks')

// Ensure tasks directory exists
async function ensureTasksDir() {
    try {
        await fs.access(TASKS_DIR)
    } catch {
        await fs.mkdir(TASKS_DIR, { recursive: true })
    }
}

// Get file path for a specific date
function getTaskFilePath(date: string) {
    return path.join(TASKS_DIR, `${date}.json`)
}

// Calculate task duration in minutes
function calculateDuration(startTime: string, endTime: string): number {
    const [startHour, startMin] = startTime.split(':').map(Number)
    const [endHour, endMin] = endTime.split(':').map(Number)
    const startMinutes = startHour * 60 + startMin
    const endMinutes = endHour * 60 + endMin
    return endMinutes - startMinutes
}

// GET - Fetch tasks for a specific date
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const date = searchParams.get('date') || new Date().toISOString().split('T')[0]

        await ensureTasksDir()
        const filePath = getTaskFilePath(date)

        try {
            const fileContent = await fs.readFile(filePath, 'utf-8')
            const data = JSON.parse(fileContent)
            return NextResponse.json(data)
        } catch {
            // File doesn't exist, return empty data
            const emptyData: DailySummary = {
                date,
                tasks: [],
                totalDuration: 0,
                completedTasks: 0,
                totalTasks: 0,
                collaborators: [],
                categoryBreakdown: {},
                productivity: 0,
            }
            return NextResponse.json(emptyData)
        }
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to fetch tasks' },
            { status: 500 }
        )
    }
}

// POST - Add or update task
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { date, task } = body

        if (!date || !task) {
            return NextResponse.json(
                { error: 'Missing date or task data' },
                { status: 400 }
            )
        }

        await ensureTasksDir()
        const filePath = getTaskFilePath(date)

        // Read existing data or create new
        let dailySummary: DailySummary
        try {
            const fileContent = await fs.readFile(filePath, 'utf-8')
            dailySummary = JSON.parse(fileContent)
        } catch {
            dailySummary = {
                date,
                tasks: [],
                totalDuration: 0,
                completedTasks: 0,
                totalTasks: 0,
                collaborators: [],
                categoryBreakdown: {},
                productivity: 0,
            }
        }

        // Calculate duration
        const duration = calculateDuration(task.startTime, task.endTime)

        // Create new task
        const newTask: DailyTask = {
            ...task,
            id: task.id || `task-${Date.now()}`,
            date,
            duration,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        // Add or update task
        const existingIndex = dailySummary.tasks.findIndex(t => t.id === newTask.id)
        if (existingIndex >= 0) {
            dailySummary.tasks[existingIndex] = newTask
        } else {
            dailySummary.tasks.push(newTask)
        }

        // Recalculate summary
        dailySummary.totalTasks = dailySummary.tasks.length
        dailySummary.totalDuration = dailySummary.tasks.reduce((sum, t) => sum + t.duration, 0)
        dailySummary.completedTasks = dailySummary.tasks.filter(t => t.status === 'completed').length

        // Unique collaborators
        const allCollaborators = dailySummary.tasks.flatMap(t => t.collaborators)
        dailySummary.collaborators = [...new Set(allCollaborators)]

        // Category breakdown
        dailySummary.categoryBreakdown = dailySummary.tasks.reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        // Productivity (completion rate)
        dailySummary.productivity = dailySummary.totalTasks > 0
            ? Math.round((dailySummary.completedTasks / dailySummary.totalTasks) * 100)
            : 0

        // Save to file
        await fs.writeFile(filePath, JSON.stringify(dailySummary, null, 2))

        return NextResponse.json({ success: true, data: dailySummary })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to save task' },
            { status: 500 }
        )
    }
}

// DELETE - Remove a task
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const date = searchParams.get('date')
        const taskId = searchParams.get('taskId')

        if (!date || !taskId) {
            return NextResponse.json(
                { error: 'Missing date or taskId' },
                { status: 400 }
            )
        }

        await ensureTasksDir()
        const filePath = getTaskFilePath(date)

        const fileContent = await fs.readFile(filePath, 'utf-8')
        const dailySummary: DailySummary = JSON.parse(fileContent)

        // Remove task
        dailySummary.tasks = dailySummary.tasks.filter(t => t.id !== taskId)

        // Recalculate summary
        dailySummary.totalTasks = dailySummary.tasks.length
        dailySummary.totalDuration = dailySummary.tasks.reduce((sum, t) => sum + t.duration, 0)
        dailySummary.completedTasks = dailySummary.tasks.filter(t => t.status === 'completed').length

        const allCollaborators = dailySummary.tasks.flatMap(t => t.collaborators)
        dailySummary.collaborators = [...new Set(allCollaborators)]

        dailySummary.categoryBreakdown = dailySummary.tasks.reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        dailySummary.productivity = dailySummary.totalTasks > 0
            ? Math.round((dailySummary.completedTasks / dailySummary.totalTasks) * 100)
            : 0

        await fs.writeFile(filePath, JSON.stringify(dailySummary, null, 2))

        return NextResponse.json({ success: true, data: dailySummary })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to delete task' },
            { status: 500 }
        )
    }
}
