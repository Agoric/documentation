"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, Mic, Settings, Volume2, VolumeX, User, Clock, Sparkles, MessageSquare } from "lucide-react"

// Safe mock data that doesn't depend on browser APIs
const MOCK_CONVERSATIONS = [
  {
    id: 1,
    title: "Investment Strategy",
    messages: [
      {
        id: 1,
        role: "user",
        content: "What investment strategy would you recommend for a volatile market?",
        timestamp: "10:23 AM",
      },
      {
        id: 2,
        role: "assistant",
        content:
          "In volatile markets, I recommend diversification across asset classes. Consider allocating to bonds, gold, and defensive stocks. Dollar-cost averaging can also help mitigate timing risks.",
        timestamp: "10:24 AM",
      },
    ],
    date: "Today",
  },
  {
    id: 2,
    title: "Retirement Planning",
    messages: [
      { id: 1, role: "user", content: "How much should I be saving for retirement?", timestamp: "Yesterday, 3:45 PM" },
      {
        id: 2,
        role: "assistant",
        content:
          "A good rule of thumb is to save 15% of your pre-tax income for retirement. However, this varies based on your age, current savings, and retirement goals.",
        timestamp: "Yesterday, 3:46 PM",
      },
    ],
    date: "Yesterday",
  },
  {
    id: 3,
    title: "Market Analysis",
    messages: [
      {
        id: 1,
        role: "user",
        content: "What sectors do you think will perform well next quarter?",
        timestamp: "May 15, 2023",
      },
      {
        id: 2,
        role: "assistant",
        content:
          "Based on current trends, technology, healthcare, and renewable energy sectors show promise for next quarter. However, always consider your risk tolerance and investment horizon.",
        timestamp: "May 15, 2023",
      },
    ],
    date: "May 15, 2023",
  },
]

export default function AIConciergeClient() {
  const [activeTab, setActiveTab] = useState("chat")
  const [inputValue, setInputValue] = useState("")
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS)
  const [activeConversation, setActiveConversation] = useState(conversations[0])
  const [isLoading, setIsLoading] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // Safe useEffect that doesn't depend on browser APIs
  useEffect(() => {
    // This is safe because we're just setting state with existing data
    setActiveConversation(conversations[0])
  }, [conversations])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Create a new user message
    const newUserMessage = {
      id: Date.now(),
      role: "user" as const,
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    // Update the active conversation with the new message
    const updatedConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, newUserMessage],
    }

    // Update the conversations list
    const updatedConversations = conversations.map((conv) =>
      conv.id === activeConversation.id ? updatedConversation : conv,
    )

    setConversations(updatedConversations)
    setActiveConversation(updatedConversation)
    setInputValue("")

    // Simulate AI response
    setIsLoading(true)
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        role: "assistant" as const,
        content:
          "I'm your AI financial assistant. I'm here to help with your financial questions and provide guidance based on your goals and preferences.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      const conversationWithAiResponse = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, aiResponse],
      }

      const finalConversations = updatedConversations.map((conv) =>
        conv.id === activeConversation.id ? conversationWithAiResponse : conv,
      )

      setConversations(finalConversations)
      setActiveConversation(conversationWithAiResponse)
      setIsLoading(false)
    }, 1500)
  }

  const startNewConversation = () => {
    const newConversation = {
      id: Date.now(),
      title: "New Conversation",
      messages: [],
      date: "Today",
    }

    setConversations([newConversation, ...conversations])
    setActiveConversation(newConversation)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Genius Concierge</h1>
          <p className="text-muted-foreground">Your personal AI assistant for financial insights and guidance</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={() => setActiveTab("settings")}>
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar with conversation history */}
            <div className="hidden md:block md:col-span-1 space-y-4">
              <Button className="w-full" onClick={startNewConversation}>
                <MessageSquare className="mr-2 h-4 w-4" />
                New Conversation
              </Button>

              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      activeConversation.id === conversation.id
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-medium truncate">{conversation.title}</div>
                      <Badge variant="outline" className="text-xs">
                        {conversation.date}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {conversation.messages.length > 0
                        ? conversation.messages[conversation.messages.length - 1].content.substring(0, 40) + "..."
                        : "No messages yet"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Main chat area */}
            <Card className="md:col-span-3">
              <CardHeader className="border-b">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/abstract-ai-network.png" />
                    <AvatarFallback>
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>AI Genius Concierge</CardTitle>
                    <CardDescription>Powered by advanced financial AI</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                  {activeConversation.messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                      <Bot className="h-16 w-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Welcome to AI Genius Concierge</h3>
                      <p className="text-muted-foreground max-w-md">
                        I'm your personal AI assistant for financial insights and guidance. How can I help you today?
                      </p>
                    </div>
                  ) : (
                    activeConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
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
                                <AvatarImage src="/abstract-ai-network.png" />
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
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex max-w-[80%] flex-row">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/abstract-ai-network.png" />
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
                </div>
              </CardContent>
              <CardFooter className="border-t p-3">
                <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="flex-shrink-0"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                  <Button type="button" size="icon" variant="ghost" className="flex-shrink-0">
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" className="flex-shrink-0">
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversation History</CardTitle>
              <CardDescription>Your recent conversations with AI Genius Concierge</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => {
                    setActiveConversation(conversation)
                    setActiveTab("chat")
                  }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Bot className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-medium">{conversation.title}</h3>
                    </div>
                    <Badge variant="outline">{conversation.date}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {conversation.messages.length > 0
                      ? conversation.messages[conversation.messages.length - 1].content.substring(0, 100) + "..."
                      : "No messages in this conversation"}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Concierge Settings</CardTitle>
              <CardDescription>Customize your AI assistant experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Voice Type</label>
                  <select className="w-full p-2 rounded-md border">
                    <option value="female">Female (Default)</option>
                    <option value="male">Male</option>
                    <option value="neutral">Gender Neutral</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Voice Accent</label>
                  <select className="w-full p-2 rounded-md border">
                    <option value="american">American (Default)</option>
                    <option value="british">British</option>
                    <option value="australian">Australian</option>
                    <option value="indian">Indian</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">AI Model</label>
                <select className="w-full p-2 rounded-md border">
                  <option value="gpt-4">GPT-4 (Most Capable)</option>
                  <option value="gpt-3.5">GPT-3.5 (Faster)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Conversation Style</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="justify-start">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Creative
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Bot className="mr-2 h-4 w-4" />
                    Balanced
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Precise
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
