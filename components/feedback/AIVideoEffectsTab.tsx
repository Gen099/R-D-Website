'use client'

export default function AIVideoEffectsTab() {
    return (
        <div style={{ padding: '20px', maxWidth: '1600px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: '30px',
                marginBottom: '30px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
            }}>
                <h1 style={{
                    fontSize: '2.5em',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                }}>
                    <span>🎬</span>
                    <span>AI Video Effects Database</span>
                    <span style={{
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: 'white',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        fontSize: '0.4em',
                        fontWeight: 600
                    }}>v2.0</span>
                </h1>
                <p style={{ color: '#64748b', marginTop: '10px' }}>Công cụ & Quy trình</p>
            </div>

            {/* Content */}
            <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}>
                <p style={{ fontSize: '1.2em', color: '#666', textAlign: 'center' }}>
                    Nội dung AI Video Effects Database đang được cập nhật...
                </p>
                <p style={{ fontSize: '0.9em', color: '#999', textAlign: 'center', marginTop: '20px' }}>
                    Vui lòng truy cập trực tiếp file HTML tại: <a href="/ai-video-effects.html" target="_blank" style={{ color: '#6366f1' }}>/ai-video-effects.html</a>
                </p>
            </div>
        </div>
    )
}
