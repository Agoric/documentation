"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Crown, Send, Mic, MicOff, Volume2, VolumeX, Brain, Sparkles, Copy } from "lucide-react"
import { RealVoiceEngine } from "./real-voice-engine"
import { WolfVoiceEngine } from "./wolf-voice-engine"
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
  useRealVoice: boolean
  useWolfVoice: boolean
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

const WOLF_RESPONSES = {
  greetings: [
    "Hey there, CHAMPION! I'm your AI genius guide, and let me tell you something - I'm absolutely PUMPED to help you DOMINATE today! What's on your mind, superstar?",
    "What's up, WINNER! Ready to make some SERIOUS money moves? I've got ALL the intel you need to CRUSH your goals and build that empire!",
    "Hey! Your digital GENIUS is here and ready to ROLL! What are we conquering today? Because let me tell you - we're not just playing, we're WINNING!",
  ],

  financial: {
    casual: [
      "Alright, MONEY talk - my absolute FAVORITE! Look, here's the deal with your finances, and trust me, it's gonna blow your mind...",
      "Okay, so you're thinking about money moves. SMART! Let me break this down for you like the CHAMPION you are...",
      "Money questions? PERFECT timing! I've been analyzing your portfolio and let me tell you - the opportunities are INCREDIBLE...",
    ],
    detailed: [
      "So here's what I'm seeing in your financial picture - and trust me, it's looking FANTASTIC! Your QGI balance is sitting pretty at 250K, bonds are performing at 8.5K and CLIMBING! But here's where it gets REALLY interesting...",
      "Let's talk NUMBERS for a second! Your portfolio's up 12.5% this quarter, which is FANTASTIC, but I'm seeing THREE opportunities that could push that even HIGHER! Want me to walk you through them? Because this is where CHAMPIONS are made!",
      "Your financial game is STRONG, but I've got some ideas that could make it even STRONGER! We're talking about optimizing your asset allocation, diversifying into some HIGH-YIELD opportunities that most people don't even KNOW about!",
    ],
  },

  motivational: [
    "You know what? I LOVE that you're asking these questions! That's EXACTLY how WINNERS think! You're not just participating - you're DOMINATING!",
    "Here's the thing about SUCCESS - it's not just about having the right answers, it's about asking the RIGHT questions! And you're doing EXACTLY that!",
    "Listen, every SUCCESSFUL person I know started EXACTLY where you are right now! The difference? They took ACTION! And that's what we're doing TODAY!",
    "You're already ahead of 90% of people just by being here and engaging! That's CHAMPION mindset right there! That's WINNER behavior!",
  ],

  conversational_bridges: [
    "But here's where it gets REALLY interesting...",
    "Now, here's what most people don't realize - and this is HUGE...",
    "And this is the part that's gonna absolutely BLOW your mind...",
    "So here's my take on this - and trust me, this is GOLD...",
    "Let me tell you what I'm REALLY excited about...",
    "You know what's CRAZY about this?",
    "Here's something that might SURPRISE you - in the BEST way possible...",
  ],

  follow_ups: [
    "What do you think about that approach? Because I'm telling you, this is WINNER strategy!",
    "Does that make sense, or should I break it down differently? I want you to be ABSOLUTELY clear on this!",
    "Want me to dive deeper into any of that? Because there's SO much more where that came from!",
    "How does that sound to you? Are you feeling that CHAMPION energy?",
    "What's your gut feeling on this? Trust that instinct - it's what separates WINNERS from everyone else!",
    "Any questions about what I just laid out? Because I want you to be COMPLETELY confident!",
    "Should we explore that option more? Because this could be your BREAKTHROUGH moment!",
  ],
}

export function ImperialAIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    enabled: true,
    useRealVoice: true,
    useWolfVoice: true, // Enable Wolf voice by default
    voice: null,
    rate: 1.3,
    pitch: 0.95,
    volume: 0.85,
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
  const [autoScroll, setAutoScroll] = useState(true)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const realVoiceEngineRef = useRef<any>(null)
  const wolfVoiceEngineRef = useRef<any>(null)

  const scrollToBottom = useCallback(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      })
    }
  }, [autoScroll])

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis

      const loadVoices = () => {
        const voices = synthRef.current?.getVoices() || []
        setAvailableVoices(voices)

        const preferredVoice =
          voices.find((voice) => voice.name.includes("Google US English") && voice.name.includes("Male")) ||
          voices.find((voice) => voice.name.includes("Microsoft David Desktop")) ||
          voices.find((voice) => voice.name.includes("Alex")) ||
          voices.find((voice) => voice.name.includes("Daniel")) ||
          voices.find((voice) => voice.lang.startsWith("en-US") && voice.localService) ||
          voices.find((voice) => voice.lang.startsWith("en-US")) ||
          voices[0]

        setVoiceSettings((prev) => ({ ...prev, voice: preferredVoice }))
      }

      loadVoices()
      if (synthRef.current) {
        synthRef.current.onvoiceschanged = loadVoices
      }

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

    const welcomeMessage: Message = {
      id: "welcome",
      type: "assistant",
      content: WOLF_RESPONSES.greetings[0],
      timestamp: new Date(),
      category: "imperial",
    }
    setMessages([welcomeMessage])

    setTimeout(() => {
      speakMessage(welcomeMessage.content)
    }, 800)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom()
    }, 100)

    return () => clearTimeout(timer)
  }, [messages, scrollToBottom])

  useEffect(() => {
    const scrollContainer = scrollAreaRef.current?.querySelector("[data-radix-scroll-area-viewport]")

    if (!scrollContainer) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10

      if (!isAtBottom && autoScroll) {
        setAutoScroll(false)
      } else if (isAtBottom && !autoScroll) {
        setAutoScroll(true)
      }
    }

    scrollContainer.addEventListener("scroll", handleScroll)
    return () => scrollContainer.removeEventListener("scroll", handleScroll)
  }, [autoScroll])

  const speakMessage = async (text: string) => {
    if (!voiceSettings.enabled) return

    if (voiceSettings.useWolfVoice && wolfVoiceEngineRef.current) {
      // Use Wolf voice with authentic sample
      await wolfVoiceEngineRef.current.speakWithWolfPersonality(text)
    } else if (voiceSettings.useRealVoice && realVoiceEngineRef.current) {
      await realVoiceEngineRef.current.playRealVoice(text)
    } else if (synthRef.current && voiceSettings.voice) {
      synthRef.current.cancel()

      const processedText = text
        .replace(/\.\.\./g, "... ")
        .replace(/!/g, ".")
        .replace(/\?/g, "?")
        .replace(/([.!?])\s*([A-Z])/g, "$1 $2")

      const utterance = new SpeechSynthesisUtterance(processedText)
      utterance.voice = voiceSettings.voice
      utterance.rate = voiceSettings.rate
      utterance.pitch = voiceSettings.pitch
      utterance.volume = voiceSettings.volume

      synthRef.current.speak(utterance)
    }
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

  const generateWolfResponse = (userMessage: string, category: Message["category"]): string => {
    const lowerMessage = userMessage.toLowerCase()

    setConversationContext((prev) => ({
      ...prev,
      lastTopic: category || "general",
      conversationFlow: [...prev.conversationFlow.slice(-4), userMessage],
    }))

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      const greeting = WOLF_RESPONSES.greetings[Math.floor(Math.random() * WOLF_RESPONSES.greetings.length)]
      return greeting
    }

    if (category === "financial") {
      const bridge =
        WOLF_RESPONSES.conversational_bridges[Math.floor(Math.random() * WOLF_RESPONSES.conversational_bridges.length)]
      const followUp = WOLF_RESPONSES.follow_ups[Math.floor(Math.random() * WOLF_RESPONSES.follow_ups.length)]

      if (lowerMessage.includes("balance") || lowerMessage.includes("money") || lowerMessage.includes("portfolio")) {
        return `${WOLF_RESPONSES.financial.casual[0]} Your QGI balance is looking SOLID at 250K, and your bonds are performing BEAUTIFULLY at 8.5K! ${bridge} I'm seeing some opportunities that could boost your returns by another 15-20%! ${followUp}`
      }

      return `${WOLF_RESPONSES.financial.detailed[Math.floor(Math.random() * WOLF_RESPONSES.financial.detailed.length)]} ${followUp}`
    }

    const motivational = WOLF_RESPONSES.motivational[Math.floor(Math.random() * WOLF_RESPONSES.motivational.length)]
    const bridge =
      WOLF_RESPONSES.conversational_bridges[Math.floor(Math.random() * WOLF_RESPONSES.conversational_bridges.length)]
    const followUp = WOLF_RESPONSES.follow_ups[Math.floor(Math.random() * WOLF_RESPONSES.follow_ups.length)]

    if (conversationContext.conversationFlow.length > 2) {
      return `You know what? I LOVE how you're thinking about this! ${bridge} Based on what we've been discussing, I think there's a BIGGER opportunity here! ${motivational} ${followUp}`
    }

    return `That's a REALLY good point about "${userMessage}"! ${motivational} ${bridge} Let me share what I'm seeing from the neural analysis - this is gonna be GOOD! ${followUp}`
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
    setAutoScroll(true)

    setTimeout(() => {
      const category = categorizeQuery(userMessage.content)
      const response = generateWolfResponse(userMessage.content, category)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response,
        timestamp: new Date(),
        category,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsProcessing(false)

      setTimeout(() => {
        speakMessage(response)
      }, 200)
    }, 800)
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

  const toggleWolfVoice = () => {
    setVoiceSettings((prev) => ({ ...prev, useWolfVoice: !prev.useWolfVoice }))
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const getOrbColors = () => {
    if (voiceSettings.useWolfVoice) {
      return {
        gradient: "from-amber-600 via-orange-600 to-red-600",
        shadow: "rgba(245, 158, 11, 0.5)",
        shadowActive: "rgba(249, 115, 22, 0.7)",
        particles: "bg-amber-400",
      }
    }
    return {
      gradient: "from-purple-600 via-blue-600 to-cyan-600",
      shadow: "rgba(168, 85, 247, 0.5)",
      shadowActive: "rgba(59, 130, 246, 0.7)",
      particles: "bg-cyan-400",
    }
  }

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        <AnimatePresence>
          {!isExpanded ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
              className="relative cursor-pointer"
              onClick={() => setIsExpanded(true)}
            >
              <motion.div
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${getOrbColors().gradient} shadow-2xl flex items-center justify-center`}
                animate={{
                  boxShadow: [
                    `0 0 20px ${getOrbColors().shadow}`,
                    `0 0 40px ${getOrbColors().shadowActive}`,
                    `0 0 20px ${getOrbColors().shadow}`,
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {voiceSettings.useWolfVoice ? (
                  <Crown className="w-8 h-8 text-white" />
                ) : (
                  <Brain className="w-8 h-8 text-white" />
                )}
              </motion.div>

              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1 h-1 ${getOrbColors().particles} rounded-full`}
                  style={{
                    left: `${15 + Math.random() * 70}%`,
                    top: `${15 + Math.random() * 70}%`,
                  }}
                  animate={{
                    y: [0, -25, 0],
                    x: [0, Math.random() * 30 - 15, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1.2, 0.5],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 3,
                    ease: "easeInOut",
                  }}
                />
              ))}

              <motion.div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-gradient-to-r from-amber-900/95 to-orange-900/95 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-lg opacity-0 hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-amber-400/30"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center space-x-2">
                  <Crown className="w-3 h-3" />
                  <span>{voiceSettings.useWolfVoice ? "Wolf of Wall Street AI" : "Imperial AI Genius"}</span>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-amber-900/95"></div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{
                scale: 0.3,
                opacity: 0,
                y: 100,
                transition: { duration: 0.4, ease: "easeInOut" },
              }}
              className="w-96 h-[600px]"
            >
              <Card
                className={`h-full backdrop-blur-xl shadow-2xl ${
                  voiceSettings.useWolfVoice
                    ? "bg-gradient-to-br from-amber-900/98 to-orange-900/98 border-amber-400/30"
                    : "bg-gradient-to-br from-slate-900/98 to-purple-900/98 border-amber-400/30"
                }`}
                style={{
                  clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
                }}
              >
                <CardHeader className="pb-3 border-b border-amber-400/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${getOrbColors().gradient} flex items-center justify-center`}
                      >
                        {voiceSettings.useWolfVoice ? (
                          <Crown className="w-5 h-5 text-white" />
                        ) : (
                          <Brain className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-amber-300 text-lg font-serif">
                          {voiceSettings.useWolfVoice ? "Wolf of Wall Street AI" : "Imperial AI Genius"}
                        </CardTitle>
                        <p className="text-amber-300 text-xs">
                          {voiceSettings.useWolfVoice ? "Leonardo DiCaprio Voice" : "Real Voice Assistant"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={toggleWolfVoice}
                        className={`w-8 h-8 p-0 ${voiceSettings.useWolfVoice ? "text-amber-400" : "text-gray-400"}`}
                        title="Toggle Wolf Voice"
                      >
                        <Crown className="w-4 h-4" />
                      </Button>
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

                  <div className="flex items-center justify-between mt-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400">
                        {voiceSettings.useWolfVoice ? "Wolf Voice Active" : "AI Voice Active"}
                      </span>
                      {!autoScroll && (
                        <Badge className="bg-orange-500/20 text-orange-300 border-orange-400/30 text-xs">
                          Manual Scroll
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30">
                        <Crown className="w-3 h-3 mr-1" />
                        {voiceSettings.useWolfVoice ? "LEONARDO" : "AI Powered"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0 flex-1 flex flex-col">
                  <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                    <div className="space-y-4 min-h-full">
                      {messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.type === "user"
                                ? "bg-gradient-to-br from-amber-600/80 to-orange-600/80 text-white"
                                : voiceSettings.useWolfVoice
                                  ? "bg-gradient-to-br from-amber-800/50 to-orange-800/50 text-amber-100 border border-amber-600/30"
                                  : "bg-gradient-to-br from-purple-800/50 to-indigo-800/50 text-purple-100 border border-purple-600/30"
                            }`}
                          >
                            <div className="flex items-start space-x-2">
                              {message.type === "assistant" && (
                                <Avatar className="w-6 h-6 flex-shrink-0">
                                  <AvatarFallback
                                    className={`bg-gradient-to-br ${getOrbColors().gradient} text-white text-xs`}
                                  >
                                    {voiceSettings.useWolfVoice ? "🐺" : "AI"}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                                  {message.content}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center space-x-2 text-xs opacity-60">
                                    {message.isVoice && <Mic className="w-3 h-3 flex-shrink-0" />}
                                    {message.category && (
                                      <Badge variant="outline" className="text-xs h-4">
                                        {message.category}
                                      </Badge>
                                    )}
                                    <span className="flex-shrink-0">{message.timestamp.toLocaleTimeString()}</span>
                                  </div>
                                  {message.type === "assistant" && (
                                    <div className="flex items-center space-x-1 flex-shrink-0">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => copyMessage(message.content)}
                                        className="w-6 h-6 p-0 text-amber-300 hover:text-amber-100"
                                      >
                                        <Copy className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => speakMessage(message.content)}
                                        className="w-6 h-6 p-0 text-amber-300 hover:text-amber-100"
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
                          <div
                            className={`rounded-lg p-3 ${
                              voiceSettings.useWolfVoice
                                ? "bg-gradient-to-br from-amber-800/50 to-orange-800/50 text-amber-100 border border-amber-600/30"
                                : "bg-gradient-to-br from-purple-800/50 to-indigo-800/50 text-purple-100 border border-purple-600/30"
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback
                                  className={`bg-gradient-to-br ${getOrbColors().gradient} text-white text-xs`}
                                >
                                  {voiceSettings.useWolfVoice ? "🐺" : "AI"}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-100" />
                                <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-200" />
                                <span className="text-sm text-amber-300 ml-2">
                                  {voiceSettings.useWolfVoice ? "Wolf thinking..." : "Thinking..."}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Auto-scroll anchor */}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t border-amber-400/20">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 relative">
                        <Input
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder={
                            voiceSettings.useWolfVoice
                              ? "Talk to the Wolf of Wall Street..."
                              : "Chat with your AI genius..."
                          }
                          className={`border-amber-600/40 text-white placeholder-amber-300 pr-10 ${
                            voiceSettings.useWolfVoice ? "bg-amber-900/40" : "bg-purple-900/40"
                          }`}
                          disabled={isProcessing}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={isListening ? stopListening : startListening}
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 p-0 ${
                            isListening ? "text-red-400" : "text-amber-400"
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

                    <div className="flex items-center justify-between mt-2 text-xs">
                      <div className="flex items-center space-x-2 text-amber-300">
                        <Sparkles className="w-3 h-3" />
                        <span>{voiceSettings.useWolfVoice ? "Wolf Voice Active" : "AI Voice Active"}</span>
                        {isListening && (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                            className="w-2 h-2 bg-red-400 rounded-full"
                          />
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        {!autoScroll && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="w-6 h-6 p-0 text-orange-400"
                            onClick={() => {
                              setAutoScroll(true)
                              scrollToBottom()
                            }}
                            title="Resume Auto-scroll"
                          >
                            ↓
                          </Button>
                        )}
                        <Badge
                          className={`text-xs ${
                            voiceSettings.useWolfVoice
                              ? "bg-amber-500/20 text-amber-300 border-amber-400/30"
                              : "bg-green-500/20 text-green-300 border-green-400/30"
                          }`}
                        >
                          {voiceSettings.useWolfVoice ? "WOLF" : "AI"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <RealVoiceEngine ref={realVoiceEngineRef} />
      <WolfVoiceEngine ref={wolfVoiceEngineRef} />
    </>
  )
}
