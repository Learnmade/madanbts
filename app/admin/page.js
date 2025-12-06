"use client"

import { ShieldCheck, Users, Trophy, Activity, LogOut } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from 'next/link'

import { ConfirmationModal } from "@/components/ConfirmationModal"

export default function AdminDashboard() {
    const { user, loading, isAdmin, logout } = useAuth()
    const router = useRouter()
    // ... (previous state)
    const [statsData, setStatsData] = useState({
        users: "...",
        tryouts: "...",
        pending: "...",
        status: "Online"
    });
    const [activeTab, setActiveTab] = useState("Overview");
    const [usersList, setUsersList] = useState([]);
    const [settingsMsg, setSettingsMsg] = useState("");
    const [deleteUserId, setDeleteUserId] = useState(null);

    // ... (useEffect and fetchStats remain same)

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users');
            if (res.ok) {
                const data = await res.json();
                if (data.success) setUsersList(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    const confirmDeleteUser = (id) => {
        setDeleteUserId(id);
    };

    const handleDeleteUser = async () => {
        if (!deleteUserId) return;
        try {
            const res = await fetch('/api/admin/users', {
                method: 'DELETE',
                body: JSON.stringify({ id: deleteUserId }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) {
                setUsersList(usersList.filter(u => u._id !== deleteUserId));
            }
        } catch (error) {
            console.error("Failed to delete user", error);
        } finally {
            setDeleteUserId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-muted-foreground gap-3">
                <Activity className="w-5 h-5 animate-spin" /> Loading admin protocols...
            </div>
        )
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-red-500 gap-4">
                <ShieldCheck className="w-16 h-16 opacity-50" />
                <h1 className="text-2xl font-bold">Restricted Area</h1>
                <p className="text-muted-foreground">You do not have the required clearance level.</p>
                <Link href="/" className="px-6 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white font-medium">
                    Return to Base
                </Link>
            </div>
        )
    }

    const stats = [
        { label: "Total Users", value: statsData.users, icon: Users, color: "text-blue-500" },
        { label: "Active Tryouts", value: statsData.tryouts, icon: Trophy, color: "text-amber-500" },
        { label: "Pending Verifications", value: statsData.pending, icon: ShieldCheck, color: "text-green-500" },
        { label: "System Status", value: statsData.status, icon: Activity, color: "text-purple-500" },
    ];

    const handleNav = (item) => {
        if (item === 'Tryouts') router.push('/tryouts');
        else if (item === 'Squad Wars') router.push('/squad-war');
        else setActiveTab(item);
    };

    return (
        <div className="min-h-screen bg-black text-foreground">
            <div className="flex">
                <aside className="w-64 min-h-screen border-r border-white/10 p-6 hidden md:block lg:block sticky top-0 h-screen overflow-y-auto">
                    <Link href="/" className="text-xl font-bold mb-10 flex items-center gap-2 hover:opacity-80">
                        <ShieldCheck className="text-red-500" /> Admin Panel
                    </Link>

                    <nav className="space-y-2">
                        {["Overview", "Manage Users", "Tryouts", "Squad Wars", "Content Moderation", "Settings"].map((item) => (
                            <button
                                key={item}
                                onClick={() => handleNav(item)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeTab === item ? 'bg-white/10 text-white font-medium' : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
                            >
                                {item}
                            </button>
                        ))}
                    </nav>

                    <button onClick={logout} className="flex items-center gap-2 text-red-500 mt-20 px-4 hover:opacity-80">
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </aside>

                <main className="flex-1 p-8">
                    <header className="flex justify-between items-center mb-10">
                        <h1 className="text-3xl font-bold">{activeTab === 'Overview' ? 'Dashboard Overview' : activeTab}</h1>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">{user?.name}</span>
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold border border-white/10">
                                {user?.name?.[0]?.toUpperCase() || 'A'}
                            </div>
                        </div>
                    </header>

                    {activeTab === 'Overview' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                                {stats.map((stat, i) => (
                                    <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                            <span className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded">Update: Now</span>
                                        </div>
                                        <div className="text-3xl font-bold mb-1">{stat.value}</div>
                                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                                <h3 className="text-xl font-bold mb-6">Recent Activity Log</h3>
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">A</div>
                                                <div>
                                                    <div className="font-medium">Admin created a new match</div>
                                                    <div className="text-xs text-muted-foreground">Recent</div>
                                                </div>
                                            </div>
                                            <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-500">Success</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'Manage Users' && (
                        <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-muted-foreground text-sm uppercase">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Name</th>
                                        <th className="px-6 py-4 font-medium">Email</th>
                                        <th className="px-6 py-4 font-medium">Role</th>
                                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {usersList.map((u) => (
                                        <tr key={u._id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4 font-medium">{u.name}</td>
                                            <td className="px-6 py-4 text-muted-foreground">{u.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'admin' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                                    {u.role.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => confirmDeleteUser(u._id)}
                                                    className="px-3 py-1 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs font-bold transition-colors"
                                                    disabled={u.role === 'admin'}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'Settings' && (
                        <div className="max-w-xl">
                            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
                                <h3 className="text-xl font-bold mb-6">Admin Configuration</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-muted-foreground">Admin Email</label>
                                        <input type="text" value={user?.email || ''} readOnly className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 opacity-50 cursor-not-allowed" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-muted-foreground">System Mode</label>
                                        <select className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3">
                                            <option>Production (Live)</option>
                                            <option>Maintenance Mode</option>
                                            <option>Development</option>
                                        </select>
                                    </div>
                                    <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Content Moderation' && (
                        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-12 text-center text-muted-foreground">
                            <ShieldCheck className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <h3 className="text-xl font-bold mb-2">No Content Flags</h3>
                            <p>There are currently no user reports or flagged content requiring moderation.</p>
                            <button className="mt-6 px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium">
                                Refresh Audit Log
                            </button>
                        </div>
                    )}

                </main>
            </div>

            <ConfirmationModal
                isOpen={!!deleteUserId}
                onClose={() => setDeleteUserId(null)}
                onConfirm={handleDeleteUser}
                title="Delete User"
                message="Are you sure you want to delete this user? This account will be permanently removed."
                confirmText="Delete User"
                isDangerous={true}
            />
        </div>
    )
}
