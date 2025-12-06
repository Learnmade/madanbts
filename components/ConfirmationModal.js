"use client"

import { AlertTriangle, X } from "lucide-react"

export function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", isDangerous = false }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-zinc-900 border border-white/10 rounded-2xl p-6 relative shadow-2xl scale-in-95 animate-in zoom-in-95 duration-200">
                <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center mb-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isDangerous ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">{title}</h2>
                    <p className="text-muted-foreground text-sm">{message}</p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 font-medium transition-colors text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => { onConfirm(); onClose(); }}
                        className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-opacity hover:opacity-90 ${isDangerous ? 'bg-red-500 text-white' : 'bg-primary text-primary-foreground'}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}
