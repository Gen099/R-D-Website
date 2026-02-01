import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'calendarNote',
    title: 'Calendar Notes',
    type: 'document',
    fields: [
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'todo',
            title: 'Todo List',
            type: 'text'
        }),
        defineField({
            name: 'timesheet',
            title: 'Timesheet',
            type: 'object',
            fields: [
                {
                    name: 'timeIn',
                    title: 'Time In',
                    type: 'string'
                },
                {
                    name: 'timeOut',
                    title: 'Time Out',
                    type: 'string'
                },
                {
                    name: 'notes',
                    title: 'Notes',
                    type: 'text'
                }
            ]
        }),
        defineField({
            name: 'diary',
            title: 'Diary',
            type: 'text'
        }),
        defineField({
            name: 'meeting',
            title: 'Meeting',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Title',
                    type: 'string'
                },
                {
                    name: 'timeStart',
                    title: 'Start Time',
                    type: 'string'
                },
                {
                    name: 'timeEnd',
                    title: 'End Time',
                    type: 'string'
                },
                {
                    name: 'content',
                    title: 'Content',
                    type: 'text'
                }
            ]
        })
    ],
    preview: {
        select: {
            title: 'date',
            subtitle: 'todo'
        }
    }
})
