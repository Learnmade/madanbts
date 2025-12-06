"use client"

import { useState, useEffect } from "react"
import { X, Trash2, Save } from "lucide-react"

import { ConfirmationModal } from "@/components/ConfirmationModal"

export function ManageEventModal({ isOpen, onClose, onUpdated, event }) {
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        slots: "20/25 Squads",
        map: "Erangel",
        status: "Open",
        type: "Squad"
    })
    const [loading, setLoading] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title || "",
                date: event.date || "",
                slots: event.slots || "20/25 Squads",
                map: event.map || "Erangel",
                status: event.status || "Open",
                type: event.type || "Squad"
            })
        }
    }, [event])

    if (!isOpen || !event) return null

    const handleUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(`/api/events/${event._id}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            })
            if (res.ok) {
                onUpdated()
                onClose()
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/events/${event._id}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                onUpdated()
                onClose()
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
            setShowDeleteConfirm(false)
        }
    }

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl p-6 relative">
                    <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                    <h2 className="text-xl font-bold mb-6">Manage Event</h2>

                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Event Title</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Date & Time</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Map</label>
                                <select
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
                                    value={formData.map}
                                    onChange={e => setFormData({ ...formData, map: e.target.value })}
                                >
                                    <option>Erangel</option>
                                    <option>Miramar</option>
                                    <option>Sanhok</option>
                                    <option>Vikendi</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <select
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
                                    value={formData.status}
                                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option>Open</option>
                                    <option>Filling Fast</option>
                                    <option>Closed</option>
                                    <option>Completed</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/10">
                            <button
                                type="button"
                                onClick={() => setShowDeleteConfirm(true)}
                                disabled={loading}
                                className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 font-medium flex items-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" /> Delete Event
                            </button>
                            <div className="flex gap-3">
                                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg hover:bg-white/5">Cancel</button>
                                <button type="submit" disabled={loading} className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 flex items-center gap-2">
                                    <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <ConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={handleDelete}
                title="Delete Event"
                message="Are you sure you want to delete this event? This action cannot be undone."
                confirmText="Delete"
                isDangerous={true}
            />
        </>
    )
}
