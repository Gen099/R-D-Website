/**
 * Migration script to import JSON data into Sanity
 * Run: npm run migrate-data
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

// Initialize Sanity client with write token
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: '2026-02-01',
    token: process.env.SANITY_WRITE_TOKEN, // You'll need to create this token
    useCdn: false,
})

async function migrateFeedback() {
    console.log('📊 Migrating Feedback data...')
    const feedbackData = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'data', 'feedback.json'), 'utf-8')
    )

    const doc = {
        _type: 'feedback',
        title: 'Feedback Analysis - January 2026',
        overview: feedbackData.overview,
        errorGroups: feedbackData.errorGroups,
        errorRateByEffect: feedbackData.errorRateByEffect,
        rootCauses: feedbackData.rootCauses,
        actionItems: feedbackData.actionItems,
    }

    const result = await client.create(doc)
    console.log('✅ Feedback migrated:', result._id)
}

async function migrateEffects() {
    console.log('✨ Migrating Effects data...')
    const effectsData = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'data', 'effects.json'), 'utf-8')
    )

    const categories = ['motionGraphics', 'specialEffects', 'transitions', 'audioText', 'technical', 'aiPricing']

    for (const category of categories) {
        const items = effectsData[category] || []
        for (const item of items) {
            const doc = {
                _type: 'effect',
                name: item.name,
                category: getCategoryValue(category),
                description: item.description,
                price: item.price,
                complexity: item.complexity?.toLowerCase(),
                sampleLink: item.sampleLink,
                tier: item.tier,
            }

            const result = await client.create(doc)
            console.log(`✅ Effect migrated: ${item.name}`)
        }
    }
}

function getCategoryValue(category: string): string {
    const map: Record<string, string> = {
        motionGraphics: 'motion',
        specialEffects: 'special',
        transitions: 'transitions',
        audioText: 'audio',
        technical: 'technical',
        aiPricing: 'ai',
    }
    return map[category] || category
}

async function migratePrompts() {
    console.log('📝 Migrating Prompts data...')
    const promptsData = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'data', 'prompts.json'), 'utf-8')
    )

    for (const prompt of promptsData.prompts) {
        const doc = {
            _type: 'prompt',
            name: prompt.name,
            category: prompt.category,
            template: prompt.template,
            variables: prompt.variables,
            negativePrompt: prompt.negativePrompt,
            successRate: prompt.successRate,
            bestPractices: prompt.bestPractices,
        }

        const result = await client.create(doc)
        console.log(`✅ Prompt migrated: ${prompt.name}`)
    }
}

async function migrateCompetition() {
    console.log('🎯 Migrating Competition data...')
    const competitionData = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'data', 'competition.json'), 'utf-8')
    )

    const allCompetitors = [
        ...competitionData.vietnamCompetitors.map((c: any) => ({ ...c, region: 'vietnam' })),
        ...competitionData.globalCompetitors.map((c: any) => ({ ...c, region: 'global' })),
    ]

    for (const competitor of allCompetitors) {
        const doc = {
            _type: 'competitor',
            name: competitor.name,
            region: competitor.region,
            website: competitor.website,
            pricing: competitor.pricing,
            strengths: competitor.strengths,
            weaknesses: competitor.weaknesses,
            features: competitor.features,
            ranking: competitor.ranking,
        }

        const result = await client.create(doc)
        console.log(`✅ Competitor migrated: ${competitor.name}`)
    }
}

async function main() {
    console.log('🚀 Starting data migration to Sanity...\n')

    try {
        await migrateFeedback()
        await migrateEffects()
        await migratePrompts()
        await migrateCompetition()

        console.log('\n✅ All data migrated successfully!')
        console.log('\n📝 Next steps:')
        console.log('1. Visit http://localhost:3000/studio to view your data')
        console.log('2. Update Next.js pages to fetch from Sanity')
    } catch (error) {
        console.error('❌ Migration failed:', error)
        process.exit(1)
    }
}

main()
