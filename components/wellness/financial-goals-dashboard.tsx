"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Plus,
  Filter,
  TrendingUp,
  DollarSign,
  Target,
  Award,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Sparkles,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { FinancialGoal } from "./financial-goal-card"
import { HolographicFinancialGoalCard } from "./holographic-financial-goal-card"
import { GoalCreationModal } from "./goal-creation-modal"
import { GoalProgressChart } from "./goal-progress-chart"

interface FinancialGoalsDashboardProps {
  className?: string
}

// Sample data for demonstration
const sampleGoals: FinancialGoal[] = [
  {
    id: "1",
    name: "Emergency Fund",
    category: "savings",
    targetAmount: 15000,
    currentAmount: 9750,
    startDate: new Date(2023, 0, 1),
    targetDate: new Date(2023, 11, 31),
    description: "Build a 3-month emergency fund for unexpected expenses",
    milestones: [
      {
        id: "m1",
        name: "1-month expenses",
        targetDate: new Date(2023, 3, 30),
        amount: 5000,
        completed: true,
      },
      {
        id: "m2",
        name: "2-month expenses",
        targetDate: new Date(2023, 7, 31),
        amount: 10000,
        completed: false,
      },
      {
        id: "m3",
        name: "3-month expenses",
        targetDate: new Date(2023, 11, 31),
        amount: 15000,
        completed: false,
      },
    ],
    contributionFrequency: "monthly",
    autoContribution: true,
    contributionAmount: 1250,
    priority: "high",
  },
  {
    id: "2",
    name: "House Down Payment",
    category: "purchase",
    targetAmount: 60000,
    currentAmount: 42000,
    startDate: new Date(2022, 0, 1),
    targetDate: new Date(2024, 11, 31),
    description: "Save for a 20% down payment on a $300,000 home",
    milestones: [
      {
        id: "m1",
        name: "25% saved",
        targetDate: new Date(2022, 11, 31),
        amount: 15000,
        completed: true,
      },
      {
        id: "m2",
        name: "50% saved",
        targetDate: new Date(2023, 11, 31),
        amount: 30000,
        completed: true,
      },
      {
        id: "m3",
        name: "75% saved",
        targetDate: new Date(2024, 5, 30),
        amount: 45000,
        completed: false,
      },
      {
        id: "m4",
        name: "100% saved",
        targetDate: new Date(2024, 11, 31),
        amount: 60000,
        completed: false,
      },
    ],
    contributionFrequency: "monthly",
    autoContribution: true,
    contributionAmount: 1500,
    priority: "high",
  },
  {
    id: "3",
    name: "Vacation Fund",
    category: "savings",
    targetAmount: 5000,
    currentAmount: 3200,
    startDate: new Date(2023, 3, 1),
    targetDate: new Date(2023, 11, 15),
    description: "Save for a 2-week European vacation",
    milestones: [
      {
        id: "m1",
        name: "Flights",
        targetDate: new Date(2023, 6, 30),
        amount: 2000,
        completed: true,
      },
      {
        id: "m2",
        name: "Accommodations",
        targetDate: new Date(2023, 9, 30),
        amount: 3500,
        completed: false,
      },
      {
        id: "m3",
        name: "Spending money",
        targetDate: new Date(2023, 11, 15),
        amount: 5000,
        completed: false,
      },
    ],
    contributionFrequency: "biweekly",
    autoContribution: true,
    contributionAmount: 250,
    priority: "medium",
  },
  {
    id: "4",
    name: "Retirement Fund",
    category: "retirement",
    targetAmount: 1000000,
    currentAmount: 175000,
    startDate: new Date(2020, 0, 1),
    targetDate: new Date(2050, 0, 1),
    description: "Build retirement savings for financial independence",
    milestones: [
      {
        id: "m1",
        name: "$100,000",
        targetDate: new Date(2022, 0, 1),
        amount: 100000,
        completed: true,
      },
      {
        id: "m2",
        name: "$250,000",
        targetDate: new Date(2025, 0, 1),
        amount: 250000,
        completed: false,
      },
      {
        id: "m3",
        name: "$500,000",
        targetDate: new Date(2035, 0, 1),
        amount: 500000,
        completed: false,
      },
    ],
    contributionFrequency: "monthly",
    autoContribution: true,
    contributionAmount: 1000,
    priority: "medium",
  },
  {
    id: "5",
    name: "New Car",
    category: "purchase",
    targetAmount: 25000,
    currentAmount: 5000,
    startDate: new Date(2023, 6, 1),
    targetDate: new Date(2025, 6, 1),
    description: "Save for a new electric vehicle",
    milestones: [
      {
        id: "m1",
        name: "Initial deposit",
        targetDate: new Date(2023, 11, 31),
        amount: 5000,
        completed: true,
      },
      {
        id: "m2",
        name: "Halfway point",
        targetDate: new Date(2024, 6, 30),
        amount: 12500,
        completed: false,
      },
    ],
    contributionFrequency: "monthly",
    autoContribution: false,
    contributionAmount: 800,
    priority: "low",
  },
]

export function FinancialGoalsDashboard({ className }: FinancialGoalsDashboardProps) {
  const [goals, setGoals] = useState<FinancialGoal[]>(sampleGoals)
  const [filteredGoals, setFilteredGoals] = useState<FinancialGoal[]>(sampleGoals)
  const [searchQuery, setSearchQuery] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingGoal, setEditingGoal] = useState<FinancialGoal | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>("progress")
  const [activeSection, setActiveSection] = useState<string | null>(null)

  // Calculate total progress across all goals
  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const overallProgress = Math.round((totalCurrentAmount / totalTargetAmount) * 100)

  // Get goals by category for the chart
  const goalsByCategory = goals.reduce(
    (acc, goal) => {
      if (!acc[goal.category]) {
        acc[goal.category] = {
          target: 0,
          current: 0,
        }
      }
      acc[goal.category].target += goal.targetAmount
      acc[goal.category].current += goal.currentAmount
      return acc
    },
    {} as Record<string, { target: number; current: number }>,
  )

  const chartData = Object.entries(goalsByCategory).map(([category, data]) => ({
    category,
    target: data.target,
    current: data.current,
    percentage: Math.round((data.current / data.target) * 100),
  }))

  // Filter and sort goals
  const filterAndSortGoals = () => {
    let filtered = [...goals]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (goal) => goal.name.toLowerCase().includes(query) || goal.description?.toLowerCase().includes(query),
      )
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((goal) => selectedCategories.includes(goal.category))
    }

    // Apply priority filter
    if (selectedPriorities.length > 0) {
      filtered = filtered.filter((goal) => selectedPriorities.includes(goal.priority))
    }

    // Apply sorting
    switch (sortBy) {
      case "progress":
        filtered.sort((a, b) => b.currentAmount / b.targetAmount - a.currentAmount / a.targetAmount)
        break
      case "amount":
        filtered.sort((a, b) => b.targetAmount - a.targetAmount)
        break
      case "date":
        filtered.sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime())
        break
      case "priority":
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
        break
    }

    setFilteredGoals(filtered)
  }

  // Apply filters when dependencies change
  useEffect(() => {
    filterAndSortGoals()
  }, [goals, searchQuery, selectedCategories, selectedPriorities, sortBy])

  const handleCreateGoal = (newGoal: FinancialGoal) => {
    if (editingGoal) {
      // Update existing goal
      setGoals(goals.map((g) => (g.id === newGoal.id ? newGoal : g)))
    } else {
      // Add new goal
      setGoals([...goals, { ...newGoal, id: String(Date.now()) }])
    }
    setShowModal(false)
    setEditingGoal(null)
  }

  const handleEditGoal = (goal: FinancialGoal) => {
    setEditingGoal(goal)
    setShowModal(true)
  }

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter((g) => g.id !== goalId))
  }

  return (
    <div className={cn("space-y-6", className)}>
      <motion.div
        className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-indigo-100">Financial Goals</h2>
          <p className="text-indigo-300">Track and manage your financial objectives</p>
        </div>

        <Button
          onClick={() => {
            setEditingGoal(null)
            setShowModal(true)
          }}
          className="relative overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, rgba(79, 70, 229, 0.8) 0%, rgba(124, 58, 237, 0.8) 100%)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
          }}
          onMouseEnter={() => setActiveSection("create")}
          onMouseLeave={() => setActiveSection(null)}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 animate-pulse" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3) 50%, transparent 100%)",
                backgroundSize: "200% 200%",
                animation: "shimmer 2s infinite linear",
              }}
            />
          </div>
          <Plus className="mr-2 h-4 w-4" />
          Create New Goal
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
                "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0) 0%, transparent 70%)",
              ],
            }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
            style={{ opacity: activeSection === "create" ? 1 : 0 }}
          />
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="col-span-1 md:col-span-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div
            className="p-6 rounded-lg overflow-hidden relative"
            style={{
              background: "linear-gradient(135deg, rgba(30, 27, 75, 0.7) 0%, rgba(12, 10, 29, 0.7) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(139, 92, 246, 0.1)",
            }}
            onMouseEnter={() => setActiveSection("progress")}
            onMouseLeave={() => setActiveSection(null)}
          >
            {/* Grid overlay */}
            <div
              className="absolute inset-0 z-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(123, 97, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 97, 255, 0.2) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Holographic glow effect */}
            <motion.div
              className="absolute inset-0 z-0"
              animate={{
                opacity: activeSection === "progress" ? [0.1, 0.2, 0.1] : 0,
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(129, 140, 248, 0.2), transparent 70%)",
              }}
            />

            {/* Floating particles */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              {activeSection === "progress" &&
                [...Array(8)].map((_, i) => (
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

            <div className="relative z-10">
              <h3 className="text-lg font-medium mb-4 text-indigo-100 flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-indigo-400" />
                Overall Progress
              </h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-indigo-200">Total Progress</span>
                <motion.span
                  className="text-sm font-bold text-indigo-100"
                  animate={{ scale: activeSection === "progress" ? [1, 1.1, 1] : 1 }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                >
                  {overallProgress}%
                </motion.span>
              </div>

              {/* Holographic progress bar */}
              <div className="h-3 w-full rounded-full bg-indigo-950/50 overflow-hidden mb-4 relative">
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
                  className="h-full rounded-full relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600"
                  style={{ width: `${overallProgress}%` }}
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

              <div className="flex justify-between mb-6">
                <div className="text-sm">
                  <span className="text-indigo-400">Current: </span>
                  <motion.span
                    className="font-medium text-indigo-100"
                    animate={{ scale: activeSection === "progress" ? [1, 1.05, 1] : 1 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                  >
                    ${totalCurrentAmount.toLocaleString()}
                  </motion.span>
                </div>
                <div className="text-sm">
                  <span className="text-indigo-400">Target: </span>
                  <span className="font-medium text-indigo-100">${totalTargetAmount.toLocaleString()}</span>
                </div>
              </div>

              <GoalProgressChart data={chartData} />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="col-span-1"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            className="p-6 rounded-lg h-full overflow-hidden relative"
            style={{
              background: "linear-gradient(135deg, rgba(30, 27, 75, 0.7) 0%, rgba(12, 10, 29, 0.7) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(139, 92, 246, 0.1)",
            }}
            onMouseEnter={() => setActiveSection("summary")}
            onMouseLeave={() => setActiveSection(null)}
          >
            {/* Grid overlay */}
            <div
              className="absolute inset-0 z-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(123, 97, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 97, 255, 0.2) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Holographic glow effect */}
            <motion.div
              className="absolute inset-0 z-0"
              animate={{
                opacity: activeSection === "summary" ? [0.1, 0.2, 0.1] : 0,
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(129, 140, 248, 0.2), transparent 70%)",
              }}
            />

            <div className="relative z-10">
              <h3 className="text-lg font-medium mb-4 text-indigo-100 flex items-center">
                <Zap className="mr-2 h-5 w-5 text-indigo-400" />
                Goal Summary
              </h3>

              <div className="space-y-4">
                {[
                  {
                    title: "Active Goals",
                    value: goals.length,
                    icon: <Target className="h-4 w-4 text-violet-400" />,
                    color: "from-violet-600/20 to-purple-600/20",
                    textColor: "text-violet-300",
                  },
                  {
                    title: "On Track",
                    value: goals.filter((g) => {
                      const progressPercentage = Math.round((g.currentAmount / g.targetAmount) * 100)
                      const totalMonths = (g.targetDate.getTime() - g.startDate.getTime()) / (30 * 24 * 60 * 60 * 1000)
                      const elapsedMonths = (new Date().getTime() - g.startDate.getTime()) / (30 * 24 * 60 * 60 * 1000)
                      const timeProgressPercentage = Math.round((elapsedMonths / totalMonths) * 100)
                      return progressPercentage >= timeProgressPercentage || progressPercentage >= 100
                    }).length,
                    icon: <TrendingUp className="h-4 w-4 text-emerald-400" />,
                    color: "from-emerald-600/20 to-green-600/20",
                    textColor: "text-emerald-300",
                  },
                  {
                    title: "Completed",
                    value: goals.filter((g) => g.currentAmount / g.targetAmount >= 1).length,
                    icon: <Award className="h-4 w-4 text-amber-400" />,
                    color: "from-amber-600/20 to-yellow-600/20",
                    textColor: "text-amber-300",
                  },
                  {
                    title: "Monthly Contribution",
                    value:
                      "$" +
                      goals
                        .reduce((sum, goal) => {
                          let monthlyAmount = 0
                          switch (goal.contributionFrequency) {
                            case "weekly":
                              monthlyAmount = goal.contributionAmount * 4.33
                              break
                            case "biweekly":
                              monthlyAmount = goal.contributionAmount * 2.17
                              break
                            case "monthly":
                              monthlyAmount = goal.contributionAmount
                              break
                          }
                          return sum + (goal.autoContribution ? monthlyAmount : 0)
                        }, 0)
                        .toLocaleString(),
                    icon: <DollarSign className="h-4 w-4 text-blue-400" />,
                    color: "from-blue-600/20 to-cyan-600/20",
                    textColor: "text-blue-300",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-3 rounded-md overflow-hidden relative"
                    style={{
                      background: "rgba(15, 23, 42, 0.3)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(139, 92, 246, 0.2)",
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Gradient background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-30`}
                      style={{
                        mixBlendMode: "overlay",
                      }}
                    />

                    {/* Animated highlight */}
                    <motion.div
                      className="absolute inset-0 opacity-0"
                      animate={{
                        opacity: activeSection === "summary" ? [0, 0.3, 0] : 0,
                      }}
                      transition={{ duration: 3, delay: index * 0.5, repeat: Number.POSITIVE_INFINITY }}
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${
                          item.textColor.includes("emerald")
                            ? "rgba(52, 211, 153, 0.3)"
                            : item.textColor.includes("amber")
                              ? "rgba(251, 191, 36, 0.3)"
                              : item.textColor.includes("blue")
                                ? "rgba(191,36,0.3)"
                                : item.textColor.includes("blue")
                                  ? "rgba(59, 130, 246, 0.3)"
                                  : "rgba(139, 92, 246, 0.3)"
                        }, transparent 70%)`,
                      }}
                    />

                    <div className="flex items-center gap-2 mb-1 relative z-10">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center bg-gradient-to-r ${item.color}`}
                      >
                        {item.icon}
                      </div>
                      <span className="text-sm font-medium text-indigo-200">{item.title}</span>
                    </div>
                    <motion.p
                      className={`text-2xl font-bold ${item.textColor} relative z-10`}
                      animate={{
                        scale: activeSection === "summary" ? [1, 1.05, 1] : 1,
                      }}
                      transition={{ duration: 2, delay: index * 0.2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      {item.value}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-indigo-400" />
          <Input
            placeholder="Search goals..."
            className="pl-9 border-indigo-500/20 bg-indigo-950/30 text-indigo-100 placeholder:text-indigo-400/50"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
            }}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-indigo-500/20 bg-indigo-950/90 backdrop-blur-md">
              <div className="p-2 font-medium text-indigo-200">Categories</div>
              {["savings", "investment", "debt", "purchase", "retirement", "education", "other"].map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    setSelectedCategories(
                      checked ? [...selectedCategories, category] : selectedCategories.filter((c) => c !== category),
                    )
                  }}
                  className="text-indigo-300 focus:bg-indigo-900/50 focus:text-indigo-200"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </DropdownMenuCheckboxItem>
              ))}

              <div className="p-2 font-medium text-indigo-200">Priority</div>
              {["high", "medium", "low"].map((priority) => (
                <DropdownMenuCheckboxItem
                  key={priority}
                  checked={selectedPriorities.includes(priority)}
                  onCheckedChange={(checked) => {
                    setSelectedPriorities(
                      checked ? [...selectedPriorities, priority] : selectedPriorities.filter((p) => p !== priority),
                    )
                  }}
                  className="text-indigo-300 focus:bg-indigo-900/50 focus:text-indigo-200"
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Sort
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-indigo-500/20 bg-indigo-950/90 backdrop-blur-md">
              <DropdownMenuCheckboxItem
                checked={sortBy === "progress"}
                onCheckedChange={() => {
                  setSortBy("progress")
                }}
                className="text-indigo-300 focus:bg-indigo-900/50 focus:text-indigo-200"
              >
                By Progress
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "amount"}
                onCheckedChange={() => {
                  setSortBy("amount")
                }}
                className="text-indigo-300 focus:bg-indigo-900/50 focus:text-indigo-200"
              >
                By Amount
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "date"}
                onCheckedChange={() => {
                  setSortBy("date")
                }}
                className="text-indigo-300 focus:bg-indigo-900/50 focus:text-indigo-200"
              >
                By Target Date
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "priority"}
                onCheckedChange={() => {
                  setSortBy("priority")
                }}
                className="text-indigo-300 focus:bg-indigo-900/50 focus:text-indigo-200"
              >
                By Priority
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredGoals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <HolographicFinancialGoalCard goal={goal} onEdit={handleEditGoal} onDelete={handleDeleteGoal} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredGoals.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="inline-flex h-20 w-20 items-center justify-center rounded-full mb-4"
            style={{
              background: "linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(124, 58, 237, 0.2) 100%)",
              boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)",
            }}
          >
            <Target className="h-10 w-10 text-indigo-400" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-indigo-200">No goals found</h3>
          <p className="text-indigo-400">Try adjusting your filters or create a new goal</p>
        </motion.div>
      )}

      {showModal && (
        <GoalCreationModal
          open={showModal}
          onOpenChange={setShowModal}
          onSave={handleCreateGoal}
          initialData={editingGoal}
        />
      )}
    </div>
  )
}
