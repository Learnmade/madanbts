"use client"

import { useState } from "react"
import { min } from "moment" // Not used, removing
import { X } from "lucide-react"

export function CreateEventModal({ isOpen, onClose, onCreated }) {
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        slots: "20/25 Squads", // default
        map: "Erangel",
        status: "Open",
        type: "Squad"
    })
    const [loading, setLoading] = useState(false)

    if (!isOpen) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch('/api/events', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            })
            if (res.ok) {
                onCreated()
                onClose()
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl p-6 relative">
                <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-white">
                    <X className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-bold mb-6">Create New Tryout</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                                placeholder="Dec 10 • 8:00 PM"
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
                    <div className="flex justify-end gap-3 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg hover:bg-white/5">Cancel</button>
                        <button type="submit" disabled={loading} className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90">
                            {loading ? 'Creating...' : 'Create Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
