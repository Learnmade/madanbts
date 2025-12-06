"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Gamepad2, ShieldAlert, LogOut, User } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export default function Navbar() {
    const pathname = usePathname()
    const { user, isAdmin, logout } = useAuth()

    const isActive = (path) => pathname === path ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"

    return (
        <nav className="w-full glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2">
                    <Gamepad2 className="w-8 h-8 text-primary" />
                    <h1 className="text-xl font-bold tracking-tighter">MADAN'S <span className="text-primary">BTS</span></h1>
                </Link>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <Link href="/tryouts" className={`transition-colors ${isActive('/tryouts')}`}>Tryouts</Link>
                <Link href="/squad-war" className={`transition-colors ${isActive('/squad-war')}`}>Squad Wars</Link>
                <Link href="/schedule" className={`transition-colors ${isActive('/schedule')}`}>Schedule</Link>
                <Link href="/analytics" className={`transition-colors ${isActive('/analytics')}`}>Analytics</Link>
            </div>

            <div className="flex items-center gap-4">
                {isAdmin && (
                    <Link href="/admin" className="p-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all border border-red-500/20" title="Admin Dashboard">
                        <ShieldAlert className="w-5 h-5" />
                    </Link>
                )}

                {user ? (
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <User className="w-4 h-4" />
                            </div>
                            <span className="hidden sm:inline-block">{user.name}</span>
                        </div>
                        <button onClick={logout} className="p-2 text-muted-foreground hover:text-foreground" title="Logout">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <>
                        <Link href="/login" className="px-5 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all font-medium text-sm">
                            Login
                        </Link>
                        <Link href="/register" className="px-5 py-2 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all font-medium text-sm hidden sm:block">
                            Join Now
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}
