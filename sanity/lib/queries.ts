import { client } from './client'
import { groq } from 'next-sanity'

// Feedback queries
export async function getFeedback() {
    try {
        const result = await client.fetch(
            groq`*[_type == "feedback"][0]{
        _id,
        title,
        overview,
        errorGroups,
        errorRateByEffect,
        rootCauses,
        actionItems
      }`
        )
        return result || null
    } catch (error) {
        console.error('Error fetching feedback from Sanity:', error)
        return null
    }
}

// Effects queries
export async function getEffects() {
    try {
        const result = await client.fetch(
            groq`*[_type == "effect"] | order(category asc, name asc){
        _id,
        name,
        category,
        description,
        price,
        complexity,
        sampleLink,
        tier
      }`
        )
        return result || []
    } catch (error) {
        console.error('Error fetching effects from Sanity:', error)
        return []
    }
}

export async function getEffectsByCategory(category: string) {
    try {
        const result = await client.fetch(
            groq`*[_type == "effect" && category == $category] | order(name asc)`,
            { category }
        )
        return result || []
    } catch (error) {
        console.error('Error fetching effects by category from Sanity:', error)
        return []
    }
}

// Prompts queries
export async function getPrompts() {
    try {
        const result = await client.fetch(
            groq`*[_type == "prompt"] | order(name asc){
        _id,
        name,
        category,
        template,
        variables,
        negativePrompt,
        successRate,
        bestPractices
      }`
        )
        return result || []
    } catch (error) {
        console.error('Error fetching prompts from Sanity:', error)
        return []
    }
}

// Competitors queries
export async function getCompetitors() {
    try {
        const result = await client.fetch(
            groq`*[_type == "competitor"] | order(ranking asc){
        _id,
        name,
        region,
        website,
        pricing,
        strengths,
        weaknesses,
        features,
        ranking
      }`
        )
        return result || []
    } catch (error) {
        console.error('Error fetching competitors from Sanity:', error)
        return []
    }
}

export async function getCompetitorsByRegion(region: string) {
    try {
        const result = await client.fetch(
            groq`*[_type == "competitor" && region == $region] | order(ranking asc)`,
            { region }
        )
        return result || []
    } catch (error) {
        console.error('Error fetching competitors by region from Sanity:', error)
        return []
    }
}

// Resources queries
export async function getResources() {
    try {
        const result = await client.fetch(
            groq`*[_type == "resource"] | order(category asc, title asc){
        _id,
        title,
        category,
        description,
        url,
        tier,
        tags
      }`
        )
        return result || []
    } catch (error) {
        console.error('Error fetching resources from Sanity:', error)
        return []
    }
}

export async function getResourcesByCategory(category: string) {
    try {
        const result = await client.fetch(
            groq`*[_type == "resource" && category == $category] | order(title asc)`,
            { category }
        )
        return result || []
    } catch (error) {
        console.error('Error fetching resources by category from Sanity:', error)
        return []
    }
}
