"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  Sparkles,
  TrendingUp,
  X,
  Minimize2,
  Volume2,
  Settings,
  HelpCircle,
  Calculator,
  PieChart,
  Home,
  Mic,
  MicOff,
  Send,
  MessageCircle,
  Bot,
  User,
  Loader2,
  RefreshCw,
  Copy,
  ThumbsUp,
  Star,
  Bookmark,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { usePathname } from "next/navigation"
import { useConversationalOrb } from "@/hooks/use-conversational-orb"

interface ConversationalGeniusOrbProps {
  className?: string
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  context?: string
  actions?: Array<{
    label: string
    action: () => void
    icon?: React.ComponentType<{ className?: string }>
  }>
  metadata?: {
    confidence?: number
    sources?: string[]
    calculations?: any
  }
}

export function ConversationalGeniusOrb({ className }: ConversationalGeniusOrbProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [isMinimized, setIsMinimized] = React.useState(false)
  const [isChatMode, setIsChatMode] = React.useState(false)
  const [currentInput, setCurrentInput] = React.useState("")
  const [isListening, setIsListening] = React.useState(false)
  const [showSettings, setShowSettings] = React.useState(false)
  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = React.useState(false)

  const pathname = usePathname()
  const {
    sendMessage,
    isLoading,
    conversationHistory,
    currentContext,
    userProfile,
    quickResponses,
    startVoiceInput,
    stopVoiceInput,
    speakResponse,
    clearConversation,
    saveConversation,
    getContextualPrompts,
  } = useConversationalOrb()

  const scrollAreaRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [chatMessages])

  // Initialize with welcome message
  React.useEffect(() => {
    if (isChatMode && chatMessages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        role: "assistant",
        content: getWelcomeMessage(),
        timestamp: new Date(),
        context: currentContext,
        actions: [
          {
            label: "Check Credit Score",
            action: () => handleQuickAction("credit-check"),
            icon: TrendingUp,
          },
          {
            label: "Explore 50-Year Loans",
            action: () => handleQuickAction("50-year-loan"),
            icon: Home,
          },
          {
            label: "Investment Advice",
            action: () => handleQuickAction("investment-advice"),
            icon: PieChart,
          },
        ],
      }
      setChatMessages([welcomeMessage])
    }
  }, [isChatMode, currentContext])

  const getWelcomeMessage = () => {
    const contextMessages = {
      "real-estate":
        "I see you're exploring real estate! I can help you find the perfect property, calculate mortgage payments, or explain our revolutionary 50-year loan options. What would you like to know?",
      "dashboard/snap-dax":
        "Ready to optimize your trading strategy? I can analyze your portfolio, suggest rebalancing opportunities, or explain market trends. How can I assist with your investments today?",
      ecommerex:
        "Welcome to our marketplace! I can help you find products, optimize your rewards, or discover exclusive deals. What are you looking for?",
      default:
        "Hello! I'm your AI financial assistant. I can help with loans, investments, credit optimization, real estate, and more. What financial goal can I help you achieve today?",
    }

    const context = pathname.includes("real-estate")
      ? "real-estate"
      : pathname.includes("snap-dax")
        ? "dashboard/snap-dax"
        : pathname.includes("ecommerex")
          ? "ecommerex"
          : "default"

    return contextMessages[context]
  }

  const handleSendMessage = async () => {
    if (!currentInput.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: currentInput,
      timestamp: new Date(),
      context: currentContext,
    }

    setChatMessages((prev) => [...prev, userMessage])
    setCurrentInput("")
    setIsTyping(true)

    try {
      const response = await sendMessage(currentInput, {
        context: currentContext,
        userProfile,
        conversationHistory: chatMessages,
      })

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        timestamp: new Date(),
        context: currentContext,
        actions: response.actions,
        metadata: response.metadata,
      }

      setChatMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date(),
        context: currentContext,
      }
      setChatMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickAction = (action: string) => {
    const quickMessages = {
      "credit-check": "What's my current credit score and how can I improve it?",
      "50-year-loan": "Tell me about your 50-year loan options and benefits",
      "investment-advice": "What investment strategies do you recommend for my profile?",
      "property-search": "Help me find properties in my budget",
      "loan-calculator": "Calculate monthly payments for a mortgage",
      "portfolio-analysis": "Analyze my current investment portfolio",
    }

    const message = quickMessages[action as keyof typeof quickMessages]
    if (message) {
      setCurrentInput(message)
      setTimeout(() => handleSendMessage(), 100)
    }
  }

  const handleVoiceInput = async () => {
    if (isListening) {
      stopVoiceInput()
      setIsListening(false)
    } else {
      setIsListening(true)
      try {
        const transcript = await startVoiceInput()
        setCurrentInput(transcript)
        setIsListening(false)
      } catch (error) {
        setIsListening(false)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

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
            <Card
              className={cn(
                "bg-background/95 backdrop-blur-sm border-white/20 shadow-2xl transition-all duration-300",
                isChatMode ? "w-96 h-[600px]" : "w-80",
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <motion.div
                        animate={glowAnimation}
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 blur-sm"
                      />
                      <div className="relative h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center">
                        {isChatMode ? (
                          <MessageCircle className="h-4 w-4 text-white" />
                        ) : (
                          <Brain className="h-4 w-4 text-white" />
                        )}
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-sm">{isChatMode ? "AI Financial Chat" : "Genius Guide"}</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {isChatMode ? "Conversational Assistant" : "AI Financial Assistant"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsChatMode(!isChatMode)}
                      className={cn("h-6 w-6 p-0", isChatMode && "text-blue-500")}
                    >
                      <MessageCircle className="h-3 w-3" />
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

              <CardContent className="space-y-4 p-4">
                {isChatMode ? (
                  <div className="flex flex-col h-[480px]">
                    {/* Chat Messages */}
                    <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
                      <div className="space-y-4">
                        {chatMessages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}
                          >
                            {message.role === "assistant" && (
                              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                <Bot className="h-4 w-4 text-white" />
                              </div>
                            )}

                            <div
                              className={cn(
                                "max-w-[80%] space-y-2",
                                message.role === "user" ? "items-end" : "items-start",
                              )}
                            >
                              <div
                                className={cn(
                                  "rounded-lg px-3 py-2 text-sm",
                                  message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted",
                                )}
                              >
                                <p className="whitespace-pre-wrap">{message.content}</p>

                                {message.metadata?.confidence && (
                                  <div className="mt-2 flex items-center gap-1 text-xs opacity-70">
                                    <Star className="h-3 w-3" />
                                    <span>Confidence: {Math.round(message.metadata.confidence * 100)}%</span>
                                  </div>
                                )}
                              </div>

                              {/* Action Buttons */}
                              {message.actions && message.actions.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {message.actions.map((action, index) => (
                                    <Button
                                      key={index}
                                      variant="outline"
                                      size="sm"
                                      onClick={action.action}
                                      className="h-7 text-xs"
                                    >
                                      {action.icon && <action.icon className="h-3 w-3 mr-1" />}
                                      {action.label}
                                    </Button>
                                  ))}
                                </div>
                              )}

                              {/* Message Actions */}
                              {message.role === "assistant" && (
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                    onClick={() => speakResponse(message.content)}
                                  >
                                    <Volume2 className="h-3 w-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <ThumbsUp className="h-3 w-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <Bookmark className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                            </div>

                            {message.role === "user" && (
                              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                <User className="h-4 w-4 text-primary-foreground" />
                              </div>
                            )}
                          </motion.div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                            <div className="bg-muted rounded-lg px-3 py-2 flex items-center gap-1">
                              <div className="flex gap-1">
                                <div
                                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                  style={{ animationDelay: "0ms" }}
                                />
                                <div
                                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                  style={{ animationDelay: "150ms" }}
                                />
                                <div
                                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                  style={{ animationDelay: "300ms" }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </ScrollArea>

                    {/* Quick Response Suggestions */}
                    {quickResponses.length > 0 && (
                      <div className="py-2 border-t border-white/10">
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {quickResponses.map((response, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setCurrentInput(response)
                                setTimeout(() => handleSendMessage(), 100)
                              }}
                              className="whitespace-nowrap text-xs h-7"
                            >
                              {response}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Chat Input */}
                    <div className="flex gap-2 pt-2 border-t border-white/10">
                      <div className="flex-1 relative">
                        <Textarea
                          value={currentInput}
                          onChange={(e) => setCurrentInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Ask me anything about finance, loans, investments..."
                          className="min-h-[40px] max-h-[100px] resize-none pr-10"
                          disabled={isLoading}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleVoiceInput}
                          className={cn(
                            "absolute right-1 top-1 h-6 w-6 p-0",
                            isListening && "text-red-500 animate-pulse",
                          )}
                        >
                          {isListening ? <Mic className="h-3 w-3" /> : <MicOff className="h-3 w-3" />}
                        </Button>
                      </div>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!currentInput.trim() || isLoading}
                        className="h-10 w-10 p-0"
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      </Button>
                    </div>

                    {/* Chat Controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={clearConversation} className="h-7 text-xs">
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Clear
                        </Button>
                        <Button variant="ghost" size="sm" onClick={saveConversation} className="h-7 text-xs">
                          <Bookmark className="h-3 w-3 mr-1" />
                          Save
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">{chatMessages.length} messages</div>
                    </div>
                  </div>
                ) : (
                  /* Original Insights Mode */
                  <div className="space-y-4">
                    {/* Quick Financial Health Overview */}
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

                    {/* Quick Actions */}
                    <div className="space-y-2">
                      <h5 className="text-xs font-medium text-muted-foreground">Quick Actions</h5>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => {
                            setIsChatMode(true)
                            handleQuickAction("loan-calculator")
                          }}
                        >
                          <Calculator className="h-3 w-3 mr-1" />
                          Calculate
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => {
                            setIsChatMode(true)
                            handleQuickAction("portfolio-analysis")
                          }}
                        >
                          <PieChart className="h-3 w-3 mr-1" />
                          Analyze
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setIsChatMode(true)}>
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Chat
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => {
                            setIsChatMode(true)
                            handleQuickAction("credit-check")
                          }}
                        >
                          <HelpCircle className="h-3 w-3 mr-1" />
                          Help
                        </Button>
                      </div>
                    </div>

                    {/* Context-Aware Prompt */}
                    <div className="p-3 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 rounded-lg border border-white/10">
                      <p className="text-xs text-muted-foreground mb-2">💬 Try asking me:</p>
                      <div className="space-y-1">
                        {getContextualPrompts().map((prompt, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setIsChatMode(true)
                              setCurrentInput(prompt)
                              setTimeout(() => handleSendMessage(), 100)
                            }}
                            className="block w-full text-left text-xs text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            "• {prompt}"
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Settings Panel */}
                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 border-t border-white/10 pt-3"
                    >
                      <h5 className="text-xs font-medium text-muted-foreground">AI Settings</h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Voice Responses</span>
                          <Button variant="outline" size="sm" className="h-6 text-xs">
                            On
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Conversation Memory</span>
                          <Button variant="outline" size="sm" className="h-6 text-xs">
                            On
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Proactive Suggestions</span>
                          <Button variant="outline" size="sm" className="h-6 text-xs">
                            Smart
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Response Style</span>
                          <Button variant="outline" size="sm" className="h-6 text-xs">
                            Friendly
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
            animate={{
              y: [0, -20, -40],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
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
            {isChatMode ? <MessageCircle className="h-8 w-8 text-white" /> : <Brain className="h-8 w-8 text-white" />}
          </motion.div>

          {/* Activity Indicator */}
          {(isLoading || isListening) && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center"
            >
              {isListening ? (
                <Mic className="h-2 w-2 text-white" />
              ) : (
                <Loader2 className="h-2 w-2 text-white animate-spin" />
              )}
            </motion.div>
          )}

          {/* Chat Mode Indicator */}
          {isChatMode && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 flex items-center justify-center"
            >
              <MessageCircle className="h-2 w-2 text-white" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
