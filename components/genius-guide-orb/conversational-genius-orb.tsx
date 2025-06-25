"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  Sparkles,
  TrendingUp,
  ChevronRight,
  X,
  Minimize2,
  Volume2,
  Settings,
  HelpCircle,
  Calculator,
  PieChart,
  Mic,
  MicOff,
  Send,
  MessageCircle,
  Copy,
  ThumbsUp,
  RotateCcw,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { usePathname } from "next/navigation"
import { useConversationalOrb } from "@/hooks/use-conversational-orb"

interface ConversationalGeniusOrbProps {
  className?: string
}

export function ConversationalGeniusOrb({ className }: ConversationalGeniusOrbProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [isMinimized, setIsMinimized] = React.useState(false)
  const [isChatMode, setIsChatMode] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const [showSettings, setShowSettings] = React.useState(false)

  const pathname = usePathname()
  const {
    messages,
    insights,
    isLoading,
    sendMessage,
    clearConversation,
    speakText,
    startListening,
    stopListening,
    isListening,
    isSpeaking,
    getContextualSuggestions,
  } = useConversationalOrb()

  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom of messages
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus textarea when chat mode is enabled
  React.useEffect(() => {
    if (isChatMode && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isChatMode])

  // Get contextual suggestions based on current page
  const contextualSuggestions = React.useMemo(() => {
    return getContextualSuggestions(pathname)
  }, [pathname, getContextualSuggestions])

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

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return

    const userMessage = message.trim()
    setMessage("")
    setIsTyping(true)

    try {
      await sendMessage(userMessage)
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion)
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  const handleVoiceInput = async () => {
    if (isListening) {
      stopListening()
    } else {
      const transcript = await startListening()
      if (transcript) {
        setMessage(transcript)
      }
    }
  }

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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
                        <Brain className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-sm">Genius Guide</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {isChatMode ? "AI Financial Assistant" : "Smart Insights"}
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

              <CardContent className="space-y-4 flex-1 flex flex-col">
                {isChatMode ? (
                  // Chat Mode Interface
                  <div className="flex-1 flex flex-col space-y-4">
                    {/* Messages Area */}
                    <ScrollArea className="flex-1 pr-4">
                      <div className="space-y-4">
                        {messages.length === 0 && (
                          <div className="text-center py-8">
                            <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-sm text-muted-foreground mb-4">
                              Hi! I'm your AI financial assistant. Ask me anything about loans, investments, credit, or
                              real estate.
                            </p>
                            <div className="space-y-2">
                              {contextualSuggestions.slice(0, 3).map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}

                        {messages.map((msg, index) => (
                          <div
                            key={index}
                            className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}
                          >
                            {msg.role === "assistant" && (
                              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                <Brain className="h-4 w-4 text-white" />
                              </div>
                            )}
                            <div
                              className={cn(
                                "max-w-[80%] rounded-lg p-3 text-sm",
                                msg.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted",
                              )}
                            >
                              <div className="whitespace-pre-wrap">{msg.content}</div>
                              <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                                <span className="text-xs opacity-60">{formatTime(msg.timestamp)}</span>
                                {msg.role === "assistant" && (
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => speakText(msg.content)}
                                      className="h-5 w-5 p-0"
                                    >
                                      <Volume2 className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => navigator.clipboard.writeText(msg.content)}
                                      className="h-5 w-5 p-0"
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                      <ThumbsUp className="h-3 w-3" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                              {msg.actions && msg.actions.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {msg.actions.map((action, actionIndex) => (
                                    <Button
                                      key={actionIndex}
                                      size="sm"
                                      variant="outline"
                                      className="h-6 text-xs"
                                      onClick={() => (window.location.href = action.url)}
                                    >
                                      {action.label}
                                    </Button>
                                  ))}
                                </div>
                              )}
                            </div>
                            {msg.role === "user" && (
                              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                <span className="text-xs text-primary-foreground font-medium">U</span>
                              </div>
                            )}
                          </div>
                        ))}

                        {isTyping && (
                          <div className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center">
                              <Brain className="h-4 w-4 text-white" />
                            </div>
                            <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span className="text-sm text-muted-foreground">Thinking...</span>
                            </div>
                          </div>
                        )}

                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="space-y-2">
                      {contextualSuggestions.length > 0 && messages.length === 0 && (
                        <div className="flex flex-wrap gap-1">
                          {contextualSuggestions.slice(0, 4).map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-6"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <Textarea
                            ref={textareaRef}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me about loans, investments, credit..."
                            className="min-h-[40px] max-h-[120px] resize-none pr-20"
                            disabled={isLoading}
                          />
                          <div className="absolute right-2 top-2 flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleVoiceInput}
                              className={cn("h-6 w-6 p-0", isListening && "text-red-500")}
                            >
                              {isListening ? <Mic className="h-3 w-3" /> : <MicOff className="h-3 w-3" />}
                            </Button>
                            <Button
                              onClick={handleSendMessage}
                              disabled={!message.trim() || isLoading}
                              className="h-6 w-6 p-0"
                            >
                              {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {messages.length > 0 && (
                        <div className="flex justify-between items-center">
                          <Button variant="ghost" size="sm" onClick={clearConversation} className="text-xs">
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Clear Chat
                          </Button>
                          <span className="text-xs text-muted-foreground">{messages.length} messages</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  // Insights Mode Interface (existing code)
                  <div className="space-y-4">
                    {/* Current Insight */}
                    {insights.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                            <TrendingUp className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-medium">Market Opportunity</h4>
                              <Badge variant="default" className="text-xs">
                                high
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Real estate prices in your area are trending up 12% this quarter. Consider accelerating
                              your property search.
                            </p>
                            <div className="flex items-center gap-2">
                              <Button size="sm" className="h-7 text-xs">
                                View Properties
                                <ChevronRight className="h-3 w-3 ml-1" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  speakText("Real estate prices in your area are trending up 12% this quarter.")
                                }
                                className="h-7 w-7 p-0"
                              >
                                <Volume2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
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
                        <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setIsChatMode(true)}>
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Chat
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
                          <span className="text-xs">Chat Mode</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 text-xs"
                            onClick={() => setIsChatMode(!isChatMode)}
                          >
                            {isChatMode ? "On" : "Off"}
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
          {(isSpeaking || isListening || isLoading) && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center"
            >
              {isListening ? (
                <Mic className="h-2 w-2 text-white" />
              ) : isSpeaking ? (
                <Volume2 className="h-2 w-2 text-white" />
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
              className="absolute -bottom-1 -left-1 h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center"
            >
              <MessageCircle className="h-2 w-2 text-white" />
            </motion.div>
          )}

          {/* Notification Badge */}
          {insights.filter((i) => i.priority === "high").length > 0 && !isChatMode && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -top-1 -left-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold"
            >
              {insights.filter((i) => i.priority === "high").length}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
