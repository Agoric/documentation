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
import { Crown, Send, Mic, MicOff, Volume2, VolumeX, Brain, Sparkles, Settings, Copy, RotateCcw } from "lucide-react"
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

const GENIUS_RESPONSES = {
  greeting: [
    "Salve, noble citizen! I am your Imperial AI Genius Guide. How may I assist your digital sovereignty today?",
    "Welcome to the SnappAiFi Neural Command Center. I am at your supreme service.",
    "Greetings, Your Excellence. The Imperial AI stands ready to serve your every query.",
  ],
  financial: [
    "Your financial empire requires careful strategy. Let me analyze the optimal path forward.",
    "The neural networks suggest several profitable ventures for your consideration.",
    "Imperial Treasury protocols activated. Analyzing your wealth optimization opportunities.",
  ],
  legal: [
    "Legal sovereignty is paramount. I shall guide you through the digital jurisdiction frameworks.",
    "The Imperial Legal Codex contains the answers you seek. Allow me to illuminate the path.",
    "Digital citizenship rights and obligations are complex. I am here to clarify your authority.",
  ],
  technical: [
    "The neural systems are operating at peak efficiency. Technical solutions are my specialty.",
    "Quantum processing engaged. I shall resolve your technical inquiries with precision.",
    "Imperial technology serves your needs. Let me optimize your digital experience.",
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
    rate: 0.9,
    pitch: 1.1,
    volume: 0.8,
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

      // Load available voices
      const loadVoices = () => {
        const voices = synthRef.current?.getVoices() || []
        setAvailableVoices(voices)

        // Select a premium English voice for the genius guide
        const preferredVoice =
          voices.find((voice) => voice.name.includes("Google UK English Female")) ||
          voices.find((voice) => voice.name.includes("Microsoft Zira")) ||
          voices.find((voice) => voice.name.includes("Alex")) ||
          voices.find((voice) => voice.lang.startsWith("en") && voice.name.includes("Premium")) ||
          voices.find((voice) => voice.lang.startsWith("en-US") || voice.lang.startsWith("en-GB")) ||
          voices[0]

        setVoiceSettings((prev) => ({ ...prev, voice: preferredVoice }))
      }

      loadVoices()
      if (synthRef.current) {
        synthRef.current.onvoiceschanged = loadVoices
      }

      // Initialize speech recognition
      if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = "en-US"

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript
          setInputValue(transcript)
          setIsListening(false)
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
      content: GENIUS_RESPONSES.greeting[0],
      timestamp: new Date(),
      category: "imperial",
    }
    setMessages([welcomeMessage])

    // Speak welcome message
    setTimeout(() => {
      speakMessage(welcomeMessage.content)
    }, 1000)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const speakMessage = (text: string) => {
    if (!voiceSettings.enabled || !synthRef.current || !voiceSettings.voice) return

    // Cancel any ongoing speech
    synthRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = voiceSettings.voice
    utterance.rate = voiceSettings.rate
    utterance.pitch = voiceSettings.pitch
    utterance.volume = voiceSettings.volume

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
    if (lowerQuery.includes("money") || lowerQuery.includes("invest") || lowerQuery.includes("financial")) {
      return "financial"
    }
    if (lowerQuery.includes("legal") || lowerQuery.includes("law") || lowerQuery.includes("rights")) {
      return "legal"
    }
    if (lowerQuery.includes("technical") || lowerQuery.includes("system") || lowerQuery.includes("error")) {
      return "technical"
    }
    if (lowerQuery.includes("imperial") || lowerQuery.includes("authority") || lowerQuery.includes("supreme")) {
      return "imperial"
    }
    return "general"
  }

  const generateResponse = (userMessage: string, category: Message["category"]): string => {
    const responses = GENIUS_RESPONSES[category as keyof typeof GENIUS_RESPONSES] || GENIUS_RESPONSES.greeting

    // Contextual responses based on user input
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (category === "financial") {
      return `Based on your query about "${userMessage}", I recommend exploring our Imperial Treasury services. The neural analysis suggests optimizing your QGI portfolio allocation for maximum sovereignty returns. Would you like me to access your financial dashboard?`
    }

    if (category === "legal") {
      return `Regarding "${userMessage}", the Digital Sovereignty Framework provides comprehensive protection. As a SnappAiFi citizen, you have access to our Legal Imperium services. Shall I guide you through the relevant legal codex sections?`
    }

    if (category === "technical") {
      return `For your technical inquiry about "${userMessage}", the Imperial Neural Network is processing optimal solutions. Our quantum systems can resolve most technical challenges. Would you like me to run a diagnostic scan?`
    }

    return `Your query about "${userMessage}" is most intriguing. The Imperial AI systems are analyzing multiple solution pathways. How may I best serve your digital sovereignty needs?`
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

    // Simulate processing delay
    setTimeout(() => {
      const category = categorizeQuery(userMessage.content)
      const response = generateResponse(userMessage.content, category)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response,
        timestamp: new Date(),
        category,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsProcessing(false)

      // Speak the response
      speakMessage(response)
    }, 1500)
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
                      <p className="text-purple-300 text-xs">Neural Command Assistant</p>
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
                    <span className="text-green-400">Neural Network Active</span>
                  </div>
                  <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30">
                    <Crown className="w-3 h-3 mr-1" />
                    Supreme Authority
                  </Badge>
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
                              <span className="text-sm text-purple-300 ml-2">Neural processing...</span>
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
                        placeholder="Ask the Imperial AI Genius..."
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

                  {/* Quick Actions */}
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <div className="flex items-center space-x-2 text-purple-300">
                      <Sparkles className="w-3 h-3" />
                      <span>Voice enabled</span>
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
                        onClick={() => setMessages([])}
                      >
                        <RotateCcw className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="w-6 h-6 p-0 text-purple-400">
                        <Settings className="w-3 h-3" />
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
