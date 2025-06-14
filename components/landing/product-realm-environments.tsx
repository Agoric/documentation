"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Building2, TrendingUp, Zap, Globe, Brain, Coins, Store, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function ProductRealmEnvironments() {
  const [activeRealm, setActiveRealm] = useState(0)
  const router = useRouter()

  const realms = [
    {
      id: "snap-dax",
      name: "SnapDAX",
      title: "Digital Asset Exchange",
      description:
        "Revolutionary tokenization platform for real-world assets with AI-powered trading algorithms and quantum-secured transactions.",
      icon: <Coins className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-600",
      bgColor: "from-yellow-900/20 to-orange-900/20",
      borderColor: "border-yellow-500/30",
      features: [
        "Real-World Asset Tokenization",
        "AI Trading Algorithms",
        "Quantum Security",
        "Global Liquidity Pools",
      ],
      stats: { users: "2.3M+", volume: "$847B", assets: "12,500+" },
      route: "/dashboard/snap-dax",
    },
    {
      id: "ecommerex",
      name: "EcommerEX",
      title: "E-Commerce Ecosystem",
      description:
        "Next-generation e-commerce platform with holographic product displays, AI inventory management, and seamless multi-platform integration.",
      icon: <Store className="w-8 h-8" />,
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-900/20 to-emerald-900/20",
      borderColor: "border-green-500/30",
      features: [
        "Holographic Product Display",
        "AI Inventory Forecasting",
        "Multi-Platform Integration",
        "Smart Contract Payments",
      ],
      stats: { merchants: "156K+", products: "2.8M", sales: "$1.2B" },
      route: "/dashboard/ecommerex",
    },
    {
      id: "snapifi",
      name: "SnapiFi",
      title: "Personal Finance AI",
      description:
        "Intelligent personal finance management with holographic data visualization, predictive analytics, and automated wealth optimization.",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-900/20 to-cyan-900/20",
      borderColor: "border-blue-500/30",
      features: [
        "Holographic Financial Dashboards",
        "Predictive Wealth Analytics",
        "Automated Optimization",
        "Real Estate Strategy AI",
      ],
      stats: { users: "3.7M+", managed: "$12.4B", returns: "23.7%" },
      route: "/dashboard/snapifi",
    },
    {
      id: "banking",
      name: "Imperial Banking",
      title: "Sovereign Banking Suite",
      description:
        "Premium banking services with quantum-secured vaults, AI-powered credit analysis, and global transaction capabilities.",
      icon: <Building2 className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-600",
      bgColor: "from-purple-900/20 to-indigo-900/20",
      borderColor: "border-purple-500/30",
      features: ["Quantum-Secured Vaults", "AI Credit Analysis", "Global Wire Transfers", "Premium Account Services"],
      stats: { deposits: "$45.2B", loans: "$23.8B", branches: "847" },
      route: "/dashboard/banking",
    },
    {
      id: "global-citizen",
      name: "Global Citizen",
      title: "Digital Citizenship Platform",
      description:
        "Revolutionary digital citizenship program with biometric verification, humanitarian impact tracking, and global economic rights.",
      icon: <Globe className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-600",
      bgColor: "from-emerald-900/20 to-teal-900/20",
      borderColor: "border-emerald-500/30",
      features: [
        "Biometric Identity Verification",
        "Humanitarian Impact Tracking",
        "Global Economic Rights",
        "Digital Passport System",
      ],
      stats: { citizens: "1.8M+", countries: "156", impact: "$2.3B" },
      route: "/dashboard/global-citizen",
    },
    {
      id: "ai-concierge",
      name: "AI Concierge",
      title: "Intelligent Assistant Network",
      description:
        "Advanced AI concierge services with natural language processing, predictive assistance, and personalized financial guidance.",
      icon: <Brain className="w-8 h-8" />,
      color: "from-pink-500 to-rose-600",
      bgColor: "from-pink-900/20 to-rose-900/20",
      borderColor: "border-pink-500/30",
      features: ["Natural Language Processing", "Predictive Assistance", "Personalized Guidance", "24/7 AI Support"],
      stats: { interactions: "847M+", satisfaction: "98.7%", languages: "127" },
      route: "/dashboard/ai-concierge",
    },
  ]

  const handleExploreRealm = (route: string) => {
    router.push(route)
  }

  return (
    <section id="product-demo" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-cyan-500 rounded-full filter blur-[100px] opacity-10 animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-500 rounded-full filter blur-[100px] opacity-10 animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center">
              <Crown className="w-8 h-8 text-cyan-400" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Product </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-500">
              Realm Environments
            </span>
          </h2>

          <p className="text-cyan-100/80 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Explore our comprehensive suite of{" "}
            <strong className="text-cyan-300">revolutionary financial products</strong> designed to serve humanity while
            advancing global economic prosperity. Each realm represents a breakthrough in financial technology.
          </p>
        </motion.div>

        {/* Realm Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {realms.map((realm, index) => (
            <button
              key={realm.id}
              onClick={() => setActiveRealm(index)}
              className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                activeRealm === index
                  ? `bg-gradient-to-r ${realm.color} text-white border-transparent`
                  : `bg-gradient-to-br ${realm.bgColor} backdrop-blur-sm ${realm.borderColor} text-cyan-300 hover:text-cyan-100`
              }`}
            >
              <div className="flex items-center gap-2">
                {realm.icon}
                <span className="font-semibold">{realm.name}</span>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Active Realm Display */}
        <motion.div
          key={activeRealm}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${realms[activeRealm].bgColor} backdrop-blur-sm border ${realms[activeRealm].borderColor}`}
            />

            <div className="relative p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div>
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${realms[activeRealm].color} flex items-center justify-center mr-4`}
                    >
                      {realms[activeRealm].icon}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-1">{realms[activeRealm].name}</h3>
                      <p className="text-cyan-300 text-lg">{realms[activeRealm].title}</p>
                    </div>
                  </div>

                  <p className="text-cyan-100/90 text-lg leading-relaxed mb-8">{realms[activeRealm].description}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {realms[activeRealm].features.map((feature, index) => (
                      <div
                        key={index}
                        className={`bg-gradient-to-br ${realms[activeRealm].bgColor} backdrop-blur-sm border ${realms[activeRealm].borderColor} rounded-lg p-3`}
                      >
                        <div className="text-cyan-300 font-semibold text-sm">{feature}</div>
                      </div>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    onClick={() => handleExploreRealm(realms[activeRealm].route)}
                    className={`bg-gradient-to-r ${realms[activeRealm].color} hover:opacity-90 text-white border-none relative overflow-hidden group px-8 py-4 text-lg`}
                  >
                    <span className="relative z-10 flex items-center">
                      Explore {realms[activeRealm].name} <Zap className="ml-2 h-5 w-5" />
                    </span>
                  </Button>
                </div>

                {/* Stats */}
                <div className="space-y-6">
                  <h4 className="text-2xl font-bold text-white mb-6">Platform Statistics</h4>
                  {Object.entries(realms[activeRealm].stats).map(([key, value], index) => (
                    <div
                      key={key}
                      className={`bg-gradient-to-br ${realms[activeRealm].bgColor} backdrop-blur-sm border ${realms[activeRealm].borderColor} rounded-xl p-6`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-cyan-300 font-semibold capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                        <div className="text-2xl font-bold text-white">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Glow Effect */}
            <div
              className={`absolute -inset-1 bg-gradient-to-br ${realms[activeRealm].color} opacity-20 rounded-3xl blur-xl`}
            />
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-cyan-100/80 text-lg mb-6">Ready to experience the future of finance across all realms?</p>
          <Button
            size="lg"
            onClick={() => router.push("/dashboard/snap-dax/onboarding")}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-none relative overflow-hidden group px-8 py-4 text-lg"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
            <span className="relative z-10 flex items-center">
              Start Your Journey <Crown className="ml-2 h-5 w-5" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
