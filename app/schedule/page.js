"use client"

import Navbar from "@/components/Navbar"
import { motion } from "framer-motion"
import { Calendar, Clock, Sword, Users, Filter, Plus, Edit2, Trash2 } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { useEffect, useState, useCallback } from "react"
import { CreateMatchModal } from "@/components/CreateMatchModal"

export default function SchedulePage() {
    const { isAdmin } = useAuth();
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch real data on mount
    const fetchSchedule = useCallback(async () => {
        try {
            const res = await fetch('/api/matches');

            if (!res.ok) {
                console.error(`Error fetching schedule: ${res.status}`);
                setLoading(false);
                return;
            }
            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                console.error("Received non-JSON response from /api/matches");
                setLoading(false);
                return;
            }

            const data = await res.json();
            if (data.success) {
                const grouped = {};
                data.data.forEach(match => {
                    const groupKey = match.day || match.date;
                    if (!grouped[groupKey]) {
                        grouped[groupKey] = {
                            day: match.day || "Upcoming",
                            date: match.date,
                            matches: []
                        };
                    }
                    grouped[groupKey].matches.push(match);
                });

                setSchedule(Object.values(grouped));
            }
        } catch (error) {
            console.error("Failed to fetch schedule", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSchedule();
    }, [fetchSchedule]);

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            <Navbar />

            <main className="container mx-auto px-4 py-10">

                <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2">Match <span className="text-primary">Schedule</span></h1>
                        <p className="text-muted-foreground">Never miss a drop. Track every battle.</p>
                    </div>

                    <div className="flex gap-4">
                        {isAdmin && (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold hover:shadow-lg transition-all text-sm"
                            >
                                <Plus className="w-4 h-4" /> Add Match
                            </button>
                        )}
                        {/* Filter buttons can remain static for now or be wired up later */}
                        <div className="flex bg-white/5 p-1 rounded-xl">
                            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold shadow-sm">All</button>
                            <button className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">Tryouts</button>
                            <button className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">Wars</button>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center text-muted-foreground py-20">Loading schedule...</div>
                ) : schedule.length === 0 ? (
                    <div className="text-center text-muted-foreground py-20 border border-white/5 rounded-2xl">
                        No upcoming matches scheduled.
                    </div>
                ) : (
                    <div className="space-y-12">
                        {schedule.map((group, groupIdx) => (
                            <div key={groupIdx}>
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <Calendar className="w-6 h-6 text-primary" /> {group.day} <span className="text-muted-foreground font-normal text-base">({group.date})</span>
                                </h2>

                                <div className="grid gap-4">
                                    {group.matches.map((match, idx) => (
                                        <motion.div
                                            key={match._id || idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl glass-card border border-white/5 hover:border-primary/20 transition-all group"
                                        >
                                            <div className="flex items-center gap-4 min-w-[120px]">
                                                <Clock className="w-5 h-5 text-muted-foreground" />
                                                <span className="text-xl font-bold font-mono">{match.time}</span>
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${match.type === 'War' ? 'border-red-500/20 text-red-500 bg-red-500/5' : 'border-blue-500/20 text-blue-500 bg-blue-500/5'}`}>
                                                        {match.type}
                                                    </span>
                                                    {match.status === 'Live' && (
                                                        <span className="flex items-center gap-1 text-green-500 text-xs font-bold animate-pulse">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> LIVE
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-lg font-bold">{match.title}</h3>
                                            </div>

                                            <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0 justify-between md:justify-start">
                                                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                                    <span className="px-3 py-1 bg-white/5 rounded-full">{match.map}</span>
                                                </div>

                                                {isAdmin ? (
                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20" title="Edit Match">
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20" title="Delete Match">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button className="px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-bold transition-colors">
                                                        Notify Me
                                                    </button>
                                                )}
                                            </div>

                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <CreateMatchModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onCreated={fetchSchedule}
                />

            </main>
        </div>
    )
}
