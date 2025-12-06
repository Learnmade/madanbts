import { Outfit } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/AuthContext"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata = {
  title: "MADAN'S BTS | BGMI Competitive Platform",
  description: "Join the ultimate BGMI esports action. Tryouts, Squad Wars, and Competitive Analytics.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased bg-background text-foreground min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
