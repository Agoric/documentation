"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useJonlorenzoTheme } from "@/contexts/jonlorenzo-theme-context"
import {
  Sparkles,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Target,
  Navigation,
  MessageCircle,
} from "lucide-react"

interface GuidanceStep {
  id: string
  title: string
  description: string
  action: string
  completed: boolean
  required: boolean
  category: "navigation" | "action" | "information" | "completion"
}

interface GuidanceTask {
  id: string
  title: string
  description: string
  steps: GuidanceStep[]
  progress: number
  priority: "low" | "medium" | "high" | "critical"
  estimatedTime: string
}

const SAMPLE_TASKS: GuidanceTask[] = [
  {
    id: "setup-profile",
    title: "Complete Your Profile",
    description: "Set up your global citizenship profile for maximum benefits",
    progress: 60,
    priority: "high",
    estimatedTime: "5 minutes",
    steps: [
      {
        id: "basic-info",
        title: "Basic Information",
        description: "Enter your personal details",
        action: "Go to Profile Settings",
        completed: true,
        required: true,
        category: "navigation",
      },
      {
        id: "citizenship-docs",
        title: "Upload Documents",
        description: "Upload required citizenship documents",
        action: "Upload Documents",
        completed: true,
        required: true,
        category: "action",
      },
      {
        id: "verify-identity",
        title: "Identity Verification",
        description: "Complete identity verification process",
        action: "Start Verification",
        completed: false,
        required: true,
        category: "action",
      },
      {
        id: "setup-banking",
        title: "Banking Integration",
        description: "Connect your banking for QGI investments",
        action: "Connect Bank Account",
        completed: false,
        required: false,
        category: "action",
      },
    ],
  },
  {
    id: "qgi-investment",
    title: "QGI Investment Setup",
    description: "Configure your Qualified Global Investment portfolio",
    progress: 25,
    priority: "critical",
    estimatedTime: "10 minutes",
    steps: [
      {
        id: "investment-amount",
        title: "Set Investment Amount",
        description: "Choose your QGI investment level",
        action: "Select Investment Tier",
        completed: true,
        required: true,
        category: "action",
      },
      {
        id: "risk-assessment",
        title: "Risk Assessment",
        description: "Complete investment risk profile",
        action: "Take Assessment",
        completed: false,
        required: true,
        category: "action",
      },
      {
        id: "legal-review",
        title: "Legal Documentation",
        description: "Review and sign investment agreements",
        action: "Review Documents",
        completed: false,
        required: true,
        category: "information",
      },
      {
        id: "fund-transfer",
        title: "Fund Transfer",
        description: "Transfer funds to QGI account",
        action: "Initiate Transfer",
        completed: false,
        required: true,
        category: "action",
      },
    ],
  },
]

export function GeniusGuideOrb() {
  const { geniusActive, theme } = useJonlorenzoTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [currentTask, setCurrentTask] = useState<GuidanceTask | null>(null)
  const [currentStep, setCurrentStep] = useState<GuidanceStep | null>(null)
  const [isGuiding, setIsGuiding] = useState(false)
  const [isCommunicating, setIsCommunicating] = useState(false)
  const [guidanceMessage, setGuidanceMessage] = useState("")
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [isFollowing, setIsFollowing] = useState(false)
  const [tasks, setTasks] = useState<GuidanceTask[]>(SAMPLE_TASKS)

  const orbRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })

  // Show/hide based on genius activation
  useEffect(() => {
    if (geniusActive) {
      setIsVisible(true)
      // Auto-start with highest priority incomplete task
      const priorityTask = tasks
        .filter((task) => task.progress < 100)
        .sort((a, b) => {
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        })[0]

      if (priorityTask) {
        setTimeout(() => {
          startGuidance(priorityTask)
        }, 1000)
      }
    } else {
      setIsVisible(false)
      setIsGuiding(false)
      setCurrentTask(null)
      setCurrentStep(null)
    }
  }, [geniusActive])

  // Mouse following effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }

      if (isFollowing && !isGuiding) {
        // Smooth following with delay
        setTimeout(() => {
          setPosition((prev) => ({
            x: prev.x + (mousePosition.current.x - prev.x) * 0.1,
            y: prev.y + (mousePosition.current.y - prev.y) * 0.1,
          }))
        }, 100)
      }
    }

    if (isVisible) {
      window.addEventListener("mousemove", handleMouseMove)
      setIsFollowing(true)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isVisible, isFollowing, isGuiding])

  const startGuidance = (task: GuidanceTask) => {
    setCurrentTask(task)
    setIsGuiding(true)
    setIsFollowing(false)

    // Find next incomplete step
    const nextStep = task.steps.find((step) => !step.completed)
    if (nextStep) {
      setCurrentStep(nextStep)
      communicate(`Let me guide you through: ${task.title}. First, we need to ${nextStep.title.toLowerCase()}.`)
    }
  }

  const completeStep = (stepId: string) => {
    if (!currentTask) return

    setTasks((prev) =>
      prev.map((task) =>
        task.id === currentTask.id
          ? {
              ...task,
              steps: task.steps.map((step) => (step.id === stepId ? { ...step, completed: true } : step)),
              progress: Math.round(
                (task.steps.filter((s) => s.completed || s.id === stepId).length / task.steps.length) * 100,
              ),
            }
          : task,
      ),
    )

    // Move to next step
    const updatedTask = tasks.find((t) => t.id === currentTask.id)
    if (updatedTask) {
      const nextStep = updatedTask.steps.find((step) => !step.completed && step.id !== stepId)
      if (nextStep) {
        setCurrentStep(nextStep)
        communicate(`Great! Now let's ${nextStep.title.toLowerCase()}.`)
      } else {
        // Task completed
        communicate(`Excellent! You've completed "${currentTask.title}". Looking for your next priority...`)
        setTimeout(() => {
          const nextTask = tasks.find((task) => task.progress < 100 && task.id !== currentTask.id)
          if (nextTask) {
            startGuidance(nextTask)
          } else {
            setIsGuiding(false)
            setIsFollowing(true)
            communicate("All tasks completed! I'll continue to assist you as needed.")
          }
        }, 3000)
      }
    }
  }

  const communicate = (message: string) => {
    setIsCommunicating(true)
    setGuidanceMessage(message)

    // Auto-hide message after 5 seconds
    setTimeout(() => {
      setIsCommunicating(false)
      setGuidanceMessage("")
    }, 5000)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-400"
      case "high":
        return "text-orange-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-green-400"
      default:
        return "text-blue-400"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "navigation":
        return Navigation
      case "action":
        return Target
      case "information":
        return Lightbulb
      case "completion":
        return CheckCircle
      default:
        return Sparkles
    }
  }

  if (!isVisible) return null

  return (
    <>
      {/* Main Genius Orb */}
      <motion.div
        ref={orbRef}
        className="fixed z-40 pointer-events-none"
        style={{
          left: position.x - 25,
          top: position.y - 25,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
      >
        <motion.div
          className="w-12 h-12 rounded-full bg-gradient-to-br from-genius-400 to-genius-600 flex items-center justify-center cursor-pointer pointer-events-auto"
          animate={
            isCommunicating
              ? {
                  scale: [1, 1.3, 1.1, 1.3, 1],
                  boxShadow: [
                    "0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(99, 102, 241, 0.3)",
                    "0 0 50px rgba(99, 102, 241, 0.8), 0 0 100px rgba(99, 102, 241, 0.5)",
                    "0 0 40px rgba(99, 102, 241, 0.6), 0 0 80px rgba(99, 102, 241, 0.4)",
                    "0 0 50px rgba(99, 102, 241, 0.8), 0 0 100px rgba(99, 102, 241, 0.5)",
                    "0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(99, 102, 241, 0.3)",
                  ],
                }
              : {
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(99, 102, 241, 0.3)",
                    "0 0 40px rgba(99, 102, 241, 0.6), 0 0 80px rgba(99, 102, 241, 0.4)",
                    "0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(99, 102, 241, 0.3)",
                  ],
                }
          }
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: isCommunicating ? 0.8 : 3,
          }}
          onClick={() => {
            if (!isGuiding && tasks.some((task) => task.progress < 100)) {
              const nextTask = tasks.find((task) => task.progress < 100)
              if (nextTask) startGuidance(nextTask)
            }
          }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>

        {/* Orb Status Indicator */}
        <div className="absolute -top-1 -right-1">
          {isGuiding && (
            <motion.div
              className="w-3 h-3 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
            />
          )}
        </div>
      </motion.div>

      {/* Communication Bubble */}
      <AnimatePresence>
        {isCommunicating && guidanceMessage && (
          <motion.div
            className="fixed z-50 pointer-events-none"
            style={{
              left: position.x + 40,
              top: position.y - 60,
            }}
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
          >
            <Card className="bg-gradient-to-br from-genius-900/95 to-genius-800/95 backdrop-blur-xl border-genius-400/30 max-w-xs">
              <CardContent className="p-3">
                <div className="flex items-start space-x-2">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  >
                    <MessageCircle className="w-4 h-4 text-genius-300 mt-0.5" />
                  </motion.div>
                  <div className="text-sm text-genius-100">{guidanceMessage}</div>
                </div>
              </CardContent>
            </Card>
            {/* Speech bubble tail */}
            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-genius-800/95"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guidance Panel */}
      <AnimatePresence>
        {isGuiding && currentTask && (
          <motion.div
            className="fixed bottom-6 left-6 z-50"
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 50 }}
          >
            <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30 w-96">
              <CardContent className="p-4">
                {/* Task Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5 text-genius-500" />
                    </motion.div>
                    <div>
                      <h3 className="text-illumination-300 font-bold text-sm">{currentTask.title}</h3>
                      <p className="text-illumination-400/70 text-xs">{currentTask.description}</p>
                    </div>
                  </div>
                  <Badge className={`${getPriorityColor(currentTask.priority)} bg-opacity-20 border-opacity-30`}>
                    {currentTask.priority.toUpperCase()}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-illumination-300">Progress</span>
                    <span className="text-illumination-400">{currentTask.progress}%</span>
                  </div>
                  <div className="w-full bg-royal-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-genius-500 to-genius-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${currentTask.progress}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>

                {/* Current Step */}
                {currentStep && (
                  <div className="mb-4 p-3 bg-gradient-to-r from-genius-800/20 to-genius-700/20 rounded-lg border border-genius-400/30">
                    <div className="flex items-start space-x-3">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                      >
                        {(() => {
                          const IconComponent = getCategoryIcon(currentStep.category)
                          return <IconComponent className="w-4 h-4 text-genius-400 mt-0.5" />
                        })()}
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="text-genius-300 font-medium text-sm">{currentStep.title}</h4>
                        <p className="text-genius-400/70 text-xs mb-2">{currentStep.description}</p>
                        <Button
                          size="sm"
                          onClick={() => completeStep(currentStep.id)}
                          className="bg-gradient-to-r from-genius-600 to-genius-700 hover:from-genius-700 hover:to-genius-800"
                        >
                          <ArrowRight className="w-3 h-3 mr-1" />
                          {currentStep.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Steps Overview */}
                <div className="space-y-2">
                  <div className="text-xs text-illumination-300 font-medium">Steps:</div>
                  {currentTask.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`flex items-center space-x-2 text-xs p-2 rounded ${
                        step.completed
                          ? "bg-green-800/20 border border-green-400/30"
                          : step.id === currentStep?.id
                            ? "bg-genius-800/20 border border-genius-400/30"
                            : "bg-royal-200/20 border border-royal-400/30"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {step.completed ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : step.id === currentStep?.id ? (
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "linear" }}
                          >
                            <Zap className="w-3 h-3 text-genius-400" />
                          </motion.div>
                        ) : (
                          <div className="w-3 h-3 rounded-full border border-royal-400" />
                        )}
                      </div>
                      <span
                        className={`flex-1 ${
                          step.completed
                            ? "text-green-300"
                            : step.id === currentStep?.id
                              ? "text-genius-300"
                              : "text-royal-300"
                        }`}
                      >
                        {step.title}
                      </span>
                      {step.required && <AlertCircle className="w-3 h-3 text-orange-400" />}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-4 pt-3 border-t border-illumination-400/20 flex items-center justify-between text-xs">
                  <span className="text-illumination-400">Est. {currentTask.estimatedTime}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setIsGuiding(false)
                      setIsFollowing(true)
                      setCurrentTask(null)
                      setCurrentStep(null)
                    }}
                    className="text-illumination-400 hover:text-illumination-300"
                  >
                    Dismiss Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task Overview (when not actively guiding) */}
      <AnimatePresence>
        {isVisible && !isGuiding && tasks.some((task) => task.progress < 100) && (
          <motion.div
            className="fixed top-20 right-6 z-40"
            initial={{ scale: 0, opacity: 0, x: 50 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0, opacity: 0, x: 50 }}
          >
            <Card className="bg-gradient-to-br from-royal-50/90 to-royal-100/90 backdrop-blur-xl border-illumination-400/30 w-80">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles className="w-4 h-4 text-genius-500" />
                  <span className="text-illumination-300 font-medium text-sm">Available Guidance</span>
                </div>

                <div className="space-y-2">
                  {tasks
                    .filter((task) => task.progress < 100)
                    .slice(0, 3)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="p-2 bg-royal-200/20 rounded border border-royal-400/30 cursor-pointer hover:bg-royal-200/30 transition-colors"
                        onClick={() => startGuidance(task)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-illumination-300 text-xs font-medium">{task.title}</div>
                            <div className="text-illumination-400/70 text-xs">{task.progress}% complete</div>
                          </div>
                          <Badge
                            className={`${getPriorityColor(task.priority)} bg-opacity-20 border-opacity-30 text-xs`}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>

                <Button
                  size="sm"
                  className="w-full mt-3 bg-gradient-to-r from-genius-600 to-genius-700 hover:from-genius-700 hover:to-genius-800"
                  onClick={() => {
                    const nextTask = tasks.find((task) => task.progress < 100)
                    if (nextTask) startGuidance(nextTask)
                  }}
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Start Guidance
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
