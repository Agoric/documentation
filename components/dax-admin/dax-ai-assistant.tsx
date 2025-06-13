"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Brain, Send, User, TrendingUp, Globe, Zap, Settings, Clock } from "lucide-react"

interface DAXMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  type?: "qgi-creation" | "citizenship" | "analytics" | "general"
  metadata?: any
}

export function DAXAIAssistant() {
  const [messages, setMessages] = useState<DAXMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeMode, setActiveMode] = useState<"qgi" | "citizenship" | "analytics" | "general">("general")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: DAXMessage = {
      id: "welcome",
      role: "assistant",
      content: `Welcome to the DAX Administrative AI Assistant. I can help you create Quantum Gains Instruments (QGI), process citizenship applications, analyze performance metrics, and manage the Imperial Trust Social Impact Fund.

Available commands:
• "Create QGI" - Design new investment instruments
• "Process citizenship" - Handle new citizen applications  
• "Analyze performance" - Review fund and QGI analytics
• "Configure variables" - Set QGI parameters and variables

What would you like to work on today?`,
      timestamp: new Date(),
      type: "general",
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

    const userMessage: DAXMessage = {
      id: Date.now().toString(),
      role: "user",
      content: messageToSend,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI processing
    setTimeout(() => {
      const response = generateDAXResponse(messageToSend)
      setMessages((prev) => [...prev, response])
      setIsTyping(false)
    }, 1500)
  }

  const generateDAXResponse = (message: string): DAXMessage => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("create qgi") || lowerMessage.includes("quantum gains")) {
      return {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I'll help you create a new Quantum Gains Instrument. Let me gather the required parameters:

**QGI Configuration Options:**
1. **Instrument Type**: Social Impact, Guaranteed Mortgage (GM), Custom
2. **Backing Asset**: US Corporate Bonds, Government Securities, Mixed Portfolio
3. **Maturity Period**: 10, 25, 50 years (or custom)
4. **Leverage Ratio**: 1:1 to 10:1
5. **Risk Rating**: AAA, AA, A, BBB
6. **Minimum Investment**: $1,000 to $1,000,000
7. **Yield Structure**: Fixed, Variable, Hybrid

Please specify:
- What type of QGI would you like to create?
- What should be the underlying asset backing?
- What maturity period are you targeting?

I can also create a mirrored instrument that tracks existing market instruments with quantum-enhanced analytics.`,
        timestamp: new Date(),
        type: "qgi-creation",
        metadata: {
          suggestedActions: ["Configure Social Impact QGI", "Create GM QGI", "Design Custom Instrument"],
        },
      }
    }

    if (
      lowerMessage.includes("citizenship") ||
      lowerMessage.includes("process") ||
      lowerMessage.includes("application")
    ) {
      return {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I'll assist with citizenship processing for the DAX multidimensional realm. Here's the current workflow:

**Citizenship Application Processing:**

**Required Documents Verification:**
✓ Recorded Declaration (Audio/Video validation)
✓ State/Federal ID verification
✓ Bank account authentication
✓ SSN/equivalent validation
✓ $50 Quantum Domicile Ledger Fee payment

**Automatic Benefits Assignment:**
• Global Digital Citizen ID & Number generation
• $80,000 Social Impact Credit at 1% interest
• $250,000 Imperial Banking coverage
• $30,000 retail default protection
• Social Impact Number (SIN) assignment

**Current Processing Status:**
- 234 pending applications
- Average processing time: 24-48 hours
- Success rate: 98.7%

Would you like me to:
1. Process a specific application
2. Review pending applications
3. Configure citizenship benefits
4. Generate new citizen IDs`,
        timestamp: new Date(),
        type: "citizenship",
        metadata: {
          pendingApplications: 234,
          processingTime: "24-48 hours",
        },
      }
    }

    if (lowerMessage.includes("analyz") || lowerMessage.includes("performance") || lowerMessage.includes("metrics")) {
      return {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Here's the current DAX performance analytics:

**Social Impact Fund Performance:**
• Total Fund Value: $2,847,392,847.50
• 30-day return: +3.2%
• YTD performance: +12.8%
• Active QGI instruments: 89
• Average yield: 4.7%

**Citizenship Metrics:**
• Total Citizens: 12,847
• New registrations (30 days): 1,247
• Average Snapp Credit Rating: 742
• Default rate: 0.3%

**QGI Performance:**
• Social Impact QGI: +4.2% (30-day)
• GM QGI: +3.8% (30-day)
• Custom QGIs: +5.1% average

**Risk Assessment:**
• Overall portfolio risk: Low-Medium
• Leverage utilization: 67%
• Liquidity ratio: 23%

Would you like me to:
1. Deep dive into specific QGI performance
2. Analyze citizen credit trends
3. Review fund allocation strategies
4. Generate custom reports`,
        timestamp: new Date(),
        type: "analytics",
        metadata: {
          fundValue: 2847392847.5,
          performance: "+12.8%",
          riskLevel: "Low-Medium",
        },
      }
    }

    if (lowerMessage.includes("variable") || lowerMessage.includes("configure") || lowerMessage.includes("parameter")) {
      return {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I'll help you configure QGI variables and parameters. Here are the configurable elements:

**Core QGI Variables:**
1. **Yield Calculation**: Fixed rate, floating rate, or hybrid
2. **Risk Weighting**: Conservative (1-3), Moderate (4-6), Aggressive (7-10)
3. **Liquidity Terms**: Daily, Weekly, Monthly, Quarterly redemption
4. **Leverage Multiplier**: 1x to 10x leverage options
5. **Correlation Factors**: Market correlation coefficients
6. **Maturity Ladder**: Staggered maturity dates

**Social Impact QGI Specific:**
• Bond mirror percentage (50-100% of US corporate bonds)
• Lending leverage ratio (2:1 to 8:1)
• Credit rating influence weight (10-50% of Snapp score)
• Premium calculation methodology

**GM QGI Specific:**
• Mortgage backing ratio
• Government guarantee percentage
• Interest rate spread
• Default protection level

**Custom Variables:**
• Asset allocation percentages
• Rebalancing frequency
• Performance benchmarks
• Fee structures

Which variables would you like to configure? I can create a new instrument with your specifications or modify existing ones.`,
        timestamp: new Date(),
        type: "qgi-creation",
        metadata: {
          configurableParams: ["yield", "risk", "liquidity", "leverage", "correlation"],
        },
      }
    }

    // Default response
    return {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: `I'm your DAX Administrative AI Assistant, specialized in:

🌌 **Quantum Gains Instruments (QGI)**
- Create and configure investment instruments
- Set variables and parameters
- Monitor performance analytics

🌍 **Global Citizenship Management**
- Process multidimensional entity applications
- Manage Imperial Trust benefits
- Generate citizen IDs and Social Impact Numbers

📊 **Analytics & Reporting**
- Real-time fund performance
- Risk assessment and management
- Custom reporting and insights

💫 **Imperial Trust Operations**
- Social Impact Fund management
- Leverage and lending operations
- Government-backed instrument oversight

How can I assist you with DAX administration today? You can ask me to create instruments, process applications, analyze performance, or configure any system parameters.`,
      timestamp: new Date(),
      type: "general",
    }
  }

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "qgi":
        return <Zap className="h-4 w-4" />
      case "citizenship":
        return <Globe className="h-4 w-4" />
      case "analytics":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const getMessageIcon = (message: DAXMessage) => {
    if (message.role === "user") return <User className="h-4 w-4" />

    switch (message.type) {
      case "qgi-creation":
        return <Zap className="h-4 w-4 text-purple-400" />
      case "citizenship":
        return <Globe className="h-4 w-4 text-blue-400" />
      case "analytics":
        return <TrendingUp className="h-4 w-4 text-green-400" />
      default:
        return <Brain className="h-4 w-4 text-cyan-400" />
    }
  }

  return (
    <Card className="flex flex-col h-[700px]">
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
              <CardTitle className="text-sm">DAX Administrative AI</CardTitle>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Quantum Processing Active
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant={activeMode === "general" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveMode("general")}
            >
              {getModeIcon("general")}
              General
            </Button>
            <Button variant={activeMode === "qgi" ? "default" : "ghost"} size="sm" onClick={() => setActiveMode("qgi")}>
              {getModeIcon("qgi")}
              QGI
            </Button>
            <Button
              variant={activeMode === "citizenship" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveMode("citizenship")}
            >
              {getModeIcon("citizenship")}
              Citizenship
            </Button>
            <Button
              variant={activeMode === "analytics" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveMode("analytics")}
            >
              {getModeIcon("analytics")}
              Analytics
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
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      {message.type && message.type !== "general" && (
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            {message.type === "qgi-creation" && <Zap className="h-3 w-3 mr-1" />}
                            {message.type === "citizenship" && <Globe className="h-3 w-3 mr-1" />}
                            {message.type === "analytics" && <TrendingUp className="h-3 w-3 mr-1" />}
                            {message.type.replace("-", " ").toUpperCase()}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Suggested Actions */}
                    {message.metadata?.suggestedActions && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {message.metadata.suggestedActions.map((action: string, index: number) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => handleSendMessage(action)}
                          >
                            {action}
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

        {/* Quick Actions */}
        <div className="p-4 border-t bg-muted/30">
          <div className="text-sm font-medium mb-2">Quick Actions:</div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleSendMessage("Create a new Social Impact QGI")}
            >
              <Zap className="h-3 w-3 mr-1" />
              Create QGI
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleSendMessage("Process pending citizenship applications")}
            >
              <Globe className="h-3 w-3 mr-1" />
              Process Applications
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleSendMessage("Analyze current fund performance")}
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              View Analytics
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleSendMessage("Configure QGI variables and parameters")}
            >
              <Settings className="h-3 w-3 mr-1" />
              Configure Variables
            </Button>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex items-center gap-2"
          >
            <Input
              placeholder="Ask me to create QGI instruments, process citizenship, or analyze performance..."
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
