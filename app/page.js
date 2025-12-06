"use client"

import { motion } from "framer-motion"
import { Users, Trophy, BarChart3, ArrowRight, Gamepad2, Sword } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Users,
    title: "Squad Tryouts",
    description: "Showcase your skills and get scouted by top clans.",
    color: "bg-blue-500/10 text-blue-500",
    border: "border-blue-500/20"
  },
  {
    icon: Sword,
    title: "Squad Wars",
    description: "Battle against other squads for dominance and rewards.",
    color: "bg-primary/10 text-primary",
    border: "border-primary/20"
  },
  {
    icon: BarChart3,
    title: "Pro Analytics",
    description: "Deep dive into your stats. K/D, win rates, and heatmaps.",
    color: "bg-purple-500/10 text-purple-500",
    border: "border-purple-500/20"
  }
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-background to-background">

      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-20 pointer-events-none" />

      {/* Navbar (Placeholder) */}
      <nav className="w-full glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold tracking-tighter">MADAN'S <span className="text-primary">BTS</span></h1>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="/tryouts" className="hover:text-foreground transition-colors">Tryouts</Link>
          <Link href="/squad-war" className="hover:text-foreground transition-colors">Squad Wars</Link>
          <Link href="/schedule" className="hover:text-foreground transition-colors">Schedule</Link>
          <Link href="/analytics" className="hover:text-foreground transition-colors">Analytics</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="px-5 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all font-medium text-sm">
            Login
          </Link>
          <Link href="/register" className="px-5 py-2 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all font-medium text-sm">
            Join Now
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 py-20 text-center z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live Tryouts Registration Open
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl"
        >
          Dominate the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600 text-glow">Battlegrounds</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mb-10"
        >
          The ultimate platform for BGMI tryouts, squad wars, and esports analytics.
          Prove your worth, climb the ranks, and become a legend.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Link href="/tryouts" className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2">
            Start Competing <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/analytics" className="px-8 py-4 rounded-full bg-card hover:bg-card/80 border border-white/10 text-foreground font-bold text-lg transition-all flex items-center justify-center gap-2">
            View Analytics
          </Link>
        </motion.div>

        {/* Stats / Trust Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-y border-white/5 py-8 w-full max-w-5xl"
        >
          {[
            { label: "Active Players", value: "2.5K+" },
            { label: "Matches Hosted", value: "500+" },
            { label: "Squads Registered", value: "120+" },
            { label: "Prize Pool", value: "₹50K+" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">{stat.value}</span>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </main>

      <section className="container mx-auto px-4 py-24 z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden relative max-w-4xl w-full border border-white/10 group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          <img src="/brand.png" alt="Madan Brand" className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 text-center">
            <h2 className="text-3xl md:text-5xl font-black italic tracking-wide mb-4 text-white drop-shadow-lg">
              "RATHATHIN RATHAGAL"
            </h2>
            <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto italic">
              Blood of my blood. The legacy continues.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Feautures Grid */}
      <section className="container mx-auto px-4 py-24 z-10">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-2xl glass-card border hover:border-primary/50 transition-colors group cursor-default`}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} ${feature.border} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  )
}
