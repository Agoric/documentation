"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

interface ConversationMessage {
  role: "user" | "assistant"
  content: string
  timestamp: Date
  context?: string
}

interface UserProfile {
  creditScore: number
  income: number
  savings: number
  goals: string[]
  riskTolerance: "low" | "medium" | "high"
  currentPage: string
}

interface AIResponse {
  content: string
  actions?: Array<{
    label: string
    action: () => void
    icon?: React.ComponentType<{ className?: string }>
  }>
  metadata?: {
    confidence: number
    sources?: string[]
    calculations?: any
  }
}

export function useConversationalOrb() {
  const [conversationHistory, setConversationHistory] = React.useState<ConversationMessage[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [currentContext, setCurrentContext] = React.useState("")
  const [quickResponses, setQuickResponses] = React.useState<string[]>([])

  const pathname = usePathname()

  // Mock user profile - in real app, this would come from user data
  const userProfile: UserProfile = {
    creditScore: 750,
    income: 85000,
    savings: 25000,
    goals: ["Buy a house", "Retirement planning", "Emergency fund"],
    riskTolerance: "medium",
    currentPage: pathname,
  }

  // Update context when page changes
  React.useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean)
    const context = pathSegments.join(" > ")
    setCurrentContext(context)
    updateQuickResponses(pathname)
  }, [pathname])

  const updateQuickResponses = (path: string) => {
    const responses = {
      "real-estate": [
        "What's my home buying budget?",
        "Explain 50-year loan benefits",
        "Find properties in my area",
        "Calculate mortgage payments",
      ],
      "snap-dax": [
        "Analyze my portfolio",
        "What should I invest in?",
        "Market outlook today",
        "Rebalance recommendations",
      ],
      ecommerex: [
        "Check my rewards balance",
        "Find the best deals",
        "Product recommendations",
        "Exclusive member offers",
      ],
      default: ["Check my credit score", "Improve my finances", "Investment advice", "Loan options"],
    }

    const contextKey = path.includes("real-estate")
      ? "real-estate"
      : path.includes("snap-dax")
        ? "snap-dax"
        : path.includes("ecommerex")
          ? "ecommerex"
          : "default"

    setQuickResponses(responses[contextKey])
  }

  const getSystemPrompt = (context: string, userProfile: UserProfile) => {
    return `You are an expert AI financial assistant for Snapifi, a revolutionary financial platform. You help users with:

CORE SERVICES:
- 50-Year Revolutionary Loans (3.1% APR, lower monthly payments)
- Real Estate Investment & Property Search
- Credit Score Optimization & Monitoring  
- Investment Portfolio Management (SNAP-DAX)
- EcommereX Marketplace & Rewards
- Financial Planning & Goal Setting

USER PROFILE:
- Credit Score: ${userProfile.creditScore}
- Annual Income: $${userProfile.income.toLocaleString()}
- Savings: $${userProfile.savings.toLocaleString()}
- Goals: ${userProfile.goals.join(", ")}
- Risk Tolerance: ${userProfile.riskTolerance}
- Current Page: ${context}

PERSONALITY:
- Friendly, knowledgeable, and trustworthy
- Proactive with personalized recommendations
- Explain complex financial concepts simply
- Always promote Snapifi's unique 50-year loan advantage
- Provide actionable, specific advice

CONTEXT AWARENESS:
${getContextSpecificGuidance(context)}

RESPONSE FORMAT:
- Be conversational and helpful
- Provide specific numbers and calculations when relevant
- Suggest actionable next steps
- Mention relevant Snapifi features and benefits
- Keep responses concise but comprehensive

Always prioritize the user's financial wellbeing and highlight how Snapifi's innovative services can help achieve their goals.`
  }

  const getContextSpecificGuidance = (context: string) => {
    if (context.includes("real-estate")) {
      return `USER IS BROWSING REAL ESTATE:
- Emphasize 50-year loan benefits (40% lower payments vs 30-year)
- Calculate affordability based on their income
- Suggest properties within budget
- Explain pre-approval process
- Highlight investment potential`
    }

    if (context.includes("snap-dax")) {
      return `USER IS ON TRADING PLATFORM:
- Analyze portfolio allocation
- Suggest diversification strategies
- Explain market trends and opportunities
- Recommend based on risk tolerance
- Discuss long-term vs short-term strategies`
    }

    if (context.includes("ecommerex")) {
      return `USER IS SHOPPING:
- Check rewards balance and expiration
- Suggest products based on purchase history
- Highlight exclusive member deals
- Explain cashback and points system
- Recommend budget-friendly options`
    }

    return `GENERAL FINANCIAL GUIDANCE:
- Assess overall financial health
- Suggest improvements for credit score
- Recommend savings strategies
- Explain investment options
- Promote 50-year loan advantages`
  }

  const sendMessage = async (
    message: string,
    options: {
      context: string
      userProfile: UserProfile
      conversationHistory: ConversationMessage[]
    },
  ): Promise<AIResponse> => {
    setIsLoading(true)

    try {
      const systemPrompt = getSystemPrompt(options.context, options.userProfile)

      const conversationContext = options.conversationHistory
        .slice(-10) // Keep last 10 messages for context
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n")

      const fullPrompt = `${systemPrompt}

CONVERSATION HISTORY:
${conversationContext}

USER MESSAGE: ${message}

Provide a helpful, personalized response based on the user's profile and current context. Include specific recommendations and actionable advice.`

      const { text } = await generateText({
        model: groq("llama-3.1-70b-versatile"),
        prompt: fullPrompt,
        temperature: 0.7,
        maxTokens: 500,
      })

      // Add to conversation history
      const newMessages: ConversationMessage[] = [
        {
          role: "user",
          content: message,
          timestamp: new Date(),
          context: options.context,
        },
        {
          role: "assistant",
          content: text,
          timestamp: new Date(),
          context: options.context,
        },
      ]

      setConversationHistory((prev) => [...prev, ...newMessages])

      // Generate contextual actions based on response
      const actions = generateContextualActions(text, options.context)

      return {
        content: text,
        actions,
        metadata: {
          confidence: 0.85,
          sources: ["Snapifi AI", "Financial Database"],
        },
      }
    } catch (error) {
      console.error("AI conversation error:", error)
      throw new Error("Failed to process your message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const generateContextualActions = (response: string, context: string) => {
    const actions = []

    // Loan-related actions
    if (response.toLowerCase().includes("loan") || response.toLowerCase().includes("mortgage")) {
      actions.push({
        label: "Apply for 50-Year Loan",
        action: () => (window.location.href = "/real-estate/loans/apply"),
      })
      actions.push({
        label: "Loan Calculator",
        action: () => (window.location.href = "/real-estate/calculator"),
      })
    }

    // Property-related actions
    if (response.toLowerCase().includes("property") || response.toLowerCase().includes("house")) {
      actions.push({
        label: "Search Properties",
        action: () => (window.location.href = "/real-estate"),
      })
    }

    // Investment-related actions
    if (response.toLowerCase().includes("invest") || response.toLowerCase().includes("portfolio")) {
      actions.push({
        label: "View Portfolio",
        action: () => (window.location.href = "/dashboard/snap-dax"),
      })
    }

    // Credit-related actions
    if (response.toLowerCase().includes("credit") || response.toLowerCase().includes("score")) {
      actions.push({
        label: "Check Credit Score",
        action: () => (window.location.href = "/dashboard/credit"),
      })
    }

    return actions.slice(0, 3) // Limit to 3 actions
  }

  const startVoiceInput = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
        reject(new Error("Speech recognition not supported"))
        return
      }

      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        resolve(transcript)
      }

      recognition.onerror = (event) => {
        reject(new Error(`Speech recognition error: ${event.error}`))
      }

      recognition.start()
    })
  }

  const stopVoiceInput = () => {
    // Implementation for stopping voice input
  }

  const speakResponse = async (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1.0
      utterance.volume = 0.8

      // Use a pleasant voice if available
      const voices = speechSynthesis.getVoices()
      const preferredVoice = voices.find((voice) => voice.name.includes("Google") || voice.name.includes("Microsoft"))
      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      speechSynthesis.speak(utterance)
    }
  }

  const clearConversation = () => {
    setConversationHistory([])
  }

  const saveConversation = () => {
    const conversationData = {
      timestamp: new Date().toISOString(),
      messages: conversationHistory,
      context: currentContext,
    }

    // Save to localStorage or send to backend
    localStorage.setItem(`snapifi-conversation-${Date.now()}`, JSON.stringify(conversationData))
  }

  const getContextualPrompts = () => {
    const prompts = {
      "real-estate": [
        "What's my maximum home buying budget?",
        "How much can I save with a 50-year loan?",
        "Show me properties under $400k",
      ],
      "snap-dax": [
        "Should I rebalance my portfolio?",
        "What's the market outlook for tech stocks?",
        "How can I reduce investment risk?",
      ],
      ecommerex: [
        "What rewards do I have available?",
        "Find me the best electronics deals",
        "How can I maximize my cashback?",
      ],
      default: [
        "How can I improve my credit score?",
        "What's the best savings strategy for me?",
        "Should I refinance my current loan?",
      ],
    }

    const contextKey = pathname.includes("real-estate")
      ? "real-estate"
      : pathname.includes("snap-dax")
        ? "snap-dax"
        : pathname.includes("ecommerex")
          ? "ecommerex"
          : "default"

    return prompts[contextKey]
  }

  return {
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
  }
}
