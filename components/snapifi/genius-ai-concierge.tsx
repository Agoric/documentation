"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, Mic, MicOff, Sparkles, TrendingUp, AlertCircle, CheckCircle, Clock, Brain, Zap } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  type?: "insight" | "recommendation" | "alert"
}

export function GeniusAIConcierge() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your Genius AI Concierge, powered by quantum computing. I've analyzed your financial patterns and I'm ready to help optimize your financial journey. How can I assist you today?",
      timestamp: "Just now",
      type: "insight",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const quickActions = [
    { label: "Optimize my budget", icon: TrendingUp },
    { label: "Check loan eligibility", icon: CheckCircle },
    { label: "Investment opportunities", icon: Sparkles },
    { label: "Credit improvement tips", icon: AlertCircle },
  ]

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response with quantum processing
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateAIResponse(content),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "recommendation",
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): string => {
    const responses = {
      budget:
        "Based on quantum analysis of your spending patterns, I recommend reallocating 15% of your discretionary spending to high-yield savings. This could increase your emergency fund by $2,400 annually.",
      loan: "Your current credit profile qualifies you for our 50-year asset-backed loan program with rates starting at 3.2% APR. The quantum risk assessment shows 94% approval probability.",
      investment:
        "I've identified 3 RWA tokenization opportunities in your area with projected 12-18% returns. The quantum market analysis suggests optimal entry points in the next 2 weeks.",
      credit:
        "Your credit score can improve by 45-60 points in 6 months by following my quantum-optimized payment strategy. I'll send you a personalized action plan.",
      default:
        "I've processed your request using quantum algorithms. Based on your financial profile and market conditions, I recommend scheduling a detailed consultation to explore personalized strategies.",
    }

    const lowerInput = userInput.toLowerCase()
    if (lowerInput.includes("budget") || lowerInput.includes("optimize")) return responses.budget
    if (lowerInput.includes("loan") || lowerInput.includes("eligibility")) return responses.loan
    if (lowerInput.includes("investment") || lowerInput.includes("opportunities")) return responses.investment
    if (lowerInput.includes("credit") || lowerInput.includes("score")) return responses.credit
    return responses.default
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/ai-concierge-avatar.png" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Bot className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="flex items-center space-x-2">
                <span>Genius AI Concierge</span>
                <Badge className="bg-green-100 text-green-800">
                  <Zap className="h-3 w-3 mr-1" />
                  Quantum Powered
                </Badge>
              </CardTitle>
              <CardDescription>Personalized financial assistant with machine learning</CardDescription>
            </div>
          </div>
          <Button variant={isListening ? "default" : "outline"} size="sm" onClick={() => setIsListening(!isListening)}>
            {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar className={`h-8 w-8 ${message.role === "user" ? "ml-2" : "mr-2"}`}>
                  {message.role === "user" ? (
                    <AvatarFallback>U</AvatarFallback>
                  ) : (
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : message.type === "insight"
                          ? "bg-blue-50 border border-blue-200"
                          : message.type === "recommendation"
                            ? "bg-green-50 border border-green-200"
                            : "bg-muted"
                    }`}
                  >
                    {message.type && message.role === "assistant" && (
                      <div className="flex items-center space-x-1 mb-2">
                        {message.type === "insight" && <Brain className="h-3 w-3 text-blue-600" />}
                        {message.type === "recommendation" && <Sparkles className="h-3 w-3 text-green-600" />}
                        <span className="text-xs font-medium capitalize">{message.type}</span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <div
                    className={`text-xs text-muted-foreground mt-1 flex items-center ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {message.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] flex-row">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <Bot className="h-4 w-4" />
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
        </div>

        {/* Quick Actions */}
        <div className="border-t p-4">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action.label)}
                  className="justify-start text-xs"
                >
                  <IconComponent className="h-3 w-3 mr-1" />
                  {action.label}
                </Button>
              )
            })}
          </div>

          {/* Input */}
          <div className="flex space-x-2">
            <Input
              placeholder="Ask me anything about your finances..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
              className="flex-1"
            />
            <Button onClick={() => handleSendMessage(inputValue)} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
