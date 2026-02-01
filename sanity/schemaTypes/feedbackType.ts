import { defineField, defineType } from 'sanity'

export const feedbackType = defineType({
    name: 'feedback',
    title: 'Feedback Analysis',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'overview',
            title: 'Overview Metrics',
            type: 'object',
            fields: [
                { name: 'totalJobs', title: 'Total Jobs', type: 'number' },
                { name: 'errorGroups', title: 'Error Groups', type: 'number' },
                { name: 'feedbackRate', title: 'Feedback Rate (%)', type: 'number' },
            ],
        }),
        defineField({
            name: 'errorGroups',
            title: 'Error Groups',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'group', title: 'Group', type: 'string' },
                        { name: 'count', title: 'Count', type: 'number' },
                        { name: 'percentage', title: 'Percentage', type: 'number' },
                        { name: 'color', title: 'Color', type: 'string' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'errorRateByEffect',
            title: 'Error Rate by Effect',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'effect', title: 'Effect', type: 'string' },
                        { name: 'errorRate', title: 'Error Rate (%)', type: 'number' },
                        { name: 'status', title: 'Status', type: 'string' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'rootCauses',
            title: 'Root Cause Analysis',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'category', title: 'Category', type: 'string' },
                        { name: 'issues', title: 'Issues', type: 'array', of: [{ type: 'string' }] },
                    ],
                },
            ],
        }),
        defineField({
            name: 'actionItems',
            title: 'Action Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'priority', title: 'Priority', type: 'string' },
                        { name: 'action', title: 'Action', type: 'text' },
                    ],
                },
            ],
        }),
    ],
})
