"use client"

import Link from "next/link"
import { Gamepad2, ArrowRight } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        ign: "",
        discordId: "",
        email: "",
        password: "",
        name: "" // Added name field internally if needed, or map ign to name
    })
    const [error, setError] = useState("")
    const { register } = useAuth()
    const router = useRouter()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        // Simple validation
        if (!formData.ign || !formData.email || !formData.password) {
            setError("Please fill in all required fields")
            return
        }

        // Use IGN as name for now if name is not explicitly asked
        const payload = {
            ...formData,
            name: formData.ign
        }

        const res = await register(payload)
        if (res.success) {
            router.push('/login')
        } else {
            setError(res.message || "Registration failed")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black text-white py-10">

            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-indigo-500/10 via-background to-background" />

            <div className="w-full max-w-md p-8 rounded-3xl glass-card border border-white/10 relative z-10 mx-4">

                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                        <Gamepad2 className="w-8 h-8 text-primary" />
                        <span className="text-xl font-bold tracking-tighter">MADAN'S <span className="text-primary">BTS</span></span>
                    </Link>
                    <h2 className="text-2xl font-bold mb-2">Join the Ranks</h2>
                    <p className="text-muted-foreground">Create your profile to start competing.</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 text-red-500 text-sm font-bold border border-red-500/20 text-center">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">IGN (In-Game Name)</label>
                            <input
                                type="text"
                                name="ign"
                                value={formData.ign}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="Mortal"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Discord ID</label>
                            <input
                                type="text"
                                name="discordId"
                                value={formData.discordId}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="User#1234"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="player@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button className="w-full py-3.5 rounded-xl bg-white text-black font-bold hover:bg-white/90 transition-opacity flex items-center justify-center gap-2 mt-4">
                        Create Account <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-muted-foreground">
                    Already have an account? <Link href="/login" className="text-white hover:text-primary transition-colors font-medium">Login</Link>
                </div>

            </div>
        </div>
    )
}
