"use client"
import { motion } from "framer-motion"
import { Crown, Shield, Gem, CrownIcon as Scepter, Star, Zap, Globe, Lock } from "lucide-react"
import { FuturisticCard } from "@/components/ui/futuristic-card"

export function RoyalFeatures() {
  const features = [
    {
      icon: Crown,
      title: "Royal Dashboard",
      description: "Command your financial empire from a throne-worthy interface designed for royalty.",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      icon: Scepter,
      title: "Supreme Authority",
      description: "Wield absolute power over your investments with advanced trading algorithms.",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: Shield,
      title: "Royal Guard Security",
      description: "Fort Knox-level protection with quantum encryption and biometric authentication.",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Gem,
      title: "Precious Asset Management",
      description: "Manage diamonds, gold, crypto, and rare collectibles in your royal treasury.",
      color: "from-emerald-400 to-emerald-600",
    },
    {
      icon: Star,
      title: "VIP Concierge",
      description: "24/7 royal treatment with dedicated wealth advisors and priority support.",
      color: "from-pink-400 to-pink-600",
    },
    {
      icon: Zap,
      title: "Lightning Execution",
      description: "Execute trades at the speed of light with our quantum-powered infrastructure.",
      color: "from-orange-400 to-orange-600",
    },
    {
      icon: Globe,
      title: "Global Dominion",
      description: "Rule markets across 150+ countries with multi-currency royal accounts.",
      color: "from-cyan-400 to-cyan-600",
    },
    {
      icon: Lock,
      title: "Royal Vault",
      description: "Store your wealth in impenetrable digital vaults with military-grade security.",
      color: "from-red-400 to-red-600",
    },
  ]

  return (
    <section id="features" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              Royal Features
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Experience the pinnacle of financial technology with features crafted for digital royalty
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FuturisticCard
                variant="glass"
                className="h-full group cursor-pointer"
                glow={true}
                animated={true}
                interactive={true}
              >
                <div className="text-center space-y-4">
                  {/* Icon with Gradient Background */}
                  <div
                    className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.color} p-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-full h-full text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>

                  {/* Hover Effect Line */}
                  <motion.div
                    className="h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </FuturisticCard>
            </motion.div>
          ))}
        </div>

        {/* Royal Showcase */}
        <motion.div
          className="mt-32 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <FuturisticCard variant="hologram" className="max-w-4xl mx-auto p-12">
            <Crown className="text-yellow-400 mx-auto mb-6" size={64} />
            <h3 className="text-3xl font-bold text-white mb-4">Join the Financial Aristocracy</h3>
            <p className="text-slate-300 text-lg mb-8">
              Elevate your status from commoner to financial royalty with exclusive access to premium features,
              personalized service, and unmatched prestige.
            </p>
            <div className="flex justify-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">👑</div>
                <div className="text-sm text-slate-400">Royal Status</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">💎</div>
                <div className="text-sm text-slate-400">Premium Assets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">🛡️</div>
                <div className="text-sm text-slate-400">Elite Security</div>
              </div>
            </div>
          </FuturisticCard>
        </motion.div>
      </div>
    </section>
  )
}
