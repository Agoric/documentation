"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { format, addMonths, differenceInMonths } from "date-fns"
import { TrendingUp, Calendar, DollarSign, Target, Award, Edit2, Trash2, Sparkles, Lock, Unlock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HolographicDiamondCard } from "@/components/ui/holographic-diamond-card"
import type { FinancialGoal } from "./financial-goal-card"

interface HolographicFinancialGoalCardProps {
  goal: FinancialGoal
  onEdit?: (goal: FinancialGoal) => void
  onDelete?: (goalId: string) => void
  className?: string
}

export function HolographicFinancialGoalCard({ goal, onEdit, onDelete, className }: HolographicFinancialGoalCardProps) {
  const [activeAction, setActiveAction] = useState<string | null>(null)

  // Calculate progress percentages
  const progressPercentage = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100))
  const remainingAmount = goal.targetAmount - goal.currentAmount

  const totalMonths = differenceInMonths(goal.targetDate, goal.startDate) || 1
  const elapsedMonths = differenceInMonths(new Date(), goal.startDate)
  const timeProgressPercentage = Math.min(100, Math.round((elapsedMonths / totalMonths) * 100))

  const isAhead = progressPercentage > timeProgressPercentage
  const isBehind = progressPercentage < timeProgressPercentage && progressPercentage < 100
  const isOnTrack = !isAhead && !isBehind

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

  const goalIcon = (
    <div className="relative">
      {getCategoryIcon()}
      {progressPercentage >= 100 && <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-emerald-400" />}
    </div>
  )

  return (
    <HolographicDiamondCard
      title={goal.name}
      subtitle={`${goal.category.charAt(0).toUpperCase() + goal.category.slice(1)} • ${goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)} Priority`}
      icon={goalIcon}
      className={className}
      defaultExpanded={false}
      variant={progressPercentage >= 100 ? "secondary" : isAhead ? "primary" : isBehind ? "accent" : "primary"}
      size="md"
    >
      <div className="space-y-4">
        {/* Progress section with holographic display */}
        <div className="p-3 rounded-lg border border-indigo-500/20 bg-indigo-950/30 backdrop-blur-md">
          <div className="flex justify-between items-center mb-2">
            <span
              className="text-sm font-medium text-indigo-200"
              style={{ textShadow: "0 0 5px rgba(129, 140, 248, 0.5)" }}
            >
              Progress
            </span>
            <motion.span
              className="text-sm font-bold text-indigo-100"
              style={{ textShadow: "0 0 10px rgba(129, 140, 248, 0.8)" }}
            >
              {progressPercentage}%
            </motion.span>
          </div>

          {/* Holographic progress bar */}
          <div className="h-3 w-full rounded-full bg-indigo-950/50 overflow-hidden mb-2 relative border border-indigo-500/20">
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2) 50%, transparent 100%)",
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
              style={{
                width: `${progressPercentage}%`,
                boxShadow: "0 0 15px rgba(129, 140, 248, 0.6)",
              }}
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

          {/* Amount display */}
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <span className="text-indigo-400">Current: </span>
              <motion.span
                className="font-medium text-indigo-100"
                style={{ textShadow: "0 0 8px rgba(129, 140, 248, 0.8)" }}
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
          <div className="flex items-center gap-1.5 mt-2 justify-center p-2 rounded-md bg-indigo-950/50 border border-indigo-500/20">
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
              style={{
                boxShadow: "0 0 10px currentColor",
              }}
            />
            <motion.span
              className={cn("text-sm font-medium", getStatusColor())}
              style={{ textShadow: "0 0 8px currentColor" }}
            >
              {getStatusText()}
            </motion.span>
          </div>
        </div>

        {/* Date information */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-2 rounded-md border border-indigo-500/20 bg-indigo-950/30 backdrop-blur-md">
            <div className="flex items-center gap-1.5 mb-1">
              <Calendar className="h-3.5 w-3.5 text-blue-400" />
              <span
                className="text-xs font-medium text-indigo-200"
                style={{ textShadow: "0 0 5px rgba(129, 140, 248, 0.5)" }}
              >
                Target Date
              </span>
            </div>
            <p className="text-sm text-indigo-100">{format(goal.targetDate, "MMM d, yyyy")}</p>
          </div>

          <div className="p-2 rounded-md border border-indigo-500/20 bg-indigo-950/30 backdrop-blur-md">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              <span
                className="text-xs font-medium text-indigo-200"
                style={{ textShadow: "0 0 5px rgba(129, 140, 248, 0.5)" }}
              >
                Projected
              </span>
            </div>
            <motion.p className="text-sm text-indigo-100" style={{ textShadow: "0 0 5px rgba(129, 140, 248, 0.5)" }}>
              {getProjectedCompletionDate()}
            </motion.p>
          </div>
        </div>

        {/* Contribution plan */}
        <div className="p-3 rounded-md border border-indigo-500/20 bg-indigo-950/30 backdrop-blur-md">
          <h4
            className="text-sm font-medium mb-2 text-indigo-200 flex items-center"
            style={{ textShadow: "0 0 5px rgba(129, 140, 248, 0.5)" }}
          >
            <DollarSign className="h-3.5 w-3.5 mr-1 text-indigo-400" />
            Contribution Plan
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-2 rounded-md bg-indigo-950/50 border border-indigo-500/10">
              <div className="text-xs text-indigo-400 mb-1">Amount</div>
              <div
                className="text-sm font-medium text-indigo-100"
                style={{ textShadow: "0 0 5px rgba(129, 140, 248, 0.5)" }}
              >
                ${goal.contributionAmount}
              </div>
            </div>
            <div className="p-2 rounded-md bg-indigo-950/50 border border-indigo-500/10">
              <div className="text-xs text-indigo-400 mb-1">Frequency</div>
              <div
                className="text-sm font-medium text-indigo-100"
                style={{ textShadow: "0 0 5px rgba(129, 140, 248, 0.5)" }}
              >
                {goal.contributionFrequency.charAt(0).toUpperCase() + goal.contributionFrequency.slice(1)}
              </div>
            </div>
          </div>
          <div className="mt-2 p-2 rounded-md bg-indigo-950/50 border border-indigo-500/10 flex items-center justify-between">
            <div>
              <div className="text-xs text-indigo-400 mb-1">Auto-contribution</div>
              <div
                className="text-sm font-medium text-indigo-100"
                style={{ textShadow: "0 0 5px rgba(129, 140, 248, 0.5)" }}
              >
                {goal.autoContribution ? "Enabled" : "Disabled"}
              </div>
            </div>
            {goal.autoContribution ? (
              <Unlock
                className="h-5 w-5 text-emerald-400"
                style={{ filter: "drop-shadow(0 0 5px rgba(52, 211, 153, 0.8))" }}
              />
            ) : (
              <Lock
                className="h-5 w-5 text-amber-400"
                style={{ filter: "drop-shadow(0 0 5px rgba(245, 158, 11, 0.8))" }}
              />
            )}
          </div>
        </div>

        {/* Milestones */}
        {sortedMilestones.length > 0 && (
          <div className="p-3 rounded-md border border-indigo-500/20 bg-indigo-950/30 backdrop-blur-md">
            <h4
              className="text-sm font-medium mb-2 text-indigo-200 flex items-center"
              style={{ textShadow: "0 0 5px rgba(129, 140, 248, 0.5)" }}
            >
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
                >
                  <div
                    className={cn(
                      "h-6 w-6 rounded-full flex items-center justify-center",
                      milestone.completed
                        ? "bg-gradient-to-r from-emerald-600/20 to-green-600/20 text-emerald-400"
                        : "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-indigo-400",
                    )}
                    style={{
                      boxShadow: milestone.completed
                        ? "0 0 10px rgba(52, 211, 153, 0.5)"
                        : "0 0 10px rgba(129, 140, 248, 0.5)",
                    }}
                  >
                    {milestone.completed ? <Award className="h-3 w-3" /> : <Target className="h-3 w-3" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p
                        className="text-xs font-medium truncate text-indigo-200"
                        style={{ textShadow: "0 0 3px rgba(129, 140, 248, 0.5)" }}
                      >
                        {milestone.name}
                      </p>
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

        {/* Action buttons */}
        <div className="flex items-center justify-between gap-2">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200 transition-all duration-300",
                activeAction === "edit" && "border-indigo-500/50 bg-indigo-900/50 text-indigo-100",
              )}
              onMouseEnter={() => setActiveAction("edit")}
              onMouseLeave={() => setActiveAction(null)}
              onClick={() => onEdit(goal)}
              style={{
                textShadow: "0 0 5px rgba(129, 140, 248, 0.5)",
                boxShadow: activeAction === "edit" ? "0 0 10px rgba(99, 102, 241, 0.3)" : "none",
              }}
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
                activeAction === "delete" && "border-red-500/50 bg-red-900/50 text-red-100",
              )}
              onMouseEnter={() => setActiveAction("delete")}
              onMouseLeave={() => setActiveAction(null)}
              onClick={() => onDelete(goal.id)}
              style={{
                textShadow: "0 0 5px rgba(239, 68, 68, 0.5)",
                boxShadow: activeAction === "delete" ? "0 0 10px rgba(239, 68, 68, 0.3)" : "none",
              }}
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Delete
            </Button>
          )}
        </div>
      </div>
    </HolographicDiamondCard>
  )
}
