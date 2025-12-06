"use client"

import Navbar from "@/components/Navbar"
import { motion } from "framer-motion"
import { Users, Calendar, Trophy, Plus, Settings } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { LikeButton } from "@/components/FanEngagement"
import { useEffect, useState, useCallback } from "react"
import { CreateEventModal } from "@/components/CreateEventModal"
import { ManageEventModal } from "@/components/ManageEventModal"

export default function TryoutsPage() {
    const { isAdmin } = useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Fetch real data on mount
    const fetchEvents = useCallback(async () => {
        try {
            const res = await fetch('/api/events');

            if (!res.ok) {
                console.error(`Error fetching events: ${res.status} ${res.statusText}`);
                setLoading(false);
                return;
            }

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                console.error("Received non-JSON response from /api/events");
                const text = await res.text();
                console.error("Response body:", text);
                setLoading(false);
                return;
            }

            const data = await res.json();
            if (data.success) {
                setEvents(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch events", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const handleManage = (event) => {
        setSelectedEvent(event);
        setIsManageModalOpen(true);
    }

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            <Navbar />

            <main className="container mx-auto px-4 py-10">

                <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2">Live <span className="text-primary">Tryouts</span></h1>
                        <p className="text-muted-foreground">Join the battle needed to prove your worth.</p>
                    </div>

                    {isAdmin && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all"
                        >
                            <Plus className="w-5 h-5" /> Create Event
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="text-center text-muted-foreground py-20">Loading live data...</div>
                ) : events.length === 0 ? (
                    <div className="text-center text-muted-foreground py-20 border border-white/5 rounded-2xl">
                        No active tryouts found. Check back later!
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event, idx) => (
                            <motion.div
                                key={event._id || idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative overflow-hidden rounded-2xl glass-card border border-white/5 p-6 hover:border-primary/50 transition-all flex flex-col"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-50 text-6xl font-black text-white/5 pointer-events-none group-hover:scale-110 transition-transform">
                                    0{idx + 1}
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${event.status === 'Open' ? 'bg-green-500/20 text-green-500' : 'bg-orange-500/20 text-orange-500'}`}>
                                            {event.status}
                                        </span>
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 text-muted-foreground">
                                            {event.map}
                                        </span>
                                    </div>
                                    <LikeButton initialCount={event.likes || 0} size="sm" />
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>

                                <div className="space-y-2 text-sm text-muted-foreground mb-6 flex-1">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" /> {event.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4" /> {event.slots}
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-auto">
                                    <button className="flex-1 py-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors font-medium text-sm">
                                        Details
                                    </button>
                                    {isAdmin && (
                                        <button
                                            onClick={() => handleManage(event)}
                                            className="flex-1 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                                        >
                                            <Settings className="w-4 h-4" /> Manage
                                        </button>
                                    )}
                                </div>

                            </motion.div>
                        ))}
                    </div>
                )}

                <CreateEventModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onCreated={fetchEvents}
                />

                <ManageEventModal
                    isOpen={isManageModalOpen}
                    onClose={() => setIsManageModalOpen(false)}
                    onUpdated={fetchEvents}
                    event={selectedEvent}
                />

            </main>
        </div>
    )
}
