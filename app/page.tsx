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
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-amber-400/10 via-amber-400/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-400/8 via-purple-400/4 to-transparent rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Floating geometric elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
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
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  {/* Orbital rings */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute inset-0 border border-cyan-400/20 rounded-full`}
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

        {/* Enhanced Statistics Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <Card className="relative bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-xl text-center overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <CardContent className="p-8 relative z-10">
                      <div className="flex items-center justify-center mb-4">
                        <div className="relative">
                          <stat.icon className="w-8 h-8 text-cyan-400 mb-2" />
                          <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>

                      <motion.div
                        className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text mb-3"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {stat.value}
                      </motion.div>

                      <div className="text-slate-300 text-sm mb-2 font-medium">{stat.label}</div>
                      <div className="text-amber-400/70 text-xs font-serif italic tracking-wide">{stat.latin}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Enhanced Features Grid */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text mb-6 font-black tracking-tight">
                Imperial Domains
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-8" />
              <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
                Explore the vast realms of digital sovereignty and financial supremacy through our quantum-enhanced
                ecosystem
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -8 }}
                  className="group"
                >
                  <Link href={feature.href}>
                    <Card
                      className={`relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 border border-slate-700/50 backdrop-blur-xl hover:border-slate-600/70 transition-all duration-500 cursor-pointer h-full overflow-hidden shadow-2xl ${feature.glow} hover:shadow-2xl`}
                    >
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5`} />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)]" />
                      </div>

                      {/* Floating particles */}
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              y: [0, -20, 0],
                              opacity: [0, 1, 0],
                              scale: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 3 + Math.random() * 2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: Math.random() * 2,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>

                      <CardHeader className="text-center relative z-10 pb-4">
                        <div className="mx-auto mb-6 relative">
                          <motion.div
                            className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl`}
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <feature.icon className="w-10 h-10 text-white drop-shadow-lg" />
                          </motion.div>
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                          />
                        </div>

                        <CardTitle className="text-transparent bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-2xl font-bold group-hover:from-white group-hover:to-slate-200 transition-all duration-300">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="relative z-10 pt-0">
                        <CardDescription className="text-slate-400 text-center group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Call to Action */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="relative"
            >
              <Card className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 border border-slate-700/50 backdrop-blur-2xl p-16 overflow-hidden shadow-2xl">
                {/* Animated background effects */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-purple-400/10 to-transparent rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                  <motion.h3
                    className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text mb-8 font-black"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 2.2 }}
                  >
                    Join the Digital Empire
                  </motion.h3>

                  <motion.div
                    className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-8"
                    initial={{ width: 0 }}
                    animate={{ width: "8rem" }}
                    transition={{ duration: 1, delay: 2.4 }}
                  />

                  <motion.p
                    className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 2.6 }}
                  >
                    Experience the future of digital sovereignty with SnappAiFi's comprehensive quantum-enhanced
                    platform for global citizens and imperial authorities in the new digital age.
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.8 }}
                  >
                    <Link href="/citizenship/register">
                      <Button
                        size="lg"
                        className="group relative bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-400 text-white font-bold px-10 py-6 text-lg shadow-2xl shadow-cyan-500/25 border-0 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Users className="w-6 h-6 mr-3" />
                        <span className="relative z-10">Register as Citizen</span>
                      </Button>
                    </Link>

                    <Link href="/admin">
                      <Button
                        size="lg"
                        variant="outline"
                        className="group relative border-2 border-purple-400/50 text-purple-300 hover:bg-purple-400/10 px-10 py-6 text-lg backdrop-blur-xl bg-slate-900/20 shadow-2xl shadow-purple-500/10 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Crown className="w-6 h-6 mr-3" />
                        <span className="relative z-10">Access Authority Panel</span>
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
