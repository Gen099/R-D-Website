import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'calendar-notes.json')

// Ensure data directory exists
async function ensureDataDir() {
    const dataDir = path.join(process.cwd(), 'data')
    try {
        await fs.access(dataDir)
    } catch {
        await fs.mkdir(dataDir, { recursive: true })
    }
}

// GET - Lấy tất cả notes
export async function GET() {
    try {
        await ensureDataDir()
        const data = await fs.readFile(DATA_FILE, 'utf-8')
        return NextResponse.json(JSON.parse(data))
    } catch (error) {
        // File not exist yet, return empty object
        return NextResponse.json({})
    }
}

// POST - Lưu notes
export async function POST(request: NextRequest) {
    try {
        await ensureDataDir()
        const notes = await request.json()
        await fs.writeFile(DATA_FILE, JSON.stringify(notes, null, 2), 'utf-8')
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to save notes' }, { status: 500 })
    }
}
