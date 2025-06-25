"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function useConversationalOrb() {
  const pathname = usePathname()
  const [messages, setMessages] = React.useState<Message[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  // mock user profile (replace with real data source as needed)
  const userProfile = {
    creditScore: 750,
    income: 85_000,
    savings: 25_000,
    goals: ["Buy a house", "Retirement planning"],
    riskTolerance: "medium" as const,
  }

  const sendMessage = async (userMessage: string) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
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
        id: crypto.randomUUID(),
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

  return { messages, isLoading, sendMessage }
}
