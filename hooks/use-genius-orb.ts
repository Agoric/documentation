"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

interface Insight {
  id: string
  title: string
  message: string
  action: string
  priority: "low" | "medium" | "high" | "featured"
  context: string[]
  timestamp: Date
}

interface Recommendation {
  id: string
  type: "financial" | "property" | "investment" | "credit" | "savings"
  title: string
  description: string
  impact: "low" | "medium" | "high"
  timeframe: string
  action: string
}

interface UserProgress {
  creditScore: number
  savingsGoal: number
  savingsProgress: number
  investmentGoals: number
  propertyGoals: number
  overallHealth: number
}

export function useGeniusOrb() {
  const [isActive, setIsActive] = React.useState(true)
  const [insights, setInsights] = React.useState<Insight[]>([])
  const [recommendations, setRecommendations] = React.useState<Recommendation[]>([])
  const [currentContext, setCurrentContext] = React.useState<string>("")
  const [userProgress, setUserProgress] = React.useState<UserProgress>({
    creditScore: 750,
    savingsGoal: 10000,
    savingsProgress: 7300,
    investmentGoals: 4,
    propertyGoals: 1,
    overallHealth: 85,
  })

  const pathname = usePathname()

  // Update context based on current page
  React.useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean)
    const context = pathSegments.join(" > ")
    setCurrentContext(context)

    // Generate context-specific insights
    generateContextualInsights(pathname)
  }, [pathname])

  const generateContextualInsights = (path: string) => {
    const newInsights: Insight[] = []

    if (path.includes("/real-estate")) {
      newInsights.push({
        id: "property-market",
        title: "Property Market Alert",
        message: "Interest rates are expected to rise 0.25% next month. Consider locking in your rate now.",
        action: "Lock Rate",
        priority: "high",
        context: ["real-estate", "loans"],
        timestamp: new Date(),
      })
    }

    if (path.includes("/dashboard")) {
      newInsights.push({
        id: "portfolio-rebalance",
        title: "Portfolio Rebalancing",
        message: "Your portfolio has drifted 8% from target allocation. Consider rebalancing.",
        action: "Rebalance",
        priority: "medium",
        context: ["dashboard", "investments"],
        timestamp: new Date(),
      })
    }

    if (path.includes("/ecommerex")) {
      newInsights.push({
        id: "rewards-expiry",
        title: "Rewards Expiring",
        message: "You have $250 in rewards points expiring in 15 days.",
        action: "Use Rewards",
        priority: "medium",
        context: ["ecommerex", "rewards"],
        timestamp: new Date(),
      })
    }

    setInsights(newInsights)
  }

  const toggleOrb = () => {
    setIsActive(!isActive)
  }

  const getContextualHelp = (topic: string) => {
    // Return contextual help based on current page and topic
    const helpContent = {
      "50-year-loan": {
        title: "Revolutionary 50-Year Loan",
        content: "Our 50-year loan reduces monthly payments by up to 40% compared to traditional 30-year mortgages.",
        benefits: ["Lower monthly payments", "More cash flow for investments", "Generational wealth building"],
      },
      "credit-optimization": {
        title: "Credit Score Optimization",
        content: "Strategic credit management can boost your score by 50+ points in 90 days.",
        benefits: ["Better loan rates", "Higher credit limits", "Premium financial products"],
      },
      "investment-strategy": {
        title: "Investment Strategy",
        content: "Diversified portfolio allocation based on your risk tolerance and timeline.",
        benefits: ["Risk management", "Growth potential", "Tax optimization"],
      },
    }

    return helpContent[topic as keyof typeof helpContent] || null
  }

  const speakText = async (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1.1
      utterance.volume = 0.8

      // Use a more pleasant voice if available
      const voices = speechSynthesis.getVoices()
      const preferredVoice = voices.find((voice) => voice.name.includes("Google") || voice.name.includes("Microsoft"))
      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      speechSynthesis.speak(utterance)

      return new Promise<void>((resolve) => {
        utterance.onend = () => resolve()
      })
    }
  }

  const startListening = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase()
        handleVoiceCommand(transcript)
      }

      recognition.start()
    }
  }

  const stopListening = () => {
    // Stop speech recognition
  }

  const handleVoiceCommand = (command: string) => {
    if (command.includes("show") && command.includes("property")) {
      window.location.href = "/real-estate"
    } else if (command.includes("check") && command.includes("credit")) {
      window.location.href = "/dashboard/credit"
    } else if (command.includes("trading") || command.includes("invest")) {
      window.location.href = "/dashboard/snap-dax"
    } else if (command.includes("shop") || command.includes("buy")) {
      window.location.href = "/dashboard/ecommerex/holographic-products"
    } else if (command.includes("loan") || command.includes("mortgage")) {
      window.location.href = "/real-estate/loans"
    }
  }

  return {
    insights,
    recommendations,
    currentContext,
    userProgress,
    isActive,
    toggleOrb,
    getContextualHelp,
    speakText,
    startListening,
    stopListening,
  }
}
