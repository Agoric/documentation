"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface Milestone {
  id: string
  name: string
  targetDate: Date
  amount: number
  completed: boolean
}

export interface FinancialGoal {
  id: string
  name: string
  category: "savings" | "investment" | "debt" | "purchase" | "retirement" | "education" | "other"
  targetAmount: number
  currentAmount: number
  startDate: Date
  targetDate: Date
  description?: string
  milestones: Milestone[]
  contributionFrequency: "weekly" | "biweekly" | "monthly"
  autoContribution: boolean
  contributionAmount: number
  priority: "low" | "medium" | "high"
  icon?: string
}

interface FinancialGoalCardProps {
  goal: FinancialGoal
  onEdit?: (goal: FinancialGoal) => void
  onDelete?: (goalId: string) => void
  className?: string
}

export function FinancialGoalCard({ goal, onEdit, onDelete, className }: FinancialGoalCardProps) {
  const [expanded, setExpanded] = useState(false)

  const progressPercentage = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100))
  const remainingAmount = goal.targetAmount - goal.currentAmount

  const totalMonths = differenceInMonths(goal.targetDate, goal.startDate) || 1
  const elapsedMonths = differenceInMonths(new Date(), goal.startDate)
  const timeProgressPercentage = Math.min(100, Math.round((elapsedMonths / totalMonths) * 100))

  const isAhead = progressPercentage > timeProgressPercentage
  const isBehind = progressPercentage < timeProgressPercentage && progressPercentage < 100
  const isOnTrack = !isAhead && !isBehind

  const getStatusColor = () => {
    if (progressPercentage >= 100) return "text-green-500"
    if (isAhead) return "text-green-500"
    if (isBehind) return "text-amber-500"
    return "text-blue-500"
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("border rounded-lg overflow-hidden bg-white/80 dark:bg-black/40 backdrop-blur-sm", className)}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center",
                goal.category === "savings"
                  ? "bg-blue-100 text-blue-600"
                  : goal.category === "investment"
                    ? "bg-green-100 text-green-600"
                    : goal.category === "debt"
                      ? "bg-red-100 text-red-600"
                      : goal.category === "purchase"
                        ? "bg-purple-100 text-purple-600"
                        : goal.category === "retirement"
                          ? "bg-amber-100 text-amber-600"
                          : goal.category === "education"
                            ? "bg-indigo-100 text-indigo-600"
                            : "bg-gray-100 text-gray-600",
              )}
            >
              {getCategoryIcon()}
            </div>
            <div>
              <h3 className="font-medium">{goal.name}</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-[10px] py-0 h-4">
                  {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
                </Badge>
                <span>•</span>
                <Badge
                  variant={
                    goal.priority === "high" ? "destructive" : goal.priority === "medium" ? "default" : "outline"
                  }
                  className="text-[10px] py-0 h-4"
                >
                  {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)} Priority
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {onEdit && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(goal)}>
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit goal</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {onDelete && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onDelete(goal.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete goal</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />

          <div className="flex justify-between mt-3">
            <div className="text-sm">
              <span className="text-muted-foreground">Current: </span>
              <span className="font-medium">${goal.currentAmount.toLocaleString()}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Target: </span>
              <span className="font-medium">${goal.targetAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-3">
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                progressPercentage >= 100
                  ? "bg-green-500"
                  : isAhead
                    ? "bg-green-500"
                    : isBehind
                      ? "bg-amber-500"
                      : "bg-blue-500",
              )}
            />
            <span className={cn("text-sm", getStatusColor())}>{getStatusText()}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="p-2 border rounded-md">
            <div className="flex items-center gap-1.5 mb-1">
              <Calendar className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-xs font-medium">Target Date</span>
            </div>
            <p className="text-sm">{format(goal.targetDate, "MMM d, yyyy")}</p>
          </div>

          <div className="p-2 border rounded-md">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="h-3.5 w-3.5 text-purple-500" />
              <span className="text-xs font-medium">Projected</span>
            </div>
            <p className="text-sm">{getProjectedCompletionDate()}</p>
          </div>
        </div>

        <Button variant="ghost" size="sm" className="w-full mt-3 text-xs" onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            <>
              <ChevronUp className="h-3.5 w-3.5 mr-1" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5 mr-1" />
              Show details
            </>
          )}
        </Button>
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t pt-3">
          {goal.description && (
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1">Description</h4>
              <p className="text-sm text-muted-foreground">{goal.description}</p>
            </div>
          )}

          <div className="mb-3">
            <h4 className="text-sm font-medium mb-1">Contribution Plan</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Amount: </span>
                <span className="font-medium">${goal.contributionAmount}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Frequency: </span>
                <span className="font-medium">{goal.contributionFrequency}</span>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Auto-contribution: </span>
                <span className="font-medium">{goal.autoContribution ? "Enabled" : "Disabled"}</span>
              </div>
            </div>
          </div>

          {sortedMilestones.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Milestones</h4>
              <div className="space-y-2">
                {sortedMilestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center gap-2 p-2 border rounded-md">
                    <div
                      className={cn(
                        "h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0",
                        milestone.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600",
                      )}
                    >
                      {milestone.completed ? <Award className="h-3 w-3" /> : <Target className="h-3 w-3" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="text-xs font-medium truncate">{milestone.name}</p>
                        <Badge
                          variant={milestone.completed ? "success" : "outline"}
                          className="text-[10px] py-0 h-4 ml-1"
                        >
                          {milestone.completed ? "Completed" : format(milestone.targetDate, "MMM d")}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">${milestone.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}
