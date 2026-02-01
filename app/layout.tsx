import './globals.css'
import type { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
    title: 'Fotober R&D - AI Video Intelligence Platform',
    description:
        'R&D Specialist platform for AI Video research, prompt engineering, and quality analysis',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <div className="app-layout">
                    <Navigation />
                    <main className="main-content">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    )
}

