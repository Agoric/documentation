"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, CreditCard, LineChart, Wallet, ShoppingCart, Brain, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Dashboard category definition
const dashboardCategories = [
  {
    id: "snapifi",
    name: "Snapifi",
    description: "Personal financial management and insights",
    icon: <Sparkles className="h-6 w-6" />,
    color: "from-violet-500/80 to-indigo-600/80",
    textColor: "text-indigo-100",
    dashboards: [
      {
        id: "snapifi-main",
        name: "Overview",
        description: "Complete financial overview",
        href: "/dashboard/snapifi",
      },
      {
        id: "snapifi-real-estate",
        name: "Real Estate Strategy",
        description: "Property investment analysis",
        href: "/dashboard/snapifi/real-estate-strategy",
      },
      {
        id: "snapifi-financial-goals",
        name: "Financial Goals",
        description: "Track and manage your financial goals",
        href: "/dashboard/snapifi/financial-goals",
      },
      {
        id: "snapifi-wellness",
        name: "Wellness",
        description: "Financial wellness and behavioral insights",
        href: "/dashboard/snapifi/wellness",
      },
    ],
  },
  {
    id: "banking",
    name: "Banking",
    description: "Traditional banking services and accounts",
    icon: <CreditCard className="h-6 w-6" />,
    color: "from-emerald-500/80 to-teal-600/80",
    textColor: "text-emerald-100",
    dashboards: [
      {
        id: "banking-main",
        name: "Banking Dashboard",
        description: "Manage accounts, transactions, and goals",
        href: "/dashboard/banking",
      },
    ],
  },
  {
    id: "dax",
    name: "Digital Asset Exchange",
    description: "Cryptocurrency and digital asset trading",
    icon: <LineChart className="h-6 w-6" />,
    color: "from-blue-500/80 to-cyan-600/80",
    textColor: "text-blue-100",
    dashboards: [
      {
        id: "dax-main",
        name: "DAX Dashboard",
        description: "Digital asset trading and portfolio",
        href: "/dashboard/dax",
      },
    ],
  },
  {
    id: "snap-dax",
    name: "Snap DAX",
    description: "Advanced digital asset platform",
    icon: <Wallet className="h-6 w-6" />,
    color: "from-purple-500/80 to-pink-600/80",
    textColor: "text-purple-100",
    dashboards: [
      {
        id: "snap-dax-main",
        name: "Overview",
        description: "Advanced digital asset management",
        href: "/dashboard/snap-dax",
      },
      {
        id: "snap-dax-onboarding",
        name: "Onboarding",
        description: "Interactive onboarding experience",
        href: "/dashboard/snap-dax/onboarding",
      },
    ],
  },
  {
    id: "ecommerex",
    name: "ECommereX",
    description: "E-commerce platform management",
    icon: <ShoppingCart className="h-6 w-6" />,
    color: "from-amber-500/80 to-orange-600/80",
    textColor: "text-amber-100",
    dashboards: [
      {
        id: "ecommerex-flagship",
        name: "Flagship Hub",
        description: "Centralized catalog management",
        href: "/dashboard/ecommerex/flagship-hub",
      },
      {
        id: "ecommerex-inventory",
        name: "Inventory Forecasting",
        description: "AI-powered inventory predictions",
        href: "/dashboard/ecommerex/inventory-forecasting",
      },
      {
        id: "ecommerex-platform",
        name: "Platform Directory",
        description: "Manage platform integrations",
        href: "/dashboard/ecommerex/platform-directory",
      },
      {
        id: "ecommerex-product-detail",
        name: "Product Detail",
        description: "Holographic product visualization",
        href: "/dashboard/ecommerex/product-detail",
      },
      {
        id: "ecommerex-holographic-products",
        name: "Holographic Products",
        description: "Interactive 3D product showcase",
        href: "/dashboard/ecommerex/holographic-products",
      },
    ],
  },
  {
    id: "ai-concierge",
    name: "AI Concierge",
    description: "AI-powered financial assistant",
    icon: <Brain className="h-6 w-6" />,
    color: "from-rose-500/80 to-red-600/80",
    textColor: "text-rose-100",
    dashboards: [
      {
        id: "ai-concierge-main",
        name: "AI Concierge",
        description: "Your personal financial AI assistant",
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

  // Track mouse position for lighting effects
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
    <div ref={containerRef} className="relative flex flex-col gap-8 p-6 md:p-8">
      {/* Dynamic lighting effect */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(129, 140, 248, 0.4), transparent 70%)`,
        }}
      />

      <div className="flex flex-col gap-2 relative z-10">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Hub</h1>
        <p className="text-muted-foreground">Access all your financial dashboards in one place</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 relative z-10">
        {dashboardCategories.map((category) => (
          <motion.div
            key={category.id}
            className="relative overflow-hidden rounded-xl backdrop-blur-md"
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            {/* Glass card effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-950/60 border border-indigo-500/20 rounded-xl" />

            {/* Holographic grid overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(123, 97, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 97, 255, 0.3) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Edge glow effect */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                boxShadow:
                  hoveredCategory === category.id
                    ? `inset 0 0 30px rgba(129, 140, 248, 0.7)`
                    : `inset 0 0 20px rgba(129, 140, 248, 0.5)`,
                transition: "box-shadow 0.3s ease",
              }}
            />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-indigo-400 opacity-70"
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    opacity: Math.random() * 0.5 + 0.3,
                  }}
                  animate={{
                    x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                    y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                    opacity: [Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.3],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 p-6">
              {/* Category header */}
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${category.color} ${category.textColor}`}
                >
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{category.name}</h2>
                  <p className="text-sm text-indigo-200">{category.description}</p>
                </div>
              </div>

              {/* Dashboards list */}
              <div className="space-y-3">
                {category.dashboards.map((dashboard) => (
                  <Link
                    key={dashboard.id}
                    href={dashboard.href}
                    className="group relative block"
                    onMouseEnter={() => setHoveredDashboard(dashboard.id)}
                    onMouseLeave={() => setHoveredDashboard(null)}
                  >
                    {/* Glass button effect */}
                    <div
                      className={cn(
                        "absolute inset-0 rounded-lg transition-all duration-300",
                        hoveredDashboard === dashboard.id
                          ? "bg-gradient-to-r from-indigo-600/40 to-purple-600/40 border border-indigo-400/30"
                          : "bg-indigo-950/30 border border-indigo-500/20",
                      )}
                    />

                    {/* Glass reflection effect */}
                    <div
                      className="absolute inset-0 rounded-lg opacity-30"
                      style={{
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 80%)",
                      }}
                    />

                    <div className="relative flex items-center justify-between p-3">
                      <div>
                        <h3 className="font-medium text-white">{dashboard.name}</h3>
                        <p className="text-sm text-indigo-200">{dashboard.description}</p>
                      </div>
                      <ArrowRight
                        className={cn(
                          "h-5 w-5 transition-all duration-300",
                          hoveredDashboard === dashboard.id ? "opacity-100 text-white" : "opacity-0",
                        )}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
