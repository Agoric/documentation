"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  actions?: Array<{
    label: string
    url: string
  }>
  confidence?: number
}

interface Insight {
  id: string
  title: string
  message: string
  action: string
  priority: "low" | "medium" | "high" | "featured"
  context: string[]
  timestamp: Date
}

export function useConversationalOrb() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [insights, setInsights] = React.useState<Insight[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isListening, setIsListening] = React.useState(false)
  const [isSpeaking, setIsSpeaking] = React.useState(false)
  const [conversationContext, setConversationContext] = React.useState<string>("")
  const pathname = usePathname()

  // User profile for personalization
  const userProfile = {
    creditScore: 750,
    income: 85000,
    savings: 25000,
    goals: ["home-purchase", "investment", "emergency-fund"],
    riskTolerance: "medium",
    currentPage: pathname,
  }

  // Generate contextual AI system prompt based on current page
  const getSystemPrompt = React.useCallback(
    (currentPath: string) => {
      const basePrompt = `You are the Genius Guide, an AI financial assistant for the Snapifi Financial Platform. You provide expert advice on loans, investments, credit optimization, and real estate.

User Profile:
- Credit Score: ${userProfile.creditScore}
- Annual Income: $${userProfile.income.toLocaleString()}
- Savings: $${userProfile.savings.toLocaleString()}
- Goals: ${userProfile.goals.join(", ")}
- Risk Tolerance: ${userProfile.riskTolerance}

Key Platform Features to Promote:
- Revolutionary 50-Year Loans at 3.1% APR (reduces monthly payments by 40%)
- Credit optimization strategies
- Real estate marketplace with holographic property views
- Investment platform (SNAP-DAX)
- EcommereX shopping with rewards

Current Context: ${currentPath}

Guidelines:
1. Always be helpful, professional, and encouraging
2. Provide specific, actionable advice
3. Include relevant calculations when helpful
4. Promote appropriate platform features
5. Keep responses concise but comprehensive
6. Include confidence level (0-100%) for recommendations
7. Suggest specific next actions with button labels and URLs when relevant

Response Format:
- Provide clear, actionable advice
- Include confidence percentage
- Suggest 1-2 specific actions with button labels and URLs
- Use encouraging, professional tone`

      // Add page-specific context
      if (currentPath.includes("/real-estate")) {
        return (
          basePrompt +
          `\n\nCurrent Focus: Real Estate - Emphasize property search, 50-year loans, affordability calculations, and market insights.`
        )
      } else if (currentPath.includes("/dashboard/snap-dax")) {
        return (
          basePrompt +
          `\n\nCurrent Focus: Trading/Investments - Focus on portfolio optimization, market analysis, and investment strategies.`
        )
      } else if (currentPath.includes("/ecommerex")) {
        return (
          basePrompt +
          `\n\nCurrent Focus: Shopping - Highlight rewards optimization, exclusive deals, and platform citizen benefits.`
        )
      } else if (currentPath.includes("/dashboard")) {
        return (
          basePrompt +
          `\n\nCurrent Focus: Financial Dashboard - Provide comprehensive financial health analysis and optimization strategies.`
        )
      }

      return basePrompt
    },
    [pathname],
  )

  // Send message to AI
  const sendMessage = React.useCallback(
    async (userMessage: string) => {
      setIsLoading(true)

      // Add user message
      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: userMessage,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMsg])

      try {
        // Generate AI response
        const { text } = await generateText({
          model: groq("llama-3.1-70b-versatile"),
          system: getSystemPrompt(pathname),
          messages: [
            ...messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            {
              role: "user",
              content: userMessage,
            },
          ],
          temperature: 0.7,
          maxTokens: 500,
        })

        // Parse response for actions and confidence
        const actions = extractActions(text, pathname)
        const confidence = extractConfidence(text)

        // Add AI response
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: text,
          timestamp: new Date(),
          actions,
          confidence,
        }

        setMessages((prev) => [...prev, aiMsg])
      } catch (error) {
        console.error("Failed to generate AI response:", error)

        // Add error message
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "I apologize, but I'm having trouble processing your request right now. Please try again in a moment, or feel free to explore our platform features directly.",
          timestamp: new Date(),
          actions: [
            { label: "View Properties", url: "/real-estate" },
            { label: "Check Credit", url: "/dashboard/credit" },
          ],
        }

        setMessages((prev) => [...prev, errorMsg])
      } finally {
        setIsLoading(false)
      }
    },
    [messages, pathname, getSystemPrompt],
  )

  // Extract action buttons from AI response
  const extractActions = (text: string, currentPath: string): Array<{ label: string; url: string }> => {
    const actions: Array<{ label: string; url: string }> = []

    // Common actions based on content keywords
    if (
      text.toLowerCase().includes("property") ||
      text.toLowerCase().includes("home") ||
      text.toLowerCase().includes("real estate")
    ) {
      actions.push({ label: "View Properties", url: "/real-estate" })
    }

    if (
      text.toLowerCase().includes("loan") ||
      text.toLowerCase().includes("mortgage") ||
      text.toLowerCase().includes("50-year")
    ) {
      actions.push({ label: "Apply for Loan", url: "/real-estate/loans" })
    }

    if (text.toLowerCase().includes("credit") || text.toLowerCase().includes("score")) {
      actions.push({ label: "Check Credit", url: "/dashboard/credit" })
    }

    if (
      text.toLowerCase().includes("invest") ||
      text.toLowerCase().includes("portfolio") ||
      text.toLowerCase().includes("trading")
    ) {
      actions.push({ label: "Start Trading", url: "/dashboard/snap-dax" })
    }

    if (text.toLowerCase().includes("calculate") || text.toLowerCase().includes("payment")) {
      actions.push({ label: "Use Calculator", url: "/tools/calculator" })
    }

    return actions.slice(0, 2) // Limit to 2 actions
  }

  // Extract confidence level from AI response
  const extractConfidence = (text: string): number => {
    const confidenceMatch = text.match(/confidence[:\s]*(\d+)%?/i)
    if (confidenceMatch) {
      return Number.parseInt(confidenceMatch[1])
    }
    return 85 // Default confidence
  }

  // Get contextual suggestions based on current page
  const getContextualSuggestions = React.useCallback((currentPath: string) => {
    const baseSuggestions = [
      "What's my home buying budget?",
      "How can I improve my credit score?",
      "Should I refinance my mortgage?",
      "What's the best investment strategy for me?",
    ]

    if (currentPath.includes("/real-estate")) {
      return [
        "What's my home buying budget with a 50-year loan?",
        "Show me properties in my price range",
        "How much can I save with your 50-year loan?",
        "What are current mortgage rates?",
        "Calculate my monthly payment",
      ]
    } else if (currentPath.includes("/dashboard/snap-dax")) {
      return [
        "Should I rebalance my portfolio?",
        "What are the best investment opportunities?",
        "How can I reduce investment risk?",
        "Analyze my current portfolio performance",
        "What's the market outlook?",
      ]
    } else if (currentPath.includes("/ecommerex")) {
      return [
        "How can I maximize my rewards points?",
        "What exclusive deals are available?",
        "Show me platform citizen benefits",
        "How do I earn more rewards?",
        "What's trending in the marketplace?",
      ]
    } else if (currentPath.includes("/dashboard")) {
      return [
        "What's my overall financial health?",
        "How can I optimize my finances?",
        "What goals should I focus on?",
        "Show me ways to save money",
        "Analyze my spending patterns",
      ]
    }

    return baseSuggestions
  }, [])

  // Clear conversation
  const clearConversation = React.useCallback(() => {
    setMessages([])
    setConversationContext("")
  }, [])

  // Text-to-speech
  const speakText = React.useCallback(async (text: string) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true)

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1.1
      utterance.volume = 0.8

      // Use a more pleasant voice if available
      const voices = speechSynthesis.getVoices()
      const preferredVoice = voices.find(
        (voice) => voice.name.includes("Google") || voice.name.includes("Microsoft") || voice.name.includes("Samantha"),
      )
      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      speechSynthesis.speak(utterance)
    }
  }, [])

  // Speech-to-text
  const startListening = React.useCallback((): Promise<string | null> => {
    return new Promise((resolve) => {
      if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
        const recognition = new SpeechRecognition()

        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = "en-US"

        setIsListening(true)

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript
          setIsListening(false)
          resolve(transcript)
        }

        recognition.onerror = () => {
          setIsListening(false)
          resolve(null)
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        recognition.start()
      } else {
        resolve(null)
      }
    })
  }, [])

  const stopListening = React.useCallback(() => {
    setIsListening(false)
  }, [])

  // Generate contextual insights based on current page
  React.useEffect(() => {
    const generateInsights = () => {
      const newInsights: Insight[] = []

      if (pathname.includes("/real-estate")) {
        newInsights.push({
          id: "property-opportunity",
          title: "Property Market Alert",
          message: "3 new properties matching your criteria were listed today. Interest rates may rise next month.",
          action: "View Properties",
          priority: "high",
          context: ["real-estate"],
          timestamp: new Date(),
        })
      }

      if (pathname.includes("/dashboard")) {
        newInsights.push({
          id: "credit-optimization",
          title: "Credit Score Boost",
          message: "Paying down $500 on your credit card could increase your score by 15-20 points within 30 days.",
          action: "Optimize Credit",
          priority: "medium",
          context: ["dashboard", "credit"],
          timestamp: new Date(),
        })
      }

      setInsights(newInsights)
    }

    generateInsights()
  }, [pathname])

  return {
    messages,
    insights,
    isLoading,
    isListening,
    isSpeaking,
    sendMessage,
    clearConversation,
    speakText,
    startListening,
    stopListening,
    getContextualSuggestions,
  }
}
