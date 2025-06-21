"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Volume2, VolumeX, Command, Zap, Crown, TrendingUp, Settings, Navigation } from "lucide-react"
import type { SpeechRecognition } from "web-speech-api"

interface VoiceCommand {
  command: string
  action: string
  category: "navigation" | "financial" | "system" | "imperial"
  response: string
}

const VOICE_COMMANDS: VoiceCommand[] = [
  // Navigation Commands
  {
    command: "go to dashboard",
    action: "/dashboard/home",
    category: "navigation",
    response: "Navigating to your Imperial Command Center",
  },
  {
    command: "open marketplace",
    action: "/dashboard/ecommerex/holographic-products",
    category: "navigation",
    response: "Accessing the Quantum Marketplace",
  },
  {
    command: "show real estate",
    action: "/dashboard/ecommerex/real-estate",
    category: "navigation",
    response: "Opening the Property Empire",
  },
  {
    command: "open banking",
    action: "/dashboard/banking",
    category: "navigation",
    response: "Accessing Imperial Treasury",
  },

  // Financial Commands
  {
    command: "check balance",
    action: "check_balance",
    category: "financial",
    response: "Your QGI balance is 250,000 credits. Bond value: 8,500 credits.",
  },
  {
    command: "show portfolio",
    action: "show_portfolio",
    category: "financial",
    response: "Your investment portfolio is performing excellently with 12.5% growth this quarter.",
  },
  {
    command: "market status",
    action: "market_status",
    category: "financial",
    response: "Neural markets are bullish. Supreme Authority bonds up 3.2% today.",
  },

  // System Commands
  {
    command: "system status",
    action: "system_status",
    category: "system",
    response: "All Imperial systems operational. Neural network at 98.7% efficiency.",
  },
  {
    command: "enable notifications",
    action: "enable_notifications",
    category: "system",
    response: "Imperial notifications activated. You will receive priority alerts.",
  },
  {
    command: "dark mode",
    action: "toggle_theme",
    category: "system",
    response: "Imperial dark theme activated for optimal sovereignty experience.",
  },

  // Imperial Commands
  {
    command: "supreme authority",
    action: "supreme_mode",
    category: "imperial",
    response: "Supreme Authority mode activated. All systems under your command.",
  },
  {
    command: "citizen status",
    action: "citizen_status",
    category: "imperial",
    response: "You are a Level VII Global Citizen with Imperator status. All privileges active.",
  },
]

export function VoiceCommandCenter() {
  const [isListening, setIsListening] = useState(false)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true)
  const [lastCommand, setLastCommand] = useState<string>("")
  const [commandHistory, setCommandHistory] = useState<VoiceCommand[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [confidence, setConfidence] = useState(0)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis

      // Initialize speech recognition
      if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = "en-US"

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim()
          const confidence = event.results[event.results.length - 1][0].confidence

          setLastCommand(transcript)
          setConfidence(confidence)
          processVoiceCommand(transcript)
        }

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error:", event.error)
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }
  }, [])

  const speakResponse = (text: string) => {
    if (!isVoiceEnabled || !synthRef.current) return

    synthRef.current.cancel()
    const utterance = new SpeechSynthesisUtterance(text)

    // Use a premium voice if available
    const voices = synthRef.current.getVoices()
    const preferredVoice =
      voices.find(
        (voice) =>
          voice.name.includes("Google UK English Female") ||
          voice.name.includes("Microsoft Zira") ||
          voice.name.includes("Alex"),
      ) || voices[0]

    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    utterance.rate = 0.9
    utterance.pitch = 1.1
    utterance.volume = 0.8

    synthRef.current.speak(utterance)
  }

  const processVoiceCommand = (transcript: string) => {
    setIsProcessing(true)

    // Find matching command
    const matchedCommand = VOICE_COMMANDS.find(
      (cmd) => transcript.includes(cmd.command) || cmd.command.split(" ").every((word) => transcript.includes(word)),
    )

    setTimeout(() => {
      if (matchedCommand) {
        setCommandHistory((prev) => [matchedCommand, ...prev.slice(0, 4)])
        speakResponse(matchedCommand.response)

        // Execute action
        if (matchedCommand.action.startsWith("/")) {
          // Navigation command
          window.location.href = matchedCommand.action
        } else {
          // System command
          console.log(`Executing: ${matchedCommand.action}`)
        }
      } else {
        const fallbackResponse = "Command not recognized. Please try again or say 'help' for available commands."
        speakResponse(fallbackResponse)
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

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled)
    if (isVoiceEnabled && synthRef.current) {
      synthRef.current.cancel()
    }
  }

  const getCategoryIcon = (category: VoiceCommand["category"]) => {
    switch (category) {
      case "navigation":
        return Navigation
      case "financial":
        return TrendingUp
      case "system":
        return Settings
      case "imperial":
        return Crown
      default:
        return Command
    }
  }

  const getCategoryColor = (category: VoiceCommand["category"]) => {
    switch (category) {
      case "navigation":
        return "from-blue-500 to-cyan-500"
      case "financial":
        return "from-green-500 to-emerald-500"
      case "system":
        return "from-purple-500 to-violet-500"
      case "imperial":
        return "from-amber-500 to-orange-500"
      default:
        return "from-gray-500 to-slate-500"
    }
  }

  return (
    <div className="fixed top-20 right-6 z-40">
      <Card className="w-80 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-amber-400/30">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Command className="w-5 h-5 text-amber-400" />
              <span className="text-amber-300 font-semibold">Voice Command</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleVoice}
                className={`w-8 h-8 p-0 ${isVoiceEnabled ? "text-green-400" : "text-gray-400"}`}
              >
                {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Voice Control */}
          <div className="text-center mb-4">
            <motion.button
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? "bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/50"
                  : "bg-gradient-to-br from-purple-600 to-cyan-600 hover:shadow-lg hover:shadow-purple-500/50"
              }`}
              onClick={isListening ? stopListening : startListening}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isListening ? { scale: [1, 1.1, 1] } : {}}
              transition={isListening ? { repeat: Number.POSITIVE_INFINITY, duration: 1 } : {}}
            >
              {isListening ? <MicOff className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-white" />}
            </motion.button>

            <div className="mt-2">
              <Badge className={`${isListening ? "bg-red-500/20 text-red-300" : "bg-purple-500/20 text-purple-300"}`}>
                {isListening ? "Listening..." : "Click to Speak"}
              </Badge>
            </div>
          </div>

          {/* Status */}
          {lastCommand && (
            <div className="mb-4 p-2 bg-purple-800/30 rounded-lg">
              <div className="text-xs text-purple-300 mb-1">Last Command:</div>
              <div className="text-sm text-white">{lastCommand}</div>
              {confidence > 0 && (
                <div className="text-xs text-amber-300 mt-1">Confidence: {Math.round(confidence * 100)}%</div>
              )}
            </div>
          )}

          {/* Processing Indicator */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-2 bg-amber-900/30 rounded-lg border border-amber-400/30"
              >
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Zap className="w-4 h-4 text-amber-400" />
                  </motion.div>
                  <span className="text-amber-300 text-sm">Processing command...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Command History */}
          {commandHistory.length > 0 && (
            <div>
              <div className="text-xs text-purple-300 mb-2">Recent Commands:</div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {commandHistory.map((cmd, index) => {
                  const Icon = getCategoryIcon(cmd.category)
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center space-x-2 p-2 bg-purple-800/20 rounded text-xs"
                    >
                      <div
                        className={`w-6 h-6 rounded bg-gradient-to-br ${getCategoryColor(cmd.category)} flex items-center justify-center`}
                      >
                        <Icon className="w-3 h-3 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white">{cmd.command}</div>
                        <div className="text-purple-300 text-xs">{cmd.response}</div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Quick Commands */}
          <div className="mt-4 pt-4 border-t border-purple-600/30">
            <div className="text-xs text-purple-300 mb-2">Try saying:</div>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <div className="text-cyan-300">"Go to dashboard"</div>
              <div className="text-green-300">"Check balance"</div>
              <div className="text-amber-300">"System status"</div>
              <div className="text-purple-300">"Supreme authority"</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
