import { defineField, defineType } from 'sanity'

export const resourceType = defineType({
    name: 'resource',
    title: 'Resources',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Resource Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'AI Video Tools', value: 'ai-video' },
                    { title: 'Image Generation', value: 'image-gen' },
                    { title: 'Learning Resources', value: 'learning' },
                    { title: 'Internal Documents', value: 'internal' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'url',
            title: 'URL',
            type: 'url',
        }),
        defineField({
            name: 'tier',
            title: 'Tier',
            type: 'string',
            options: {
                list: [
                    { title: 'Primary', value: 'primary' },
                    { title: 'Alternative', value: 'alternative' },
                    { title: 'Testing', value: 'testing' },
                    { title: 'Open Source', value: 'opensource' },
                ],
            },
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],
})
