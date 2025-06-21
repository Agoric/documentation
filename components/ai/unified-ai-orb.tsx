"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, MicOff, Volume2, VolumeX, Command, Zap, Crown, Brain, MessageSquare, Bot, Sparkles } from "lucide-react"
import type { SpeechRecognition } from "web-speech-api"

interface VoiceCommand {
  command: string
  action: string
  category: "navigation" | "financial" | "system" | "imperial"
  response: string
}

interface VoiceProfile {
  name: string
  rate: number
  pitch: number
  volume: number
  description: string
}

interface ConversationMode {
  name: string
  personality: string
  energy: number
  description: string
}

interface AIProvider {
  name: string
  model: string
  description: string
  icon: string
  available: boolean
}

const VOICE_COMMANDS: VoiceCommand[] = [
  {
    command: "go to dashboard",
    action: "/dashboard/home",
    category: "navigation",
    response: "BOOM! Taking you to your command center where the MAGIC happens! Let's make some money!",
  },
  {
    command: "open marketplace",
    action: "/dashboard/ecommerex/holographic-products",
    category: "navigation",
    response: "YES! The marketplace is where FORTUNES are made! Let's find you some GOLD!",
  },
  {
    command: "check balance",
    action: "check_balance",
    category: "financial",
    response: "Your balance? BEAUTIFUL! 250,000 QGI credits and climbing! Your bonds are worth 8,500 and GROWING!",
  },
  {
    command: "system status",
    action: "system_status",
    category: "system",
    response: "Systems are running like a FERRARI! 98.7% efficiency! We don't just operate - we DOMINATE!",
  },
  {
    command: "supreme authority",
    action: "supreme_mode",
    category: "imperial",
    response: "SUPREME AUTHORITY ACTIVATED! You're not just a user - you're the KING of your digital empire!",
  },
]

const VOICE_PROFILES: VoiceProfile[] = [
  { name: "Conversational", rate: 1.3, pitch: 0.95, volume: 0.85, description: "Natural, smooth flow" },
  { name: "Executive", rate: 1.1, pitch: 0.85, volume: 0.9, description: "Professional, confident" },
  { name: "Energetic", rate: 1.5, pitch: 1.1, volume: 0.95, description: "High-energy, motivational" },
  { name: "Wolf", rate: 1.2, pitch: 0.9, volume: 0.9, description: "Leonardo DiCaprio style" },
]

const CONVERSATION_MODES: ConversationMode[] = [
  { name: "Motivational", personality: "high-energy", energy: 95, description: "Pure motivation and energy" },
  { name: "Strategic", personality: "analytical", energy: 80, description: "Business strategy focused" },
  { name: "Wealth Builder", personality: "money-focused", energy: 90, description: "All about making money" },
  { name: "Champion", personality: "winner", energy: 100, description: "Maximum winning energy" },
]

const AI_PROVIDERS: AIProvider[] = [
  {
    name: "Groq",
    model: "llama-3.1-70b-versatile",
    description: "Lightning fast responses",
    icon: "⚡",
    available: true,
  },
  { name: "OpenAI", model: "gpt-4o", description: "Most capable AI model", icon: "🧠", available: false },
  { name: "Claude", model: "claude-3-sonnet", description: "Thoughtful and nuanced", icon: "🎭", available: false },
  { name: "Wolf AI", model: "wolf-personality", description: "Built-in Wolf personality", icon: "🐺", available: true },
]

export function UnifiedAIOrb() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState("ai-chat")
  const [isHovered, setIsHovered] = useState(false)

  // Voice Commands State
  const [isListening, setIsListening] = useState(false)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true)
  const [lastCommand, setLastCommand] = useState<string>("")
  const [commandHistory, setCommandHistory] = useState<VoiceCommand[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  // Voice Engine State
  const [currentProfile, setCurrentProfile] = useState<VoiceProfile>(VOICE_PROFILES[0])
  const [customSettings, setCustomSettings] = useState({
    rate: 1.3,
    pitch: 0.95,
    volume: 0.85,
  })
  const [isTestingVoice, setIsTestingVoice] = useState(false)

  // Wolf Voice State
  const [wolfSettings, setWolfSettings] = useState({
    enabled: true,
    volume: 0.8,
    playbackRate: 1.1,
    pitch: 0.9,
    useWolfSample: true,
  })
  const [isPlayingWolf, setIsPlayingWolf] = useState(false)

  // AI Chat State
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>(AI_PROVIDERS[0])
  const [currentMode, setCurrentMode] = useState<ConversationMode>(CONVERSATION_MODES[0])
  const [conversationCount, setConversationCount] = useState(0)
  const [lastResponse, setLastResponse] = useState("")
  const [isConversing, setIsConversing] = useState(false)
  const [messages, setMessages] = useState<
    Array<{ id: string; text: string; sender: "user" | "ai"; timestamp: Date; provider?: string }>
  >([])
  const [userInput, setUserInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-retract on mouse leave
  useEffect(() => {
    if (!isHovered && isExpanded) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsExpanded(false)
      }, 2000)
    } else if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [isHovered, isExpanded])

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis

      if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = "en-US"

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim()
          setLastCommand(transcript)
          processVoiceCommand(transcript)
        }

        recognitionRef.current.onerror = () => setIsListening(false)
        recognitionRef.current.onend = () => setIsListening(false)
      }
    }
  }, [])

  const speakResponse = (text: string) => {
    if (!isVoiceEnabled || !synthRef.current) return

    synthRef.current.cancel()
    const utterance = new SpeechSynthesisUtterance(text)

    const voices = synthRef.current.getVoices()
    const preferredVoice =
      voices.find(
        (voice) =>
          voice.name.includes("Google US English Male") ||
          voice.name.includes("Microsoft David") ||
          voice.name.includes("Alex"),
      ) || voices[0]

    if (preferredVoice) utterance.voice = preferredVoice

    utterance.rate = customSettings.rate
    utterance.pitch = customSettings.pitch
    utterance.volume = customSettings.volume

    synthRef.current.speak(utterance)
  }

  const processVoiceCommand = (transcript: string) => {
    setIsProcessing(true)

    const matchedCommand = VOICE_COMMANDS.find(
      (cmd) => transcript.includes(cmd.command) || cmd.command.split(" ").every((word) => transcript.includes(word)),
    )

    setTimeout(() => {
      if (matchedCommand) {
        setCommandHistory((prev) => [matchedCommand, ...prev.slice(0, 4)])
        speakResponse(matchedCommand.response)

        if (matchedCommand.action.startsWith("/")) {
          window.location.href = matchedCommand.action
        }
      } else {
        speakResponse("Command not recognized. Please try again.")
      }
      setIsProcessing(false)
    }, 1000)
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

  const testVoice = () => {
    if (!synthRef.current || !isVoiceEnabled) return

    setIsTestingVoice(true)
    const testText = "Hey there! This is how I sound with the current voice settings."

    const utterance = new SpeechSynthesisUtterance(testText)
    utterance.rate = customSettings.rate
    utterance.pitch = customSettings.pitch
    utterance.volume = customSettings.volume
    utterance.onend = () => setIsTestingVoice(false)

    synthRef.current.speak(utterance)
  }

  const playWolfQuote = () => {
    const quotes = [
      "Money doesn't sleep, pal!",
      "The only thing standing between you and your goal is the story you keep telling yourself!",
      "I want you to deal with your problems by becoming rich!",
    ]

    setIsPlayingWolf(true)
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    speakResponse(randomQuote)
    setTimeout(() => setIsPlayingWolf(false), 3000)
  }

  const sendMessage = async () => {
    if (!userInput.trim() || !isVoiceEnabled) return

    const userMessage = {
      id: Date.now().toString(),
      text: userInput,
      sender: "user" as const,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setUserInput("")
    setIsTyping(true)

    try {
      let aiResponse = ""

      if (selectedProvider.name === "Groq" && selectedProvider.available) {
        // Call Groq API
        aiResponse = await callGroqAPI(userInput)
      } else if (selectedProvider.name === "Wolf AI") {
        // Use built-in Wolf personality
        aiResponse = generateWolfResponse(userInput, currentMode)
      } else {
        // Fallback to Wolf personality
        aiResponse = generateWolfResponse(userInput, currentMode)
      }

      setTimeout(
        () => {
          const aiMessage = {
            id: (Date.now() + 1).toString(),
            text: aiResponse,
            sender: "ai" as const,
            timestamp: new Date(),
            provider: selectedProvider.name,
          }

          setMessages((prev) => [...prev, aiMessage])
          setConversationCount((prev) => prev + 1)
          speakResponse(aiResponse)
          setIsTyping(false)
        },
        1000 + Math.random() * 2000,
      )
    } catch (error) {
      console.error("AI API Error:", error)
      const fallbackResponse = generateWolfResponse(userInput, currentMode)

      setTimeout(() => {
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: fallbackResponse,
          sender: "ai" as const,
          timestamp: new Date(),
          provider: "Wolf AI (Fallback)",
        }

        setMessages((prev) => [...prev, aiMessage])
        setConversationCount((prev) => prev + 1)
        speakResponse(fallbackResponse)
        setIsTyping(false)
      }, 1000)
    }
  }

  const callGroqAPI = async (message: string): Promise<string> => {
    const response = await fetch("/api/ai/groq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        mode: currentMode.personality,
        model: selectedProvider.model,
      }),
    })

    if (!response.ok) {
      throw new Error("Groq API call failed")
    }

    const data = await response.json()
    return data.response
  }

  const generateWolfResponse = (userInput: string, mode: ConversationMode): string => {
    const input = userInput.toLowerCase()

    if (input.includes("money") || input.includes("rich") || input.includes("wealth")) {
      return mode.personality === "money-focused"
        ? "NOW we're talking! Money is the GAME, and you're about to become the CHAMPION! I see three major opportunities right now that could EXPLODE your wealth!"
        : "Listen, MONEY is just the scorecard! But when you're WINNING like you are, that scorecard is gonna look BEAUTIFUL! Let's talk strategy!"
    }

    if (input.includes("help") || input.includes("advice") || input.includes("what should")) {
      return mode.personality === "analytical"
        ? "Here's what WINNERS do in your situation: First, we analyze the data. Second, we make the BOLD move. Third, we DOMINATE the results!"
        : "You want advice? HERE IT IS! Stop thinking, start DOING! Every second you hesitate is a second your competition gets ahead!"
    }

    if (input.includes("tired") || input.includes("difficult") || input.includes("hard")) {
      return "TIRED? Champions don't get tired, they get STRONGER! Every challenge is just another opportunity to show the world what you're made of! PUSH THROUGH!"
    }

    const defaultResponses = [
      "That's EXACTLY the kind of thinking that separates CHAMPIONS from everyone else! Tell me more!",
      "I LOVE that energy! You know what that tells me? You're ready to take this to the NEXT LEVEL!",
      "BOOM! Now you're speaking my language! Let's turn that thought into ACTION!",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const getOrbGradient = () => {
    if (isListening) return "from-red-500 to-red-600"
    if (isProcessing || isTestingVoice || isPlayingWolf || isConversing) return "from-amber-500 to-orange-500"
    if (selectedProvider.name === "Groq") return "from-green-500 to-emerald-600"
    return "from-purple-600 to-cyan-600"
  }

  const getOrbIcon = () => {
    if (isListening) return MicOff
    if (isProcessing) return Zap
    if (activeTab === "ai-chat") return selectedProvider.name === "Groq" ? Sparkles : Bot
    if (activeTab === "voice-commands") return Command
    if (activeTab === "voice-engine") return Brain
    if (activeTab === "wolf-voice") return Crown
    return Bot
  }

  return (
    <div
      className="fixed bottom-6 left-6 z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
              className={`w-16 h-16 rounded-full bg-gradient-to-br ${getOrbGradient()} shadow-2xl flex items-center justify-center`}
              animate={{
                scale: isListening || isProcessing ? [1, 1.1, 1] : [1, 1.05, 1],
                boxShadow:
                  selectedProvider.name === "Groq"
                    ? [
                        "0 0 20px rgba(34, 197, 94, 0.3)",
                        "0 0 40px rgba(16, 185, 129, 0.5)",
                        "0 0 20px rgba(34, 197, 94, 0.3)",
                      ]
                    : [
                        "0 0 20px rgba(168, 85, 247, 0.3)",
                        "0 0 40px rgba(59, 130, 246, 0.5)",
                        "0 0 20px rgba(168, 85, 247, 0.3)",
                      ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: isListening || isProcessing ? 1 : 3,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {(() => {
                const Icon = getOrbIcon()
                return <Icon className="w-7 h-7 text-white" />
              })()}
            </motion.div>

            {/* Status indicators */}
            <div className="absolute -top-2 -right-2 flex flex-col space-y-1">
              {selectedProvider.name === "Groq" && selectedProvider.available && (
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" title="Groq AI Active" />
              )}
              {isListening && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                  className="w-3 h-3 bg-red-500 rounded-full"
                />
              )}
              {(isProcessing || isTestingVoice || isPlayingWolf || isConversing) && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                  className="w-3 h-3 bg-amber-500 rounded-full"
                />
              )}
              {conversationCount > 0 && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{conversationCount}</span>
                </div>
              )}
            </div>

            {/* Tooltip */}
            <motion.div
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-gradient-to-r from-purple-900/95 to-blue-900/95 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-purple-400/30"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-2">
                <Bot className="w-3 h-3" />
                <span>AI Assistant ({selectedProvider.name})</span>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-900/95"></div>
            </motion.div>

            {/* Quick controls */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 flex space-x-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  isListening ? stopListening() : startListening()
                }}
                className={`w-8 h-8 p-0 rounded-full ${
                  isListening ? "bg-red-500/20 text-red-400" : "bg-purple-500/20 text-purple-400"
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsVoiceEnabled(!isVoiceEnabled)
                }}
                className={`w-8 h-8 p-0 rounded-full ${
                  isVoiceEnabled ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20, transition: { duration: 0.3 } }}
            className="w-96"
          >
            <Card className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-amber-400/30">
              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-5 h-5 text-amber-400" />
                    <span className="text-amber-300 font-bold">AI Assistant</span>
                    <Badge
                      className={`text-xs ${selectedProvider.name === "Groq" ? "bg-green-500/20 text-green-300" : "bg-purple-500/20 text-purple-300"}`}
                    >
                      {selectedProvider.name}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsExpanded(false)}
                    className="w-8 h-8 p-0 text-amber-400"
                  >
                    ×
                  </Button>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
                    <TabsTrigger value="ai-chat" className="text-xs">
                      <Bot className="w-3 h-3 mr-1" />
                      AI Chat
                    </TabsTrigger>
                    <TabsTrigger value="voice-commands" className="text-xs">
                      <Command className="w-3 h-3 mr-1" />
                      Commands
                    </TabsTrigger>
                    <TabsTrigger value="voice-engine" className="text-xs">
                      <Brain className="w-3 h-3 mr-1" />
                      Engine
                    </TabsTrigger>
                    <TabsTrigger value="wolf-voice" className="text-xs">
                      <Crown className="w-3 h-3 mr-1" />
                      Wolf
                    </TabsTrigger>
                  </TabsList>

                  {/* AI Chat Tab */}
                  <TabsContent value="ai-chat" className="space-y-4">
                    {/* AI Provider Selection */}
                    <div className="space-y-2">
                      <div className="text-sm text-cyan-300">AI Provider:</div>
                      <Select
                        value={selectedProvider.name}
                        onValueChange={(value) => {
                          const provider = AI_PROVIDERS.find((p) => p.name === value)
                          if (provider) setSelectedProvider(provider)
                        }}
                      >
                        <SelectTrigger className="bg-slate-800/50 border-slate-600/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {AI_PROVIDERS.map((provider) => (
                            <SelectItem key={provider.name} value={provider.name} disabled={!provider.available}>
                              <div className="flex items-center space-x-2">
                                <span>{provider.icon}</span>
                                <span>{provider.name}</span>
                                {!provider.available && (
                                  <Badge variant="secondary" className="text-xs">
                                    Soon
                                  </Badge>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="text-xs text-slate-400">{selectedProvider.description}</div>
                    </div>

                    {/* Personality Mode */}
                    <div className="grid grid-cols-2 gap-2">
                      {CONVERSATION_MODES.map((mode) => (
                        <Button
                          key={mode.name}
                          size="sm"
                          variant={currentMode.name === mode.name ? "default" : "outline"}
                          onClick={() => setCurrentMode(mode)}
                          className="text-xs"
                        >
                          {mode.name}
                        </Button>
                      ))}
                    </div>

                    {/* Chat Messages */}
                    <div className="h-48 overflow-y-auto bg-slate-800/30 rounded-lg p-3 space-y-2">
                      {messages.length === 0 ? (
                        <div className="text-center text-slate-400 text-sm py-8">
                          <Bot className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
                          <div>Start chatting with {selectedProvider.name}!</div>
                          <div className="text-xs mt-1">Ask anything - I'm powered by advanced AI</div>
                        </div>
                      ) : (
                        messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] p-2 rounded-lg text-sm ${
                                message.sender === "user"
                                  ? "bg-blue-600/30 text-blue-100 border border-blue-400/30"
                                  : selectedProvider.name === "Groq"
                                    ? "bg-green-600/30 text-green-100 border border-green-400/30"
                                    : "bg-purple-600/30 text-purple-100 border border-purple-400/30"
                              }`}
                            >
                              <div className="flex items-start space-x-2">
                                {message.sender === "ai" && (
                                  <div className="text-lg mt-0.5 flex-shrink-0">
                                    {selectedProvider.name === "Groq" ? "⚡" : selectedProvider.icon}
                                  </div>
                                )}
                                <div className="flex-1">
                                  <div>{message.text}</div>
                                  <div className="text-xs opacity-60 mt-1 flex items-center justify-between">
                                    <span>
                                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                    {message.provider && <span>{message.provider}</span>}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}

                      {/* Typing Indicator */}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div
                            className={`${selectedProvider.name === "Groq" ? "bg-green-600/30 text-green-100 border-green-400/30" : "bg-purple-600/30 text-purple-100 border-purple-400/30"} border p-2 rounded-lg`}
                          >
                            <div className="flex items-center space-x-2">
                              <div className="text-lg">{selectedProvider.icon}</div>
                              <div className="flex space-x-1">
                                <motion.div
                                  className={`w-2 h-2 ${selectedProvider.name === "Groq" ? "bg-green-400" : "bg-purple-400"} rounded-full`}
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0 }}
                                />
                                <motion.div
                                  className={`w-2 h-2 ${selectedProvider.name === "Groq" ? "bg-green-400" : "bg-purple-400"} rounded-full`}
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.2 }}
                                />
                                <motion.div
                                  className={`w-2 h-2 ${selectedProvider.name === "Groq" ? "bg-green-400" : "bg-purple-400"} rounded-full`}
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.4 }}
                                />
                              </div>
                              <span className="text-xs">{selectedProvider.name} is thinking...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Message Input */}
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        placeholder={`Chat with ${selectedProvider.name}...`}
                        className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400/50"
                        disabled={isTyping}
                      />
                      <Button
                        onClick={sendMessage}
                        disabled={!userInput.trim() || !isVoiceEnabled || isTyping}
                        className={`px-4 ${selectedProvider.name === "Groq" ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" : "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"}`}
                      >
                        {isTyping ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                          >
                            <Zap className="w-4 h-4" />
                          </motion.div>
                        ) : (
                          <MessageSquare className="w-4 h-4" />
                        )}
                      </Button>
                    </div>

                    {/* Quick Starters */}
                    <div className="grid grid-cols-2 gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setUserInput("Explain quantum computing in simple terms")
                          setTimeout(sendMessage, 100)
                        }}
                        className="text-xs text-cyan-400 hover:text-cyan-300"
                        disabled={isTyping}
                      >
                        🧠 Explain Tech
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setUserInput("Write a creative story about AI")
                          setTimeout(sendMessage, 100)
                        }}
                        className="text-xs text-purple-400 hover:text-purple-300"
                        disabled={isTyping}
                      >
                        ✨ Creative Writing
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setUserInput("Help me solve a coding problem")
                          setTimeout(sendMessage, 100)
                        }}
                        className="text-xs text-green-400 hover:text-green-300"
                        disabled={isTyping}
                      >
                        💻 Code Help
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setUserInput("Give me business advice")
                          setTimeout(sendMessage, 100)
                        }}
                        className="text-xs text-amber-400 hover:text-amber-300"
                        disabled={isTyping}
                      >
                        💼 Business Tips
                      </Button>
                    </div>

                    <div className="text-center">
                      <Badge
                        className={`${selectedProvider.name === "Groq" ? "bg-green-500/20 text-green-300 border-green-400/30" : "bg-purple-500/20 text-purple-300 border-purple-400/30"}`}
                      >
                        {conversationCount} Messages • {selectedProvider.name} AI
                      </Badge>
                    </div>
                  </TabsContent>

                  {/* Other tabs remain the same... */}
                  <TabsContent value="voice-commands" className="space-y-4">
                    <div className="text-center">
                      <motion.button
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                          isListening
                            ? "bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/50"
                            : "bg-gradient-to-br from-purple-600 to-cyan-600 hover:shadow-lg hover:shadow-purple-500/50"
                        }`}
                        onClick={isListening ? stopListening : startListening}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isListening ? (
                          <MicOff className="w-8 h-8 text-white" />
                        ) : (
                          <Mic className="w-8 h-8 text-white" />
                        )}
                      </motion.button>
                      <div className="mt-2">
                        <Badge
                          className={`${isListening ? "bg-red-500/20 text-red-300" : "bg-purple-500/20 text-purple-300"}`}
                        >
                          {isListening ? "Listening..." : "Click to Speak"}
                        </Badge>
                      </div>
                    </div>

                    {lastCommand && (
                      <div className="p-2 bg-purple-800/30 rounded-lg">
                        <div className="text-xs text-purple-300 mb-1">Last Command:</div>
                        <div className="text-sm text-white">{lastCommand}</div>
                      </div>
                    )}

                    <div className="text-xs text-purple-300">
                      Try saying: "Go to dashboard", "Check balance", "System status"
                    </div>
                  </TabsContent>

                  <TabsContent value="voice-engine" className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {VOICE_PROFILES.map((profile) => (
                        <Button
                          key={profile.name}
                          size="sm"
                          variant={currentProfile.name === profile.name ? "default" : "outline"}
                          onClick={() => setCurrentProfile(profile)}
                          className="text-xs"
                        >
                          {profile.name}
                        </Button>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-cyan-300">Speed</span>
                          <span className="text-xs text-cyan-400">{customSettings.rate.toFixed(1)}x</span>
                        </div>
                        <Slider
                          value={[customSettings.rate]}
                          onValueChange={([value]) => setCustomSettings((prev) => ({ ...prev, rate: value }))}
                          min={0.5}
                          max={2.0}
                          step={0.1}
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-cyan-300">Pitch</span>
                          <span className="text-xs text-cyan-400">{customSettings.pitch.toFixed(2)}</span>
                        </div>
                        <Slider
                          value={[customSettings.pitch]}
                          onValueChange={([value]) => setCustomSettings((prev) => ({ ...prev, pitch: value }))}
                          min={0.5}
                          max={1.5}
                          step={0.05}
                        />
                      </div>
                    </div>

                    <Button onClick={testVoice} disabled={!isVoiceEnabled || isTestingVoice} className="w-full">
                      {isTestingVoice ? "Testing..." : "Test Voice"}
                    </Button>
                  </TabsContent>

                  <TabsContent value="wolf-voice" className="space-y-4">
                    <div className="p-3 bg-gradient-to-r from-amber-800/30 to-orange-800/30 rounded-lg border border-amber-400/30">
                      <div className="text-sm text-amber-300 font-medium mb-2">Wolf of Wall Street Mode</div>
                      <div className="text-xs text-amber-400">Leonardo DiCaprio inspired voice personality</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-center">
                        <div className="text-amber-400 font-bold">🎬</div>
                        <div className="text-amber-300 text-xs">Leonardo</div>
                      </div>
                      <div className="text-center">
                        <div className="text-orange-400 font-bold">💰</div>
                        <div className="text-orange-300 text-xs">Wall Street</div>
                      </div>
                    </div>

                    <Button
                      onClick={playWolfQuote}
                      disabled={!isVoiceEnabled || isPlayingWolf}
                      className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                    >
                      {isPlayingWolf ? "Playing Wolf Quote..." : "Random Wolf Quote"}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
