'use client'

import { useState } from 'react'
import styles from './EventForm.module.css'

interface EventFormProps {
    onClose: () => void
    onSubmit: (eventData: {
        summary: string
        description: string
        start: string
        end: string
        location: string
    }) => Promise<void>
}

export default function EventForm({ onClose, onSubmit }: EventFormProps) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        summary: '',
        description: '',
        start: '',
        end: '',
        location: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await onSubmit(formData)
            onClose()
        } catch (error) {
            alert('Lỗi khi tạo sự kiện')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2>➕ Tạo sự kiện mới</h2>
                    <button onClick={onClose} className={styles.closeBtn}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label>Tiêu đề *</label>
                        <input
                            type="text"
                            value={formData.summary}
                            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                            placeholder="Họp team, Deadline project..."
                            required
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Bắt đầu *</label>
                            <input
                                type="datetime-local"
                                value={formData.start}
                                onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                                required
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Kết thúc *</label>
                            <input
                                type="datetime-local"
                                value={formData.end}
                                onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label>Địa điểm</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="Phòng họp, Zoom link..."
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Mô tả</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Chi tiết về sự kiện..."
                            rows={4}
                        />
                    </div>

                    <div className={styles.actions}>
                        <button type="button" onClick={onClose} className={styles.cancelBtn}>
                            Hủy
                        </button>
                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? '⏳ Đang tạo...' : '✅ Tạo sự kiện'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
