"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Brain, Send, Sparkles, User } from "lucide-react"

type Mood = "focused" | "optimistic" | "analytical" | "cautious" | "enthusiastic" | "neutral"
type MessageType = "user" | "assistant"

interface Message {
  id: number
  type: MessageType
  content: string
  timestamp: Date
}

export function MoodAdaptiveAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content: "Hello! I'm your mood-adaptive AI assistant. How can I help with your e-commerce operations today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [currentMood, setCurrentMood] = useState<Mood>("neutral")
  const [isTyping, setIsTyping] = useState(false)

  // Simulate mood detection
  useEffect(() => {
    const moods: Mood[] = ["focused", "optimistic", "analytical", "cautious", "enthusiastic"]
    const interval = setInterval(() => {
      setCurrentMood(moods[Math.floor(Math.random() * moods.length)])
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages([...messages, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response based on mood
    setTimeout(() => {
      const responses = {
        focused: [
          "I've analyzed your request in detail. Here's a precise breakdown of what we can do...",
          "Looking at the specifics, I recommend focusing on these key metrics for your inventory...",
          "Based on detailed analysis, here are the exact steps to optimize your cross-platform strategy...",
        ],
        optimistic: [
          "Great question! I see several growth opportunities we can explore together...",
          "I'm excited about the potential here! Your platform integration could yield significant gains if we...",
          "This is a perfect time to expand your reach! Let me show you how we can maximize your presence across platforms...",
        ],
        analytical: [
          "The data suggests three key approaches to consider. First, let's examine the cross-platform metrics...",
          "When we analyze your inventory patterns across platforms, we see interesting correlations that could be leveraged...",
          "From a data perspective, your question touches on several interconnected systems. Let me break down the analytics...",
        ],
        cautious: [
          "I understand your concern. Let's take a measured approach to ensure we minimize any potential risks...",
          "Before making any changes, we should consider these important factors to protect your current position...",
          "Let's proceed carefully here. I recommend starting with a small test before rolling out across all platforms...",
        ],
        enthusiastic: [
          "This is exactly what our quantum-powered system excels at! Let me show you some innovative approaches...",
          "I'm thrilled you asked about this! Our latest AI models have uncovered some game-changing strategies for this exact scenario...",
          "Perfect timing! We just enhanced our cross-platform optimization algorithms and your question is ideal for showcasing what's possible!",
        ],
        neutral: [
          "I can help with that. Here's what our analysis shows about your cross-platform integration...",
          "Based on your current setup, here are some recommendations for optimizing your inventory across platforms...",
          "Let me provide some insights on how to approach this situation effectively...",
        ],
      }

      const moodResponses = responses[currentMood]
      const aiMessage: Message = {
        id: messages.length + 2,
        type: "assistant",
        content: moodResponses[Math.floor(Math.random() * moodResponses.length)],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getMoodColor = (mood: Mood) => {
    const colors = {
      focused: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      optimistic: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      analytical: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      cautious: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
      enthusiastic: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      neutral: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200",
    }
    return colors[mood]
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card className="flex h-[500px] flex-col border-0 shadow-xl">
      <CardHeader className="border-b bg-gradient-to-r from-violet-600 to-indigo-600 pb-3 pt-3 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border-2 border-white/20">
              <AvatarImage src="/ai-assistant-face.png" alt="AI Assistant" />
              <AvatarFallback>
                <Brain className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-sm font-bold">Quantum AI Assistant</CardTitle>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                <span className="text-xs text-white/80">Online</span>
              </div>
            </div>
          </div>
          <Badge className={`${getMoodColor(currentMood)}`}>
            {currentMood.charAt(0).toUpperCase() + currentMood.slice(1)} Mode
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <div key={message.id} className={`mb-4 flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === "user"
                    ? "bg-indigo-100 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-100"
                    : "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  {message.type === "assistant" && <Brain className="h-4 w-4 text-indigo-500" />}
                  <span className="text-xs font-medium">{message.type === "user" ? "You" : "Quantum AI"}</span>
                  {message.type === "user" && <User className="h-4 w-4 text-indigo-500" />}
                </div>
                <div className="mt-1 text-sm">{message.content}</div>
                <div className="mt-1 text-right text-xs text-slate-500 dark:text-slate-400">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="mb-4 flex justify-start">
              <div className="max-w-[80%] rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-indigo-500" />
                  <span className="text-xs font-medium">Quantum AI</span>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="border-t p-3">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Ask your mood-adaptive AI assistant..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button size="icon" onClick={handleSend} disabled={!input.trim() || isTyping}>
              {isTyping ? <Sparkles className="h-4 w-4 animate-pulse" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
          <div className="mt-2 text-center text-xs text-muted-foreground">
            <Sparkles className="mr-1 inline-block h-3 w-3" />
            Powered by quantum computing and psychological analysis
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
