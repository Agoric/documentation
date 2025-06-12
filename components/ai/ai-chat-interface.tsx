"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Brain,
  Send,
  User,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { aiService } from "@/lib/ai-service"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  confidence?: number
  actions?: string[]
  suggestions?: string[]
  type?: "text" | "insight" | "recommendation" | "alert"
}

interface AIChatInterfaceProps {
  userId?: string
  context?: any
  onActionTrigger?: (action: string, data?: any) => void
  className?: string
  compact?: boolean
}

export function AIChatInterface({
  userId = "default-user",
  context,
  onActionTrigger,
  className = "",
  compact = false,
}: AIChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize conversation with welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your AI financial assistant. I can help you with investment advice, budget optimization, goal planning, market analysis, and much more. What would you like to explore today?",
      timestamp: new Date(),
      confidence: 1.0,
      suggestions: [
        "Analyze my spending patterns",
        "Review my investment portfolio",
        "Help me set financial goals",
        "Show me market insights",
      ],
    }
    setMessages([welcomeMessage])
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputValue.trim()
    if (!messageToSend) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageToSend,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    setShowSuggestions(false)

    try {
      // Get AI response
      const response = await aiService.processConversation(userId, messageToSend, context)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.response,
        timestamp: new Date(),
        confidence: response.confidence,
        actions: response.actions,
        suggestions: response.suggestions,
      }

      setMessages((prev) => [...prev, aiMessage])

      // Trigger actions if provided
      if (response.actions && onActionTrigger) {
        response.actions.forEach((action: string) => {
          onActionTrigger(action, { message: messageToSend, response })
        })
      }
    } catch (error) {
      console.error("Error getting AI response:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date(),
        type: "alert",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleVoiceToggle = () => {
    if (isListening) {
      // Stop listening
      setIsListening(false)
    } else {
      // Start listening (would integrate with speech recognition API)
      setIsListening(true)
      // Simulate voice input
      setTimeout(() => {
        setIsListening(false)
        setInputValue("What's my portfolio performance this month?")
      }, 3000)
    }
  }

  const getMessageIcon = (message: Message) => {
    if (message.role === "user") return <User className="h-4 w-4" />

    switch (message.type) {
      case "insight":
        return <Sparkles className="h-4 w-4 text-purple-400" />
      case "recommendation":
        return <TrendingUp className="h-4 w-4 text-blue-400" />
      case "alert":
        return <AlertCircle className="h-4 w-4 text-amber-400" />
      default:
        return <Brain className="h-4 w-4 text-cyan-400" />
    }
  }

  const getMessageBadge = (message: Message) => {
    if (message.confidence && message.confidence > 0.8) {
      return (
        <Badge variant="outline" className="text-xs">
          <CheckCircle className="h-3 w-3 mr-1" />
          High Confidence
        </Badge>
      )
    }
    return null
  }

  return (
    <Card className={`flex flex-col ${compact ? "h-96" : "h-[600px]"} ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/ai-assistant-concept.png" />
              <AvatarFallback>
                <Brain className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-sm">AI Financial Assistant</CardTitle>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Online
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <Avatar className={`h-8 w-8 ${message.role === "user" ? "ml-2" : "mr-2"}`}>
                    <AvatarImage
                      src={message.role === "user" ? "/abstract-geometric-shapes.png" : "/ai-assistant-concept.png"}
                    />
                    <AvatarFallback>{getMessageIcon(message)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : message.type === "alert"
                            ? "bg-amber-50 border border-amber-200 text-amber-900"
                            : "bg-muted"
                      }`}
                    >
                      <div className="text-sm">{message.content}</div>
                      {message.confidence && (
                        <div className="mt-2 flex items-center gap-2">{getMessageBadge(message)}</div>
                      )}
                    </div>

                    {/* Action buttons */}
                    {message.actions && message.actions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {message.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => onActionTrigger?.(action)}
                          >
                            {action.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Button>
                        ))}
                      </div>
                    )}

                    <div
                      className={`text-xs text-muted-foreground flex items-center ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="flex max-w-[85%] flex-row">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/ai-assistant-concept.png" />
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
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {showSuggestions && messages.length > 0 && messages[messages.length - 1].suggestions && (
          <div className="p-4 border-t">
            <div className="text-sm font-medium mb-2">Suggested questions:</div>
            <div className="flex flex-wrap gap-2">
              {messages[messages.length - 1].suggestions?.map((suggestion, index) => (
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

        {/* Input */}
        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex items-center gap-2"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={`flex-shrink-0 ${isListening ? "text-red-500" : ""}`}
              onClick={handleVoiceToggle}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Input
              placeholder="Ask me anything about your finances..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1"
              disabled={isTyping}
            />
            <Button type="submit" size="icon" className="flex-shrink-0" disabled={!inputValue.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
