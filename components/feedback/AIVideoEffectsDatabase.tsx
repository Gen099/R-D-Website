'use client'

export default function AIVideoEffectsDatabase() {
    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            background: '#fafafa'
        }}>
            <iframe
                src="/ai-video-dashboard.html"
                style={{
                    width: '100%',
                    height: '100vh',
                    border: 'none',
                    display: 'block'
                }}
                title="AI Video Effects Database"
            />
        </div>
    )
}
