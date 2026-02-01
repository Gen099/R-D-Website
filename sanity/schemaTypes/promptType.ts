import { defineField, defineType } from 'sanity'

export const promptType = defineType({
    name: 'prompt',
    title: 'Prompt Library',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Prompt Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Day-to-Night', value: 'day-night' },
                    { title: 'Lifestyle', value: 'lifestyle' },
                    { title: 'Furniture', value: 'furniture' },
                    { title: 'Sky Replacement', value: 'sky' },
                    { title: 'Agent Replacement', value: 'agent' },
                ],
            },
        }),
        defineField({
            name: 'template',
            title: 'Prompt Template',
            type: 'text',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'variables',
            title: 'Variables',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'negativePrompt',
            title: 'Negative Prompt',
            type: 'text',
        }),
        defineField({
            name: 'successRate',
            title: 'Success Rate (%)',
            type: 'number',
        }),
        defineField({
            name: 'bestPractices',
            title: 'Best Practices',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],
})
