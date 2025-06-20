"use client"
import { motion } from "framer-motion"
import { Crown, Shield, Globe, Zap, TrendingUp, Building, Users, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const imperialFeatures = [
  {
    icon: Crown,
    title: "SUPREME AUTHORITY",
    latin: "Suprema Potestas",
    description: "Exercise sovereign digital authority with imperial command systems",
    href: "/dashboard/authority",
    color: "from-amber-500 to-yellow-600",
  },
  {
    icon: Building,
    title: "QUANTUM COMMERCE",
    latin: "Mercatus Quanticus",
    description: "Holographic marketplace with neural-enhanced transaction processing",
    href: "/dashboard/ecommerex",
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: Globe,
    title: "GLOBAL DOMINION",
    latin: "Imperium Globale",
    description: "Digital citizenship transcending traditional territorial boundaries",
    href: "/citizenship",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Shield,
    title: "LEGAL SOVEREIGNTY",
    latin: "Lex Suprema",
    description: "Diplomatic immunity and admiralty jurisdiction frameworks",
    href: "/legal",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: TrendingUp,
    title: "PROFIT NEXUS",
    latin: "Lucrum Nexus",
    description: "Automated wealth distribution with quantum profit algorithms",
    href: "/dashboard/profit-distribution",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Zap,
    title: "NEURAL BANKING",
    latin: "Pecunia Neuralis",
    description: "AI-powered financial systems with predictive intelligence",
    href: "/dashboard/banking",
    color: "from-orange-500 to-red-600",
  },
]

export default function ImperiumHomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <Crown className="w-20 h-20 text-amber-400 mx-auto mb-6 drop-shadow-2xl" />
            <h1 className="font-imperial text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-purple-400 to-cyan-400 mb-4">
              IMPERIUM SNAPIFI
            </h1>
            <p className="font-imperial text-2xl md:text-3xl text-purple-300 mb-2">Suprema Auctoritas Digitalis</p>
            <p className="font-modern text-lg text-gray-300 max-w-3xl mx-auto">
              Navigate the future with imperial sovereignty. Experience quantum commerce, neural intelligence, and
              global citizenship in the ultimate digital empire.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-bold px-8 py-4 text-lg diamond-clip"
            >
              <Crown className="w-5 h-5 mr-2" />
              ENTER IMPERIUM
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10 font-bold px-8 py-4 text-lg"
            >
              <Shield className="w-5 h-5 mr-2" />
              EXPLORE SOVEREIGNTY
            </Button>
          </motion.div>

          {/* Imperial Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { value: "MCDXLII", label: "Digital Citizens", latin: "Cives Digitales" },
              { value: "LXXIII", label: "Sovereign Realms", latin: "Regna Suprema" },
              { value: "XCVI%", label: "Neural Efficiency", latin: "Efficentia Neuralis" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-black/30 backdrop-blur-sm border border-amber-500/20 rounded-xl"
              >
                <div className="font-imperial text-3xl font-bold text-amber-400 mb-2">{stat.value}</div>
                <div className="font-modern text-white font-medium mb-1">{stat.label}</div>
                <div className="font-imperial text-sm text-purple-300">{stat.latin}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-imperial text-4xl font-bold text-amber-400 mb-4">IMPERIAL DOMINIONS</h2>
            <p className="font-imperial text-xl text-purple-300 mb-2">Regna Digitalia</p>
            <p className="font-modern text-gray-300 max-w-2xl mx-auto">
              Explore the vast territories of our digital empire, each domain engineered for supreme efficiency and
              sovereign control.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {imperialFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group"
              >
                <Link href={feature.href}>
                  <Card className="h-full bg-black/40 backdrop-blur-sm border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 overflow-hidden">
                    <CardContent className="p-8 text-center">
                      <div
                        className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="font-imperial text-xl font-bold text-amber-400 mb-2">{feature.title}</h3>

                      <p className="font-imperial text-sm text-purple-300 mb-4">{feature.latin}</p>

                      <p className="font-modern text-gray-300 text-sm leading-relaxed">{feature.description}</p>

                      <Badge variant="outline" className="mt-4 border-amber-500/30 text-amber-400">
                        ENTER REALM
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-amber-500/10 to-purple-500/10 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-12"
          >
            <Crown className="w-16 h-16 text-amber-400 mx-auto mb-6" />
            <h2 className="font-imperial text-4xl font-bold text-amber-400 mb-4">ASCEND TO SOVEREIGNTY</h2>
            <p className="font-imperial text-xl text-purple-300 mb-6">Ascende ad Supremam</p>
            <p className="font-modern text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join the ranks of digital nobility. Experience the pinnacle of technological sovereignty with
              neural-enhanced systems and quantum-secured authority.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-bold px-8 py-4 diamond-clip"
              >
                <Users className="w-5 h-5 mr-2" />
                BEGIN ASCENSION
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 font-bold px-8 py-4"
              >
                <Lock className="w-5 h-5 mr-2" />
                ACCESS SANCTUM
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
