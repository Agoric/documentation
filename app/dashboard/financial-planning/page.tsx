"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calculator,
  TrendingUp,
  CreditCard,
  PiggyBank,
  Target,
  DollarSign,
  ChevronRight,
  Sparkles,
  Brain,
  Zap,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { useGlobalUnlock } from "@/contexts/global-unlock-context"

const planningTools = [
  {
    id: "budget-calculator",
    title: "Budget Calculator",
    description: "AI-powered budget optimization and expense tracking",
    icon: Calculator,
    href: "/dashboard/financial-planning/budget-calculator",
    color: "from-blue-500 to-cyan-500",
    glowColor: "shadow-blue-500/25",
    status: "active",
  },
  {
    id: "investment-planner",
    title: "Investment Planner",
    description: "Portfolio optimization and investment strategy",
    icon: TrendingUp,
    href: "/dashboard/financial-planning/investment-planner",
    color: "from-green-500 to-emerald-500",
    glowColor: "shadow-green-500/25",
    status: "active",
  },
  {
    id: "debt-manager",
    title: "Debt Manager",
    description: "Strategic debt payoff and consolidation planning",
    icon: CreditCard,
    href: "/dashboard/financial-planning/debt-manager",
    color: "from-red-500 to-pink-500",
    glowColor: "shadow-red-500/25",
    status: "active",
  },
  {
    id: "retirement-simulator",
    title: "Retirement Simulator",
    description: "Retirement planning and savings optimization",
    icon: PiggyBank,
    href: "/dashboard/financial-planning/retirement-simulator",
    color: "from-purple-500 to-violet-500",
    glowColor: "shadow-purple-500/25",
    status: "active",
  },
]

// Holographic Card Component
const HolographicCard = ({
  children,
  className = "",
  variant = "default",
  intensity = "medium",
}: {
  children: React.ReactNode
  className?: string
  variant?: "default" | "priority" | "immediate" | "tool"
  intensity?: "low" | "medium" | "high"
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const getVariantStyles = () => {
    switch (variant) {
      case "priority":
        return "bg-gradient-to-br from-yellow-500/10 via-orange-600/10 to-red-600/10 border-yellow-500/30"
      case "immediate":
        return "bg-gradient-to-br from-green-500/10 via-emerald-600/10 to-cyan-600/10 border-green-500/30"
      case "tool":
        return "bg-gradient-to-br from-purple-500/10 via-blue-600/10 to-cyan-600/10 border-purple-500/30"
      default:
        return "bg-gradient-to-br from-slate-800/50 via-slate-700/30 to-slate-800/50 border-white/10"
    }
  }

  const particleCount = intensity === "high" ? 20 : intensity === "medium" ? 12 : 6

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl ${getVariantStyles()} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent, ${
            variant === "priority" ? "#fbbf24" : variant === "immediate" ? "#10b981" : "#8b5cf6"
          }, transparent)`,
          padding: "1px",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <div className={`w-full h-full rounded-xl ${getVariantStyles()}`} />
      </motion.div>

      {/* Holographic Particles */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(particleCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background:
                  variant === "priority"
                    ? "linear-gradient(45deg, #fbbf24, #f59e0b)"
                    : variant === "immediate"
                      ? "linear-gradient(45deg, #10b981, #059669)"
                      : "linear-gradient(45deg, #8b5cf6, #7c3aed)",
              }}
              initial={{
                x: mousePosition.x,
                y: mousePosition.y,
                opacity: 1,
                scale: 0,
              }}
              animate={{
                x: mousePosition.x + (Math.random() - 0.5) * 200,
                y: mousePosition.y + (Math.random() - 0.5) * 200,
                opacity: 0,
                scale: 1,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      {/* Glow Effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1), transparent 50%)`,
          }}
        />
      )}

      {/* Scan Line Effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-0.5 opacity-50"
        style={{
          background: `linear-gradient(to right, transparent, ${
            variant === "priority" ? "#fbbf24" : variant === "immediate" ? "#10b981" : "#8b5cf6"
          }, transparent)`,
        }}
        animate={{
          y: isHovered ? [0, 300, 0] : 0,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
          ease: "linear",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// Holographic Tool Card Component
const HolographicToolCard = ({ tool }: { tool: (typeof planningTools)[0] }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HolographicCard variant="tool" intensity="high" className="h-full">
        <Card className="bg-transparent border-none shadow-none h-full">
          <CardHeader className="text-center relative">
            {/* Floating Particles around Icon */}
            {isHovered && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
                    animate={{
                      x: [0, Math.cos((i * Math.PI * 2) / 8) * 30],
                      y: [0, Math.sin((i * Math.PI * 2) / 8) * 30],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                  />
                ))}
              </div>
            )}

            <motion.div
              className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${tool.color} flex items-center justify-center mb-4 relative`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Holographic Glow */}
              <motion.div
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${tool.color} opacity-50 blur-lg`}
                animate={{
                  scale: isHovered ? [1, 1.2, 1] : 1,
                  opacity: isHovered ? [0.5, 0.8, 0.5] : 0.5,
                }}
                transition={{
                  duration: 2,
                  repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                }}
              />
              <tool.icon className="h-8 w-8 text-white relative z-10" />
            </motion.div>

            <CardTitle className="text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {tool.title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-400">{tool.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={tool.href}>
              <Button
                className={`w-full bg-gradient-to-r ${tool.color} hover:shadow-lg ${tool.glowColor} transition-all duration-300`}
              >
                <motion.span
                  className="flex items-center justify-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Launch Tool
                  <ChevronRight className="h-4 w-4 ml-2" />
                </motion.span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </HolographicCard>
    </motion.div>
  )
}

export default function FinancialPlanningPage() {
  const { getAllSuggestions } = useGlobalUnlock()
  const allSuggestions = getAllSuggestions()
  const financialSuggestions = allSuggestions.filter((s) => s.category === "financial")

  const prioritySuggestions = financialSuggestions.filter((s) => s.impact === "high").slice(0, 3)
  const immediateSuggestions = financialSuggestions.filter((s) => s.timeframe === "immediate").slice(0, 2)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden">
      {/* Background Holographic Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + i * 15}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3">
            <motion.div
              className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 relative"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 opacity-50 blur-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
              <DollarSign className="h-8 w-8 text-white relative z-10" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Financial Planning Suite
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered financial planning tools to optimize your money management and wealth building
          </p>
        </motion.div>

        {/* Priority Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <HolographicCard variant="priority" intensity="high">
            <Card className="bg-transparent border-none shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Sparkles className="h-5 w-5 text-yellow-400" />
                  </motion.div>
                  Priority Financial Actions
                </CardTitle>
                <CardDescription>High-impact suggestions for immediate financial improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {prioritySuggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <HolographicCard variant="priority" intensity="medium">
                        <Card className="bg-transparent border-none shadow-none h-full">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-sm font-medium">{suggestion.title}</CardTitle>
                              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                High Impact
                              </Badge>
                            </div>
                            <CardDescription className="text-xs">{suggestion.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {suggestion.timeframe}
                              </div>
                              <Button
                                size="sm"
                                className="h-6 text-xs bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                              >
                                <Target className="h-3 w-3 mr-1" />
                                Act Now
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </HolographicCard>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </HolographicCard>
        </motion.div>

        {/* Immediate Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <HolographicCard variant="immediate" intensity="high">
            <Card className="bg-transparent border-none shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Zap className="h-5 w-5 text-green-400" />
                  </motion.div>
                  Immediate Actions Available
                </CardTitle>
                <CardDescription>Quick wins you can implement right now</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {immediateSuggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <HolographicCard variant="immediate" intensity="medium">
                        <Card className="bg-transparent border-none shadow-none h-full">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-sm font-medium">{suggestion.title}</CardTitle>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Ready
                              </Badge>
                            </div>
                            <CardDescription className="text-xs">{suggestion.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <Button
                              size="sm"
                              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            >
                              <Zap className="h-3 w-3 mr-1" />
                              Take Action
                            </Button>
                          </CardContent>
                        </Card>
                      </HolographicCard>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </HolographicCard>
        </motion.div>

        {/* Financial Planning Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <HolographicCard variant="tool" intensity="high">
            <Card className="bg-transparent border-none shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Brain className="h-5 w-5 text-purple-400" />
                  </motion.div>
                  AI-Powered Planning Tools
                </CardTitle>
                <CardDescription>Comprehensive financial planning and optimization suite</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {planningTools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <HolographicToolCard tool={tool} />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </HolographicCard>
        </motion.div>

        {/* Financial Health Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <HolographicCard variant="default" intensity="high">
            <Card className="bg-transparent border-none shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  </motion.div>
                  Financial Health Score
                </CardTitle>
                <CardDescription>AI assessment of your overall financial wellness</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <motion.div
                    className="text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    85
                  </motion.div>
                  <div className="text-lg text-muted-foreground">Excellent Financial Health</div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Emergency Fund", value: 90, color: "bg-green-500" },
                    { label: "Debt Management", value: 75, color: "bg-yellow-500" },
                    { label: "Investment Portfolio", value: 85, color: "bg-blue-500" },
                    { label: "Retirement Planning", value: 80, color: "bg-purple-500" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between text-sm mb-2">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={item.value} className="h-2" />
                        <motion.div
                          className={`absolute top-0 left-0 h-2 rounded-full ${item.color} opacity-50`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </HolographicCard>
        </motion.div>
      </div>
    </div>
  )
}
