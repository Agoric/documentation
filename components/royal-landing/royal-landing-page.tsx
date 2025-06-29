"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Crown, Shield, Gem, Star, ChevronDown } from "lucide-react"
import { QuantumButton } from "@/components/ui/quantum-button"
import { RoyalHero } from "./royal-hero"
import { RoyalFeatures } from "./royal-features"
import { RoyalTestimonials } from "./royal-testimonials"
import { RoyalPricing } from "./royal-pricing"
import { RoyalFooter } from "./royal-footer"

export function RoyalLandingPage() {
  const [scrollY, setScrollY] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Royal Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffd700' fillOpacity='0.3'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Royal Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400/20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {i % 4 === 0 ? (
              <Crown size={16} />
            ) : i % 4 === 1 ? (
              <Gem size={14} />
            ) : i % 4 === 2 ? (
              <Star size={12} />
            ) : (
              <Shield size={15} />
            )}
          </motion.div>
        ))}
      </div>

      {/* Royal Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-yellow-400/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
              <Crown className="text-yellow-400" size={32} />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                SNAPIFI ROYAL
              </span>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              {["Features", "Testimonials", "Pricing", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-300 hover:text-yellow-400 transition-colors font-medium"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <QuantumButton variant="neon" size="md">
              <Crown size={16} />
              Claim Your Throne
            </QuantumButton>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-20">
        <RoyalHero />
        <RoyalFeatures />
        <RoyalTestimonials />
        <RoyalPricing />
        <RoyalFooter />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <ChevronDown className="text-yellow-400" size={32} />
      </motion.div>
    </div>
  )
}
