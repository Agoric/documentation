"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  Wallet,
  Target,
  ShoppingBag,
  Building2,
  Trophy,
  Scale,
  Settings,
  Sparkles,
  Zap,
  Brain,
  Rocket,
  Globe,
  Shield,
} from "lucide-react"
import { FuturisticCard } from "@/components/ui/futuristic-card"
import { NeuralGrid } from "@/components/ui/neural-grid"
import { QuantumButton } from "@/components/ui/quantum-button"
import { HolographicHeader } from "@/components/ui/holographic-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDemoContext } from "@/contexts/demo-context"

const platformEnvironments = {
  dashboard: [
    {
      id: "home",
      title: "Command Center",
      description: "Your personal financial command center with AI insights",
      icon: <Brain className="w-6 h-6" />,
      href: "/dashboard/home",
      variant: "hologram" as const,
      stats: "12 Active Goals",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      id: "analytics",
      title: "Neural Analytics",
      description: "AI-powered insights and predictive modeling",
      icon: <BarChart3 className="w-6 h-6" />,
      href: "/dashboard/analytics",
      variant: "quantum" as const,
      stats: "98.7% Accuracy",
      gradient: "from-blue-300 to-blue-500",
    },
    {
      id: "portfolio",
      title: "Quantum Portfolio",
      description: "Multi-dimensional asset management system",
      icon: <Wallet className="w-6 h-6" />,
      href: "/dashboard/portfolio",
      variant: "plasma" as const,
      stats: "$2.4M Managed",
      gradient: "from-blue-500 to-blue-700",
    },
    {
      id: "planning",
      title: "Future Planning",
      description: "AI-driven financial planning and goal optimization",
      icon: <Target className="w-6 h-6" />,
      href: "/dashboard/financial-planning",
      variant: "glass" as const,
      stats: "15 Year Horizon",
      gradient: "from-blue-200 to-blue-400",
    },
  ],
  commerce: [
    {
      id: "ecommerex",
      title: "EcommereX Nexus",
      description: "Holographic marketplace with quantum product visualization",
      icon: <ShoppingBag className="w-6 h-6" />,
      href: "/dashboard/ecommerex/holographic-products",
      variant: "hologram" as const,
      stats: "1.2K Products",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      id: "marketplace",
      title: "Commerce Hub",
      description: "Advanced marketplace analytics and vendor management",
      icon: <Globe className="w-6 h-6" />,
      href: "/commerce/marketplace",
      variant: "neon" as const,
      stats: "847 Vendors",
      gradient: "from-blue-300 to-blue-500",
    },
    {
      id: "real-estate",
      title: "Reality Estate",
      description: "50-year loan marketplace with holographic property tours",
      icon: <Building2 className="w-6 h-6" />,
      href: "/real-estate",
      variant: "neural" as const,
      stats: "2.1K Properties",
      gradient: "from-blue-500 to-blue-700",
    },
    {
      id: "snap-dax",
      title: "SNAP-DAX Trading",
      description: "Advanced quantum trading platform with neural networks",
      icon: <TrendingUp className="w-6 h-6" />,
      href: "/dashboard/snap-dax",
      variant: "neon" as const,
      stats: "+24.7% Today",
      gradient: "from-blue-400 to-blue-600",
    },
  ],
  rewards: [
    {
      id: "gamification",
      title: "Honor System",
      description: "Advanced gamification with neural reward algorithms",
      icon: <Trophy className="w-6 h-6" />,
      href: "/dashboard/gamification",
      variant: "plasma" as const,
      stats: "Level 47",
      gradient: "from-blue-400 to-blue-600",
    },
  ],
  legal: [
    {
      id: "framework",
      title: "Legal Matrix",
      description: "Digital domicile and diplomatic immunity framework",
      icon: <Scale className="w-6 h-6" />,
      href: "/legal",
      variant: "quantum" as const,
      stats: "100% Compliant",
      gradient: "from-blue-300 to-blue-500",
    },
    {
      id: "compliance",
      title: "Compliance Shield",
      description: "Advanced regulatory compliance and risk management",
      icon: <Shield className="w-6 h-6" />,
      href: "/legal/compliance",
      variant: "glass" as const,
      stats: "Zero Violations",
      gradient: "from-blue-200 to-blue-400",
    },
  ],
  admin: [
    {
      id: "system",
      title: "System Core",
      description: "Advanced system administration and quantum monitoring",
      icon: <Settings className="w-6 h-6" />,
      href: "/admin/dashboard",
      variant: "neural" as const,
      stats: "99.9% Uptime",
      gradient: "from-blue-500 to-blue-700",
    },
  ],
}

export function PlatformHub() {
  const { isDemoMode } = useDemoContext()
  const [activeTab, setActiveTab] = React.useState("dashboard")
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,71,171,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent,rgba(0,71,171,0.05),transparent)]" />

        {/* Floating Cobalt Blue Orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? "#0047AB" : i % 3 === 1 ? "#0066CC" : "#0080FF"
              }, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-16">
          <HolographicHeader
            title="SNAPIFI NEXUS"
            subtitle="Next-Generation Financial Platform"
            description="Experience the future of finance with quantum computing, neural networks, and holographic interfaces"
            variant="rainbow"
            size="lg"
            animated={true}
            glitchEffect={true}
          />
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-12 bg-black/40 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-2">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-xl transition-all duration-300 text-blue-400"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Command
            </TabsTrigger>
            <TabsTrigger
              value="commerce"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-xl transition-all duration-300 text-blue-400"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Commerce
            </TabsTrigger>
            <TabsTrigger
              value="rewards"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-xl transition-all duration-300 text-blue-400"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Honors
            </TabsTrigger>
            <TabsTrigger
              value="legal"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-xl transition-all duration-300 text-blue-400"
            >
              <Scale className="w-4 h-4 mr-2" />
              Legal
            </TabsTrigger>
            <TabsTrigger
              value="admin"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-xl transition-all duration-300 text-blue-400"
            >
              <Settings className="w-4 h-4 mr-2" />
              System
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          {Object.entries(platformEnvironments).map(([category, environments]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <NeuralGrid columns={environments.length >= 4 ? 3 : environments.length} gap="lg">
                {environments.map((env, index) => (
                  <FuturisticCard
                    key={env.id}
                    variant={env.variant}
                    className="h-full"
                    glow={hoveredCard === env.id}
                    animated={true}
                    interactive={true}
                    borderAnimation={true}
                    particleEffect={hoveredCard === env.id}
                  >
                    <div
                      className="h-full flex flex-col"
                      onMouseEnter={() => setHoveredCard(env.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${env.gradient} bg-opacity-20`}>
                          {env.icon}
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-blue-600 mb-1">STATUS</div>
                          <div className="text-sm font-semibold text-blue-400">{env.stats}</div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 mb-6">
                        <h3 className="text-xl font-bold text-blue-400 mb-3 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                          {env.title}
                        </h3>
                        <p className="text-blue-200 text-sm leading-relaxed">{env.description}</p>
                      </div>

                      {/* Action Button */}
                      <QuantumButton
                        variant={env.variant === "glass" ? "secondary" : "primary"}
                        size="md"
                        className="w-full"
                        onClick={() => (window.location.href = env.href)}
                        icon={<Sparkles className="w-4 h-4" />}
                      >
                        Launch Environment
                      </QuantumButton>
                    </div>
                  </FuturisticCard>
                ))}
              </NeuralGrid>
            </TabsContent>
          ))}
        </Tabs>

        {/* Demo Mode Indicator */}
        {isDemoMode && (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <FuturisticCard variant="neon" className="px-4 py-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-blue-400 font-medium">DEMO MODE ACTIVE</span>
              </div>
            </FuturisticCard>
          </motion.div>
        )}

        {/* Quantum Status Bar */}
        <motion.div
          className="fixed top-6 right-6 z-40"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <FuturisticCard variant="glass" className="px-4 py-2">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-blue-400" />
                <span className="text-blue-300">QUANTUM: ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-3 h-3 text-blue-400" />
                <span className="text-blue-300">AI: ACTIVE</span>
              </div>
            </div>
          </FuturisticCard>
        </motion.div>
      </div>
    </div>
  )
}
