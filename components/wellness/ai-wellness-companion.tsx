"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import {
  Brain,
  Calendar,
  CreditCard,
  MapPin,
  Heart,
  Activity,
  Clock,
  AlertTriangle,
  ThumbsUp,
  Send,
  User,
  X,
  Maximize2,
  Minimize2,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FinancialGoalsDashboard } from "@/components/wellness/financial-goals-dashboard" // Import FinancialGoalsDashboard

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  sentiment?: "neutral" | "positive" | "negative" | "warning"
  type?: "text" | "insight" | "reminder" | "suggestion" | "celebration"
}

interface BehaviorPattern {
  name: string
  impact: "positive" | "negative" | "neutral"
  confidence: number
  description: string
  suggestion?: string
}

interface StressLevel {
  level: number
  factors: { name: string; impact: number }[]
  timestamp: Date
}

const initialPatterns: BehaviorPattern[] = [
  {
    name: "Morning Coffee Shop Visits",
    impact: "negative",
    confidence: 87,
    description: "Daily coffee shop visits average $6.75 and add up to $148.50/month",
    suggestion: "Consider brewing at home 4 days a week to save $108/month",
  },
  {
    name: "Weekend Grocery Shopping",
    impact: "positive",
    confidence: 92,
    description: "Shopping with a list on weekends reduces impulse purchases by 34%",
  },
  {
    name: "Late Night Online Shopping",
    impact: "negative",
    confidence: 78,
    description: "Shopping between 11pm-2am results in 52% more returns",
    suggestion: "Add items to cart but delay purchase until morning",
  },
  {
    name: "Exercise After Work",
    impact: "positive",
    confidence: 94,
    description: "Gym sessions correlate with 27% fewer impulse food purchases that evening",
  },
]

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Good morning! How are you feeling today?",
    sender: "ai",
    timestamp: new Date(),
    sentiment: "neutral",
    type: "text",
  },
]

const initialStressData: StressLevel[] = [
  {
    level: 30,
    factors: [
      { name: "Sleep", impact: 10 },
      { name: "Exercise", impact: 20 },
    ],
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    level: 45,
    factors: [
      { name: "Work", impact: 25 },
      { name: "Sleep", impact: 15 },
      { name: "Finance", impact: 5 },
    ],
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
  },
  {
    level: 60,
    factors: [
      { name: "Work", impact: 30 },
      { name: "Finance", impact: 25 },
      { name: "Sleep", impact: 5 },
    ],
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    level: 65,
    factors: [
      { name: "Work", impact: 35 },
      { name: "Finance", impact: 30 },
    ],
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    level: 40,
    factors: [
      { name: "Work", impact: 20 },
      { name: "Exercise", impact: -20 },
      { name: "Finance", impact: 20 },
    ],
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    level: 35,
    factors: [
      { name: "Sleep", impact: -10 },
      { name: "Exercise", impact: -15 },
      { name: "Finance", impact: 15 },
    ],
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    level: 25,
    factors: [
      { name: "Sleep", impact: -15 },
      { name: "Exercise", impact: -15 },
      { name: "Meditation", impact: -10 },
    ],
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
]

interface AIWellnessCompanionProps {
  className?: string
}

export function AIWellnessCompanion({ className }: AIWellnessCompanionProps) {
  const { theme } = useTheme()
  const [expanded, setExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<"chat" | "patterns" | "stress" | "goals">("chat")
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [patterns, setPatterns] = useState<BehaviorPattern[]>(initialPatterns)
  const [stressData, setStressData] = useState<StressLevel[]>(initialStressData)
  const [currentStress, setCurrentStress] = useState<number>(25)
  const [isTyping, setIsTyping] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (activeTab === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, activeTab])

  // Simulate stress level changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Random small fluctuation in stress level
      setCurrentStress((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1
        const newValue = prev + change
        return Math.max(0, Math.min(100, newValue))
      })
    }, 60000) // Every minute

    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      sentiment: "neutral",
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(
      () => {
        setIsTyping(false)

        // Generate response based on user input
        let responseContent = ""
        let sentiment: Message["sentiment"] = "neutral"
        let type: Message["type"] = "text"

        const lowercaseInput = inputValue.toLowerCase()

        if (
          lowercaseInput.includes("stress") ||
          lowercaseInput.includes("anxiety") ||
          lowercaseInput.includes("worried")
        ) {
          responseContent =
            "I notice you're mentioning stress. Your current stress indicators are relatively low at 25%. Would you like to explore some calming exercises or see what factors have been affecting your stress levels recently?"
          sentiment = "warning"
          type = "insight"
        } else if (
          lowercaseInput.includes("coffee") ||
          lowercaseInput.includes("starbucks") ||
          lowercaseInput.includes("spending")
        ) {
          responseContent =
            "I've noticed you've been spending about $148 on coffee shops monthly. That's 8% of your discretionary spending. Would you like some alternatives that could save you around $108/month while still enjoying quality coffee?"
          sentiment = "warning"
          type = "insight"
        } else if (
          lowercaseInput.includes("exercise") ||
          lowercaseInput.includes("gym") ||
          lowercaseInput.includes("workout")
        ) {
          responseContent =
            "Great job on your consistent workouts lately! I've noticed you've been exercising 3-4 times weekly which correlates with better financial decisions afterward. Your evening impulse purchases drop by 27% on days you exercise."
          sentiment = "positive"
          type = "celebration"
        } else if (
          lowercaseInput.includes("savings") ||
          lowercaseInput.includes("goal") ||
          lowercaseInput.includes("house")
        ) {
          responseContent =
            "You're making excellent progress on your house down payment goal! You're now at 68% with consistent monthly contributions. At this rate, you'll reach your goal by October - that's 2 months ahead of schedule!"
          sentiment = "positive"
          type = "celebration"
        } else if (
          lowercaseInput.includes("goal") ||
          lowercaseInput.includes("target") ||
          lowercaseInput.includes("financial plan")
        ) {
          responseContent =
            "I see you're interested in your financial goals! You're making excellent progress on your house down payment (70%) and emergency fund (65%). Would you like to set a new goal or review your existing ones in more detail?"
          sentiment = "positive"
          type = "insight"
        } else if (
          lowercaseInput.includes("meeting") ||
          lowercaseInput.includes("appointment") ||
          lowercaseInput.includes("schedule")
        ) {
          responseContent =
            "I've added a reminder for your upcoming financial review meeting on Friday at 2pm. Would you like me to prepare a summary of your recent transactions and spending patterns before the meeting?"
          type = "reminder"
        } else {
          const responses = [
            "I'm here to support your financial and emotional wellbeing. How can I help with your financial goals or daily patterns today?",
            "Based on your recent activity, you're making good progress toward financial balance. Anything specific you'd like insights on?",
            "I notice your stress levels have decreased over the past week - great job on incorporating those meditation sessions!",
            "Would you like me to analyze any particular spending habits or behaviors that might be affecting your financial goals?",
          ]
          responseContent = responses[Math.floor(Math.random() * responses.length)]
        }

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: responseContent,
          sender: "ai",
          timestamp: new Date(),
          sentiment,
          type,
        }

        setMessages((prev) => [...prev, aiMessage])
      },
      1000 + Math.random() * 1000,
    )
  }

  const getStressColor = (level: number) => {
    if (level < 30) return "bg-green-500"
    if (level < 60) return "bg-amber-500"
    return "bg-red-500"
  }

  const renderMessageContent = (message: Message) => {
    if (message.sender === "user") {
      return <p>{message.content}</p>
    }

    switch (message.type) {
      case "insight":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              <span className="font-medium">AI Insight</span>
            </div>
            <p>{message.content}</p>
          </div>
        )
      case "reminder":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span className="font-medium">Reminder Set</span>
            </div>
            <p>{message.content}</p>
          </div>
        )
      case "suggestion":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="font-medium">Suggestion</span>
            </div>
            <p>{message.content}</p>
          </div>
        )
      case "celebration":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 text-green-500" />
              <span className="font-medium">Achievement</span>
            </div>
            <p>{message.content}</p>
          </div>
        )
      default:
        return <p>{message.content}</p>
    }
  }

  // Get background class based on theme
  const getBackgroundClass = () => {
    if (theme === "dark") {
      return "bg-black/80 backdrop-blur-md border border-gray-800"
    }
    return "bg-white/90 backdrop-blur-md border border-gray-200"
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          height: minimized ? "60px" : expanded ? "600px" : "400px",
          width: minimized ? "270px" : expanded ? "800px" : "370px",
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          getBackgroundClass(),
          "fixed bottom-5 right-5 rounded-2xl overflow-hidden shadow-lg z-50 flex flex-col",
          className,
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-white">Wellness AI Companion</h3>
              {!minimized && (
                <div className="flex items-center gap-1">
                  <div className={cn("h-2 w-2 rounded-full", getStressColor(currentStress))} />
                  <p className="text-xs text-white/80">Stress level: {currentStress}%</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {minimized ? (
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 text-white/80 hover:text-white hover:bg-white/20"
                onClick={() => setMinimized(false)}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            ) : (
              <>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 text-white/80 hover:text-white hover:bg-white/20"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 text-white/80 hover:text-white hover:bg-white/20"
                  onClick={() => setMinimized(true)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {!minimized && (
          <>
            {/* Tab Buttons */}
            <div className="flex border-b">
              <Button
                variant="ghost"
                className={cn(
                  "flex-1 rounded-none border-b-2 border-transparent",
                  activeTab === "chat" && "border-primary text-primary",
                )}
                onClick={() => setActiveTab("chat")}
              >
                Chat
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "flex-1 rounded-none border-b-2 border-transparent",
                  activeTab === "patterns" && "border-primary text-primary",
                )}
                onClick={() => setActiveTab("patterns")}
              >
                Behavior Patterns
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "flex-1 rounded-none border-b-2 border-transparent",
                  activeTab === "stress" && "border-primary text-primary",
                )}
                onClick={() => setActiveTab("stress")}
              >
                Stress Analysis
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "flex-1 rounded-none border-b-2 border-transparent",
                  activeTab === "goals" && "border-primary text-primary",
                )}
                onClick={() => setActiveTab("goals")}
              >
                Financial Goals
              </Button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
              {activeTab === "chat" && (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] flex",
                            message.sender === "user" ? "flex-row-reverse" : "flex-row",
                          )}
                        >
                          <Avatar className={cn("h-8 w-8", message.sender === "user" ? "ml-2" : "mr-2")}>
                            {message.sender === "user" ? (
                              <>
                                <AvatarImage src="/abstract-geometric-shapes.png" />
                                <AvatarFallback>
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </>
                            ) : (
                              <>
                                <AvatarImage src="/ai-assistant-face.png" />
                                <AvatarFallback>
                                  <Brain className="h-4 w-4" />
                                </AvatarFallback>
                              </>
                            )}
                          </Avatar>
                          <div className="space-y-1">
                            <div
                              className={cn(
                                "rounded-lg p-3",
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : message.sentiment === "warning"
                                    ? "bg-amber-100 text-amber-900"
                                    : message.sentiment === "positive"
                                      ? "bg-green-100 text-green-900"
                                      : message.sentiment === "negative"
                                        ? "bg-red-100 text-red-900"
                                        : "bg-muted",
                              )}
                            >
                              {renderMessageContent(message)}
                            </div>
                            <div
                              className={cn(
                                "text-xs text-muted-foreground flex items-center",
                                message.sender === "user" ? "justify-end" : "justify-start",
                              )}
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] flex">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src="/ai-assistant-face.png" />
                            <AvatarFallback>
                              <Brain className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="rounded-lg p-3 bg-muted">
                            <div className="flex space-x-2">
                              <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                              <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                              <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <form onSubmit={handleSendMessage} className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask me anything..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" size="icon" className="bg-gradient-to-r from-violet-600 to-indigo-600">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "patterns" && (
                <div className="p-4 overflow-y-auto h-full">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Detected Behavior Patterns</h3>
                    <p className="text-sm text-muted-foreground">
                      Patterns identified from your daily activities and financial behaviors
                    </p>
                  </div>

                  <div className="space-y-4">
                    {patterns.map((pattern, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-4 border rounded-lg"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            {pattern.impact === "positive" ? (
                              <ThumbsUp className="h-5 w-5 text-green-500" />
                            ) : pattern.impact === "negative" ? (
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                            ) : (
                              <Activity className="h-5 w-5 text-blue-500" />
                            )}
                            <h4 className="font-medium">{pattern.name}</h4>
                          </div>
                          <Badge
                            className={cn(
                              pattern.impact === "positive"
                                ? "bg-green-100 text-green-800"
                                : pattern.impact === "negative"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800",
                            )}
                          >
                            {pattern.impact === "positive"
                              ? "Positive"
                              : pattern.impact === "negative"
                                ? "Negative"
                                : "Neutral"}
                          </Badge>
                        </div>

                        <div className="mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Confidence</span>
                            <span className="text-sm font-medium">{pattern.confidence}%</span>
                          </div>
                          <Progress value={pattern.confidence} className="h-1.5 mt-1" />
                        </div>

                        <p className="mt-3 text-sm">{pattern.description}</p>

                        {pattern.suggestion && (
                          <div className="mt-3 p-2 bg-blue-50 rounded text-sm flex items-start gap-2">
                            <Sparkles className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <p>{pattern.suggestion}</p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "stress" && (
                <div className="p-4 overflow-y-auto h-full">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Stress Level Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Tracking stress indicators based on behavior, spending, and calendar patterns
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Current Stress Level</h4>
                      <div className="mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Level</span>
                          <span
                            className={cn(
                              "text-sm font-medium",
                              currentStress < 30
                                ? "text-green-600"
                                : currentStress < 60
                                  ? "text-amber-600"
                                  : "text-red-600",
                            )}
                          >
                            {currentStress}%
                          </span>
                        </div>
                        <Progress value={currentStress} className={cn("h-2.5 mt-1", getStressColor(currentStress))} />
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <ThumbsUp className="h-4 w-4 text-green-600" />
                            <h5 className="font-medium text-sm">Positive Factors</h5>
                          </div>
                          <ul className="mt-2 space-y-1 text-sm">
                            <li className="flex items-center gap-2">
                              <Heart className="h-3.5 w-3.5 text-green-600" />
                              <span>Regular exercise routine</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Clock className="h-3.5 w-3.5 text-green-600" />
                              <span>Consistent sleep schedule</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Brain className="h-3.5 w-3.5 text-green-600" />
                              <span>Daily meditation practice</span>
                            </li>
                          </ul>
                        </div>

                        <div className="p-3 bg-amber-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                            <h5 className="font-medium text-sm">Current Stressors</h5>
                          </div>
                          <ul className="mt-2 space-y-1 text-sm">
                            <li className="flex items-center gap-2">
                              <CreditCard className="h-3.5 w-3.5 text-amber-600" />
                              <span>Upcoming bill payments</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Calendar className="h-3.5 w-3.5 text-amber-600" />
                              <span>Scheduled meeting with lender</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">7-Day Stress Trend</h4>
                      <div className="h-48 mt-4">
                        <div className="w-full h-full flex items-end justify-between gap-1">
                          {stressData.map((data, idx) => (
                            <div key={idx} className="flex flex-col items-center flex-1">
                              <div
                                className={cn("w-full rounded-t transition-all", getStressColor(data.level))}
                                style={{ height: `${data.level}%` }}
                              />
                              <div className="text-xs text-muted-foreground mt-1">
                                {data.timestamp.toLocaleDateString(undefined, { weekday: "short" })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Location-Based Insights</h4>
                      <div className="mt-3 space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <MapPin className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h5 className="font-medium text-sm">Home Environment</h5>
                            <p className="text-sm text-muted-foreground">
                              Stress levels typically decrease by 30% within 1 hour of arriving home
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <MapPin className="h-4 w-4 text-amber-600" />
                          </div>
                          <div>
                            <h5 className="font-medium text-sm">Office Area</h5>
                            <p className="text-sm text-muted-foreground">
                              Stress levels typically increase by 20% during workdays
                            </p>
                            <div className="mt-2 text-sm p-2 bg-blue-50 rounded flex items-start gap-2">
                              <Sparkles className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <p>Try the nearby park for a 15-minute walk - users report 18% stress reduction</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <MapPin className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h5 className="font-medium text-sm">Gym Location</h5>
                            <p className="text-sm text-muted-foreground">
                              Stress levels decrease by 25% after gym sessions
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "goals" && (
                <div className="p-4 overflow-y-auto h-full">
                  <FinancialGoalsDashboard />
                </div>
              )}
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
