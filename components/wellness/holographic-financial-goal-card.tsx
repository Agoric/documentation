"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format, addMonths, differenceInMonths } from "date-fns"
import {
  TrendingUp,
  Calendar,
  DollarSign,
  Target,
  Award,
  Edit2,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Lock,
  Unlock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { FinancialGoal } from "./financial-goal-card"

interface HolographicFinancialGoalCardProps {
  goal: FinancialGoal
  onEdit?: (goal: FinancialGoal) => void
  onDelete?: (goalId: string) => void
  className?: string
}

export function HolographicFinancialGoalCard({ goal, onEdit, onDelete, className }: HolographicFinancialGoalCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const [showLaserEffect, setShowLaserEffect] = useState(false)

  // Calculate progress percentages
  const progressPercentage = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100))
  const remainingAmount = goal.targetAmount - goal.currentAmount

  const totalMonths = differenceInMonths(goal.targetDate, goal.startDate) || 1
  const elapsedMonths = differenceInMonths(new Date(), goal.startDate)
  const timeProgressPercentage = Math.min(100, Math.round((elapsedMonths / totalMonths) * 100))

  const isAhead = progressPercentage > timeProgressPercentage
  const isBehind = progressPercentage < timeProgressPercentage && progressPercentage < 100
  const isOnTrack = !isAhead && !isBehind

  // Track mouse position for holographic effect
  useEffect(() => {
    if (!cardRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current!.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const updateCardSize = () => {
      if (cardRef.current) {
        setCardSize({
          width: cardRef.current.offsetWidth,
          height: cardRef.current.offsetHeight,
        })
      }
    }

    window.addEventListener("resize", updateCardSize)
    cardRef.current.addEventListener("mousemove", handleMouseMove)
    updateCardSize()

    return () => {
      window.removeEventListener("resize", updateCardSize)
      cardRef.current?.removeEventListener("mousemove", handleMouseMove)
    }
  }, [cardRef.current])

  // Calculate gradient position based on mouse position
  const calculateGradientPosition = () => {
    if (cardSize.width === 0 || !isHovered) return { x: 50, y: 50 }
    const x = (mousePosition.x / cardSize.width) * 100
    const y = (mousePosition.y / cardSize.height) * 100
    return { x, y }
  }

  const gradientPos = calculateGradientPosition()

  // Trigger laser effect periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (isHovered) {
        setShowLaserEffect(true)
        setTimeout(() => setShowLaserEffect(false), 1500)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isHovered])

  const getStatusColor = () => {
    if (progressPercentage >= 100) return "text-emerald-400"
    if (isAhead) return "text-emerald-400"
    if (isBehind) return "text-amber-400"
    return "text-blue-400"
  }

  const getStatusText = () => {
    if (progressPercentage >= 100) return "Completed!"
    if (isAhead) return "Ahead of schedule"
    if (isBehind) return "Behind schedule"
    return "On track"
  }

  const getCategoryIcon = () => {
    switch (goal.category) {
      case "savings":
        return <DollarSign className="h-4 w-4" />
      case "investment":
        return <TrendingUp className="h-4 w-4" />
      case "debt":
        return <DollarSign className="h-4 w-4" />
      case "purchase":
        return <Target className="h-4 w-4" />
      case "retirement":
        return <Award className="h-4 w-4" />
      case "education":
        return <Award className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const getProjectedCompletionDate = () => {
    if (progressPercentage >= 100) return "Completed"

    // Calculate monthly contribution rate based on history
    const monthlyRate = goal.currentAmount / (elapsedMonths || 1)

    // If no progress or negative progress, return the target date
    if (monthlyRate <= 0) return format(goal.targetDate, "MMM d, yyyy")

    // Calculate months needed to reach target
    const remainingMonths = remainingAmount / monthlyRate
    const projectedDate = addMonths(new Date(), remainingMonths)

    return format(projectedDate, "MMM d, yyyy")
  }

  const sortedMilestones = [...goal.milestones].sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime())

  const getCategoryGradient = () => {
    switch (goal.category) {
      case "savings":
        return "from-blue-600/20 to-cyan-600/20"
      case "investment":
        return "from-green-600/20 to-emerald-600/20"
      case "debt":
        return "from-red-600/20 to-pink-600/20"
      case "purchase":
        return "from-purple-600/20 to-fuchsia-600/20"
      case "retirement":
        return "from-amber-600/20 to-yellow-600/20"
      case "education":
        return "from-indigo-600/20 to-violet-600/20"
      default:
        return "from-gray-600/20 to-slate-600/20"
    }
  }

  const getPriorityColor = () => {
    switch (goal.priority) {
      case "high":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "medium":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30"
      case "low":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative overflow-hidden rounded-lg border-0 transition-all duration-300",
        isHovered ? "translate-z-4" : "translate-z-0",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setActiveAction(null)
      }}
      style={{
        background: isHovered
          ? `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, rgba(129, 140, 248, 0.15), rgba(0, 0, 0, 0.8) 70%)`
          : "linear-gradient(to bottom right, rgba(79, 70, 229, 0.1), rgba(0, 0, 0, 0.8))",
        boxShadow: isHovered
          ? "0 0 20px rgba(129, 140, 248, 0.3), inset 0 0 20px rgba(129, 140, 248, 0.2)"
          : "0 0 10px rgba(79, 70, 229, 0.2), inset 0 0 10px rgba(79, 70, 229, 0.1)",
        transform: isHovered
          ? `perspective(1000px) rotateX(${(mousePosition.y - cardSize.height / 2) / 30}deg) rotateY(${
              (mousePosition.x - cardSize.width / 2) / -30
            }deg) translateZ(10px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(123, 97, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 97, 255, 0.2) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Holographic glow effect */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        style={{
          background: `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, rgba(129, 140, 248, 0.2), transparent 50%)`,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {isHovered &&
          [...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-indigo-400 opacity-70"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                opacity: [Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.5],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
          ))}
      </div>

      {/* Laser scan effect */}
      <AnimatePresence>
        {showLaserEffect && (
          <motion.div
            initial={{ top: 0, opacity: 0 }}
            animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] z-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
            style={{ boxShadow: "0 0 10px rgba(129, 140, 248, 0.8), 0 0 20px rgba(129, 140, 248, 0.4)" }}
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 p-5">
        <div className="flex justify-between">
          <div className="flex-1">
            {/* Header with category icon and name */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r",
                  getCategoryGradient(),
                  "text-white",
                )}
                style={{
                  boxShadow: isHovered ? "0 0 15px rgba(129, 140, 248, 0.5)" : "none",
                  transform: isHovered ? "translateZ(15px)" : "none",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                {getCategoryIcon()}
              </div>
              <div
                style={{
                  transform: isHovered ? "translateZ(10px)" : "none",
                  transition: "transform 0.3s ease",
                }}
              >
                <h3 className="text-lg font-bold text-white">{goal.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-indigo-500/30 text-indigo-300 bg-indigo-950/30"
                    style={{
                      transform: isHovered ? "translateZ(5px)" : "none",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
                  </Badge>
                  <Badge
                    className={cn(
                      "border",
                      getPriorityColor(),
                      "backdrop-blur-sm",
                      isHovered ? "scale-105" : "scale-100",
                    )}
                    style={{
                      transform: isHovered ? "translateZ(5px)" : "none",
                      transition: "transform 0.3s ease, scale 0.3s ease",
                    }}
                  >
                    {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)} Priority
                  </Badge>
                </div>
              </div>
            </div>

            {/* Progress section with holographic display */}
            <div
              className="mb-4 p-3 rounded-lg border border-indigo-500/20 bg-indigo-950/30 backdrop-blur-md"
              style={{
                transform: isHovered ? "translateZ(20px)" : "none",
                transition: "transform 0.3s ease",
                boxShadow: isHovered ? "0 0 20px rgba(99, 102, 241, 0.2)" : "none",
              }}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-indigo-200">Progress</span>
                <motion.span
                  className="text-sm font-bold text-indigo-100"
                  animate={{ scale: isHovered ? [1, 1.1, 1] : 1 }}
                  transition={{ duration: 1, repeat: isHovered ? Number.POSITIVE_INFINITY : 0, repeatType: "loop" }}
                >
                  {progressPercentage}%
                </motion.span>
              </div>

              {/* Holographic progress bar */}
              <div className="h-2.5 w-full rounded-full bg-indigo-950/50 overflow-hidden mb-2 relative">
                <motion.div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2) 50%, transparent 100%)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "200% 0%"],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <div
                  className={`h-full rounded-full relative overflow-hidden ${
                    progressPercentage >= 100
                      ? "bg-gradient-to-r from-emerald-500 to-green-500"
                      : isAhead
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                        : isBehind
                          ? "bg-gradient-to-r from-amber-500 to-orange-500"
                          : "bg-gradient-to-r from-indigo-500 to-purple-500"
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute inset-0 opacity-50">
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6) 50%, transparent 100%)",
                        backgroundSize: "200% 100%",
                      }}
                      animate={{
                        backgroundPosition: ["0% 0%", "200% 0%"],
                      }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  </div>
                </div>
              </div>

              {/* Time progress comparison */}
              <div className="flex justify-between text-xs text-indigo-300 mb-2">
                <span>Time elapsed: {timeProgressPercentage}%</span>
                <span
                  className={
                    progressPercentage >= 100
                      ? "text-emerald-400"
                      : isAhead
                        ? "text-emerald-400"
                        : isBehind
                          ? "text-amber-400"
                          : "text-blue-400"
                  }
                >
                  {progressPercentage >= 100
                    ? "+100%"
                    : isAhead
                      ? `+${progressPercentage - timeProgressPercentage}%`
                      : isBehind
                        ? `-${timeProgressPercentage - progressPercentage}%`
                        : "On target"}
                </span>
              </div>

              {/* Amount display */}
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-indigo-400">Current: </span>
                  <motion.span
                    className="font-medium text-indigo-100"
                    animate={{ scale: isHovered ? [1, 1.05, 1] : 1 }}
                    transition={{ duration: 2, repeat: isHovered ? Number.POSITIVE_INFINITY : 0, repeatType: "loop" }}
                  >
                    ${goal.currentAmount.toLocaleString()}
                  </motion.span>
                </div>
                <div className="text-sm">
                  <span className="text-indigo-400">Target: </span>
                  <span className="font-medium text-indigo-100">${goal.targetAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Status indicator */}
              <div
                className="flex items-center gap-1.5 mt-2 justify-center p-1 rounded-md bg-indigo-950/50 border border-indigo-500/20"
                style={{
                  transform: isHovered ? "translateZ(25px)" : "none",
                  transition: "transform 0.3s ease",
                }}
              >
                <motion.div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    progressPercentage >= 100
                      ? "bg-emerald-500"
                      : isAhead
                        ? "bg-emerald-500"
                        : isBehind
                          ? "bg-amber-500"
                          : "bg-blue-500",
                  )}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                />
                <motion.span
                  className={cn("text-sm font-medium", getStatusColor())}
                  animate={{
                    opacity: isHovered ? [0.8, 1, 0.8] : 1,
                  }}
                  transition={{ duration: 2, repeat: isHovered ? Number.POSITIVE_INFINITY : 0, repeatType: "loop" }}
                >
                  {getStatusText()}
                </motion.span>
              </div>
            </div>

            {/* Date information with holographic effect */}
            <div
              className="grid grid-cols-2 gap-3 mb-4"
              style={{
                transform: isHovered ? "translateZ(15px)" : "none",
                transition: "transform 0.3s ease",
              }}
            >
              <div className="p-2 rounded-md border border-indigo-500/20 bg-indigo-950/30 backdrop-blur-md">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-xs font-medium text-indigo-200">Target Date</span>
                </div>
                <p className="text-sm text-indigo-100">{format(goal.targetDate, "MMM d, yyyy")}</p>
              </div>

              <div className="p-2 rounded-md border border-indigo-500/20 bg-indigo-950/30 backdrop-blur-md">
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                  <span className="text-xs font-medium text-indigo-200">Projected</span>
                </div>
                <motion.p
                  className="text-sm text-indigo-100"
                  animate={{
                    opacity: isHovered ? [0.8, 1, 0.8] : 1,
                  }}
                  transition={{ duration: 2, repeat: isHovered ? Number.POSITIVE_INFINITY : 0, repeatType: "loop" }}
                >
                  {getProjectedCompletionDate()}
                </motion.p>
              </div>
            </div>

            {/* Action buttons with hover effects */}
            <div className="flex items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200 transition-all duration-300",
                  activeAction === "view" &&
                    "border-indigo-500/50 bg-indigo-900/50 text-indigo-100 shadow-[0_0_10px_rgba(99,102,241,0.3)]",
                )}
                style={{
                  transform: isHovered ? "translateZ(15px)" : "none",
                  transition: "transform 0.3s ease, all 0.2s ease",
                }}
                onMouseEnter={() => setActiveAction("view")}
                onMouseLeave={() => setActiveAction(null)}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? (
                  <>
                    <ChevronUp className="mr-1 h-4 w-4" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-1 h-4 w-4" />
                    View Details
                  </>
                )}
              </Button>

              <div className="flex items-center gap-2">
                {onEdit && (
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200 transition-all duration-300",
                      activeAction === "edit" &&
                        "border-indigo-500/50 bg-indigo-900/50 text-indigo-100 shadow-[0_0_10px_rgba(99,102,241,0.3)]",
                    )}
                    style={{
                      transform: isHovered ? "translateZ(15px)" : "none",
                      transition: "transform 0.3s ease, all 0.2s ease",
                    }}
                    onMouseEnter={() => setActiveAction("edit")}
                    onMouseLeave={() => setActiveAction(null)}
                    onClick={() => onEdit(goal)}
                  >
                    <Edit2 className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                )}

                {onDelete && (
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "border-red-500/20 bg-red-950/30 text-red-300 hover:bg-red-900/30 hover:text-red-200 transition-all duration-300",
                      activeAction === "delete" &&
                        "border-red-500/50 bg-red-900/50 text-red-100 shadow-[0_0_10px_rgba(239,68,68,0.3)]",
                    )}
                    style={{
                      transform: isHovered ? "translateZ(15px)" : "none",
                      transition: "transform 0.3s ease, all 0.2s ease",
                    }}
                    onMouseEnter={() => setActiveAction("delete")}
                    onMouseLeave={() => setActiveAction(null)}
                    onClick={() => onDelete(goal.id)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Expanded details section */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-indigo-500/20"
              style={{
                transform: isHovered ? "translateZ(10px)" : "none",
                transition: "transform 0.3s ease",
              }}
            >
              {goal.description && (
                <div className="mb-4 p-3 rounded-md border border-indigo-500/20 bg-indigo-950/30 backdrop-blur-md">
                  <h4 className="text-sm font-medium mb-1 text-indigo-200">Description</h4>
                  <p className="text-sm text-indigo-300">{goal.description}</p>
                </div>
              )}

              {/* Contribution plan with holographic effect */}
              <div className="mb-4 p-3 rounded-md border border-indigo-500/20 bg-indigo-950/30 backdrop-blur-md">
                <h4 className="text-sm font-medium mb-2 text-indigo-200 flex items-center">
                  <DollarSign className="h-3.5 w-3.5 mr-1 text-indigo-400" />
                  Contribution Plan
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 rounded-md bg-indigo-950/50 border border-indigo-500/10">
                    <div className="text-xs text-indigo-400 mb-1">Amount</div>
                    <div className="text-sm font-medium text-indigo-100">${goal.contributionAmount}</div>
                  </div>
                  <div className="p-2 rounded-md bg-indigo-950/50 border border-indigo-500/10">
                    <div className="text-xs text-indigo-400 mb-1">Frequency</div>
                    <div className="text-sm font-medium text-indigo-100">
                      {goal.contributionFrequency.charAt(0).toUpperCase() + goal.contributionFrequency.slice(1)}
                    </div>
                  </div>
                </div>
                <div className="mt-2 p-2 rounded-md bg-indigo-950/50 border border-indigo-500/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-indigo-400 mb-1">Auto-contribution</div>
                    <div className="text-sm font-medium text-indigo-100">
                      {goal.autoContribution ? "Enabled" : "Disabled"}
                    </div>
                  </div>
                  {goal.autoContribution ? (
                    <Unlock className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <Lock className="h-5 w-5 text-amber-400" />
                  )}
                </div>
              </div>

              {/* Milestones with holographic effect */}
              {sortedMilestones.length > 0 && (
                <div className="p-3 rounded-md border border-indigo-500/20 bg-indigo-950/30 backdrop-blur-md">
                  <h4 className="text-sm font-medium mb-2 text-indigo-200 flex items-center">
                    <Target className="h-3.5 w-3.5 mr-1 text-indigo-400" />
                    Milestones
                  </h4>
                  <div className="space-y-2">
                    {sortedMilestones.map((milestone, index) => (
                      <motion.div
                        key={milestone.id}
                        className="flex items-center gap-2 p-2 rounded-md border border-indigo-500/10 bg-indigo-950/50"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        style={{
                          transform: isHovered ? `translateZ(${15 + index * 2}px)` : "none",
                          transition: "transform 0.3s ease",
                        }}
                      >
                        <div
                          className={cn(
                            "h-6 w-6 rounded-full flex items-center justify-center",
                            milestone.completed
                              ? "bg-gradient-to-r from-emerald-600/20 to-green-600/20 text-emerald-400"
                              : "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-indigo-400",
                          )}
                        >
                          {milestone.completed ? <Award className="h-3 w-3" /> : <Target className="h-3 w-3" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <p className="text-xs font-medium truncate text-indigo-200">{milestone.name}</p>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-[10px] py-0 h-4 ml-1",
                                milestone.completed
                                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                  : "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
                              )}
                            >
                              {milestone.completed ? "Completed" : format(milestone.targetDate, "MMM d")}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs text-indigo-400">${milestone.amount.toLocaleString()}</p>
                            {!milestone.completed && (
                              <div className="text-xs text-indigo-400">
                                {((milestone.amount / goal.targetAmount) * 100).toFixed(0)}% of goal
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Holographic accent */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      </div>
    </motion.div>
  )
}
