"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Mic, MicOff, Volume2, VolumeX, Command, Zap, Crown, TrendingUp, Brain, MessageSquare } from "lucide-react"
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

export function UnifiedAIOrb() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState("voice-commands")
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

  // Conversation State
  const [currentMode, setCurrentMode] = useState<ConversationMode>(CONVERSATION_MODES[0])
  const [conversationCount, setConversationCount] = useState(0)
  const [lastResponse, setLastResponse] = useState("")
  const [isConversing, setIsConversing] = useState(false)
  const [messages, setMessages] = useState<
    Array<{ id: string; text: string; sender: "user" | "wolf"; timestamp: Date }>
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
      }, 2000) // Retract after 2 seconds of no hover
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

    // Simulate Wolf thinking/typing
    setTimeout(
      () => {
        const wolfResponse = generateConversationalResponse(userInput, currentMode)
        const wolfMessage = {
          id: (Date.now() + 1).toString(),
          text: wolfResponse,
          sender: "wolf" as const,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, wolfMessage])
        setConversationCount((prev) => prev + 1)
        speakResponse(wolfResponse)
        setIsTyping(false)
      },
      1000 + Math.random() * 2000,
    ) // Random delay for realism
  }

  const generateConversationalResponse = (userInput: string, mode: ConversationMode): string => {
    const input = userInput.toLowerCase()

    // Context-aware responses based on user input
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

    if (input.includes("success") || input.includes("win") || input.includes("achieve")) {
      return "SUCCESS? You're already SUCCESSFUL just by being here! But we're not stopping at successful - we're going for LEGENDARY! BOOM!"
    }

    // Default energetic responses
    const defaultResponses = [
      "That's EXACTLY the kind of thinking that separates CHAMPIONS from everyone else! Tell me more!",
      "I LOVE that energy! You know what that tells me? You're ready to take this to the NEXT LEVEL!",
      "BOOM! Now you're speaking my language! Let's turn that thought into ACTION!",
      "You're not just thinking like a winner - you're thinking like a CHAMPION! What's your next move?",
      "That's the kind of mindset that builds EMPIRES! Keep that energy flowing!",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const getOrbGradient = () => {
    if (isListening) return "from-red-500 to-red-600"
    if (isProcessing || isTestingVoice || isPlayingWolf || isConversing) return "from-amber-500 to-orange-500"
    return "from-purple-600 to-cyan-600"
  }

  const getOrbIcon = () => {
    if (isListening) return MicOff
    if (isProcessing) return Zap
    if (activeTab === "voice-commands") return Command
    if (activeTab === "voice-engine") return Brain
    if (activeTab === "wolf-voice") return Crown
    if (activeTab === "conversation") return MessageSquare
    return Command
  }

  return (
    <div
      className="fixed bottom-6 left-6 z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {!isExpanded ? (
          // Retracted State - Unified Orb
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
                boxShadow: [
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
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
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
                <Command className="w-3 h-3" />
                <span>Unified AI Assistant</span>
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
          // Expanded State - Tabbed Interface
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
                    <Command className="w-5 h-5 text-amber-400" />
                    <span className="text-amber-300 font-bold">Unified AI Assistant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 text-xs">ALL-IN-ONE</Badge>
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

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
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
                    <TabsTrigger value="conversation" className="text-xs">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Chat
                    </TabsTrigger>
                  </TabsList>

                  {/* Voice Commands Tab */}
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

                  {/* Voice Engine Tab */}
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

                  {/* Wolf Voice Tab */}
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

                  {/* Conversation Tab */}
                  <TabsContent value="conversation" className="space-y-4">
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

                    <div className="p-3 bg-gradient-to-r from-red-800/30 to-orange-800/30 rounded-lg border border-red-400/30">
                      <div className="text-sm text-red-300 font-medium">Wolf Mode: {currentMode.name}</div>
                      <div className="text-xs text-red-400">{currentMode.description}</div>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 text-red-400 mr-1" />
                        <span className="text-xs text-red-400">{currentMode.energy}% Energy</span>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="h-48 overflow-y-auto bg-slate-800/30 rounded-lg p-3 space-y-2">
                      {messages.length === 0 ? (
                        <div className="text-center text-slate-400 text-sm py-8">
                          <Crown className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                          <div>Start a conversation with Wolf!</div>
                          <div className="text-xs mt-1">Ask about money, success, or motivation</div>
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
                                  : "bg-amber-600/30 text-amber-100 border border-amber-400/30"
                              }`}
                            >
                              <div className="flex items-start space-x-2">
                                {message.sender === "wolf" && (
                                  <Crown className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                                )}
                                <div className="flex-1">
                                  <div>{message.text}</div>
                                  <div className="text-xs opacity-60 mt-1">
                                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
                          <div className="bg-amber-600/30 text-amber-100 border border-amber-400/30 p-2 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Crown className="w-4 h-4 text-amber-400" />
                              <div className="flex space-x-1">
                                <motion.div
                                  className="w-2 h-2 bg-amber-400 rounded-full"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0 }}
                                />
                                <motion.div
                                  className="w-2 h-2 bg-amber-400 rounded-full"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.2 }}
                                />
                                <motion.div
                                  className="w-2 h-2 bg-amber-400 rounded-full"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.4 }}
                                />
                              </div>
                              <span className="text-xs">Wolf is typing...</span>
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
                        placeholder="Ask Wolf about money, success, motivation..."
                        className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400/50"
                        disabled={isTyping}
                      />
                      <Button
                        onClick={sendMessage}
                        disabled={!userInput.trim() || !isVoiceEnabled || isTyping}
                        className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 px-4"
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

                    {/* Quick Conversation Starters */}
                    <div className="grid grid-cols-2 gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setUserInput("How can I make more money?")
                          setTimeout(sendMessage, 100)
                        }}
                        className="text-xs text-green-400 hover:text-green-300"
                        disabled={isTyping}
                      >
                        💰 Make Money
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setUserInput("I need motivation to succeed")
                          setTimeout(sendMessage, 100)
                        }}
                        className="text-xs text-blue-400 hover:text-blue-300"
                        disabled={isTyping}
                      >
                        🚀 Get Motivated
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setUserInput("What's your best business advice?")
                          setTimeout(sendMessage, 100)
                        }}
                        className="text-xs text-purple-400 hover:text-purple-300"
                        disabled={isTyping}
                      >
                        💼 Business Tips
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setUserInput("How do I become successful?")
                          setTimeout(sendMessage, 100)
                        }}
                        className="text-xs text-amber-400 hover:text-amber-300"
                        disabled={isTyping}
                      >
                        👑 Success Secrets
                      </Button>
                    </div>

                    <div className="text-center">
                      <Badge className="bg-red-500/20 text-red-300 border-red-400/30">
                        {conversationCount} Messages Exchanged
                      </Badge>
                    </div>
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
