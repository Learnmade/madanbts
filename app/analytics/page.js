"use client"

import Navbar from "@/components/Navbar"
import { motion } from "framer-motion"
import { TrendingUp, Crosshair, Skull, Crown, BarChart3 } from "lucide-react"

export default function AnalyticsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            <Navbar />

            <main className="container mx-auto px-4 py-10">

                <div className="mb-10">
                    <h1 className="text-4xl font-bold tracking-tight mb-2 flex items-center gap-3">
                        <BarChart3 className="w-8 h-8 text-secondary" /> Pro <span className="text-secondary">Analytics</span>
                    </h1>
                    <p className="text-muted-foreground">Deep dive into the meta. Understand the battlefield.</p>
                </div>

                {/* Top Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: "Top Fragger", value: "Jonathan", sub: "42 Kills", icon: Skull, color: "text-red-500" },
                        { label: "Best IGL", value: "Mavi", sub: "15 Wins", icon: Crown, color: "text-amber-500" },
                        { label: "Highest KD", value: "Goblin", sub: "6.5 KD", icon: Crosshair, color: "text-blue-500" },
                        { label: "Fan Favorite", value: "Scout", sub: "1.2K Votes", icon: TrendingUp, color: "text-purple-500" },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6 rounded-2xl glass-card border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all"
                        >
                            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${stat.color}`}>
                                <stat.icon className="w-16 h-16" />
                            </div>
                            <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <div className="text-2xl font-bold mb-1">{stat.value}</div>
                            <div className="text-sm font-medium text-muted-foreground mb-4">{stat.label}</div>
                            <div className="inline-block px-2 py-1 rounded bg-white/5 text-xs font-mono border border-white/5 text-foreground/80">
                                {stat.sub}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Leaderboard Table Mock */}
                <div className="rounded-3xl glass-card border border-white/5 overflow-hidden">
                    <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                        <h3 className="text-xl font-bold">MVP Leaderboard</h3>
                        <select className="bg-black/20 border border-white/10 rounded-lg px-3 py-1 text-sm outline-none focus:border-secondary">
                            <option>This Week</option>
                            <option>All Time</option>
                        </select>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-muted-foreground text-sm uppercase tracking-wider">
                                <tr>
                                    <th className="px-8 py-4 font-medium">Rank</th>
                                    <th className="px-8 py-4 font-medium">Player</th>
                                    <th className="px-8 py-4 font-medium">Team</th>
                                    <th className="px-8 py-4 font-medium text-right">Rating</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <tr key={item} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-8 py-4">
                                            {item === 1 ? <span className="text-amber-500 font-bold">#1</span> : <span className="font-mono text-muted-foreground">#{item}</span>}
                                        </td>
                                        <td className="px-8 py-4 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white/10" />
                                            <span className="font-bold">Player Name</span>
                                        </td>
                                        <td className="px-8 py-4 text-muted-foreground">Team Soul</td>
                                        <td className="px-8 py-4 text-right font-mono font-bold text-secondary">9.8</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>
        </div>
    )
}
