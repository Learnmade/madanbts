"use client"

import { useState } from "react"
import { X } from "lucide-react"

export function CreateMatchModal({ isOpen, onClose, onCreated }) {
    const [formData, setFormData] = useState({
        title: "",
        time: "20:00",
        date: "",
        day: "Today",
        type: "War",
        teamA: "",
        teamB: "",
        map: "Erangel",
        bannerUrl: ""
    })
    const [loading, setLoading] = useState(false)

    if (!isOpen) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch('/api/matches', {
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
                <h2 className="text-xl font-bold mb-6">Schedule New Match</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Match Title</label>
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
                            <label className="block text-sm font-medium mb-1">Date (e.g., Dec 10)</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Time (24h)</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
                                value={formData.time}
                                onChange={e => setFormData({ ...formData, time: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Team A</label>
                            <input
                                type="text"
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
                                value={formData.teamA}
                                onChange={e => setFormData({ ...formData, teamA: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Team B</label>
                            <input
                                type="text"
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
                                value={formData.teamB}
                                onChange={e => setFormData({ ...formData, teamB: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Banner Image URL (Optional)</label>
                        <input
                            type="url"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
                            placeholder="https://imgur.com/..."
                            value={formData.bannerUrl}
                            onChange={e => setFormData({ ...formData, bannerUrl: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg hover:bg-white/5">Cancel</button>
                        <button type="submit" disabled={loading} className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90">
                            {loading ? 'Scheduling...' : 'Schedule Match'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
