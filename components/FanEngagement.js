"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Flame, ThumbsUp } from "lucide-react"

export function LikeButton({ initialCount = 0, size = "md" }) {
    const [count, setCount] = useState(initialCount)
    const [liked, setLiked] = useState(false)
    const [particles, setParticles] = useState([])

    const handleLike = () => {
        if (!liked) {
            setCount(c => c + 1)
            setLiked(true)
            spawnParticles()
        } else {
            setCount(c => c - 1)
            setLiked(false)
        }
    }

    const spawnParticles = () => {
        const newParticles = Array.from({ length: 6 }).map((_, i) => ({
            id: Date.now() + i,
            angle: (i * 60) + Math.random() * 30,
            speed: 2 + Math.random() * 2
        }))
        setParticles(newParticles)
        setTimeout(() => setParticles([]), 1000)
    }

    const sizeClasses = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-8 h-8" : "w-6 h-6"

    return (
        <div className="relative inline-flex items-center">
            <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${liked ? 'bg-red-500/20 text-red-500 ring-1 ring-red-500/50' : 'bg-white/5 text-muted-foreground hover:bg-white/10'}`}
            >
                <Heart className={`${sizeClasses} ${liked ? 'fill-current' : ''}`} />
                <span className="font-bold font-mono">{count}</span>
            </button>

            <AnimatePresence>
                {particles.map(p => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                        animate={{
                            opacity: 0,
                            scale: 0,
                            x: Math.cos(p.angle * Math.PI / 180) * 30,
                            y: Math.sin(p.angle * Math.PI / 180) * 30
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-red-500 pointer-events-none"
                    />
                ))}
            </AnimatePresence>
        </div>
    )
}

export function PredictionWidget({ teamA, teamB }) {
    const [selected, setSelected] = useState(null)
    const [stats, setStats] = useState({ a: 45, b: 55 }) // Percentages

    const handleVote = (team) => {
        if (selected) return
        setSelected(team)
        // Mock update stats
        if (team === 'A') setStats({ a: 46, b: 54 })
        else setStats({ a: 44, b: 56 })
    }

    return (
        <div className="bg-black/40 rounded-xl p-4 border border-white/5 mt-4">
            <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3 text-center">Who will win?</h4>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => handleVote('A')}
                    disabled={!!selected}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all ${selected === 'A' ? 'bg-blue-500 text-white' : 'bg-white/5 hover:bg-white/10'}`}
                >
                    {teamA}
                </button>
                <div className="text-xs text-muted-foreground">VS</div>
                <button
                    onClick={() => handleVote('B')}
                    disabled={!!selected}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all ${selected === 'B' ? 'bg-orange-500 text-white' : 'bg-white/5 hover:bg-white/10'}`}
                >
                    {teamB}
                </button>
            </div>
            {selected && (
                <div className="mt-2 flex h-1.5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.a}%` }}
                        className="bg-blue-500"
                    />
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.b}%` }}
                        className="bg-orange-500"
                    />
                </div>
            )}
        </div>
    )
}
