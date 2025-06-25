"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  Sparkles,
  TrendingUp,
  Target,
  Lightbulb,
  Zap,
  ChevronRight,
  X,
  Minimize2,
  Volume2,
  VolumeX,
  Settings,
  HelpCircle,
  BookOpen,
  Calculator,
  PieChart,
  Home,
  ShoppingBag,
  Mic,
  MicOff,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { usePathname } from "next/navigation"
import { useGeniusOrb } from "@/hooks/use-genius-orb"

interface GeniusOrbProps {
  className?: string
}

export function GeniusOrb({ className }: GeniusOrbProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [isMinimized, setIsMinimized] = React.useState(false)
  const [isSpeaking, setIsSpeaking] = React.useState(false)
  const [isListening, setIsListening] = React.useState(false)
  const [currentInsight, setCurrentInsight] = React.useState(0)
  const [showSettings, setShowSettings] = React.useState(false)

  const pathname = usePathname()
  const {
    insights,
    recommendations,
    currentContext,
    userProgress,
    isActive,
    toggleOrb,
    getContextualHelp,
    speakText,
    startListening,
    stopListening,
  } = useGeniusOrb()

  // Floating animation for the orb
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  // Pulsing glow effect
  const glowAnimation = {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  // Particle effects around the orb
  const particleVariants = {
    animate: {
      y: [0, -20, -40],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        delay: Math.random() * 2,
      },
    },
  }

  // Context-aware insights based on current page
  const contextualInsights = React.useMemo(() => {
    const baseInsights = [
      {
        icon: TrendingUp,
        title: "Market Opportunity",
        message:
          "Real estate prices in your area are trending up 12% this quarter. Consider accelerating your property search.",
        action: "View Properties",
        priority: "high",
      },
      {
        icon: Target,
        title: "Goal Progress",
        message:
          "You're 73% toward your emergency fund goal. Great progress! Consider automating savings to reach it faster.",
        action: "Optimize Savings",
        priority: "medium",
      },
      {
        icon: Lightbulb,
        title: "Credit Optimization",
        message: "Paying down your credit card by $500 could boost your score by 15-20 points within 30 days.",
        action: "View Strategy",
        priority: "high",
      },
      {
        icon: Zap,
        title: "50-Year Loan Benefit",
        message: "With your improved credit score, you now qualify for our revolutionary 50-year loan at 3.1% APR.",
        action: "Get Pre-Approved",
        priority: "featured",
      },
    ]

    // Add context-specific insights based on current page
    if (pathname.includes("/real-estate")) {
      baseInsights.unshift({
        icon: Home,
        title: "Property Insight",
        message: "Based on your search criteria, 3 new properties matching your preferences were listed today.",
        action: "View New Listings",
        priority: "high",
      })
    } else if (pathname.includes("/dashboard/snap-dax")) {
      baseInsights.unshift({
        icon: TrendingUp,
        title: "Trading Opportunity",
        message:
          "Your portfolio allocation suggests adding 15% more international exposure for better diversification.",
        action: "Explore Options",
        priority: "medium",
      })
    } else if (pathname.includes("/ecommerex")) {
      baseInsights.unshift({
        icon: ShoppingBag,
        title: "Shopping Insight",
        message: "You have $250 in rewards points available. Use them before they expire next month!",
        action: "Use Rewards",
        priority: "medium",
      })
    }

    return baseInsights
  }, [pathname])

  // Cycle through insights automatically
  React.useEffect(() => {
    if (isExpanded && contextualInsights.length > 1) {
      const interval = setInterval(() => {
        setCurrentInsight((prev) => (prev + 1) % contextualInsights.length)
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [isExpanded, contextualInsights.length])

  // Voice synthesis
  const handleSpeak = async (text: string) => {
    setIsSpeaking(true)
    await speakText(text)
    setIsSpeaking(false)
  }

  // Voice recognition
  const handleVoiceCommand = () => {
    if (isListening) {
      stopListening()
      setIsListening(false)
    } else {
      startListening()
      setIsListening(true)
    }
  }

  if (isMinimized) {
    return (
      <motion.div
        className={cn("fixed bottom-4 right-4 z-[9999]", className)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <Button
          onClick={() => setIsMinimized(false)}
          className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 p-0 shadow-lg hover:shadow-xl"
        >
          <Brain className="h-6 w-6 text-white" />
        </Button>
      </motion.div>
    )
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-[9999]", className)}>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4"
          >
            <Card className="w-80 bg-background/95 backdrop-blur-sm border-white/20 shadow-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <motion.div
                        animate={glowAnimation}
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 blur-sm"
                      />
                      <div className="relative h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center">
                        <Brain className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-sm">Genius Guide</CardTitle>
                      <p className="text-xs text-muted-foreground">AI Financial Assistant</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleVoiceCommand}
                      className={cn("h-6 w-6 p-0", isListening && "text-red-500")}
                    >
                      {isListening ? <Mic className="h-3 w-3" /> : <MicOff className="h-3 w-3" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSettings(!showSettings)}
                      className="h-6 w-6 p-0"
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setIsMinimized(true)} className="h-6 w-6 p-0">
                      <Minimize2 className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)} className="h-6 w-6 p-0">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Current Insight */}
                {contextualInsights[currentInsight] && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          contextualInsights[currentInsight].priority === "high" && "bg-red-500/20 text-red-400",
                          contextualInsights[currentInsight].priority === "medium" &&
                            "bg-yellow-500/20 text-yellow-400",
                          contextualInsights[currentInsight].priority === "featured" &&
                            "bg-purple-500/20 text-purple-400",
                        )}
                      >
                        {React.createElement(contextualInsights[currentInsight].icon, { className: "h-4 w-4" })}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium">{contextualInsights[currentInsight].title}</h4>
                          <Badge
                            variant={
                              contextualInsights[currentInsight].priority === "featured" ? "default" : "secondary"
                            }
                            className="text-xs"
                          >
                            {contextualInsights[currentInsight].priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {contextualInsights[currentInsight].message}
                        </p>
                        <div className="flex items-center gap-2">
                          <Button size="sm" className="h-7 text-xs">
                            {contextualInsights[currentInsight].action}
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSpeak(contextualInsights[currentInsight].message)}
                            className="h-7 w-7 p-0"
                            disabled={isSpeaking}
                          >
                            {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Progress indicator */}
                    <div className="flex items-center gap-1">
                      {contextualInsights.map((_, index) => (
                        <div
                          key={index}
                          className={cn(
                            "h-1 rounded-full transition-all duration-300",
                            index === currentInsight ? "w-6 bg-primary" : "w-2 bg-muted",
                          )}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="space-y-2">
                  <h5 className="text-xs font-medium text-muted-foreground">Quick Actions</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <Calculator className="h-3 w-3 mr-1" />
                      Calculate
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <PieChart className="h-3 w-3 mr-1" />
                      Analyze
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <BookOpen className="h-3 w-3 mr-1" />
                      Learn
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <HelpCircle className="h-3 w-3 mr-1" />
                      Help
                    </Button>
                  </div>
                </div>

                {/* User Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-medium text-muted-foreground">Financial Health</h5>
                    <span className="text-xs text-green-400">Excellent</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Credit: 750+</span>
                    <span>Goals: 3/4</span>
                    <span>Savings: 85%</span>
                  </div>
                </div>

                {/* Settings Panel */}
                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 border-t border-white/10 pt-3"
                    >
                      <h5 className="text-xs font-medium text-muted-foreground">Orb Settings</h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Voice Guidance</span>
                          <Button variant="outline" size="sm" className="h-6 text-xs">
                            On
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Proactive Tips</span>
                          <Button variant="outline" size="sm" className="h-6 text-xs">
                            On
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Notification Level</span>
                          <Button variant="outline" size="sm" className="h-6 text-xs">
                            Smart
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Orb */}
      <motion.div
        animate={floatingAnimation}
        className="relative cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Particle Effects */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            variants={particleVariants}
            animate="animate"
            className="absolute inset-0 pointer-events-none"
            style={{
              left: `${20 + i * 10}%`,
              top: `${20 + i * 10}%`,
            }}
          >
            <Sparkles className="h-2 w-2 text-cyan-400" />
          </motion.div>
        ))}

        {/* Outer Glow Ring */}
        <motion.div
          animate={glowAnimation}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 blur-lg opacity-50"
        />

        {/* Middle Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-2 rounded-full border-2 border-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 opacity-60"
        />

        {/* Main Orb */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl"
        >
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <Brain className="h-8 w-8 text-white" />
          </motion.div>

          {/* Activity Indicator */}
          {(isSpeaking || isListening) && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center"
            >
              {isListening ? <Mic className="h-2 w-2 text-white" /> : <Volume2 className="h-2 w-2 text-white" />}
            </motion.div>
          )}

          {/* Notification Badge */}
          {contextualInsights.filter((i) => i.priority === "high").length > 0 && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -top-1 -left-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold"
            >
              {contextualInsights.filter((i) => i.priority === "high").length}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
