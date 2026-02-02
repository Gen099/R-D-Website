'use client'

import { useState, useEffect } from 'react'

export function useSidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const saved = localStorage.getItem('sidebar-collapsed')
        if (saved) {
            setCollapsed(JSON.parse(saved))
        }
    }, [])

    const toggle = () => {
        setCollapsed(prev => {
            const newState = !prev
            localStorage.setItem('sidebar-collapsed', JSON.stringify(newState))
            return newState
        })
    }

    return { collapsed, toggle, mounted }
}
