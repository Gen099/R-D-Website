import { google } from 'googleapis'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function getCalendarClient() {
    const session = await getServerSession(authOptions)

    if (!session || !session.accessToken) {
        throw new Error('Not authenticated')
    }

    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
    )

    oauth2Client.setCredentials({
        access_token: session.accessToken,
    })

    return google.calendar({ version: 'v3', auth: oauth2Client })
}

export async function listEvents(maxResults = 10) {
    const calendar = await getCalendarClient()

    const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults,
        singleEvents: true,
        orderBy: 'startTime',
    })

    return response.data.items || []
}

export async function createEvent(eventData: {
    summary: string
    description?: string
    start: string
    end: string
    location?: string
}) {
    const calendar = await getCalendarClient()

    const event = {
        summary: eventData.summary,
        description: eventData.description,
        location: eventData.location,
        start: {
            dateTime: eventData.start,
            timeZone: 'Asia/Ho_Chi_Minh',
        },
        end: {
            dateTime: eventData.end,
            timeZone: 'Asia/Ho_Chi_Minh',
        },
    }

    const response = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
    })

    return response.data
}

export async function updateEvent(eventId: string, eventData: {
    summary?: string
    description?: string
    start?: string
    end?: string
    location?: string
}) {
    const calendar = await getCalendarClient()

    const event: any = {}
    if (eventData.summary) event.summary = eventData.summary
    if (eventData.description) event.description = eventData.description
    if (eventData.location) event.location = eventData.location
    if (eventData.start) {
        event.start = {
            dateTime: eventData.start,
            timeZone: 'Asia/Ho_Chi_Minh',
        }
    }
    if (eventData.end) {
        event.end = {
            dateTime: eventData.end,
            timeZone: 'Asia/Ho_Chi_Minh',
        }
    }

    const response = await calendar.events.patch({
        calendarId: 'primary',
        eventId,
        requestBody: event,
    })

    return response.data
}

export async function deleteEvent(eventId: string) {
    const calendar = await getCalendarClient()

    await calendar.events.delete({
        calendarId: 'primary',
        eventId,
    })

    return { success: true }
}
