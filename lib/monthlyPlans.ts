export interface MonthlyPlan {
    id: string
    label: string
    month: string
    year: number
    filePath: string
    available: boolean
}

export const MONTHLY_PLANS: MonthlyPlan[] = [
    {
        id: 'feb-2026',
        label: 'Tháng 2/2026',
        month: 'February',
        year: 2026,
        filePath: '/plans/plan-feb-2026.html',
        available: true
    }
]
