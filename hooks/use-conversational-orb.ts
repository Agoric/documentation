"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

/* Generates a unique ID in all runtimes */
const generateId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface Insight {
  id: string
  title: string
  message: string
  priority: "low" | "medium" | "high" | "featured"
  timestamp: Date
}

export function useConversationalOrb() {
  const pathname = usePathname()
  const [messages, setMessages] = React.useState<Message[]>([])
  const [insights, setInsights] = React.useState<Insight[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isListening, setIsListening] = React.useState(false)
  const [isSpeaking, setIsSpeaking] = React.useState(false)

  // mock user profile (replace with real data source as needed)
  const userProfile = {
    creditScore: 750,
    income: 85_000,
    savings: 25_000,
    goals: ["Buy a house", "Retirement planning"],
    riskTolerance: "medium" as const,
  }

  // —─────────────────────────────────────────────────────────
  // Context-aware quick-reply helper
  const getContextualSuggestions = React.useCallback((currentPath: string): string[] => {
    if (currentPath.includes("/real-estate"))
      return ["What's my home-buying budget?", "Show me 50-year loan savings", "Find properties under $400k"]
    if (currentPath.includes("/dashboard/snap-dax"))
      return ["Should I rebalance my portfolio?", "Market outlook today", "How can I reduce investment risk?"]
    if (currentPath.includes("/ecommerex"))
      return ["How do I maximise rewards?", "Any exclusive deals today?", "Show platform citizen benefits"]
    return [
      "How can I improve my credit score?",
      "What's the best savings strategy for me?",
      "Should I refinance my mortgage?",
    ]
  }, [])

  const sendMessage = async (userMessage: string) => {
    const userMsg: Message = {
      id: generateId(),
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)

    try {
      const res = await fetch("/api/orb-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage,
          conversationHistory: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
          context: pathname,
          userProfile,
        }),
      })

      if (!res.ok) throw new Error(`API error: ${res.status}`)

      const { content } = (await res.json()) as { content: string }

      const aiMsg: Message = {
        id: generateId(),
        role: "assistant",
        content,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMsg])
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // —─────────────────────────────────────────────────────────
  // Text-to-speech
  const speakText = React.useCallback(async (text: string) => {
    if (!("speechSynthesis" in window)) return
    setIsSpeaking(true)
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    speechSynthesis.speak(utterance)
  }, [])

  // Speech-to-text
  const startListening = React.useCallback((): Promise<string | null> => {
    return new Promise((resolve) => {
      const SR = window.webkitSpeechRecognition || window.SpeechRecognition
      if (!SR) return resolve(null)
      const recog = new SR()
      recog.lang = "en-US"
      recog.interimResults = false
      setIsListening(true)
      recog.onresult = (e) => {
        setIsListening(false)
        resolve(e.results[0][0].transcript)
      }
      recog.onerror = () => {
        setIsListening(false)
        resolve(null)
      }
      recog.start()
    })
  }, [])

  const stopListening = React.useCallback(() => {
    setIsListening(false)
  }, [])

  const clearConversation = React.useCallback(() => setMessages([]), [])

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
