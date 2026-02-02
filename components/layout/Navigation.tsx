'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from '../ThemeToggle'
import { useSidebar } from '@/lib/hooks/useSidebar'
import styles from './Navigation.module.css'

const navItems = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/feedback', label: 'Phân tích Feedback', icon: '📈' },
    { href: '/ai-problems', label: 'Bài toán AI Agent', icon: '🤖' },
    { href: '/effects', label: 'Danh mục Hiệu ứng', icon: '✨' },
    { href: '/competition', label: 'Phân tích Cạnh tranh', icon: '🎯' },
    { href: '/work-plan', label: 'Kế hoạch & Tiến độ', icon: '📋' },
    { href: '/calendar', label: 'Lịch Làm việc', icon: '📅' },
    { href: '/daily-tasks', label: 'Daily Task Manager', icon: '✅' },
    { href: '/operations', label: 'Quy trình Vận hành', icon: '⚙️' },
    { href: '/platform', label: 'AI Platform Design', icon: '🏗️' },
    { href: '/resources', label: 'Tài nguyên', icon: '📚' },
]

export default function Navigation() {
    const pathname = usePathname()
    const { collapsed, toggle, mounted } = useSidebar()

    return (
        <nav className={`${styles.nav} ${collapsed && mounted ? styles.collapsed : ''}`}>
            {/* Clickable Edge Strip */}
            <div
                className={styles.edgeToggle}
                onClick={toggle}
                title={collapsed ? 'Mở sidebar' : 'Thu gọn sidebar'}
            >
                <div className={styles.edgeIndicator}>
                    {collapsed ? '»' : '«'}
                </div>
            </div>

            <div className={styles.header}>
                <h1 className={styles.logo}>
                    <span className={styles.logoIcon}>🎬</span>
                    Fotober R&D
                </h1>
                <p className={styles.subtitle}>AI Video Intelligence</p>
            </div>

            <ul className={styles.navList}>
                {navItems.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
                        >
                            <span className={styles.icon}>{item.icon}</span>
                            <span className={styles.label}>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className={styles.footer}>
                <ThemeToggle />
                <p className={styles.version}>v2.2.0</p>
                <p className={styles.copyright}>© 2026 Fotober</p>
            </div>
        </nav>
    )
}
