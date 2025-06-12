"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain, Send, User, Bot, Clock } from "lucide-react"

interface Message {
  id: number
  role: "user" | "assistant" | "system"
  content: string
  timestamp: string
}

interface AIConciergeChatbotProps {
  fullSize?: boolean
}

export function AIConciergeChatbot({ fullSize = false }: AIConciergeChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "system",
      content: "Welcome to the Genius AI Concierge. How can I assist with your financial goals today?",
      timestamp: "Just now",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: inputValue,
      timestamp: "Just now",
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your spending patterns, I recommend allocating an additional 5% to your property down payment fund to reach your goal 3 months earlier.",
        "I've analyzed your credit report and found an opportunity to improve your score by 15 points. Would you like to see the detailed strategy?",
        "The real estate market in your target area shows a 2.5% decrease in prices this month. This could be a good time to explore property options.",
        "Your current loan terms could be optimized. Our quantum analysis shows potential savings of $12,450 over the loan term with a refinance.",
        "I've noticed your vehicle expenses increased by 12% this month. Would you like me to suggest fuel-efficient routes for your daily commute?",
      ]

      const aiMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: "Just now",
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className={`flex flex-col h-full ${fullSize ? "max-h-[500px]" : "max-h-[300px]"}`}>
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} ${
              message.role === "system" ? "justify-center" : ""
            }`}
          >
            {message.role === "system" ? (
              <div className="bg-muted/50 rounded-lg p-3 max-w-[85%] text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                </div>
                {message.content}
              </div>
            ) : (
              <div className={`flex max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar className={`h-8 w-8 ${message.role === "user" ? "ml-2" : "mr-2"}`}>
                  {message.role === "user" ? (
                    <>
                      <AvatarImage src="/abstract-geometric-shapes.png" />
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="/ai-assistant-concept.png" />
                      <AvatarFallback>
                        <Bot />
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.content}
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
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex max-w-[85%] flex-row">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/ai-assistant-concept.png" />
                <AvatarFallback>
                  <Bot />
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
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-3">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Input
            placeholder="Ask about your finances, goals, or recommendations..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" className="flex-shrink-0 bg-gradient-to-r from-indigo-500 to-purple-600">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
