"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, TrendingUp, Building2, ShoppingBag, Trophy } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: ShoppingBag,
      title: "MERCATUS DIGITALIS",
      subtitle: "NFT Marketplace",
      description: "Trade exclusive digital assets in our holographic marketplace",
      href: "/dashboard/ecommerex/holographic-products",
      gradient: "from-purple-600 via-indigo-600 to-cyan-600",
    },
    {
      icon: Building2,
      title: "DOMUS IMPERIUM",
      subtitle: "Real Estate Empire",
      description: "Invest in premium properties across global markets",
      href: "/dashboard/ecommerex/real-estate",
      gradient: "from-amber-500 via-yellow-500 to-amber-600",
    },
    {
      icon: TrendingUp,
      title: "NEGOTIUM SUPREMUM",
      subtitle: "SnapDax Trading",
      description: "Advanced trading platform with AI-powered insights",
      href: "/dashboard/snap-dax",
      gradient: "from-purple-600 via-pink-600 to-purple-700",
    },
    {
      icon: Trophy,
      title: "LUDUS VICTORIAE",
      subtitle: "Gamification Hub",
      description: "Earn rewards and achievements through platform engagement",
      href: "/dashboard/gamification",
      gradient: "from-amber-500 via-orange-500 to-amber-600",
    },
  ]

  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [mounted, features.length])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 flex items-center justify-center">
        <div className="animate-spin">
          <SupremeAuthorityCoin size="xl" variant="logo" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 relative overflow-hidden">
      {/* Roman Column Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-400/30 to-transparent"
            style={{ left: `${(i + 1) * 8.33}%` }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
              <SupremeAuthorityCoin size="xl" variant="logo" />
            </motion.div>
          </div>

          <motion.h1
            className="text-6xl md:text-8xl font-bold font-serif mb-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            SNAPIFICUS
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-amber-400/80 font-serif tracking-wider mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            SUPREMA AUCTORITAS DIGITALIS
          </motion.p>

          <motion.p
            className="text-lg text-purple-200/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Inclusive Lending and Credit Empirical Authority - Your Gateway to New World Wealth Navigation
          </motion.p>
        </motion.div>

        {/* Feature Showcase */}
        <motion.div
          className="w-full max-w-4xl mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="relative h-64 rounded-2xl overflow-hidden border border-amber-400/20 backdrop-blur-xl bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-purple-900/40">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                className="absolute inset-0 flex items-center justify-between p-8"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${features[currentFeature].gradient} mr-4`}>
                      {features[currentFeature].icon({ className: "w-8 h-8 text-white" })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-amber-300 tracking-wider">
                        {features[currentFeature].title}
                      </h3>
                      <p className="text-purple-200/80">{features[currentFeature].subtitle}</p>
                    </div>
                  </div>
                  <p className="text-lg text-white/80 mb-6">{features[currentFeature].description}</p>
                  <Link href={features[currentFeature].href}>
                    <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold">
                      Explore <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {/* Feature Indicator */}
                <div className="flex flex-col space-y-2 ml-8">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeature(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentFeature ? "bg-amber-400 scale-125" : "bg-amber-400/30 hover:bg-amber-400/50"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Quick Access Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          {features.map((feature, index) => (
            <Link key={index} href={feature.href}>
              <motion.div
                className="group relative p-6 rounded-xl border border-amber-400/20 backdrop-blur-xl bg-gradient-to-br from-purple-900/30 via-indigo-900/30 to-purple-900/30 hover:from-purple-800/40 hover:via-indigo-800/40 hover:to-purple-800/40 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.gradient} mb-4 mx-auto w-fit`}>
                  {feature.icon({ className: "w-6 h-6 text-white" })}
                </div>
                <h4 className="text-sm font-serif font-bold text-amber-300 text-center mb-1 tracking-wider">
                  {feature.title.split(" ")[0]}
                </h4>
                <p className="text-xs text-purple-200/70 text-center">{feature.subtitle}</p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm pointer-events-none bg-gradient-to-br from-amber-400/20 to-purple-500/20" />
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <p className="text-amber-400/70 font-serif mb-4">WELCOME TO THE DIGITAL EMPIRE</p>
          <Link href="/dashboard/ecommerex/holographic-products">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-700 text-black font-bold text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Enter the Realm <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Roman-style border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent translate-y-1" />
    </div>
  )
}
