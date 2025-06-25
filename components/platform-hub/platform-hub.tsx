"use client"

import { cn } from "@/lib/utils"

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
  Crown,
  Star,
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
      premium: false,
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
      premium: true,
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
      premium: false,
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
      premium: true,
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
      premium: false,
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
      premium: false,
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
      premium: true,
    },
    {
      id: "snap-dax",
      title: "SNAP-DAX Trading",
      description: "Advanced quantum trading platform with neural networks",
      icon: <TrendingUp className="w-6 h-6" />,
      href: "/dashboard/snap-dax",
      variant: "gold-highlight" as const,
      stats: "+24.7% Today",
      gradient: "from-yellow-400 to-yellow-600",
      premium: true,
    },
  ],
  rewards: [
    {
      id: "gamification",
      title: "Honor System",
      description: "Advanced gamification with neural reward algorithms",
      icon: <Trophy className="w-6 h-6" />,
      href: "/dashboard/gamification",
      variant: "gold-highlight" as const,
      stats: "Level 47",
      gradient: "from-yellow-400 to-yellow-600",
      premium: true,
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
      premium: false,
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
      premium: false,
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
      premium: false,
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

        {/* Gold highlight overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,215,0,0.03),transparent_40%)]" />

        {/* Floating Cobalt Blue and Gold Orbs */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, ${
                i % 4 === 0 ? "#ffd700" : i % 4 === 1 ? "#0047AB" : i % 4 === 2 ? "#0066CC" : "#0080FF"
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
            variant="gold-highlight"
            size="lg"
            animated={true}
            glitchEffect={true}
            premium={true}
          />
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-12 bg-black/40 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-2">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-xl transition-all duration-300 text-blue-400 hover:text-yellow-300"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Command
            </TabsTrigger>
            <TabsTrigger
              value="commerce"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-xl transition-all duration-300 text-blue-400 hover:text-yellow-300"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Commerce
            </TabsTrigger>
            <TabsTrigger
              value="rewards"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-black rounded-xl transition-all duration-300 text-yellow-400 hover:text-yellow-300"
            >
              <Crown className="w-4 h-4 mr-2" />
              Honors
            </TabsTrigger>
            <TabsTrigger
              value="legal"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-xl transition-all duration-300 text-blue-400 hover:text-yellow-300"
            >
              <Scale className="w-4 h-4 mr-2" />
              Legal
            </TabsTrigger>
            <TabsTrigger
              value="admin"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-xl transition-all duration-300 text-blue-400 hover:text-yellow-300"
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
                    premium={env.premium}
                  >
                    <div
                      className="h-full flex flex-col"
                      onMouseEnter={() => setHoveredCard(env.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${env.gradient} bg-opacity-20 relative`}>
                          {env.premium && (
                            <Star className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 fill-current" />
                          )}
                          {env.icon}
                        </div>
                        <div className="text-right">
                          <div className={cn("text-xs mb-1", env.premium ? "text-yellow-600" : "text-blue-600")}>
                            {env.premium ? "PREMIUM" : "STATUS"}
                          </div>
                          <div
                            className={cn("text-sm font-semibold", env.premium ? "text-yellow-400" : "text-blue-400")}
                          >
                            {env.stats}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 mb-6">
                        <h3
                          className={cn(
                            "text-xl font-bold mb-3 bg-gradient-to-r bg-clip-text text-transparent",
                            env.premium ? "from-yellow-400 to-yellow-200" : "from-blue-400 to-blue-200",
                          )}
                        >
                          {env.title}
                        </h3>
                        <p className={cn("text-sm leading-relaxed", env.premium ? "text-yellow-200" : "text-blue-200")}>
                          {env.description}
                        </p>
                      </div>

                      {/* Action Button */}
                      <QuantumButton
                        variant={env.variant === "glass" ? "secondary" : env.premium ? "gold-highlight" : "primary"}
                        size="md"
                        className="w-full"
                        onClick={() => (window.location.href = env.href)}
                        icon={env.premium ? <Crown className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                        premium={env.premium}
                      >
                        {env.premium ? "Launch Premium" : "Launch Environment"}
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
              <div className="flex items-center gap-2">
                <Crown className="w-3 h-3 text-yellow-400" />
                <span className="text-yellow-300">PREMIUM</span>
              </div>
            </div>
          </FuturisticCard>
        </motion.div>
      </div>
    </div>
  )
}
