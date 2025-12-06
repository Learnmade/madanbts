"use client"

import Link from "next/link"
import { Gamepad2, ArrowRight } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }

        const res = await login(email, password)
        if (!res.success) {
            setError(res.message || "Login failed")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black text-white">

            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

            <div className="w-full max-w-md p-8 rounded-3xl glass-card border border-white/10 relative z-10 mx-4">

                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                        <Gamepad2 className="w-8 h-8 text-primary" />
                        <h1 className="text-xl font-bold tracking-tighter">MADAN'S <span className="text-primary">BTS</span></h1>
                    </Link>
                    <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                    <p className="text-muted-foreground">Enter your credentials to access the arena.</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 text-red-500 text-sm font-bold border border-red-500/20 text-center">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="player@example.com"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-sm font-medium text-muted-foreground">Password</label>
                            <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                        Login <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-muted-foreground">
                    Don't have an account? <Link href="/register" className="text-white hover:text-primary transition-colors font-medium">Join the Corps</Link>
                </div>

            </div>
        </div>
    )
}
