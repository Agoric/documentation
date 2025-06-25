"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  ChevronRight,
  X,
  Minimize2,
  Star,
  MapPin,
  Eye,
  MousePointer,
  Navigation,
  Compass,
  Route,
  Flag,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { usePathname, useRouter } from "next/navigation"
import { useGoalPrioritizingOrb } from "@/hooks/use-goal-prioritizing-orb"

interface GoalPrioritizingOrbProps {
  className?: string
}

export function GoalPrioritizingOrb({ className }: GoalPrioritizingOrbProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [isMinimized, setIsMinimized] = React.useState(false)
  const [showingInterest, setShowingInterest] = React.useState(false)
  const [currentFocus, setCurrentFocus] = React.useState<string | null>(null)
  const [pulseIntensity, setPulseIntensity] = React.useState(1)

  const pathname = usePathname()
  const router = useRouter()
  const {
    prioritizedGoals,
    nextActionableSteps,
    currentInterest,
    goalProgress,
    isAnalyzing,
    confirmInterest,
    proceedToNextStep,
    getLocationInfo,
    identifyOpportunities,
    navigateToOpportunity,
  } = useGoalPrioritizingOrb()

  // Enhanced floating animation with interest indication
  const floatingAnimation = {
    y: showingInterest ? [0, -15, 0] : [0, -10, 0],
    scale: showingInterest ? [1, 1.05, 1] : [1, 1.02, 1],
    transition: {
      duration: showingInterest ? 2 : 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  // Dynamic glow based on interest level
  const interestGlowAnimation = {
    scale: showingInterest ? [1, 1.3, 1] : [1, 1.1, 1],
    opacity: showingInterest ? [0.8, 1, 0.8] : [0.7, 1, 0.7],
    transition: {
      duration: showingInterest ? 1.5 : 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  // Interest particle effects
  const interestParticleVariants = {
    animate: {
      y: [0, -30, -60],
      x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
      opacity: [0, 1, 0],
      scale: [0, 1.2, 0],
      rotate: [0, 180, 360],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        delay: Math.random() * 3,
      },
    },
  }

  // Monitor for opportunities and interests
  React.useEffect(() => {
    const checkForInterests = () => {
      const opportunities = identifyOpportunities(pathname)
      if (opportunities.length > 0) {
        const highestPriority = opportunities[0]
        setCurrentFocus(highestPriority.id)
        setShowingInterest(true)
        setPulseIntensity(highestPriority.priority === "critical" ? 1.5 : 1.2)
      } else {
        setShowingInterest(false)
        setCurrentFocus(null)
        setPulseIntensity(1)
      }
    }

    checkForInterests()
    const interval = setInterval(checkForInterests, 5000) // Check every 5 seconds
    return () => clearInterval(interval)
  }, [pathname, identifyOpportunities])

  // Handle interest confirmation
  const handleConfirmInterest = async () => {
    if (currentInterest) {
      const confirmed = await confirmInterest(currentInterest.id)
      if (confirmed) {
        // Navigate to the location/item of interest
        navigateToOpportunity(currentInterest)
        setShowingInterest(false)
      }
    }
  }

  // Handle next step progression
  const handleNextStep = async () => {
    const nextStep = await proceedToNextStep()
    if (nextStep?.navigation) {
      router.push(nextStep.navigation.path)
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
            <Card className="w-96 bg-background/95 backdrop-blur-sm border-white/20 shadow-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <motion.div
                        animate={interestGlowAnimation}
                        className={cn(
                          "absolute inset-0 rounded-full blur-sm",
                          showingInterest
                            ? "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"
                            : "bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500",
                        )}
                      />
                      <div
                        className={cn(
                          "relative h-8 w-8 rounded-full flex items-center justify-center",
                          showingInterest
                            ? "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"
                            : "bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500",
                        )}
                      >
                        {showingInterest ? (
                          <Eye className="h-4 w-4 text-white" />
                        ) : (
                          <Brain className="h-4 w-4 text-white" />
                        )}
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-sm">
                        {showingInterest ? "Opportunity Detected" : "Goal Navigator"}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {showingInterest ? "Click to explore" : "AI Goal Prioritizer"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
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
                {/* Current Interest/Opportunity */}
                {currentInterest && showingInterest && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 p-4 rounded-lg bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/20"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-green-400">{currentInterest.title}</h4>
                          <Badge variant="default" className="text-xs bg-green-500/20 text-green-400">
                            {currentInterest.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{currentInterest.description}</p>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={handleConfirmInterest}
                            className="h-8 text-xs bg-green-500 hover:bg-green-600"
                          >
                            <MousePointer className="h-3 w-3 mr-1" />
                            Explore This Opportunity
                          </Button>
                          <div className="flex items-center gap-1 text-xs text-green-400">
                            <Star className="h-3 w-3" />
                            <span>High Impact</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Prioritized Goals */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-medium text-muted-foreground">Priority Goals</h5>
                    <Badge variant="secondary" className="text-xs">
                      {prioritizedGoals.length} Active
                    </Badge>
                  </div>

                  {prioritizedGoals.slice(0, 2).map((goal, index) => (
                    <div key={goal.id} className="space-y-2 p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full",
                              goal.priority === "critical" && "bg-red-500",
                              goal.priority === "high" && "bg-orange-500",
                              goal.priority === "medium" && "bg-yellow-500",
                            )}
                          />
                          <span className="text-sm font-medium">{goal.title}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(goal.progress)}%
                        </Badge>
                      </div>
                      <Progress value={goal.progress} className="h-1" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{goal.timeframe}</span>
                        <span>{goal.impact} impact</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Next Actionable Steps */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Route className="h-4 w-4 text-blue-400" />
                    <h5 className="text-xs font-medium text-muted-foreground">Next Steps</h5>
                  </div>

                  {nextActionableSteps.slice(0, 3).map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                      onClick={() => step.navigation && router.push(step.navigation.path)}
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium">{step.title}</p>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant="secondary" className="text-xs">
                          {step.estimatedTime}
                        </Badge>
                        <ChevronRight className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </motion.div>
                  ))}

                  <Button onClick={handleNextStep} className="w-full h-8 text-xs">
                    <Navigation className="h-3 w-3 mr-1" />
                    Proceed to Next Step
                  </Button>
                </div>

                {/* Goal Progress Overview */}
                <div className="space-y-2 p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-medium text-muted-foreground">Overall Progress</h5>
                    <div className="flex items-center gap-1">
                      <Flag className="h-3 w-3 text-purple-400" />
                      <span className="text-xs text-purple-400">On Track</span>
                    </div>
                  </div>
                  <Progress value={goalProgress.overall} className="h-2" />
                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                    <div className="text-center">
                      <div className="font-medium text-green-400">{goalProgress.completed}</div>
                      <div>Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-yellow-400">{goalProgress.inProgress}</div>
                      <div>In Progress</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-blue-400">{goalProgress.upcoming}</div>
                      <div>Upcoming</div>
                    </div>
                  </div>
                </div>

                {/* Analysis Status */}
                {isAnalyzing && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/10">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Compass className="h-4 w-4 text-blue-400" />
                    </motion.div>
                    <span className="text-xs text-blue-400">Analyzing opportunities...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Main Orb with Interest Indication */}
      <motion.div
        animate={floatingAnimation}
        className="relative cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Enhanced Particle Effects for Interest */}
        {showingInterest &&
          [...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              variants={interestParticleVariants}
              animate="animate"
              className="absolute inset-0 pointer-events-none"
              style={{
                left: `${15 + i * 8}%`,
                top: `${15 + i * 8}%`,
              }}
            >
              <Star className="h-2 w-2 text-green-400" />
            </motion.div>
          ))}

        {/* Dynamic Outer Glow Ring */}
        <motion.div
          animate={{
            ...interestGlowAnimation,
            rotate: showingInterest ? 360 : 0,
          }}
          transition={{
            ...interestGlowAnimation.transition,
            rotate: { duration: showingInterest ? 8 : 0, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          }}
          className={cn(
            "absolute inset-0 rounded-full blur-lg opacity-50",
            showingInterest
              ? "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"
              : "bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500",
          )}
        />

        {/* Interest Detection Ring */}
        {showingInterest && (
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute inset-1 rounded-full border-2 border-green-400"
          />
        )}

        {/* Main Orb */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: showingInterest ? [1, 1.05, 1] : 1,
          }}
          transition={{
            scale: { duration: 1, repeat: showingInterest ? Number.POSITIVE_INFINITY : 0 },
          }}
          className={cn(
            "relative h-16 w-16 rounded-full flex items-center justify-center shadow-2xl",
            showingInterest
              ? "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"
              : "bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500",
          )}
        >
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {showingInterest ? <Eye className="h-8 w-8 text-white" /> : <Brain className="h-8 w-8 text-white" />}
          </motion.div>

          {/* Interest Indicator */}
          {showingInterest && (
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-green-400 flex items-center justify-center"
            >
              <MousePointer className="h-3 w-3 text-white" />
            </motion.div>
          )}

          {/* Priority Badge */}
          {prioritizedGoals.filter((g) => g.priority === "critical").length > 0 && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -top-1 -left-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold"
            >
              !
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
