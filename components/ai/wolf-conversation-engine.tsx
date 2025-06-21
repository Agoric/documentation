"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Volume2, VolumeX, MessageSquare, Zap, Crown, TrendingUp } from "lucide-react"

interface ConversationMode {
  name: string
  personality: string
  responseStyle: string
  energy: number
  description: string
}

const CONVERSATION_MODES: ConversationMode[] = [
  {
    name: "Motivational",
    personality: "high-energy",
    responseStyle: "encouraging",
    energy: 95,
    description: "Pure motivation and energy",
  },
  {
    name: "Strategic",
    personality: "analytical",
    responseStyle: "tactical",
    energy: 80,
    description: "Business strategy focused",
  },
  {
    name: "Wealth Builder",
    personality: "money-focused",
    responseStyle: "financial",
    energy: 90,
    description: "All about making money",
  },
  {
    name: "Champion",
    personality: "winner",
    responseStyle: "competitive",
    energy: 100,
    description: "Maximum winning energy",
  },
]

export function WolfConversationEngine() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentMode, setCurrentMode] = useState<ConversationMode>(CONVERSATION_MODES[0])
  const [isActive, setIsActive] = useState(true)
  const [conversationCount, setConversationCount] = useState(0)
  const [lastResponse, setLastResponse] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis
    }
  }, [])

  const generateWolfResponse = (mode: ConversationMode): string => {
    const responses = {
      "high-energy": [
        "Listen up, CHAMPION! Today is YOUR day to absolutely DOMINATE! I can feel that winner energy radiating from you!",
        "You know what separates the WINNERS from everyone else? ACTION! And you're taking it RIGHT NOW!",
        "BOOM! That's the sound of SUCCESS knocking on your door! Are you ready to answer it like the CHAMPION you are?",
      ],
      analytical: [
        "Here's the strategic play that's gonna change EVERYTHING for you. We're talking about calculated moves that WINNERS make!",
        "Let me break down the tactical advantage you have right now. This is how CHAMPIONS think and operate!",
        "The data is clear - you're positioned for MASSIVE success! Here's exactly how we capitalize on it!",
      ],
      "money-focused": [
        "MONEY, MONEY, MONEY! That's what we're here for! Your portfolio is about to get a SERIOUS upgrade!",
        "Time to turn those financial dreams into COLD HARD CASH! I'm seeing opportunities EVERYWHERE!",
        "Your bank account is about to thank you! We're talking about REAL wealth-building moves here!",
      ],
      winner: [
        "WINNERS don't wait for opportunities - they CREATE them! And that's exactly what you're doing right now!",
        "You've got that CHAMPION mindset that separates the elite from everyone else! Time to show the world what you're made of!",
        "VICTORY is your middle name! Every move you make is calculated for SUCCESS and DOMINATION!",
      ],
    }

    const modeResponses = responses[mode.personality as keyof typeof responses] || responses["high-energy"]
    return modeResponses[Math.floor(Math.random() * modeResponses.length)]
  }

  const speakResponse = (text: string) => {
    if (!isActive || !synthRef.current) return

    synthRef.current.cancel()
    const utterance = new SpeechSynthesisUtterance(text)

    const voices = synthRef.current.getVoices()
    const wolfVoice =
      voices.find((voice) => voice.name.includes("Google US English Male")) ||
      voices.find((voice) => voice.name.includes("Microsoft David")) ||
      voices.find((voice) => voice.name.includes("Alex")) ||
      voices.find((voice) => voice.lang.startsWith("en-US")) ||
      voices[0]

    if (wolfVoice) {
      utterance.voice = wolfVoice
    }

    utterance.rate = 1.2 + (currentMode.energy / 100) * 0.3 // Faster for higher energy
    utterance.pitch = 0.85 + (currentMode.energy / 100) * 0.15 // Higher pitch for energy
    utterance.volume = 0.9

    synthRef.current.speak(utterance)
  }

  const triggerWolfResponse = () => {
    if (!isActive) return

    setIsProcessing(true)

    setTimeout(() => {
      const response = generateWolfResponse(currentMode)
      setLastResponse(response)
      setConversationCount((prev) => prev + 1)
      speakResponse(response)
      setIsProcessing(false)
    }, 800)
  }

  const getModeColor = (mode: ConversationMode) => {
    switch (mode.name) {
      case "Motivational":
        return "from-green-500 to-emerald-500"
      case "Strategic":
        return "from-blue-500 to-cyan-500"
      case "Wealth Builder":
        return "from-amber-500 to-yellow-500"
      case "Champion":
        return "from-red-500 to-orange-500"
      default:
        return "from-purple-500 to-pink-500"
    }
  }

  return (
    <div className="fixed bottom-6 left-48 z-40">
      <AnimatePresence>
        {!isExpanded ? (
          // Retracted State - Floating Orb
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
            className="relative cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            <motion.div
              className={`w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-orange-600 shadow-2xl flex items-center justify-center ${
                isProcessing ? "shadow-red-500/50" : ""
              }`}
              animate={
                isProcessing
                  ? {
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 20px rgba(239, 68, 68, 0.5)",
                        "0 0 40px rgba(249, 115, 22, 0.7)",
                        "0 0 20px rgba(239, 68, 68, 0.5)",
                      ],
                    }
                  : {
                      boxShadow: [
                        "0 0 15px rgba(239, 68, 68, 0.3)",
                        "0 0 25px rgba(249, 115, 22, 0.5)",
                        "0 0 15px rgba(239, 68, 68, 0.3)",
                      ],
                    }
              }
              transition={
                isProcessing
                  ? { repeat: Number.POSITIVE_INFINITY, duration: 1 }
                  : { repeat: Number.POSITIVE_INFINITY, duration: 3 }
              }
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare className="w-5 h-5 text-white" />
            </motion.div>

            {/* Status indicators */}
            <div className="absolute -top-1 -right-1">
              {isProcessing && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                  className="w-3 h-3 bg-red-400 rounded-full"
                />
              )}
            </div>

            {/* Conversation count badge */}
            {conversationCount > 0 && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">{conversationCount}</span>
              </div>
            )}

            {/* Tooltip */}
            <motion.div
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-gradient-to-r from-red-900/95 to-orange-900/95 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-red-400/30"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-3 h-3" />
                <span>Wolf Conversation</span>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-900/95"></div>
            </motion.div>

            {/* Quick controls */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsActive(!isActive)
                }}
                className={`w-8 h-8 p-0 rounded-full ${
                  isActive ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {isActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
          </motion.div>
        ) : (
          // Expanded State - Full Interface
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20, transition: { duration: 0.3 } }}
            className="w-80"
          >
            <Card className="bg-gradient-to-br from-red-900/95 to-orange-900/95 backdrop-blur-xl border-red-400/30">
              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-red-400" />
                    <span className="text-red-300 font-bold">Wolf Conversation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-red-500/20 text-red-300 border-red-400/30 text-xs">
                      {conversationCount} TALKS
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsActive(!isActive)}
                      className={`w-8 h-8 p-0 ${isActive ? "text-green-400" : "text-gray-400"}`}
                    >
                      {isActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsExpanded(false)}
                      className="w-8 h-8 p-0 text-red-400"
                    >
                      ×
                    </Button>
                  </div>
                </div>

                {/* Conversation Modes */}
                <div className="mb-4">
                  <div className="text-sm text-red-300 mb-2">Conversation Mode:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {CONVERSATION_MODES.map((mode) => (
                      <motion.button
                        key={mode.name}
                        className={`p-2 rounded-lg text-xs transition-all ${
                          currentMode.name === mode.name
                            ? "bg-red-600/30 border border-red-400/50 text-red-200"
                            : "bg-slate-800/50 border border-slate-600/30 text-slate-300 hover:bg-slate-700/50"
                        }`}
                        onClick={() => setCurrentMode(mode)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="font-medium">{mode.name}</div>
                        <div className="text-xs opacity-70">{mode.description}</div>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-600 rounded-full h-1">
                            <div
                              className={`h-1 rounded-full bg-gradient-to-r ${getModeColor(mode)}`}
                              style={{ width: `${mode.energy}%` }}
                            />
                          </div>
                          <span className="text-xs ml-1">{mode.energy}%</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Current Mode Display */}
                <div className="mb-4 p-3 bg-gradient-to-r from-red-800/30 to-orange-800/30 rounded-lg border border-red-400/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-red-300 font-medium">Active Mode: {currentMode.name}</div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-red-400" />
                      <span className="text-xs text-red-400">{currentMode.energy}% Energy</span>
                    </div>
                  </div>
                  <div className="text-xs text-red-400">{currentMode.description}</div>
                </div>

                {/* Trigger Button */}
                <div className="mb-4">
                  <Button
                    onClick={triggerWolfResponse}
                    disabled={!isActive || isProcessing}
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Zap className="w-4 h-4" />
                        </motion.div>
                        <span>Wolf Speaking...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Crown className="w-4 h-4" />
                        <span>Get Wolf Motivation</span>
                      </div>
                    )}
                  </Button>
                </div>

                {/* Last Response */}
                {lastResponse && (
                  <div className="mb-4 p-3 bg-red-800/20 rounded-lg border border-red-600/30">
                    <div className="text-xs text-red-300 mb-1">Last Wolf Response:</div>
                    <div className="text-sm text-red-100 leading-relaxed">{lastResponse}</div>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-xs text-center">
                  <div className="bg-red-800/20 p-2 rounded">
                    <div className="text-red-400 font-bold">{conversationCount}</div>
                    <div className="text-red-300">Conversations</div>
                  </div>
                  <div className="bg-orange-800/20 p-2 rounded">
                    <div className="text-orange-400 font-bold">{currentMode.energy}%</div>
                    <div className="text-orange-300">Energy</div>
                  </div>
                  <div className="bg-yellow-800/20 p-2 rounded">
                    <div className="text-yellow-400 font-bold">🔥</div>
                    <div className="text-yellow-300">Wolf Mode</div>
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
