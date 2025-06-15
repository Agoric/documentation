"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  ChevronRight,
  Crown,
  Shield,
  Zap,
  Brain,
  TrendingUp,
  Settings,
  Maximize2,
  Minimize2,
  Target,
  Compass,
  Star,
  Diamond,
  Gem,
  Trophy,
  Eye,
  ArrowRight,
  Lightbulb,
  Navigation,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { PersistentGCIProfileCard } from "@/components/global-citizen/persistent-gci-profile-card"
import { HolographicUnifiedSidebar } from "@/components/layout/holographic-unified-sidebar"
import { ImperialAmbientController } from "@/components/ui/imperial-ambient-controller"

interface BreadcrumbItem {
  label: string
  href: string
  icon?: React.ReactNode
  isActive?: boolean
}

interface GuidancePrompt {
  id: string
  title: string
  description: string
  action?: string
  position: "top" | "bottom" | "left" | "right" | "center"
  priority: "low" | "medium" | "high" | "critical"
  category: "navigation" | "feature" | "tutorial" | "warning" | "success"
}

interface ToolbarAction {
  id: string
  label: string
  icon: React.ReactNode
  shortcut?: string
  category: "primary" | "secondary" | "utility"
  action: () => void
}

const platformInsignia = {
  supreme: <Crown className="h-5 w-5 text-yellow-400" />,
  authority: <Shield className="h-5 w-5 text-blue-400" />,
  innovation: <Zap className="h-5 w-5 text-purple-400" />,
  intelligence: <Brain className="h-5 w-5 text-cyan-400" />,
  excellence: <Star className="h-5 w-5 text-amber-400" />,
  premium: <Diamond className="h-5 w-5 text-pink-400" />,
  elite: <Gem className="h-5 w-5 text-emerald-400" />,
  mastery: <Trophy className="h-5 w-5 text-orange-400" />,
}

interface StrategicPlatformLayoutProps {
  children: React.ReactNode
  breadcrumbs: BreadcrumbItem[]
  currentSection: string
  guidancePrompts?: GuidancePrompt[]
  showGuidance?: boolean
  userLevel?: "novice" | "intermediate" | "expert" | "master"
}

export function StrategicPlatformLayout({
  children,
  breadcrumbs,
  currentSection,
  guidancePrompts = [],
  showGuidance = true,
  userLevel = "intermediate",
}: StrategicPlatformLayoutProps) {
  const [toolbarExpanded, setToolbarExpanded] = useState(true)
  const [guidanceVisible, setGuidanceVisible] = useState(showGuidance)
  const [activePrompt, setActivePrompt] = useState<string | null>(null)
  const [completedActions, setCompletedActions] = useState<string[]>([])
  const [platformProgress, setPlatformProgress] = useState(65)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const layoutRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const [userGCIStatus, setUserGCIStatus] = useState<"pending" | "processing" | "verified" | "rejected">("pending")
  const [completionPercentage, setCompletionPercentage] = useState(25)
  const [showGCICard, setShowGCICard] = useState(true)

  // Track mouse for holographic effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (layoutRef.current) {
        const rect = layoutRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Auto-hide toolbar in fullscreen
  useEffect(() => {
    if (isFullscreen) {
      setToolbarExpanded(false)
    }
  }, [isFullscreen])

  // Simulate user status check
  useEffect(() => {
    // In production, this would check actual user status from API
    const checkUserStatus = () => {
      // For demo purposes, show the card for pending status
      setShowGCICard(userGCIStatus === "pending" || userGCIStatus === "processing")
    }

    checkUserStatus()
  }, [userGCIStatus])

  const toolbarActions: ToolbarAction[] = [
    {
      id: "analyze",
      label: "Market Analysis",
      icon: <TrendingUp className="h-4 w-4" />,
      shortcut: "Ctrl+A",
      category: "primary",
      action: () => console.log("Analyze"),
    },
    {
      id: "trade",
      label: "Execute Trade",
      icon: <Zap className="h-4 w-4" />,
      shortcut: "Ctrl+T",
      category: "primary",
      action: () => console.log("Trade"),
    },
    {
      id: "ai-assist",
      label: "AI Assistant",
      icon: <Brain className="h-4 w-4" />,
      shortcut: "Ctrl+I",
      category: "primary",
      action: () => console.log("AI Assist"),
    },
    {
      id: "portfolio",
      label: "Portfolio View",
      icon: <Target className="h-4 w-4" />,
      shortcut: "Ctrl+P",
      category: "secondary",
      action: () => console.log("Portfolio"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
      shortcut: "Ctrl+S",
      category: "utility",
      action: () => console.log("Settings"),
    },
  ]

  const getUserLevelInsignia = () => {
    switch (userLevel) {
      case "master":
        return { icon: platformInsignia.mastery, label: "Master Trader", color: "text-orange-400" }
      case "expert":
        return { icon: platformInsignia.elite, label: "Expert Trader", color: "text-emerald-400" }
      case "intermediate":
        return { icon: platformInsignia.premium, label: "Advanced Trader", color: "text-pink-400" }
      default:
        return { icon: platformInsignia.excellence, label: "Trader", color: "text-amber-400" }
    }
  }

  const userInsignia = getUserLevelInsignia()

  const handlePromptAction = (promptId: string) => {
    setCompletedActions([...completedActions, promptId])
    setActivePrompt(null)
    setPlatformProgress(Math.min(100, platformProgress + 5))
  }

  const handleDocumentUpload = async (documentId: string, file: File) => {
    console.log(`Uploading document ${documentId}:`, file.name)

    // Simulate upload process
    try {
      // In production, upload to your storage service
      const formData = new FormData()
      formData.append("file", file)
      formData.append("documentId", documentId)

      // const response = await fetch('/api/documents/upload', {
      //   method: 'POST',
      //   body: formData
      // })

      // Update completion percentage
      setCompletionPercentage((prev) => Math.min(prev + 15, 100))

      console.log(`Document ${documentId} uploaded successfully`)
    } catch (error) {
      console.error("Upload failed:", error)
    }
  }

  const handleStatusUpdate = async () => {
    console.log("Checking status update...")
    // In production, check with your API
    // const status = await fetch('/api/gci/status').then(r => r.json())
    // setUserGCIStatus(status.status)
    // setCompletionPercentage(status.completion)
  }

  return (
    <TooltipProvider>
      <div
        ref={layoutRef}
        className={`relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 overflow-hidden ${isFullscreen ? "fixed inset-0 z-50" : ""}`}
      >
        {/* Persistent GCI Profile Card */}
        {showGCICard && (
          <PersistentGCIProfileCard
            userStatus={userGCIStatus}
            completionPercentage={completionPercentage}
            onDocumentUpload={handleDocumentUpload}
            onStatusUpdate={handleStatusUpdate}
          />
        )}

        {/* 2035 Holographic Background */}
        <div className="absolute inset-0">
          {/* Dynamic holographic grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.4), transparent 70%)
              `,
              backgroundSize: "50px 50px, 50px 50px, 100% 100%",
            }}
          />

          {/* Floating quantum particles */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                }}
                animate={{
                  x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                  y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: Math.random() * 20 + 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Neural network connections */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <defs>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            {[...Array(15)].map((_, i) => (
              <motion.line
                key={i}
                x1={`${Math.random() * 100}%`}
                y1={`${Math.random() * 100}%`}
                x2={`${Math.random() * 100}%`}
                y2={`${Math.random() * 100}%`}
                stroke="url(#neuralGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </svg>
        </div>

        {/* Supreme Authority Header */}
        <motion.header
          className="relative z-20 border-b border-cyan-500/20 bg-black/40 backdrop-blur-xl"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Platform Insignia */}
              <div className="flex items-center gap-6">
                <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
                      {platformInsignia.supreme}
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                      {platformInsignia.authority}
                    </div>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                      SUPREME AUTHORITY
                    </h1>
                    <p className="text-xs text-cyan-300">Financial Quantum Platform 2035</p>
                    <p className="text-[10px] text-cyan-400/80 italic mt-1">
                      "Decentralized Banking Democratized Wealth"
                    </p>
                  </div>
                </motion.div>

                {/* User Level Insignia */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-cyan-500/30">
                  {userInsignia.icon}
                  <span className={`text-sm font-medium ${userInsignia.color}`}>{userInsignia.label}</span>
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">
                    Level{" "}
                    {userLevel === "master"
                      ? "10"
                      : userLevel === "expert"
                        ? "8"
                        : userLevel === "intermediate"
                          ? "5"
                          : "2"}
                  </Badge>
                </div>
              </div>

              {/* Platform Progress & Controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-cyan-300">Platform Mastery</span>
                  <div className="w-32">
                    <Progress value={platformProgress} className="h-2" />
                  </div>
                  <span className="text-sm text-cyan-400 font-medium">{platformProgress}%</span>
                </div>

                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setGuidanceVisible(!guidanceVisible)}
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        <Compass className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Toggle Guidance System</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Toggle Fullscreen</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Strategic Breadcrumb Navigation */}
        <motion.nav
          className="relative z-20 border-b border-indigo-500/20 bg-slate-900/40 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-indigo-400" />
                <span className="text-sm text-indigo-300 font-medium">Navigation Path:</span>
                <div className="flex items-center gap-1">
                  {breadcrumbs.map((item, index) => (
                    <div key={item.href} className="flex items-center gap-1">
                      {index > 0 && <ChevronRight className="h-3 w-3 text-indigo-400" />}
                      <Link
                        href={item.href}
                        className={`flex items-center gap-1 px-2 py-1 rounded text-sm transition-colors ${
                          item.isActive
                            ? "bg-indigo-600/30 text-indigo-200 border border-indigo-500/30"
                            : "text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10"
                        }`}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">{currentSection}</Badge>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Eye className="h-3 w-3" />
                  <span>Quantum View Active</span>
                </div>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Main Layout */}
        <div className={`flex ${showGCICard ? "pt-32" : "pt-0"} transition-all duration-300`}>
          <HolographicUnifiedSidebar />

          <main className="flex-1 overflow-hidden">{children}</main>
        </div>

        {/* Intelligent Retractable Toolbar */}
        <AnimatePresence>
          {toolbarExpanded && (
            <motion.div
              className="fixed top-1/2 left-4 transform -translate-y-1/2 z-30"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Card className="bg-black/80 border border-cyan-500/30 backdrop-blur-xl">
                <CardContent className="p-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between mb-2 px-2">
                      <span className="text-xs text-cyan-300 font-medium">Quantum Tools</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setToolbarExpanded(false)}
                        className="h-6 w-6 p-0 text-cyan-400 hover:text-cyan-300"
                      >
                        <ChevronLeft className="h-3 w-3" />
                      </Button>
                    </div>

                    {toolbarActions.map((action, index) => (
                      <Tooltip key={action.id}>
                        <TooltipTrigger asChild>
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={action.action}
                              className={`w-full justify-start gap-2 ${
                                action.category === "primary"
                                  ? "text-cyan-300 hover:bg-cyan-500/20"
                                  : action.category === "secondary"
                                    ? "text-purple-300 hover:bg-purple-500/20"
                                    : "text-slate-400 hover:bg-slate-500/20"
                              }`}
                            >
                              {action.icon}
                              <span className="text-xs">{action.label}</span>
                              {action.shortcut && (
                                <Badge className="ml-auto text-xs bg-slate-700 text-slate-300">{action.shortcut}</Badge>
                              )}
                            </Button>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <div>
                            <p className="font-medium">{action.label}</p>
                            {action.shortcut && <p className="text-xs text-slate-400">Shortcut: {action.shortcut}</p>}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toolbar Expand Button */}
        {!toolbarExpanded && (
          <motion.div
            className="fixed top-1/2 left-4 transform -translate-y-1/2 z-30"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <Button
              onClick={() => setToolbarExpanded(true)}
              className="w-10 h-10 rounded-full bg-cyan-600/20 border border-cyan-500/30 backdrop-blur-md hover:bg-cyan-500/30"
            >
              <ChevronRight className="h-4 w-4 text-cyan-400" />
            </Button>
          </motion.div>
        )}

        {/* Guidance Prompt System */}
        <AnimatePresence>
          {guidanceVisible && guidancePrompts.length > 0 && (
            <motion.div
              className="fixed top-20 right-4 z-40 max-w-sm"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
            >
              <Card className="bg-gradient-to-br from-indigo-900/90 to-purple-900/90 border border-indigo-500/30 backdrop-blur-xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="h-5 w-5 text-yellow-400" />
                    <span className="font-medium text-indigo-200">Quantum Guidance</span>
                    <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">Active</Badge>
                  </div>

                  {guidancePrompts.slice(0, 3).map((prompt, index) => (
                    <motion.div
                      key={prompt.id}
                      className="mb-3 last:mb-0 p-3 rounded-lg bg-slate-800/50 border border-slate-600/30"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-2">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            prompt.priority === "critical"
                              ? "bg-red-400"
                              : prompt.priority === "high"
                                ? "bg-orange-400"
                                : prompt.priority === "medium"
                                  ? "bg-yellow-400"
                                  : "bg-green-400"
                          }`}
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-indigo-200 mb-1">{prompt.title}</h4>
                          <p className="text-xs text-slate-300 mb-2">{prompt.description}</p>
                          {prompt.action && (
                            <Button
                              size="sm"
                              onClick={() => handlePromptAction(prompt.id)}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs"
                            >
                              <ArrowRight className="h-3 w-3 mr-1" />
                              {prompt.action}
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-600/30">
                    <span className="text-xs text-slate-400">{completedActions.length} actions completed</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setGuidanceVisible(false)}
                      className="text-slate-400 hover:text-slate-300 text-xs"
                    >
                      Hide Guidance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quantum Status Bar */}
        <motion.footer
          className="relative z-20 border-t border-cyan-500/20 bg-black/40 backdrop-blur-xl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="container mx-auto px-6 py-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400">Quantum Systems Online</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3 text-yellow-400" />
                  <span className="text-slate-400">Neural Processing: 99.7%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="h-3 w-3 text-blue-400" />
                  <span className="text-slate-400">Security: Maximum</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-slate-400">Market Session: ACTIVE</span>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">Platform Version:</span>
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">2035.Q4.SUPREME</Badge>
                </div>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
      {/* Imperial Ambient Controller */}
      <ImperialAmbientController />
    </TooltipProvider>
  )
}
