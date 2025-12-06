"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    console.warn("checkUser: Received non-JSON response");
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Auth check failed", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await res.json();
                if (res.ok) {
                    setUser(data.user);
                    router.push('/');
                    return { success: true };
                } else {
                    return { success: false, message: data.message };
                }
            } else {
                // Non-JSON response (likely HTML error page)
                const text = await res.text();
                console.error("Login failed (non-JSON):", text);
                return { success: false, message: `Server error: ${res.status}` };
            }
        } catch (error) {
            console.error("Login network/parse error:", error);
            return { success: false, message: "Network error occurred." };
        }
    };

    const register = async (userData) => {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await res.json();
                if (res.ok) {
                    return { success: true };
                } else {
                    return { success: false, message: data.message };
                }
            } else {
                const text = await res.text();
                console.error("Register failed (non-JSON):", text);
                return { success: false, message: `Server error: ${res.status}` };
            }
        } catch (error) {
            console.error("Register network/parse error:", error);
            return { success: false, message: "Network error occurred." };
        }
    }

    const logout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register, isAdmin: user?.role === 'admin' }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
