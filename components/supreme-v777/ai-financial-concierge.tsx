"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  TrendingUp,
  Shield,
  Target,
  Zap,
  Crown,
  Star,
  Settings,
  BarChart3,
  PieChart,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Lightbulb,
  Rocket,
  Globe,
  Activity,
} from "lucide-react"
import { aiService } from "@/lib/ai-service"

interface Message {
  id: string
  type: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  category?: "analysis" | "recommendation" | "alert" | "insight" | "general"
  confidence?: number
  actions?: string[]
}

interface AIPersonality {
  id: string
  name: string
  description: string
  avatar: string
  specialties: string[]
  tone: "professional" | "friendly" | "analytical" | "motivational"
}

const aiPersonalities: AIPersonality[] = [
  {
    id: "aria",
    name: "ARIA",
    description: "Supreme Financial Strategist",
    avatar: "👑",
    specialties: ["Portfolio Strategy", "Risk Management", "Market Analysis"],
    tone: "professional",
  },
  {
    id: "quantum",
    name: "Quantum",
    description: "Advanced Analytics AI",
    avatar: "⚡",
    specialties: ["Predictive Analytics", "Quantum Computing", "Data Science"],
    tone: "analytical",
  },
  {
    id: "sage",
    name: "Sage",
    description: "Wealth Building Mentor",
    avatar: "🧠",
    specialties: ["Wealth Building", "Investment Education", "Goal Planning"],
    tone: "motivational",
  },
  {
    id: "guardian",
    name: "Guardian",
    description: "Security & Compliance Expert",
    avatar: "🛡️",
    specialties: ["Security", "Compliance", "Risk Assessment"],
    tone: "professional",
  },
]

export function AIFinancialConcierge() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "system",
      content: "🌟 SUPREME AUTHORITY AI CONCIERGE ONLINE 🌟",
      timestamp: new Date(),
      category: "general",
    },
    {
      id: "2",
      type: "assistant",
      content:
        "Welcome to the Supreme Authority AI Financial Concierge! I'm ARIA, your personal financial strategist. I have access to quantum-powered analytics, real-time market data, and advanced AI algorithms to help you achieve financial excellence. How may I assist you today?",
      timestamp: new Date(),
      category: "general",
      confidence: 100,
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [selectedPersonality, setSelectedPersonality] = useState("aria")
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      // Use AI service for response
      const response = await aiService.processConversation("user-777", content, {
        personality: selectedPersonality,
        context: "supreme-authority-v777",
      })

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response.response,
        timestamp: new Date(),
        confidence: Math.round(response.confidence * 100),
        actions: response.actions,
        category: detectCategory(content),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("AI response error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment.",
        timestamp: new Date(),
        category: "general",
      }
      setMessages((prev) => [...prev, errorMessage])
    }

    setIsTyping(false)
  }

  const detectCategory = (input: string): Message["category"] => {
    const lowerInput = input.toLowerCase()
    if (lowerInput.includes("analyze") || lowerInput.includes("analysis")) return "analysis"
    if (lowerInput.includes("recommend") || lowerInput.includes("suggest")) return "recommendation"
    if (lowerInput.includes("risk") || lowerInput.includes("danger")) return "alert"
    if (lowerInput.includes("insight") || lowerInput.includes("trend")) return "insight"
    return "general"
  }

  const quickActions = [
    {
      id: "portfolio-analysis",
      label: "Analyze My Portfolio",
      icon: <PieChart className="h-4 w-4" />,
      prompt:
        "Please provide a comprehensive analysis of my current portfolio performance, including risk assessment and optimization recommendations.",
    },
    {
      id: "market-outlook",
      label: "Market Outlook",
      icon: <TrendingUp className="h-4 w-4" />,
      prompt:
        "What's your analysis of current market conditions and outlook for the next quarter? Include key opportunities and risks.",
    },
    {
      id: "investment-strategy",
      label: "Investment Strategy",
      icon: <Target className="h-4 w-4" />,
      prompt:
        "Help me develop an optimal investment strategy based on my risk tolerance, goals, and current market conditions.",
    },
    {
      id: "risk-assessment",
      label: "Risk Assessment",
      icon: <Shield className="h-4 w-4" />,
      prompt:
        "Conduct a comprehensive risk assessment of my portfolio and provide recommendations for risk mitigation.",
    },
    {
      id: "wealth-planning",
      label: "Wealth Planning",
      icon: <Crown className="h-4 w-4" />,
      prompt: "Create a comprehensive wealth building plan that aligns with my financial goals and timeline.",
    },
    {
      id: "tax-optimization",
      label: "Tax Optimization",
      icon: <DollarSign className="h-4 w-4" />,
      prompt:
        "Analyze my portfolio for tax optimization opportunities and provide strategies to minimize tax liability.",
    },
  ]

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "analysis":
        return "bg-blue-500/20 text-blue-300 border-blue-400/30"
      case "recommendation":
        return "bg-green-500/20 text-green-300 border-green-400/30"
      case "alert":
        return "bg-red-500/20 text-red-300 border-red-400/30"
      case "insight":
        return "bg-purple-500/20 text-purple-300 border-purple-400/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30"
    }
  }

  const currentPersonality = aiPersonalities.find((p) => p.id === selectedPersonality) || aiPersonalities[0]

  return (
    <div className="space-y-6">
      {/* AI Personality Selector */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Financial Concierge Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {aiPersonalities.map((personality) => (
              <Button
                key={personality.id}
                variant={selectedPersonality === personality.id ? "default" : "outline"}
                onClick={() => setSelectedPersonality(personality.id)}
                className={`h-auto p-3 flex flex-col items-center gap-2 ${
                  selectedPersonality === personality.id
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "border-purple-500/30 hover:bg-purple-500/20"
                }`}
              >
                <div className="text-2xl">{personality.avatar}</div>
                <div className="text-center">
                  <div className="font-medium text-sm">{personality.name}</div>
                  <div className="text-xs opacity-70">{personality.description}</div>
                </div>
              </Button>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-lg bg-slate-800/30 border border-slate-600/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{currentPersonality.avatar}</span>
              <span className="font-medium text-white">{currentPersonality.name}</span>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">Active</Badge>
            </div>
            <p className="text-sm text-slate-300 mb-2">{currentPersonality.description}</p>
            <div className="flex flex-wrap gap-1">
              {currentPersonality.specialties.map((specialty) => (
                <Badge key={specialty} variant="outline" className="text-xs border-slate-500/30 text-slate-400">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main AI Interface */}
      <Card className="bg-slate-900/50 border-cyan-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-cyan-300 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Supreme AI Financial Concierge
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                <Activity className="h-3 w-3 mr-1" />
                Online
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
              <TabsTrigger value="chat">AI Chat</TabsTrigger>
              <TabsTrigger value="insights">Live Insights</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-4">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendMessage(action.prompt)}
                    className="justify-start h-auto p-2 text-xs border-slate-600/30 hover:bg-slate-700/30"
                  >
                    {action.icon}
                    <span className="ml-1 truncate">{action.label}</span>
                  </Button>
                ))}
              </div>

              {/* Messages */}
              <ScrollArea className="h-[400px] w-full rounded-lg border border-slate-600/30 bg-slate-800/20 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.type !== "user" && (
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-xs">
                            {message.type === "system" ? "SYS" : currentPersonality.avatar}
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div className={`max-w-[80%] ${message.type === "user" ? "order-1" : ""}`}>
                        <div
                          className={`rounded-lg p-3 ${
                            message.type === "user"
                              ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                              : message.type === "system"
                                ? "bg-gradient-to-br from-yellow-500 to-orange-500 text-white text-center font-bold"
                                : "bg-slate-700/50 border border-slate-600/30 text-slate-100"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                          {message.actions && message.actions.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {message.actions.map((action, index) => (
                                <Button
                                  key={index}
                                  size="sm"
                                  variant="outline"
                                  className="text-xs border-slate-500/30 hover:bg-slate-600/30"
                                >
                                  {action}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-400">{message.timestamp.toLocaleTimeString()}</span>
                          {message.category && message.category !== "general" && (
                            <Badge variant="outline" className={`text-xs ${getCategoryColor(message.category)}`}>
                              {message.category.toUpperCase()}
                            </Badge>
                          )}
                          {message.confidence && (
                            <Badge variant="outline" className="text-xs border-green-400/30 text-green-300">
                              {message.confidence}% Confidence
                            </Badge>
                          )}
                        </div>
                      </div>

                      {message.type === "user" && (
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white text-xs">
                            YOU
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-start">
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-xs">
                          {currentPersonality.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-slate-700/50 border border-slate-600/30 rounded-lg p-3">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <span className="ml-2 text-xs text-slate-400">{currentPersonality.name} is thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={`Ask ${currentPersonality.name} anything about your finances...`}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                    className="flex-1 bg-slate-800/30 border-slate-600/30"
                  />
                  <Button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsListening(!isListening)}
                      className={`${isListening ? "bg-red-600 hover:bg-red-700" : "border-slate-600/30"}`}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsSpeaking(!isSpeaking)}
                      className="border-slate-600/30"
                    >
                      {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Zap className="h-3 w-3 text-yellow-400" />
                    <span>Quantum AI Processing</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-slate-800/30 border-slate-600/30">
                  <CardHeader>
                    <CardTitle className="text-slate-300 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-400" />
                      Live Market Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-blue-400" />
                          <span className="text-blue-300 font-medium">Market Opportunity</span>
                        </div>
                        <p className="text-sm text-slate-300">
                          Technology sector showing strong momentum with 15% growth potential in Q4.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-amber-900/20 border border-amber-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-amber-400" />
                          <span className="text-amber-300 font-medium">Risk Alert</span>
                        </div>
                        <p className="text-sm text-slate-300">
                          High volatility expected in energy sector due to geopolitical tensions.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-green-900/20 border border-green-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-green-300 font-medium">Portfolio Health</span>
                        </div>
                        <p className="text-sm text-slate-300">
                          Your portfolio is well-diversified with optimal risk-adjusted returns.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-600/30">
                  <CardHeader>
                    <CardTitle className="text-slate-300 flex items-center gap-2">
                      <Rocket className="h-5 w-5 text-purple-400" />
                      AI Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-4 w-4 text-purple-400" />
                          <span className="text-purple-300 font-medium">Rebalancing</span>
                        </div>
                        <p className="text-sm text-slate-300">
                          Consider reducing tech exposure by 5% and increasing defensive positions.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-cyan-900/20 border border-cyan-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Globe className="h-4 w-4 text-cyan-400" />
                          <span className="text-cyan-300 font-medium">Diversification</span>
                        </div>
                        <p className="text-sm text-slate-300">
                          Add international exposure to capture emerging market opportunities.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-indigo-900/20 border border-indigo-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-indigo-400" />
                          <span className="text-indigo-300 font-medium">Timing</span>
                        </div>
                        <p className="text-sm text-slate-300">
                          Optimal entry point for new positions expected in 2-3 weeks.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-slate-800/30 border-slate-600/30">
                  <CardHeader>
                    <CardTitle className="text-slate-300 text-sm">AI Confidence Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-2">94%</div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-600/30">
                  <CardHeader>
                    <CardTitle className="text-slate-300 text-sm">Prediction Accuracy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-2">87%</div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "87%" }} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-600/30">
                  <CardHeader>
                    <CardTitle className="text-slate-300">AI Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-slate-400">
                      <div className="text-center">
                        <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p>AI Performance Analytics</p>
                        <p className="text-sm opacity-70">Real-time AI metrics and insights</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
