'use client'

import { useTheme } from '@/lib/hooks/useTheme'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme()

    if (!mounted) {
        return <div className={styles.toggle}>🌙</div>
    }

    return (
        <button
            onClick={toggleTheme}
            className={styles.toggle}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    )
}
