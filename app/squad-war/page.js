"use client"

import Navbar from "@/components/Navbar"
import { motion } from "framer-motion"
import Link from "next/link"
import { Sword, Trophy, Crown, Plus, Image as ImageIcon } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { PredictionWidget } from "@/components/FanEngagement"
import { useEffect, useState, useCallback } from "react"
import { CreateMatchModal } from "@/components/CreateMatchModal"

export default function SquadWarPage() {
    const { isAdmin } = useAuth();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch real data on mount
    const fetchMatches = useCallback(async () => {
        try {
            const res = await fetch('/api/matches');

            // Handle non-JSON or error responses
            if (!res.ok) {
                console.error(`Error fetching matches: ${res.status}`);
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
                setMatches(data.data.filter(m => m.type === 'War' || m.type === 'Tournament'));
            }
        } catch (error) {
            console.error("Failed to fetch matches", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMatches();
    }, [fetchMatches]);

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            <Navbar />

            <main className="container mx-auto px-4 py-10">

                <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-12 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2 flex items-center gap-3">
                            Squad <span className="text-accent">Wars</span> <Sword className="w-8 h-8 text-accent" />
                        </h1>
                        <p className="text-muted-foreground">High stakes team battles. Winner takes all.</p>
                    </div>
                    {isAdmin && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-bold hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all"
                        >
                            <Plus className="w-5 h-5" /> New War
                        </button>
                    )}
                </div>

                {/* Feature Match / Top Squad */}
                <section className="mb-16">
                    <div className="w-full rounded-3xl glass-card border border-accent/20 overflow-hidden relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-accent/10 to-transparent pointer-events-none" />

                        <div className="flex-1 z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold mb-4 border border-accent/20">
                                <Crown className="w-3 h-3" /> REIGNING CHAMPIONS
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black italic tracking-wide mb-4">SOUL ESPORTS</h2>
                            <p className="text-muted-foreground mb-6 max-w-md">
                                Undefeated for 5 matches straight. Can your squad dethrone the kings of Erangel?
                            </p>

                            <div className="flex gap-4 mt-8">
                                <Link href="/analytics" className="px-8 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-transform flex items-center justify-center">
                                    View Full Stats
                                </Link>
                                {isAdmin && (
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="px-8 py-3 rounded-full bg-accent text-white font-bold hover:scale-105 transition-transform"
                                    >
                                        Arrange Match
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 h-64 bg-black/40 rounded-xl flex items-center justify-center border border-white/10 relative group overflow-hidden">
                            <span className="text-6xl font-black text-white/5 relative z-10">VS</span>

                            {/* Admin Image control placed here in original code, but 'Change Banner' might be what user meant for squad match images */}
                            {isAdmin && (
                                <button className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold gap-2">
                                    <ImageIcon className="w-6 h-6" /> Change Banner
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* Latest Wars List */}
                <h3 className="text-2xl font-bold mb-6">Recent Battles</h3>

                {loading ? (
                    <div className="text-center text-muted-foreground py-10">Loading battles...</div>
                ) : matches.length === 0 ? (
                    <div className="text-center text-muted-foreground py-10 border border-white/5 rounded-2xl">
                        No recent battles recorded.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {matches.map((match, idx) => (
                            <div key={match._id || idx} className="relative overflow-hidden rounded-xl glass border border-white/5 hover:border-accent/30 transition-colors">

                                {/* Match Banner Background if present */}
                                {match.bannerUrl && (
                                    <div className="absolute top-0 left-0 w-full h-full">
                                        <img src={match.bannerUrl} alt="Match Banner" className="w-full h-full object-cover opacity-20" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                                    </div>
                                )}

                                <div className="relative z-10 flex flex-col md:flex-row p-4 gap-6">
                                    <div className="flex-1 flex flex-col md:flex-row items-center justify-between">
                                        <div className="flex items-center gap-6 mb-4 md:mb-0">
                                            <div className="text-center w-24">
                                                <div className="text-xs text-muted-foreground mb-1">{match.date}</div>
                                                <div className="font-bold">{match.time}</div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="font-bold text-lg">{match.teamA || "TBD"}</div>
                                                <span className="text-muted-foreground text-sm">vs</span>
                                                <div className="font-bold text-lg text-accent">{match.teamB || "TBD"}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 w-full md:w-auto">
                                            <span className="text-sm font-bold text-accent px-3">
                                                {match.status === 'Completed' ? `${match.winner || 'Draw'} WIN` : match.status}
                                            </span>
                                            <button className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-white/5 text-sm hover:bg-white/10 transition-colors">
                                                View Stats
                                            </button>
                                        </div>
                                    </div>

                                    {/* Prediction Widget for active/upcoming matches */}
                                    <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                                        <PredictionWidget teamA={match.teamA || "Team A"} teamB={match.teamB || "Team B"} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <CreateMatchModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onCreated={fetchMatches}
                />

            </main>
        </div>
    )
}
