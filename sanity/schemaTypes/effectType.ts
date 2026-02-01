import { defineField, defineType } from 'sanity'

export const effectType = defineType({
    name: 'effect',
    title: 'Effects Catalog',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Effect Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Motion Graphics', value: 'motion' },
                    { title: 'Special Effects', value: 'special' },
                    { title: 'Transitions', value: 'transitions' },
                    { title: 'Audio & Text', value: 'audio' },
                    { title: 'Technical Services', value: 'technical' },
                    { title: 'AI Pricing', value: 'ai' },
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
            name: 'price',
            title: 'Price',
            type: 'string',
        }),
        defineField({
            name: 'complexity',
            title: 'Complexity',
            type: 'string',
            options: {
                list: [
                    { title: 'Low', value: 'low' },
                    { title: 'Medium', value: 'medium' },
                    { title: 'High', value: 'high' },
                ],
            },
        }),
        defineField({
            name: 'sampleLink',
            title: 'Sample Link',
            type: 'url',
        }),
        defineField({
            name: 'tier',
            title: 'Tier (for AI Pricing)',
            type: 'string',
            hidden: ({ document }) => document?.category !== 'ai',
        }),
    ],
})
