import { defineField, defineType } from 'sanity'

export const competitorType = defineType({
    name: 'competitor',
    title: 'Competition Analysis',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Company Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'region',
            title: 'Region',
            type: 'string',
            options: {
                list: [
                    { title: 'Vietnam', value: 'vietnam' },
                    { title: 'Global', value: 'global' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'website',
            title: 'Website',
            type: 'url',
        }),
        defineField({
            name: 'pricing',
            title: 'Pricing',
            type: 'string',
        }),
        defineField({
            name: 'strengths',
            title: 'Strengths',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'weaknesses',
            title: 'Weaknesses',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'object',
            fields: [
                { name: 'aiVideo', title: 'AI Video', type: 'boolean' },
                { name: 'realEstate', title: 'Real Estate Focus', type: 'boolean' },
                { name: 'customization', title: 'Customization', type: 'boolean' },
                { name: 'support', title: '24/7 Support', type: 'boolean' },
            ],
        }),
        defineField({
            name: 'ranking',
            title: 'Ranking',
            type: 'number',
        }),
    ],
})
