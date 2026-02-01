import { NextRequest, NextResponse } from 'next/server'
import { listEvents, createEvent, updateEvent, deleteEvent } from '@/lib/google-calendar'

// GET - Fetch events
export async function GET() {
    try {
        const events = await listEvents(50)
        return NextResponse.json({ events })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to fetch events' },
            { status: 500 }
        )
    }
}

// POST - Create new event
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { summary, description, start, end, location } = body

        if (!summary || !start || !end) {
            return NextResponse.json(
                { error: 'Missing required fields: summary, start, end' },
                { status: 400 }
            )
        }

        const event = await createEvent({
            summary,
            description,
            start,
            end,
            location,
        })

        return NextResponse.json({ event })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to create event' },
            { status: 500 }
        )
    }
}

// PATCH - Update event
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json()
        const { eventId, ...eventData } = body

        if (!eventId) {
            return NextResponse.json(
                { error: 'Missing eventId' },
                { status: 400 }
            )
        }

        const event = await updateEvent(eventId, eventData)
        return NextResponse.json({ event })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to update event' },
            { status: 500 }
        )
    }
}

// DELETE - Delete event
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const eventId = searchParams.get('eventId')

        if (!eventId) {
            return NextResponse.json(
                { error: 'Missing eventId' },
                { status: 400 }
            )
        }

        await deleteEvent(eventId)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to delete event' },
            { status: 500 }
        )
    }
}
