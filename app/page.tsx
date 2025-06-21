"use client"

import { motion } from "framer-motion"
import { Crown, Shield, Zap, TrendingUp, Users, Building, Sparkles } from "lucide-react"
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
      color: "from-amber-500 to-yellow-600",
    },
    {
      icon: Shield,
      title: "Citizen Registry",
      description: "Global citizenship management and verification",
      href: "/citizenship",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: TrendingUp,
      title: "Investment Realms",
      description: "Holographic trading and portfolio management",
      href: "/dashboard/ecommerex",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Building,
      title: "Real Estate Empire",
      description: "Property marketplace with imperial oversight",
      href: "/dashboard/real-estate",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: Zap,
      title: "Neural Banking",
      description: "Advanced financial services and transactions",
      href: "/dashboard/banking",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: Sparkles,
      title: "Gamification",
      description: "Achievement systems and progression tracking",
      href: "/dashboard/gamification",
      color: "from-pink-500 to-rose-600",
    },
  ]

  const stats = [
    { label: "Active Citizens", value: "12,847", latin: "Cives Activi" },
    { label: "Total Assets", value: "$2.4B", latin: "Summa Bonorum" },
    { label: "Transactions", value: "1.2M", latin: "Negotia" },
    { label: "Global Reach", value: "127", latin: "Orbis Terrarum" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 relative overflow-hidden">
      {/* Neural Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-400/3 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center mb-6">
                <motion.div
                  className="relative"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Crown className="w-20 h-20 text-amber-400" />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-cyan-400 rounded-full blur-xl opacity-30 animate-pulse" />
                </motion.div>
              </div>

              <h1 className="text-6xl md:text-8xl font-bold mb-4">
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent font-serif">
                  SNAPP<span className="text-cyan-400">AI</span>FI
                </span>
              </h1>

              <p className="text-2xl md:text-3xl text-amber-300/80 font-serif tracking-wider mb-2">
                SUPREMA AUCTORITAS DIGITALIS
              </p>

              <p className="text-lg text-purple-200 max-w-3xl mx-auto leading-relaxed">
                The ultimate digital sovereignty platform combining imperial authority, neural banking, holographic
                commerce, and global citizenship management.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/dashboard/home">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-purple-900 font-bold px-8 py-4 text-lg shadow-2xl"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Enter the Imperium
                </Button>
              </Link>

              <Link href="/citizenship/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-amber-400/50 text-amber-300 hover:bg-amber-400/10 px-8 py-4 text-lg backdrop-blur-sm"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Become a Citizen
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-xl text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-amber-300 mb-2">{stat.value}</div>
                      <div className="text-purple-200 text-sm mb-1">{stat.label}</div>
                      <div className="text-amber-400/60 text-xs font-serif italic">{stat.latin}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-amber-300 mb-4 font-serif">Imperial Domains</h2>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                Explore the vast realms of digital sovereignty and financial supremacy
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                >
                  <Link href={feature.href}>
                    <Card className="group bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-amber-400/20 backdrop-blur-xl hover:border-amber-400/50 transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                      <CardHeader className="text-center">
                        <div className="mx-auto mb-4 relative">
                          <div
                            className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                          >
                            <feature.icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <CardTitle className="text-amber-300 text-xl font-serif group-hover:text-amber-200 transition-colors">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-purple-200 text-center group-hover:text-purple-100 transition-colors">
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

        {/* Call to Action */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border border-amber-400/30 rounded-3xl p-12 backdrop-blur-xl"
              style={{
                clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))",
              }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-amber-300 mb-6 font-serif">Join the Digital Empire</h3>
              <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
                Experience the future of digital sovereignty with SnappAiFi's comprehensive platform for global citizens
                and imperial authorities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/citizenship/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-purple-900 font-bold px-8 py-4"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Register as Citizen
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-amber-400/50 text-amber-300 hover:bg-amber-400/10 px-8 py-4 backdrop-blur-sm"
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Access Authority Panel
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
