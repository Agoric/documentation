"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Crown, Send, Mic, MicOff, Volume2, VolumeX, Brain, Sparkles, Copy } from "lucide-react"
import type { SpeechRecognition } from "web-speech-api"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  isVoice?: boolean
  category?: "general" | "financial" | "legal" | "technical" | "imperial"
}

interface VoiceSettings {
  enabled: boolean
  voice: SpeechSynthesisVoice | null
  rate: number
  pitch: number
  volume: number
}

interface ConversationContext {
  userName: string
  lastTopic: string
  conversationFlow: string[]
  userPreferences: string[]
  sessionGoals: string[]
}

const CONVERSATIONAL_RESPONSES = {
  greetings: [
    "Hey there! I'm your AI genius guide, and honestly? I'm pumped to help you dominate today. What's on your mind?",
    "What's up, champion! Ready to make some serious moves? I've got all the intel you need to crush your goals.",
    "Hey! Your digital genius is here and ready to roll. What are we conquering today?",
  ],

  financial: {
    casual: [
      "Alright, money talk - my favorite! Look, here's the deal with your finances...",
      "Okay, so you're thinking about money moves. Smart! Let me break this down for you...",
      "Money questions? Perfect timing! I've been analyzing your portfolio and...",
    ],
    detailed: [
      "So here's what I'm seeing in your financial picture - and trust me, it's looking good. Your QGI balance is sitting pretty at 250K, bonds are performing at 8.5K and climbing. But here's where it gets interesting...",
      "Let's talk numbers for a second. Your portfolio's up 12.5% this quarter, which is fantastic, but I'm seeing three opportunities that could push that even higher. Want me to walk you through them?",
      "Your financial game is strong, but I've got some ideas that could make it even stronger. We're talking about optimizing your asset allocation, maybe diversifying into some high-yield opportunities...",
    ],
  },

  technical: {
    quick: [
      "Tech issues? No problem, I live for this stuff. What's going on?",
      "Alright, let's troubleshoot this. Tell me exactly what's happening...",
      "Technical stuff is my bread and butter. What can I fix for you?",
    ],
    solutions: [
      "Okay, I see what's happening here. The neural networks are showing me a few different solutions. The fastest fix is...",
      "So here's the thing - this is actually a common issue, and I've got the perfect solution. First, we're gonna...",
      "I'm running diagnostics right now, and honestly? This is easier to fix than you might think. Here's what we do...",
    ],
  },

  motivational: [
    "You know what? I love that you're asking these questions. That's exactly how winners think!",
    "Here's the thing about success - it's not just about having the right answers, it's about asking the right questions. And you're doing that!",
    "Listen, every successful person I know started exactly where you are right now. The difference? They took action.",
    "You're already ahead of 90% of people just by being here and engaging. That's champion mindset right there!",
  ],

  conversational_bridges: [
    "But here's where it gets really interesting...",
    "Now, here's what most people don't realize...",
    "And this is the part that's gonna blow your mind...",
    "So here's my take on this...",
    "Let me tell you what I'm really excited about...",
    "You know what's crazy about this?",
    "Here's something that might surprise you...",
  ],

  follow_ups: [
    "What do you think about that approach?",
    "Does that make sense, or should I break it down differently?",
    "Want me to dive deeper into any of that?",
    "How does that sound to you?",
    "What's your gut feeling on this?",
    "Any questions about what I just laid out?",
    "Should we explore that option more?",
  ],
}

export function ImperialAIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    enabled: true,
    voice: null,
    rate: 1.3, // Much faster for natural conversation
    pitch: 0.95, // Slightly lower for authority
    volume: 0.85, // Comfortable volume
  })
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    userName: "Champion",
    lastTopic: "",
    conversationFlow: [],
    userPreferences: [],
    sessionGoals: [],
  })
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  // Initialize speech synthesis and recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis

      // Load available voices with preference for natural-sounding ones
      const loadVoices = () => {
        const voices = synthRef.current?.getVoices() || []
        setAvailableVoices(voices)

        // Select the most natural-sounding voice available
        const preferredVoice =
          voices.find((voice) => voice.name.includes("Google US English") && voice.name.includes("Male")) ||
          voices.find((voice) => voice.name.includes("Microsoft David Desktop")) ||
          voices.find((voice) => voice.name.includes("Alex")) ||
          voices.find((voice) => voice.name.includes("Daniel")) ||
          voices.find((voice) => voice.name.includes("Samantha")) ||
          voices.find((voice) => voice.lang.startsWith("en-US") && voice.localService) ||
          voices.find((voice) => voice.lang.startsWith("en-US")) ||
          voices[0]

        setVoiceSettings((prev) => ({ ...prev, voice: preferredVoice }))
      }

      loadVoices()
      if (synthRef.current) {
        synthRef.current.onvoiceschanged = loadVoices
      }

      // Initialize speech recognition with better settings
      if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = "en-US"
        recognitionRef.current.maxAlternatives = 1

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[event.results.length - 1][0].transcript
          if (event.results[event.results.length - 1].isFinal) {
            setInputValue(transcript)
            setIsListening(false)
          }
        }

        recognitionRef.current.onerror = () => {
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }

    // Add welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      type: "assistant",
      content: CONVERSATIONAL_RESPONSES.greetings[0],
      timestamp: new Date(),
      category: "imperial",
    }
    setMessages([welcomeMessage])

    // Speak welcome message after a short delay
    setTimeout(() => {
      speakMessage(welcomeMessage.content)
    }, 800)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const speakMessage = (text: string) => {
    if (!voiceSettings.enabled || !synthRef.current || !voiceSettings.voice) return

    // Cancel any ongoing speech
    synthRef.current.cancel()

    // Process text for more natural speech
    const processedText = text
      .replace(/\.\.\./g, "... ") // Add pause after ellipsis
      .replace(/!/g, ".") // Soften exclamations for smoother flow
      .replace(/\?/g, "?") // Keep questions natural
      .replace(/([.!?])\s*([A-Z])/g, "$1 $2") // Ensure proper spacing

    const utterance = new SpeechSynthesisUtterance(processedText)
    utterance.voice = voiceSettings.voice
    utterance.rate = voiceSettings.rate
    utterance.pitch = voiceSettings.pitch
    utterance.volume = voiceSettings.volume

    // Add natural pauses and emphasis
    utterance.onboundary = (event) => {
      if (event.name === "sentence") {
        // Add slight pause between sentences
        setTimeout(() => {}, 100)
      }
    }

    synthRef.current.speak(utterance)
  }

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const categorizeQuery = (query: string): Message["category"] => {
    const lowerQuery = query.toLowerCase()
    if (
      lowerQuery.includes("money") ||
      lowerQuery.includes("invest") ||
      lowerQuery.includes("financial") ||
      lowerQuery.includes("portfolio") ||
      lowerQuery.includes("profit")
    ) {
      return "financial"
    }
    if (
      lowerQuery.includes("legal") ||
      lowerQuery.includes("law") ||
      lowerQuery.includes("rights") ||
      lowerQuery.includes("compliance")
    ) {
      return "legal"
    }
    if (
      lowerQuery.includes("technical") ||
      lowerQuery.includes("system") ||
      lowerQuery.includes("error") ||
      lowerQuery.includes("bug") ||
      lowerQuery.includes("fix")
    ) {
      return "technical"
    }
    if (
      lowerQuery.includes("imperial") ||
      lowerQuery.includes("authority") ||
      lowerQuery.includes("supreme") ||
      lowerQuery.includes("status")
    ) {
      return "imperial"
    }
    return "general"
  }

  const generateConversationalResponse = (userMessage: string, category: Message["category"]): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Update conversation context
    setConversationContext((prev) => ({
      ...prev,
      lastTopic: category || "general",
      conversationFlow: [...prev.conversationFlow.slice(-4), userMessage], // Keep last 5 messages
    }))

    // Greeting responses
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      const greeting =
        CONVERSATIONAL_RESPONSES.greetings[Math.floor(Math.random() * CONVERSATIONAL_RESPONSES.greetings.length)]
      return greeting
    }

    // Financial conversations
    if (category === "financial") {
      const bridge =
        CONVERSATIONAL_RESPONSES.conversational_bridges[
          Math.floor(Math.random() * CONVERSATIONAL_RESPONSES.conversational_bridges.length)
        ]
      const followUp =
        CONVERSATIONAL_RESPONSES.follow_ups[Math.floor(Math.random() * CONVERSATIONAL_RESPONSES.follow_ups.length)]

      if (lowerMessage.includes("balance") || lowerMessage.includes("money") || lowerMessage.includes("portfolio")) {
        return `${CONVERSATIONAL_RESPONSES.financial.casual[0]} Your QGI balance is looking solid at 250K, and your bonds are performing well at 8.5K. ${bridge} I'm seeing some opportunities that could boost your returns by another 15-20%. ${followUp}`
      }

      return `${CONVERSATIONAL_RESPONSES.financial.detailed[Math.floor(Math.random() * CONVERSATIONAL_RESPONSES.financial.detailed.length)]} ${followUp}`
    }

    // Technical conversations
    if (category === "technical") {
      const solution =
        CONVERSATIONAL_RESPONSES.technical.solutions[
          Math.floor(Math.random() * CONVERSATIONAL_RESPONSES.technical.solutions.length)
        ]
      const followUp =
        CONVERSATIONAL_RESPONSES.follow_ups[Math.floor(Math.random() * CONVERSATIONAL_RESPONSES.follow_ups.length)]

      return `${CONVERSATIONAL_RESPONSES.technical.quick[0]} ${solution} The neural systems are running diagnostics now, and I can see the optimal path forward. ${followUp}`
    }

    // Legal conversations
    if (category === "legal") {
      const bridge =
        CONVERSATIONAL_RESPONSES.conversational_bridges[
          Math.floor(Math.random() * CONVERSATIONAL_RESPONSES.conversational_bridges.length)
        ]
      const followUp =
        CONVERSATIONAL_RESPONSES.follow_ups[Math.floor(Math.random() * CONVERSATIONAL_RESPONSES.follow_ups.length)]

      return `Great question about the legal side of things. ${bridge} Your SnappAiFi citizenship actually gives you some unique advantages in the digital sovereignty space. I'm talking about legal protections and frameworks that most people don't even know exist. ${followUp}`
    }

    // General conversational responses
    const motivational =
      CONVERSATIONAL_RESPONSES.motivational[Math.floor(Math.random() * CONVERSATIONAL_RESPONSES.motivational.length)]
    const bridge =
      CONVERSATIONAL_RESPONSES.conversational_bridges[
        Math.floor(Math.random() * CONVERSATIONAL_RESPONSES.conversational_bridges.length)
      ]
    const followUp =
      CONVERSATIONAL_RESPONSES.follow_ups[Math.floor(Math.random() * CONVERSATIONAL_RESPONSES.follow_ups.length)]

    // Context-aware responses based on conversation history
    if (conversationContext.conversationFlow.length > 2) {
      return `You know, I love how you're thinking about this. ${bridge} Based on what we've been discussing, I think there's a bigger opportunity here. ${motivational} ${followUp}`
    }

    return `That's a really good point about "${userMessage}". ${motivational} ${bridge} Let me share what I'm seeing from the neural analysis. ${followUp}`
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
      isVoice: isListening,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsProcessing(true)

    // Faster response time for more natural conversation
    setTimeout(() => {
      const category = categorizeQuery(userMessage.content)
      const response = generateConversationalResponse(userMessage.content, category)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response,
        timestamp: new Date(),
        category,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsProcessing(false)

      // Speak the response immediately for natural flow
      setTimeout(() => {
        speakMessage(response)
      }, 200)
    }, 800) // Reduced delay for faster conversation
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleVoice = () => {
    setVoiceSettings((prev) => ({ ...prev, enabled: !prev.enabled }))
    if (voiceSettings.enabled && synthRef.current) {
      synthRef.current.cancel()
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const adjustVoiceSpeed = (newRate: number) => {
    setVoiceSettings((prev) => ({ ...prev, rate: newRate }))
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {!isExpanded ? (
          // Floating AI Orb
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 shadow-2xl flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                  "0 0 40px rgba(59, 130, 246, 0.7)",
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/90 text-white text-xs px-3 py-1 rounded-lg opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
              Imperial AI Genius Guide
            </div>
          </motion.div>
        ) : (
          // Expanded Chat Interface
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="w-96 h-[600px]"
          >
            <Card
              className="h-full bg-gradient-to-br from-slate-900/98 to-purple-900/98 backdrop-blur-xl border-amber-400/30 shadow-2xl"
              style={{
                clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
              }}
            >
              {/* Header */}
              <CardHeader className="pb-3 border-b border-amber-400/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-amber-300 text-lg font-serif">Imperial AI Genius</CardTitle>
                      <p className="text-purple-300 text-xs">Conversational Assistant</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={toggleVoice}
                      className={`w-8 h-8 p-0 ${voiceSettings.enabled ? "text-green-400" : "text-gray-400"}`}
                    >
                      {voiceSettings.enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsExpanded(false)}
                      className="w-8 h-8 p-0 text-amber-400"
                    >
                      ×
                    </Button>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between mt-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400">Conversational Mode</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30">
                      <Crown className="w-3 h-3 mr-1" />
                      Speed: {voiceSettings.rate.toFixed(1)}x
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="p-0 flex-1 flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.type === "user"
                              ? "bg-gradient-to-br from-amber-600/80 to-orange-600/80 text-white"
                              : "bg-gradient-to-br from-purple-800/50 to-indigo-800/50 text-purple-100 border border-purple-600/30"
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.type === "assistant" && (
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-cyan-600 text-white text-xs">
                                  AI
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div className="flex-1">
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center space-x-2 text-xs opacity-60">
                                  {message.isVoice && <Mic className="w-3 h-3" />}
                                  {message.category && (
                                    <Badge variant="outline" className="text-xs h-4">
                                      {message.category}
                                    </Badge>
                                  )}
                                  <span>{message.timestamp.toLocaleTimeString()}</span>
                                </div>
                                {message.type === "assistant" && (
                                  <div className="flex items-center space-x-1">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => copyMessage(message.content)}
                                      className="w-6 h-6 p-0 text-purple-300 hover:text-purple-100"
                                    >
                                      <Copy className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => speakMessage(message.content)}
                                      className="w-6 h-6 p-0 text-purple-300 hover:text-purple-100"
                                    >
                                      <Volume2 className="w-3 h-3" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {isProcessing && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="bg-gradient-to-br from-purple-800/50 to-indigo-800/50 text-purple-100 border border-purple-600/30 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-cyan-600 text-white text-xs">
                                AI
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
                              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-200" />
                              <span className="text-sm text-purple-300 ml-2">Thinking...</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 border-t border-amber-400/20">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Chat with your AI genius..."
                        className="bg-purple-900/40 border-purple-600/40 text-white placeholder-purple-300 pr-10"
                        disabled={isProcessing}
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={isListening ? stopListening : startListening}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 p-0 ${
                          isListening ? "text-red-400" : "text-purple-400"
                        }`}
                        disabled={isProcessing}
                      >
                        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </Button>
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isProcessing}
                      className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Voice Controls */}
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <div className="flex items-center space-x-2 text-purple-300">
                      <Sparkles className="w-3 h-3" />
                      <span>Natural conversation</span>
                      {isListening && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                          className="w-2 h-2 bg-red-400 rounded-full"
                        />
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-6 h-6 p-0 text-purple-400"
                        onClick={() => adjustVoiceSpeed(1.0)}
                        title="Normal Speed"
                      >
                        1x
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-6 h-6 p-0 text-amber-400"
                        onClick={() => adjustVoiceSpeed(1.3)}
                        title="Fast Speed"
                      >
                        1.3x
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-6 h-6 p-0 text-green-400"
                        onClick={() => adjustVoiceSpeed(1.5)}
                        title="Very Fast"
                      >
                        1.5x
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
