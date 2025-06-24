"use client"

import { motion } from "framer-motion"
import { Crown, Shield, Zap, TrendingUp, Users, Building, Sparkles, Star, Hexagon, Orbit } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: Crown,
      title: "Supreme Authority",
      description: "Digital sovereignty with imperial command systems",
      href: "/admin",
      color: "from-amber-400 via-yellow-500 to-orange-500",
      glow: "shadow-amber-500/25",
    },
    {
      icon: Shield,
      title: "Citizen Registry",
      description: "Global citizenship management and verification",
      href: "/citizenship",
      color: "from-cyan-400 via-blue-500 to-indigo-500",
      glow: "shadow-cyan-500/25",
    },
    {
      icon: TrendingUp,
      title: "Investment Realms",
      description: "Holographic trading and portfolio management",
      href: "/dashboard/ecommerex",
      color: "from-emerald-400 via-green-500 to-teal-500",
      glow: "shadow-emerald-500/25",
    },
    {
      icon: Building,
      title: "Real Estate Empire",
      description: "Property marketplace with imperial oversight",
      href: "/dashboard/real-estate",
      color: "from-purple-400 via-violet-500 to-fuchsia-500",
      glow: "shadow-purple-500/25",
    },
    {
      icon: Zap,
      title: "Neural Banking",
      description: "Advanced financial services and transactions",
      href: "/dashboard/banking",
      color: "from-rose-400 via-pink-500 to-red-500",
      glow: "shadow-rose-500/25",
    },
    {
      icon: Sparkles,
      title: "Gamification",
      description: "Achievement systems and progression tracking",
      href: "/dashboard/gamification",
      color: "from-violet-400 via-purple-500 to-indigo-500",
      glow: "shadow-violet-500/25",
    },
  ]

  const stats = [
    { label: "Active Citizens", value: "12,847", latin: "Cives Activi", icon: Users },
    { label: "Total Assets", value: "$2.4B", latin: "Summa Bonorum", icon: TrendingUp },
    { label: "Transactions", value: "1.2M", latin: "Negotia", icon: Zap },
    { label: "Global Reach", value: "127", latin: "Orbis Terrarum", icon: Building },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Enhanced Neural Background Effects */}
      <div className="absolute inset-0">
        {/* Primary ambient lights */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-cyan-400/10 via-cyan-400/5 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-amber-400/10 via-amber-400/5 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-400/8 via-purple-400/4 to-transparent rounded-full blur-3xl"
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Floating geometric elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              rotate: [0, 360],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          >
            {i % 3 === 0 ? (
              <Hexagon className="w-4 h-4 text-cyan-400/30" />
            ) : i % 3 === 1 ? (
              <Star className="w-3 h-3 text-amber-400/30" />
            ) : (
              <Orbit className="w-5 h-5 text-purple-400/30" />
            )}
          </motion.div>
        ))}

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Enhanced Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center mb-8">
                <motion.div
                  className="relative"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <div className="relative">
                    <Crown className="w-24 h-24 text-amber-400 drop-shadow-2xl" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 via-cyan-400 to-purple-400 rounded-full blur-2xl opacity-40"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                  </div>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 border border-cyan-400/20 rounded-full"
                      style={{
                        width: `${120 + i * 20}px`,
                        height: `${120 + i * 20}px`,
                        left: `${-10 - i * 10}px`,
                        top: `${-10 - i * 10}px`,
                      }}
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 10 + i * 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                        direction: i % 2 === 0 ? "normal" : "reverse",
                      }}
                    />
                  ))}
                </motion.div>
              </div>

              <motion.h1
                className="text-7xl md:text-9xl font-bold mb-6 tracking-tight"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-amber-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent font-black tracking-wider">
                  SNAPP
                </span>
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent font-black">
                  AI
                </span>
                <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300 bg-clip-text text-transparent font-black">
                  FI
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-6"
              >
                <p className="text-3xl md:text-4xl text-transparent bg-gradient-to-r from-amber-200 via-cyan-200 to-purple-200 bg-clip-text font-light tracking-[0.2em] mb-4">
                  SUPREMA AUCTORITAS DIGITALIS
                </p>

                <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-6" />

                <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
                  The ultimate digital sovereignty platform combining imperial authority, neural banking, holographic
                  commerce, and global citizenship management in a unified quantum ecosystem.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link href="/dashboard/home">
                <Button
                  size="lg"
                  className="group relative bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:via-amber-300 hover:to-yellow-400 text-slate-900 font-bold px-10 py-6 text-lg shadow-2xl shadow-amber-500/25 border-0 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Crown className="w-6 h-6 mr-3 drop-shadow-sm" />
                  <span className="relative z-10">Enter the Imperium</span>
                </Button>
              </Link>

              <Link href="/citizenship/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="group relative border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 px-10 py-6 text-lg backdrop-blur-xl bg-slate-900/20 shadow-2xl shadow-cyan-500/10 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Shield className="w-6 h-6 mr-3" />
                  <span className="relative z-10">Become a Citizen</span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-slate-900/70 rounded-2xl shadow-2xl shadow-slate-500/10 backdrop-blur-md overflow-hidden border border-slate-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-300">{stat.label}</CardTitle>
                    {/* @ts-expect-error */}
                    <stat.icon className="w-4 h-4 text-slate-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-slate-500 tracking-tight">{stat.value}</div>
                    <p className="text-xs text-slate-400">
                      <span className="uppercase">{stat.latin}</span>
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-5xl font-bold text-center mb-12 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-amber-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent font-black">
                Core
              </span>
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent font-black">
                Features
              </span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} blur-lg opacity-0 group-hover:opacity-80 transition duration-300 ${feature.glow}`}
                  />
                  <Card className="relative z-10 bg-slate-900/70 rounded-2xl shadow-2xl shadow-slate-500/10 backdrop-blur-md overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-colors duration-300">
                    <CardHeader className="space-y-2.5">
                      <div className="flex items-center">
                        {/* @ts-expect-error */}
                        <feature.icon className="w-6 h-6 mr-2 text-slate-400" />
                        <CardTitle className="text-lg font-semibold text-slate-200">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <CardDescription className="text-sm text-slate-400 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                      <Link href={feature.href}>
                        <Button variant="link" className="mt-4 pl-0 text-sm text-cyan-400 hover:text-cyan-300">
                          Learn More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="py-12 px-6">
          <div className="max-w-6xl mx-auto text-center text-slate-500 font-light">
            <p>&copy; {new Date().getFullYear()} SNAPP AI FI. All rights reserved.</p>
            <p className="mt-4">
              <Link href="/terms" className="hover:text-slate-400 underline">
                Terms of Service
              </Link>{" "}
              |{" "}
              <Link href="/privacy" className="hover:text-slate-400 underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
