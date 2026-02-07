'use client'

export default function AIVideoEffectsDatabase() {
    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            background: '#fafafa',
            margin: '-20px',
            padding: 0
        }}>
            <iframe
                src="/ai-video-effects-v2.html"
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
