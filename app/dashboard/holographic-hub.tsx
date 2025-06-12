"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Crown, Coins, Wallet, ShoppingCart, Brain, ArrowRight, Sparkles, Shield, Gem } from "lucide-react"
import { cn } from "@/lib/utils"
import { ImperialDesignSystem, getImperialGradient } from "@/lib/imperial-design-system"
import { ImperialDiamondCard } from "@/components/ui/imperial-diamond-card"

// Imperial dashboard categories
const imperialDashboardCategories = [
  {
    id: "snapifi",
    name: "Snapifi Treasury",
    description: "Personal wealth management and imperial insights",
    icon: <Coins className="h-6 w-6" />,
    variant: "gold" as const,
    rank: "consul" as const,
    dashboards: [
      {
        id: "snapifi-main",
        name: "Treasury Overview",
        description: "Complete financial dominion",
        href: "/dashboard/snapifi",
      },
      {
        id: "snapifi-real-estate",
        name: "Real Estate Empire",
        description: "Property investment sovereignty",
        href: "/dashboard/snapifi/real-estate-strategy",
      },
      {
        id: "snapifi-financial-goals",
        name: "Imperial Objectives",
        description: "Track and conquer financial goals",
        href: "/dashboard/snapifi/financial-goals",
      },
      {
        id: "snapifi-wellness",
        name: "Wellness Sanctuary",
        description: "Financial wellness and behavioral mastery",
        href: "/dashboard/snapifi/wellness",
      },
    ],
  },
  {
    id: "banking",
    name: "Imperial Banking",
    description: "Sovereign banking services and royal accounts",
    icon: <Shield className="h-6 w-6" />,
    variant: "purple" as const,
    rank: "consul" as const,
    dashboards: [
      {
        id: "banking-main",
        name: "Banking Citadel",
        description: "Manage accounts, transactions, and imperial goals",
        href: "/dashboard/banking",
      },
    ],
  },
  {
    id: "dax",
    name: "Digital Asset Exchange",
    description: "Cryptocurrency and digital asset dominion",
    icon: <Gem className="h-6 w-6" />,
    variant: "bronze" as const,
    rank: "senator" as const,
    dashboards: [
      {
        id: "dax-main",
        name: "DAX Colosseum",
        description: "Digital asset trading and portfolio mastery",
        href: "/dashboard/dax",
      },
    ],
  },
  {
    id: "snap-dax",
    name: "SNAP-DAX Elite",
    description: "Advanced digital asset imperial platform",
    icon: <Wallet className="h-6 w-6" />,
    variant: "gold" as const,
    rank: "emperor" as const,
    dashboards: [
      {
        id: "snap-dax-main",
        name: "Elite Command",
        description: "Advanced digital asset supremacy",
        href: "/dashboard/snap-dax",
      },
      {
        id: "snap-dax-onboarding",
        name: "Coronation Ceremony",
        description: "Interactive imperial onboarding",
        href: "/dashboard/snap-dax/onboarding",
      },
    ],
  },
  {
    id: "ecommerex",
    name: "ECommereX Empire",
    description: "E-commerce platform imperial management",
    icon: <ShoppingCart className="h-6 w-6" />,
    variant: "purple" as const,
    rank: "consul" as const,
    dashboards: [
      {
        id: "ecommerex-flagship",
        name: "Flagship Citadel",
        description: "Centralized catalog supremacy",
        href: "/dashboard/ecommerex/flagship-hub",
      },
      {
        id: "ecommerex-inventory",
        name: "Inventory Oracle",
        description: "AI-powered inventory prophecies",
        href: "/dashboard/ecommerex/inventory-forecasting",
      },
      {
        id: "ecommerex-platform",
        name: "Platform Dominion",
        description: "Manage platform integrations",
        href: "/dashboard/ecommerex/platform-directory",
      },
      {
        id: "ecommerex-product-detail",
        name: "Product Sanctum",
        description: "Holographic product visualization",
        href: "/dashboard/ecommerex/product-detail",
      },
      {
        id: "ecommerex-holographic-products",
        name: "Holographic Showcase",
        description: "Interactive 3D product imperial display",
        href: "/dashboard/ecommerex/holographic-products",
      },
    ],
  },
  {
    id: "ai-concierge",
    name: "AI Oracle",
    description: "AI-powered financial divine intelligence",
    icon: <Brain className="h-6 w-6" />,
    variant: "gold" as const,
    rank: "emperor" as const,
    dashboards: [
      {
        id: "ai-concierge-main",
        name: "Oracle Chamber",
        description: "Your divine financial AI intelligence",
        href: "/dashboard/ai-concierge",
      },
    ],
  },
]

export function HolographicHub() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [hoveredDashboard, setHoveredDashboard] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Track mouse position for imperial lighting effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col gap-8 p-8"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(251, 191, 36, 0.1), transparent 70%),
          ${ImperialDesignSystem.patterns.imperial}
        `,
      }}
    >
      {/* Imperial Header */}
      <div className="flex flex-col gap-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <Crown
            className="h-8 w-8"
            style={{
              color: ImperialDesignSystem.colors.imperial.gold[400],
              filter: `drop-shadow(${ImperialDesignSystem.effects.glow.gold})`,
            }}
          />
          <h1
            className="text-4xl font-bold tracking-tight"
            style={{
              fontFamily: ImperialDesignSystem.typography.imperial.display,
              color: ImperialDesignSystem.colors.imperial.gold[200],
              textShadow: ImperialDesignSystem.effects.glow.gold,
            }}
          >
            Imperial Dashboard Dominion
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg"
          style={{
            color: ImperialDesignSystem.colors.imperial.gold[300],
            fontFamily: ImperialDesignSystem.typography.imperial.body,
          }}
        >
          Command all your financial empires from this sovereign control center
        </motion.p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10">
        {imperialDashboardCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ImperialDiamondCard
              title={category.name}
              subtitle={category.description}
              icon={category.icon}
              variant={category.variant}
              rank={category.rank}
              defaultExpanded={false}
              className="h-full"
            >
              <div className="space-y-3">
                {category.dashboards.map((dashboard) => (
                  <Link
                    key={dashboard.id}
                    href={dashboard.href}
                    className="group relative block"
                    onMouseEnter={() => setHoveredDashboard(dashboard.id)}
                    onMouseLeave={() => setHoveredDashboard(null)}
                  >
                    <motion.div
                      className={cn(
                        "relative rounded-lg p-4 transition-all duration-300 overflow-hidden",
                        hoveredDashboard === dashboard.id && "scale-105",
                      )}
                      style={{
                        background:
                          hoveredDashboard === dashboard.id
                            ? getImperialGradient(category.variant)
                            : `${getImperialGradient(category.variant)}40`,
                        border: `1px solid ${ImperialDesignSystem.colors.imperial[category.variant][400]}${hoveredDashboard === dashboard.id ? "80" : "40"}`,
                        boxShadow:
                          hoveredDashboard === dashboard.id
                            ? `0 0 20px ${ImperialDesignSystem.colors.imperial[category.variant][500]}60`
                            : "none",
                      }}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Imperial ornate overlay */}
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: ImperialDesignSystem.patterns.ornate,
                        }}
                      />

                      <div className="relative flex items-center justify-between">
                        <div className="flex-1">
                          <h3
                            className="font-semibold text-lg mb-1"
                            style={{
                              fontFamily: ImperialDesignSystem.typography.imperial.heading,
                              color: ImperialDesignSystem.colors.imperial[category.variant][100],
                              textShadow: `0 0 8px ${ImperialDesignSystem.colors.imperial[category.variant][500]}60`,
                            }}
                          >
                            {dashboard.name}
                          </h3>
                          <p
                            className="text-sm opacity-90"
                            style={{
                              color: ImperialDesignSystem.colors.imperial[category.variant][300],
                            }}
                          >
                            {dashboard.description}
                          </p>
                        </div>
                        <motion.div
                          animate={{
                            x: hoveredDashboard === dashboard.id ? 5 : 0,
                            opacity: hoveredDashboard === dashboard.id ? 1 : 0.7,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight
                            className="h-5 w-5"
                            style={{
                              color: ImperialDesignSystem.colors.imperial[category.variant][300],
                            }}
                          />
                        </motion.div>
                      </div>

                      {/* Imperial shimmer effect */}
                      {hoveredDashboard === dashboard.id && (
                        <motion.div
                          className="absolute inset-0 opacity-30"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                          style={{
                            background: `linear-gradient(90deg, transparent, ${ImperialDesignSystem.colors.imperial[category.variant][400]}60, transparent)`,
                          }}
                        />
                      )}
                    </motion.div>
                  </Link>
                ))}
              </div>
            </ImperialDiamondCard>
          </motion.div>
        ))}
      </div>

      {/* Imperial footer ornament */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex justify-center mt-8"
      >
        <div
          className="flex items-center gap-2 px-6 py-3 rounded-full"
          style={{
            background: getImperialGradient("gold"),
            border: `1px solid ${ImperialDesignSystem.colors.imperial.gold[400]}60`,
            boxShadow: ImperialDesignSystem.effects.glow.gold,
          }}
        >
          <Sparkles className="h-4 w-4" style={{ color: ImperialDesignSystem.colors.imperial.gold[300] }} />
          <span
            className="text-sm font-medium"
            style={{
              color: ImperialDesignSystem.colors.imperial.gold[200],
              fontFamily: ImperialDesignSystem.typography.imperial.body,
            }}
          >
            Imperial Financial Sovereignty Achieved
          </span>
          <Sparkles className="h-4 w-4" style={{ color: ImperialDesignSystem.colors.imperial.gold[300] }} />
        </div>
      </motion.div>
    </div>
  )
}
