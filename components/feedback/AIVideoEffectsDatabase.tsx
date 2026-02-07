'use client'

export default function AIVideoEffectsDatabase() {
    return (
        <div style={{ padding: '20px', maxWidth: '100%' }}>
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
                    gap: '15px',
                    flexWrap: 'wrap'
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

            {/* Nội dung sẽ được thêm vào đây */}
            <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                textAlign: 'center'
            }}>
                <p style={{ fontSize: '1.2em', color: '#666' }}>
                    Đang cập nhật nội dung đầy đủ...
                </p>
            </div>
        </div>
    )
}
