"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Brain, Send, Sparkles, Shield, TrendingUp, Globe, DollarSign } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  category?: "qgi" | "citizenship" | "tax" | "verification" | "general"
}

const quickActions = [
  {
    id: "create-qgi",
    label: "Create New QGI",
    icon: <TrendingUp className="h-4 w-4" />,
    category: "qgi",
    prompt: "Help me create a new Quantum Gains Instrument with the following parameters:",
  },
  {
    id: "process-citizenship",
    label: "Process Citizenship",
    icon: <Globe className="h-4 w-4" />,
    category: "citizenship",
    prompt: "I need to process a new DAX citizenship application with these requirements:",
  },
  {
    id: "optimize-tax",
    label: "Optimize Tax Benefits",
    icon: <DollarSign className="h-4 w-4" />,
    category: "tax",
    prompt: "Help me optimize tax benefits for a business with these characteristics:",
  },
  {
    id: "verify-contribution",
    label: "Verify Contribution",
    icon: <Shield className="h-4 w-4" />,
    category: "verification",
    prompt: "I need to set up quantum-secure verification for a charitable contribution:",
  },
]

export function DAXAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Welcome to the DAX AI Assistant! I can help you create QGIs, process citizenship applications, optimize tax benefits, and set up quantum-secure verifications. How can I assist you today?",
      timestamp: new Date(),
      category: "general",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
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

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateAIResponse(content),
        timestamp: new Date(),
        category: detectCategory(content),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("qgi") || lowerInput.includes("quantum gains")) {
      return `I'll help you create a Quantum Gains Instrument. Based on your request, I recommend:

🔹 **Instrument Type**: Social Impact QGI
🔹 **Base Asset**: US 50-year Corporate Bond Mirror
🔹 **Leverage Ratio**: 2.5:1 (Conservative)
🔹 **Maturity Period**: 50 years with early redemption options
🔹 **Risk Rating**: Investment Grade (AAA)
🔹 **Minimum Investment**: $1,000
🔹 **Expected Yield**: 4.2% - 6.8% annually

Would you like me to configure specific variables or create this instrument now?`
    }

    if (lowerInput.includes("citizenship") || lowerInput.includes("citizen")) {
      return `I'll guide you through the DAX citizenship process:

📋 **Required Documents**:
✅ Recorded Declaration (Audio/Video)
✅ Valid Government ID
✅ Bank Account Verification
✅ SSN or Equivalent
✅ $50 Quantum Domicile Fee

🎯 **Benefits Package**:
💰 $80,000 Social Impact Credit at 1% interest
🛡️ $250,000 Imperial Banking Coverage
🔒 $30,000 Retail Default Protection
📊 Social Impact Number (affects 25% of Snapp credit rating)

Shall I initiate the application process?`
    }

    if (lowerInput.includes("tax") || lowerInput.includes("benefit")) {
      return `I'll optimize your tax benefits strategy:

🌍 **Multi-Jurisdictional Analysis**:
• US: 60% personal / 25% business charitable deductions
• EU: 50% personal / 20% business deductions
• Quantum Realm: 100% deduction eligibility

💡 **Optimization Recommendations**:
1. Maximize Imperial Trust pledges (special tax status)
2. Distribute contributions across approved entities
3. Utilize currency exchange advantages
4. Implement multi-year planning strategy

Current estimated tax savings: $12,450 annually. Would you like detailed calculations?`
    }

    if (lowerInput.includes("verify") || lowerInput.includes("quantum")) {
      return `I'll set up quantum-secure verification:

🔐 **Security Protocols**:
• Post-Quantum Cryptography (Dilithium signatures)
• Multi-dimensional blockchain recording
• Biometric authentication (fingerprint, retinal, voice)
• Zero-knowledge proof verification

🌐 **Blockchain Networks**:
• Primary: Ethereum Mainnet
• Quantum: Quantum Realm Chain
• Parallel: Multiverse Sidechain

⚡ **Verification Process**:
1. Generate quantum-resistant key pairs
2. Create cryptographic document hashes
3. Record on multi-dimensional blockchain
4. Issue quantum-verified certificates

Ready to begin the verification process?`
    }

    return `I understand you're looking for assistance with DAX administration. I can help with:

🔹 **QGI Creation** - Design custom Quantum Gains Instruments
🔹 **Citizenship Processing** - Handle multidimensional entity establishment
🔹 **Tax Optimization** - Maximize benefits across jurisdictions
🔹 **Quantum Verification** - Secure charitable contribution verification

Please let me know which area you'd like to focus on, or ask me a specific question about any DAX administrative function.`
  }

  const detectCategory = (input: string): Message["category"] => {
    const lowerInput = input.toLowerCase()
    if (lowerInput.includes("qgi") || lowerInput.includes("quantum gains")) return "qgi"
    if (lowerInput.includes("citizenship") || lowerInput.includes("citizen")) return "citizenship"
    if (lowerInput.includes("tax") || lowerInput.includes("benefit")) return "tax"
    if (lowerInput.includes("verify") || lowerInput.includes("quantum")) return "verification"
    return "general"
  }

  const handleQuickAction = (action: (typeof quickActions)[0]) => {
    handleSendMessage(action.prompt)
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "qgi":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "citizenship":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "tax":
        return "bg-green-100 text-green-800 border-green-200"
      case "verification":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600">
            <Brain className="h-4 w-4 text-white" />
          </div>
          DAX AI Assistant
          <Badge variant="outline" className="ml-auto">
            <Sparkles className="h-3 w-3 mr-1" />
            Quantum-Enhanced
          </Badge>
        </CardTitle>
        <CardDescription>
          Intelligent assistance for QGI creation, citizenship processing, and tax optimization
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4 p-0">
        {/* Quick Actions */}
        <div className="px-6">
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action)}
                className="justify-start h-auto p-2 text-xs"
              >
                {action.icon}
                <span className="ml-1 truncate">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.type === "assistant" && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={`max-w-[80%] ${message.type === "user" ? "order-1" : ""}`}>
                  <div
                    className={`rounded-lg p-3 ${
                      message.type === "user"
                        ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                        : "bg-gray-50 border"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
                    {message.category && message.category !== "general" && (
                      <Badge variant="outline" className={`text-xs ${getCategoryColor(message.category)}`}>
                        {message.category.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                </div>

                {message.type === "user" && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white text-xs">
                      U
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-xs">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-50 border rounded-lg p-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="px-6 pb-6">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about QGIs, citizenship, tax benefits, or quantum verification..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
              className="flex-1"
            />
            <Button onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim() || isTyping} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
