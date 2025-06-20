"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Crown, Shield, Coins, Globe, Building, Users, ChevronRight, Home, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const navigationItems = [
  { icon: Home, label: "IMPERIUM CENTRALE", href: "/", latin: "Domus" },
  { icon: Crown, label: "SUPREME AUTHORITY", href: "/dashboard/authority", latin: "Suprema Potestas" },
  { icon: Building, label: "COMMERCE NEXUS", href: "/dashboard/ecommerex", latin: "Mercatus" },
  { icon: Coins, label: "QUANTUM BANKING", href: "/dashboard/banking", latin: "Pecunia" },
  { icon: Globe, label: "GLOBAL CITIZENSHIP", href: "/citizenship", latin: "Civitas Globalis" },
  { icon: Shield, label: "LEGAL DOMINION", href: "/legal", latin: "Lex Imperii" },
  { icon: TrendingUp, label: "PROFIT NEXUS", href: "/dashboard/profit-distribution", latin: "Lucrum" },
  { icon: Users, label: "ADMIN SANCTUM", href: "/admin", latin: "Administratio" },
]

export function ImperiumNavigationOrb() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-80 bg-black/90 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-4 mb-4"
            style={{
              clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
            }}
          >
            <div className="text-center mb-4">
              <h3 className="font-imperial text-amber-400 text-lg font-bold">IMPERIUM NAVIGATOR</h3>
              <p className="text-purple-300 text-xs font-modern">Suprema Auctoritas Digitalis</p>
            </div>

            <nav className="space-y-2">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={item.href} onClick={() => setIsExpanded(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-3 h-auto bg-gradient-to-r from-amber-500/10 to-purple-500/10 hover:from-amber-500/20 hover:to-purple-500/20 border border-amber-500/20 rounded-lg group transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5 text-amber-400 group-hover:text-amber-300" />
                        <div className="text-left">
                          <div className="text-white font-medium text-sm">{item.label}</div>
                          <div className="text-purple-300 text-xs font-imperial">{item.latin}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Orb */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-16 h-16 bg-gradient-to-br from-amber-500 via-purple-600 to-cyan-500 rounded-full shadow-2xl border-2 border-amber-400/50 flex items-center justify-center group relative overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(245, 158, 11, 0.5)",
            "0 0 30px rgba(124, 58, 237, 0.5)",
            "0 0 20px rgba(6, 182, 212, 0.5)",
            "0 0 30px rgba(245, 158, 11, 0.5)",
          ],
        }}
        transition={{
          boxShadow: { duration: 3, repeat: Number.POSITIVE_INFINITY },
          scale: { duration: 0.2 },
        }}
      >
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <Crown className="w-8 h-8 text-white drop-shadow-lg" />
        </motion.div>

        {/* Pulsing Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-amber-400/30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.button>
    </div>
  )
}
