'use client'

import { useState, useEffect } from 'react'
import styles from './TaskForm.module.css'
import { DailyTask, TaskFormData } from '@/types/daily-tasks'

interface TaskFormProps {
    task?: DailyTask | null
    onClose: () => void
    onSubmit: (data: TaskFormData) => void
}

export default function TaskForm({ task, onClose, onSubmit }: TaskFormProps) {
    const [formData, setFormData] = useState<TaskFormData>({
        title: task?.title || '',
        description: task?.description || '',
        startTime: task?.startTime || '09:00',
        endTime: task?.endTime || '10:00',
        collaborators: task?.collaborators || [],
        category: task?.category || 'other',
        status: task?.status || 'in-progress',
        result: task?.result || '',
        tags: task?.tags || []
    })

    const [collaboratorInput, setCollaboratorInput] = useState('')
    const [tagInput, setTagInput] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const addCollaborator = () => {
        if (collaboratorInput.trim() && !formData.collaborators.includes(collaboratorInput.trim())) {
            setFormData({
                ...formData,
                collaborators: [...formData.collaborators, collaboratorInput.trim()]
            })
            setCollaboratorInput('')
        }
    }

    const removeCollaborator = (name: string) => {
        setFormData({
            ...formData,
            collaborators: formData.collaborators.filter(c => c !== name)
        })
    }

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tagInput.trim()]
            })
            setTagInput('')
        }
    }

    const removeTag = (tag: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(t => t !== tag)
        })
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2>{task ? '✏️ Edit Task' : '➕ New Task'}</h2>
                    <button onClick={onClose} className={styles.closeBtn}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Title */}
                    <div className={styles.field}>
                        <label>Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Sprint Planning, Code Review..."
                            required
                        />
                    </div>

                    {/* Time Range */}
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Start Time *</label>
                            <input
                                type="time"
                                value={formData.startTime}
                                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                required
                            />
                        </div>
                        <div className={styles.field}>
                            <label>End Time *</label>
                            <input
                                type="time"
                                value={formData.endTime}
                                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* Category & Status */}
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Category *</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                            >
                                <option value="meeting">🤝 Meeting</option>
                                <option value="coding">💻 Coding</option>
                                <option value="research">🔍 Research</option>
                                <option value="design">🎨 Design</option>
                                <option value="planning">📋 Planning</option>
                                <option value="review">✅ Review</option>
                                <option value="other">📌 Other</option>
                            </select>
                        </div>
                        <div className={styles.field}>
                            <label>Status *</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                            >
                                <option value="in-progress">⏳ In Progress</option>
                                <option value="completed">✅ Completed</option>
                                <option value="blocked">🚫 Blocked</option>
                                <option value="cancelled">❌ Cancelled</option>
                            </select>
                        </div>
                    </div>

                    {/* Collaborators */}
                    <div className={styles.field}>
                        <label>Collaborators</label>
                        <div className={styles.tagInput}>
                            <input
                                type="text"
                                value={collaboratorInput}
                                onChange={(e) => setCollaboratorInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCollaborator())}
                                placeholder="Type name and press Enter"
                            />
                            <button type="button" onClick={addCollaborator} className={styles.addTagBtn}>
                                Add
                            </button>
                        </div>
                        <div className={styles.tags}>
                            {formData.collaborators.map(name => (
                                <span key={name} className={styles.tag}>
                                    👤 {name}
                                    <button type="button" onClick={() => removeCollaborator(name)}>✕</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className={styles.field}>
                        <label>Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Details about the task..."
                            rows={3}
                        />
                    </div>

                    {/* Result */}
                    <div className={styles.field}>
                        <label>Result / Outcome</label>
                        <textarea
                            value={formData.result}
                            onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                            placeholder="What was accomplished, decisions made..."
                            rows={3}
                        />
                    </div>

                    {/* Tags */}
                    <div className={styles.field}>
                        <label>Tags</label>
                        <div className={styles.tagInput}>
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                placeholder="Type tag and press Enter"
                            />
                            <button type="button" onClick={addTag} className={styles.addTagBtn}>
                                Add
                            </button>
                        </div>
                        <div className={styles.tags}>
                            {formData.tags.map(tag => (
                                <span key={tag} className={styles.tag}>
                                    🏷️ {tag}
                                    <button type="button" onClick={() => removeTag(tag)}>✕</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className={styles.actions}>
                        <button type="button" onClick={onClose} className={styles.cancelBtn}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.submitBtn}>
                            {task ? 'Update Task' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
