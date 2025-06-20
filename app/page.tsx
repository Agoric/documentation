"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Crown, Shield, Globe, Star, ArrowRight, Sparkles, Brain, Building2, TrendingUp, Trophy } from "lucide-react"

const imperialFeatures = [
  {
    icon: Crown,
    title: "Supreme Authority",
    latin: "Suprema Auctoritas",
    description: "Command your digital empire with absolute sovereignty",
    color: "from-amber-400 to-orange-500",
    path: "/admin",
  },
  {
    icon: Globe,
    title: "Global Citizenship",
    latin: "Civitas Globalis",
    description: "Transcend borders with universal digital identity",
    color: "from-blue-400 to-cyan-500",
    path: "/citizenship/profile",
  },
  {
    icon: Brain,
    title: "Neural Commerce",
    latin: "Commercium Neurale",
    description: "AI-powered quantum marketplace intelligence",
    color: "from-purple-400 to-pink-500",
    path: "/dashboard/ecommerex/holographic-products",
  },
  {
    icon: Building2,
    title: "Property Empire",
    latin: "Imperium Proprietatis",
    description: "Dominate real estate with imperial precision",
    color: "from-emerald-400 to-teal-500",
    path: "/dashboard/ecommerex/real-estate",
  },
  {
    icon: TrendingUp,
    title: "Financial Dominion",
    latin: "Dominatio Financialis",
    description: "Neural trading and quantum banking systems",
    color: "from-cyan-400 to-blue-500",
    path: "/dashboard/snap-dax",
  },
  {
    icon: Trophy,
    title: "Achievement Realm",
    latin: "Regnum Honorum",
    description: "Gamified progression through imperial ranks",
    color: "from-yellow-400 to-orange-500",
    path: "/dashboard/gamification",
  },
]

export default function ImperiumHomePage() {
  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <motion.section
        className="relative px-6 py-20 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Imperial Crown */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center shadow-2xl">
              <Crown className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-serif"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            IMPERIUM SNAPIFI
          </motion.h1>

          {/* Latin Subtitle */}
          <motion.p
            className="text-2xl md:text-3xl text-amber-300/80 mb-4 font-serif italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            Suprema Auctoritas Digitalis
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-xl text-purple-200 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            Navigate the future with imperial sovereignty. Command quantum commerce, neural intelligence, and global
            citizenship through the supreme digital authority platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.7 }}
          >
            <Link href="/dashboard/home">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl"
                style={{
                  clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
                }}
              >
                <Crown className="w-5 h-5 mr-2" />
                Enter the Imperium
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/citizenship/register">
              <Button
                size="lg"
                variant="outline"
                className="border-amber-400/50 text-amber-300 hover:bg-amber-500/20 px-8 py-4 text-lg font-semibold"
                style={{
                  clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
                }}
              >
                <Globe className="w-5 h-5 mr-2" />
                Claim Citizenship
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-400/40 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.section>

      {/* Imperial Features Grid */}
      <motion.section
        className="px-6 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-300 mb-4 font-serif">Imperial Dominions</h2>
            <p className="text-xl text-purple-200 italic">Regna Digitalia - Digital Realms of Power</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {imperialFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.2 + index * 0.1 }}
                >
                  <Link href={feature.path}>
                    <Card
                      className="h-full bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-amber-400/30 hover:border-amber-400/60 transition-all duration-300 cursor-pointer group backdrop-blur-sm"
                      style={{
                        clipPath: "polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%)",
                      }}
                    >
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-4 mb-6">
                          <div
                            className={`w-16 h-16 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                            style={{
                              clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                            }}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                              {feature.title}
                            </h3>
                            <p className="text-sm text-amber-300/80 font-serif italic mb-3">{feature.latin}</p>
                          </div>
                        </div>
                        <p className="text-purple-200 leading-relaxed mb-6">{feature.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Imperial Access
                          </Badge>
                          <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Imperial Stats */}
      <motion.section
        className="px-6 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
      >
        <div className="max-w-4xl mx-auto">
          <Card
            className="bg-gradient-to-br from-amber-900/20 to-purple-900/20 border-amber-400/30 backdrop-blur-sm"
            style={{
              clipPath: "polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)",
            }}
          >
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-amber-300 mb-2 font-serif">Imperial Statistics</h3>
                <p className="text-amber-300/70 italic">Statisticae Imperiales</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">250K+</div>
                  <div className="text-sm text-purple-300">Global Citizens</div>
                  <div className="text-xs text-amber-300/70 italic">Cives Globales</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">$2.5B</div>
                  <div className="text-sm text-purple-300">Assets Under Management</div>
                  <div className="text-xs text-amber-300/70 italic">Bona Sub Cura</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                  <div className="text-sm text-purple-300">System Uptime</div>
                  <div className="text-xs text-amber-300/70 italic">Tempus Activum</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">150+</div>
                  <div className="text-sm text-purple-300">Countries Served</div>
                  <div className="text-xs text-amber-300/70 italic">Nationes Servitae</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="px-6 py-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-amber-300 mb-6 font-serif">Join the Digital Empire</h2>
          <p className="text-xl text-purple-200 mb-8 italic">
            Adiungi Imperio Digitali - Become part of the supreme authority
          </p>
          <Link href="/citizenship/register">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-cyan-600 hover:from-purple-600 hover:to-cyan-700 text-white px-12 py-6 text-xl font-semibold shadow-2xl"
              style={{
                clipPath: "polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%)",
              }}
            >
              <Shield className="w-6 h-6 mr-3" />
              Claim Your Sovereignty
              <Star className="w-6 h-6 ml-3" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  )
}
