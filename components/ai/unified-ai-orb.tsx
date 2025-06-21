"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Command,
  Zap,
  MessageSquare,
  Bot,
  Sparkles,
  Globe,
  Upload,
  User,
  FileText,
} from "lucide-react"
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

interface PersonalityProfile {
  id: string
  name: string
  description: string
  icon: string
  traits: string[]
}

const VOICE_COMMANDS: VoiceCommand[] = [
  {
    command: "browse website",
    action: "web_browse",
    category: "system",
    response: "I'll browse that website and analyze its content for you!",
  },
  {
    command: "read file",
    action: "file_read",
    category: "system",
    response: "Upload a file and I'll read and analyze it for you!",
  },
  {
    command: "mimic elon musk",
    action: "personality_elon",
    category: "system",
    response: "Obviously, I'm now channeling Elon Musk. This is going to be incredible!",
  },
  {
    command: "go to dashboard",
    action: "/dashboard/home",
    category: "navigation",
    response: "BOOM! Taking you to your command center where the MAGIC happens!",
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

const PERSONALITY_PROFILES: PersonalityProfile[] = [
  {
    id: "elon-musk",
    name: "Elon Musk",
    description: "Visionary tech entrepreneur",
    icon: "🚀",
    traits: ["Technical", "Direct", "Future-focused", "Ambitious"],
  },
  {
    id: "steve-jobs",
    name: "Steve Jobs",
    description: "Apple co-founder, design perfectionist",
    icon: "🍎",
    traits: ["Passionate", "Design-focused", "Perfectionist", "Inspiring"],
  },
  {
    id: "leonardo-wolf",
    name: "Leonardo (Wolf)",
    description: "Wolf of Wall Street energy",
    icon: "🐺",
    traits: ["Charismatic", "Money-focused", "High-energy", "Persuasive"],
  },
  {
    id: "einstein",
    name: "Albert Einstein",
    description: "Brilliant physicist and philosopher",
    icon: "🧠",
    traits: ["Curious", "Thoughtful", "Wise", "Scientific"],
  },
  {
    id: "oprah",
    name: "Oprah Winfrey",
    description: "Media mogul and inspirational leader",
    icon: "⭐",
    traits: ["Empathetic", "Inspiring", "Warm", "Encouraging"],
  },
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

  // AI Chat State
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>(AI_PROVIDERS[0])
  const [selectedPersonality, setSelectedPersonality] = useState<PersonalityProfile>(PERSONALITY_PROFILES[2]) // Default to Wolf
  const [currentMode, setCurrentMode] = useState<ConversationMode>(CONVERSATION_MODES[0])
  const [conversationCount, setConversationCount] = useState(0)
  const [isConversing, setIsConversing] = useState(false)
  const [messages, setMessages] = useState<
    Array<{
      id: string
      text: string
      sender: "user" | "ai"
      timestamp: Date
      provider?: string
      personality?: string
      type?: "text" | "web" | "file"
    }>
  >([])
  const [userInput, setUserInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  // Add after existing state declarations
  const [isVoiceConversationMode, setIsVoiceConversationMode] = useState(false)
  const [voiceActivityDetected, setVoiceActivityDetected] = useState(false)
  const [conversationContext, setConversationContext] = useState<string[]>([])
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false)
  const [voiceConfidence, setVoiceConfidence] = useState(0)
  const [lastSpeechTime, setLastSpeechTime] = useState(0)
  const [silenceTimer, setSilenceTimer] = useState<NodeJS.Timeout | null>(null)

  // Web Access State
  const [webUrl, setWebUrl] = useState("")
  const [isWebAccessing, setIsWebAccessing] = useState(false)
  const [webResults, setWebResults] = useState<any>(null)

  // File Processing State
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isFileProcessing, setIsFileProcessing] = useState(false)
  const [fileResults, setFileResults] = useState<any>(null)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-retract on mouse leave
  useEffect(() => {
    if (!isHovered && isExpanded) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsExpanded(false)
      }, 3000) // Increased to 3 seconds for more complex interface
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

      // Replace the existing speech recognition setup in useEffect
      if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = "en-US"
        recognitionRef.current.maxAlternatives = 3

        recognitionRef.current.onresult = (event) => {
          // Make sure we actually have a result with an alternative
          if (!event?.results?.length) return

          const lastResult = event.results[event.results.length - 1]
          if (!lastResult || !lastResult[0]) return

          const transcript = lastResult[0]?.transcript?.trim() ?? ""
          const confidence = lastResult[0]?.confidence ?? 0

          // Ignore empty interim results
          if (!transcript) return

          setVoiceConfidence(confidence)
          setLastSpeechTime(Date.now())

          if (lastResult.isFinal) {
            if (isVoiceConversationMode) {
              handleVoiceConversation(transcript)
            } else {
              setLastCommand(transcript.toLowerCase())
              processVoiceCommand(transcript.toLowerCase())
            }
            setVoiceActivityDetected(false)
          } else {
            // Interim feedback
            setVoiceActivityDetected(true)
            setLastCommand(transcript)
          }
        }

        recognitionRef.current.onstart = () => {
          setIsListening(true)
          setVoiceActivityDetected(false)
        }

        recognitionRef.current.onend = () => {
          if (isVoiceConversationMode && !isWaitingForResponse) {
            // Auto-restart in conversation mode
            setTimeout(() => {
              if (recognitionRef.current && isVoiceConversationMode) {
                recognitionRef.current.start()
              }
            }, 100)
          } else {
            setIsListening(false)
            setVoiceActivityDetected(false)
          }
        }

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error:", event.error)
          if (event.error === "no-speech" && isVoiceConversationMode) {
            // Restart automatically on no-speech in conversation mode
            setTimeout(() => {
              if (recognitionRef.current && isVoiceConversationMode) {
                recognitionRef.current.start()
              }
            }, 500)
          } else {
            setIsListening(false)
            setVoiceActivityDetected(false)
          }
        }
      }
    }
  }, [])

  // Add this useEffect to auto-browse the URL
  useEffect(() => {
    const autoBrowseUrl = "https://kzmr0ntnmauuv4h3c4l4.lite.vusercontent.net"
    if (autoBrowseUrl) {
      setWebUrl(autoBrowseUrl)
      // Auto-browse after component mounts
      setTimeout(() => {
        browseWebsite()
      }, 1000)
    }
  }, [])

  const speakResponse = async (text: string) => {
    if (!isVoiceEnabled || !synthRef.current) return

    synthRef.current.cancel()

    // Use personality-based voice synthesis
    try {
      const voiceResponse = await fetch("/api/ai/voice-synthesis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          personality: selectedPersonality.id,
          customSettings,
        }),
      })

      if (voiceResponse.ok) {
        const voiceData = await voiceResponse.json()
        const utterance = new SpeechSynthesisUtterance(text)

        // Apply personality-specific voice settings
        utterance.rate = voiceData.settings.rate
        utterance.pitch = voiceData.settings.pitch
        utterance.volume = voiceData.settings.volume

        const voices = synthRef.current.getVoices()
        const preferredVoice =
          voices.find((voice) => voice.name.includes("Google US English Male")) ||
          voices.find((voice) => voice.name.includes("Microsoft David")) ||
          voices[0]

        if (preferredVoice) utterance.voice = preferredVoice

        synthRef.current.speak(utterance)
      }
    } catch (error) {
      console.error("Voice synthesis error:", error)
      // Fallback to basic speech
      const utterance = new SpeechSynthesisUtterance(text)
      synthRef.current.speak(utterance)
    }
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

        // Handle special commands
        if (matchedCommand.action === "web_browse") {
          setActiveTab("web-access")
        } else if (matchedCommand.action === "file_read") {
          setActiveTab("file-processor")
        } else if (matchedCommand.action.startsWith("personality_")) {
          const personalityId = matchedCommand.action.replace("personality_", "")
          const personality = PERSONALITY_PROFILES.find((p) => p.id === personalityId)
          if (personality) {
            setSelectedPersonality(personality)
            setActiveTab("ai-chat")
          }
        } else if (matchedCommand.action.startsWith("/")) {
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

  const sendMessage = async () => {
    if (!userInput.trim() || !isVoiceEnabled) return

    const userMessage = {
      id: Date.now().toString(),
      text: userInput,
      sender: "user" as const,
      timestamp: new Date(),
      type: "text" as const,
    }

    setMessages((prev) => [...prev, userMessage])
    setUserInput("")
    setIsTyping(true)

    try {
      let aiResponse = ""

      if (selectedProvider.name === "Groq" && selectedProvider.available) {
        // Use personality engine for Groq responses
        const personalityResponse = await fetch("/api/ai/personality-engine", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userInput,
            personality: selectedPersonality.id,
            context: `Current conversation mode: ${currentMode.name}`,
          }),
        })

        if (personalityResponse.ok) {
          const data = await personalityResponse.json()
          aiResponse = data.response
        } else {
          throw new Error("Personality engine failed")
        }
      } else {
        // Fallback to built-in responses
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
            personality: selectedPersonality.name,
            type: "text" as const,
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
          personality: selectedPersonality.name,
          type: "text" as const,
        }

        setMessages((prev) => [...prev, aiMessage])
        setConversationCount((prev) => prev + 1)
        speakResponse(fallbackResponse)
        setIsTyping(false)
      }, 1000)
    }
  }

  const browseWebsite = async () => {
    if (!webUrl.trim()) return

    setIsWebAccessing(true)

    try {
      const response = await fetch("/api/ai/web-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: webUrl,
          action: "summarize",
        }),
      })

      const data = await response.json()
      setWebResults(data)

      if (data.success) {
        const webMessage = {
          id: Date.now().toString(),
          text: `I've analyzed ${webUrl}:\n\n**Title:** ${data.data.title}\n\n**Summary:** ${data.data.summary}\n\n**Key Points:**\n${data.data.keyPoints.map((point: string) => `• ${point}`).join("\n")}`,
          sender: "ai" as const,
          timestamp: new Date(),
          provider: "Web Browser",
          type: "web" as const,
        }

        setMessages((prev) => [...prev, webMessage])
        speakResponse(`I've successfully analyzed the website ${webUrl}. Here's what I found: ${data.data.summary}`)
      }
    } catch (error) {
      console.error("Web access error:", error)
      speakResponse("I encountered an error while browsing that website. Please check the URL and try again.")
    } finally {
      setIsWebAccessing(false)
    }
  }

  const processFile = async () => {
    if (!selectedFile) return

    setIsFileProcessing(true)

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)
      formData.append("action", "analyze")

      const response = await fetch("/api/ai/file-processor", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      setFileResults(data)

      if (data.success) {
        const fileMessage = {
          id: Date.now().toString(),
          text: `I've analyzed your file "${data.filename}":\n\n**Stats:** ${data.stats.words} words, ${data.stats.lines} lines\n\n**Preview:** ${data.preview}\n\n**Analysis:**\n• Language: ${data.analysis.language}\n• Sentiment: ${data.analysis.sentiment}\n• Complexity: ${data.analysis.complexity}\n• Keywords: ${data.analysis.keywords.join(", ")}`,
          sender: "ai" as const,
          timestamp: new Date(),
          provider: "File Processor",
          type: "file" as const,
        }

        setMessages((prev) => [...prev, fileMessage])
        speakResponse(
          `I've successfully analyzed your file ${data.filename}. It contains ${data.stats.words} words and has a ${data.analysis.complexity} complexity level.`,
        )
      }
    } catch (error) {
      console.error("File processing error:", error)
      speakResponse("I encountered an error while processing that file. Please try a different file.")
    } finally {
      setIsFileProcessing(false)
    }
  }

  const generateWolfResponse = (userInput: string, mode: ConversationMode): string => {
    const input = userInput.toLowerCase()

    if (input.includes("money") || input.includes("rich") || input.includes("wealth")) {
      return "NOW we're talking! Money is the GAME, and you're about to become the CHAMPION! I see three major opportunities right now that could EXPLODE your wealth!"
    }

    if (input.includes("help") || input.includes("advice") || input.includes("what should")) {
      return "You want advice? HERE IT IS! Stop thinking, start DOING! Every second you hesitate is a second your competition gets ahead!"
    }

    const defaultResponses = [
      "That's EXACTLY the kind of thinking that separates CHAMPIONS from everyone else! Tell me more!",
      "I LOVE that energy! You know what that tells me? You're ready to take this to the NEXT LEVEL!",
      "BOOM! Now you're speaking my language! Let's turn that thought into ACTION!",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const getOrbGradient = () => {
    if (isVoiceConversationMode && voiceActivityDetected) return "from-green-400 to-emerald-500"
    if (isVoiceConversationMode) return "from-blue-500 to-cyan-500"
    if (isListening) return "from-red-500 to-red-600"
    if (isProcessing || isTestingVoice || isConversing || isWebAccessing || isFileProcessing)
      return "from-amber-500 to-orange-500"
    if (selectedProvider.name === "Groq") return "from-green-500 to-emerald-600"
    if (selectedPersonality.id === "elon-musk") return "from-blue-500 to-cyan-600"
    if (selectedPersonality.id === "steve-jobs") return "from-gray-500 to-slate-600"
    return "from-purple-600 to-cyan-600"
  }

  const getOrbIcon = () => {
    if (isListening) return MicOff
    if (isProcessing || isWebAccessing || isFileProcessing) return Zap
    if (activeTab === "ai-chat") return selectedProvider.name === "Groq" ? Sparkles : Bot
    if (activeTab === "web-access") return Globe
    if (activeTab === "file-processor") return FileText
    if (activeTab === "personality") return User
    if (activeTab === "voice-commands") return Command
    return Bot
  }

  const startVoiceConversation = () => {
    setIsVoiceConversationMode(true)
    setActiveTab("ai-chat")
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start()
    }
  }

  const stopVoiceConversation = () => {
    setIsVoiceConversationMode(false)
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
    setVoiceActivityDetected(false)
    setIsWaitingForResponse(false)
  }

  const handleVoiceConversation = async (transcript: string) => {
    if (!transcript.trim() || isWaitingForResponse) return

    setIsWaitingForResponse(true)
    setConversationContext((prev) => [...prev.slice(-4), transcript])

    // Add user message to chat
    const userMessage = {
      id: Date.now().toString(),
      text: transcript,
      sender: "user" as const,
      timestamp: new Date(),
      type: "text" as const,
    }

    setMessages((prev) => [...prev, userMessage])

    try {
      let aiResponse = ""

      if (selectedProvider.name === "Groq" && selectedProvider.available) {
        const personalityResponse = await fetch("/api/ai/personality-engine", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: transcript,
            personality: selectedPersonality.id,
            context: `Conversation context: ${conversationContext.join(" -> ")}. Current mode: ${currentMode.name}. This is a voice conversation, keep responses concise and conversational.`,
          }),
        })

        if (personalityResponse.ok) {
          const data = await personalityResponse.json()
          aiResponse = data.response
        } else {
          throw new Error("Personality engine failed")
        }
      } else {
        aiResponse = generateWolfResponse(transcript, currentMode)
      }

      // Add AI response to chat
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "ai" as const,
        timestamp: new Date(),
        provider: selectedProvider.name,
        personality: selectedPersonality.name,
        type: "text" as const,
      }

      setMessages((prev) => [...prev, aiMessage])
      setConversationCount((prev) => prev + 1)

      // Speak the response
      await speakResponse(aiResponse)
    } catch (error) {
      console.error("Voice conversation error:", error)
      const fallbackResponse = "I'm having trouble processing that. Could you try again?"

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        sender: "ai" as const,
        timestamp: new Date(),
        provider: "Fallback",
        personality: selectedPersonality.name,
        type: "text" as const,
      }

      setMessages((prev) => [...prev, aiMessage])
      await speakResponse(fallbackResponse)
    } finally {
      setIsWaitingForResponse(false)
    }
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
                const IconComp = getOrbIcon()
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                return IconComp ? <IconComp className="w-7 h-7 text-white" /> : null
              })()}
            </motion.div>

            {/* Status indicators */}
            <div className="absolute -top-2 -right-2 flex flex-col space-y-1">
              {selectedProvider.name === "Groq" && selectedProvider.available && (
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" title="Groq AI Active" />
              )}
              {selectedPersonality.id !== "leonardo-wolf" && (
                <div className="w-3 h-3 bg-blue-500 rounded-full" title={`${selectedPersonality.name} Personality`} />
              )}
              {isListening && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                  className="w-3 h-3 bg-red-500 rounded-full"
                />
              )}
              {(isProcessing || isTestingVoice || isConversing || isWebAccessing || isFileProcessing) && (
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
                <span>
                  AI Assistant ({selectedPersonality.name} • {selectedProvider.name})
                </span>
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
            className="w-[420px]"
          >
            <Card className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-amber-400/30">
              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-5 h-5 text-amber-400" />
                    <span className="text-amber-300 font-bold">Super AI Assistant</span>
                    <Badge className="bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 text-xs">
                      WEB • FILES • VOICES
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

                {/* Current Personality Display */}
                <div className="mb-4 p-2 bg-gradient-to-r from-purple-800/30 to-blue-800/30 rounded-lg border border-purple-400/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{selectedPersonality.icon}</span>
                      <div>
                        <div className="text-sm text-purple-300 font-medium">{selectedPersonality.name}</div>
                        <div className="text-xs text-purple-400">{selectedPersonality.description}</div>
                      </div>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs">
                      {selectedProvider.name}
                    </Badge>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 text-xs">
                    <TabsTrigger value="ai-chat" className="text-xs">
                      <Bot className="w-3 h-3 mr-1" />
                      Chat
                    </TabsTrigger>
                    <TabsTrigger value="web-access" className="text-xs">
                      <Globe className="w-3 h-3 mr-1" />
                      Web
                    </TabsTrigger>
                    <TabsTrigger value="file-processor" className="text-xs">
                      <FileText className="w-3 h-3 mr-1" />
                      Files
                    </TabsTrigger>
                    <TabsTrigger value="personality" className="text-xs">
                      <User className="w-3 h-3 mr-1" />
                      Voice
                    </TabsTrigger>
                    <TabsTrigger value="voice-commands" className="text-xs">
                      <Command className="w-3 h-3 mr-1" />
                      Cmd
                    </TabsTrigger>
                  </TabsList>

                  {/* AI Chat Tab */}
                  <TabsContent value="ai-chat" className="space-y-4">
                    <div className="mb-4">
                      <Button
                        onClick={isVoiceConversationMode ? stopVoiceConversation : startVoiceConversation}
                        className={`w-full ${
                          isVoiceConversationMode
                            ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                            : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {isVoiceConversationMode ? (
                            <>
                              <MicOff className="w-4 h-4" />
                              <span>Stop Voice Conversation</span>
                              {voiceActivityDetected && (
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
                                  className="w-2 h-2 bg-green-400 rounded-full"
                                />
                              )}
                            </>
                          ) : (
                            <>
                              <Mic className="w-4 h-4" />
                              <span>Start Voice Conversation</span>
                            </>
                          )}
                        </div>
                      </Button>

                      {isVoiceConversationMode && (
                        <div className="mt-2 p-2 bg-blue-900/20 border border-blue-400/30 rounded-lg">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-2 h-2 rounded-full ${voiceActivityDetected ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}
                              />
                              <span className="text-blue-300">
                                {isWaitingForResponse
                                  ? "AI is responding..."
                                  : voiceActivityDetected
                                    ? "Listening..."
                                    : "Ready to listen"}
                              </span>
                            </div>
                            <div className="text-blue-400">Confidence: {Math.round(voiceConfidence * 100)}%</div>
                          </div>
                          {lastCommand && voiceActivityDetected && (
                            <div className="mt-1 text-xs text-blue-200 italic">"{lastCommand}"</div>
                          )}
                        </div>
                      )}
                    </div>
                    {/* Chat Messages */}
                    <div className="h-48 overflow-y-auto bg-slate-800/30 rounded-lg p-3 space-y-2">
                      {messages.length === 0 ? (
                        <div className="text-center text-slate-400 text-sm py-8">
                          <div className="text-2xl mb-2">{selectedPersonality.icon}</div>
                          <div>Chat with {selectedPersonality.name}!</div>
                          <div className="text-xs mt-1">I can browse websites, read files, and mimic personalities</div>
                        </div>
                      ) : (
                        messages
                          // Ensure we never render null / undefined
                          .filter(
                            (m): m is NonNullable<typeof m> => m !== null && m !== undefined && typeof m === "object",
                          )
                          .map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[85%] p-2 rounded-lg text-sm ${
                                  message.sender === "user"
                                    ? "bg-blue-600/30 text-blue-100 border border-blue-400/30"
                                    : message.type === "web"
                                      ? "bg-green-600/30 text-green-100 border border-green-400/30"
                                      : message.type === "file"
                                        ? "bg-orange-600/30 text-orange-100 border border-orange-400/30"
                                        : "bg-purple-600/30 text-purple-100 border border-purple-400/30"
                                }`}
                              >
                                <div className="flex items-start space-x-2">
                                  {message.sender === "ai" && (
                                    <div className="text-lg mt-0.5 flex-shrink-0">
                                      {message.type === "web"
                                        ? "🌐"
                                        : message.type === "file"
                                          ? "📄"
                                          : selectedPersonality.icon}
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    <div className="whitespace-pre-line">{message.text}</div>
                                    <div className="text-xs opacity-60 mt-1 flex items-center justify-between">
                                      <span>
                                        {message.timestamp.toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </span>
                                      {message.personality && <span>{message.personality}</span>}
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
                          <div className="bg-purple-600/30 text-purple-100 border border-purple-400/30 p-2 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <div className="text-lg">{selectedPersonality.icon}</div>
                              <div className="flex space-x-1">
                                <motion.div
                                  className="w-2 h-2 bg-purple-400 rounded-full"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0 }}
                                />
                                <motion.div
                                  className="w-2 h-2 bg-purple-400 rounded-full"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.2 }}
                                />
                                <motion.div
                                  className="w-2 h-2 bg-purple-400 rounded-full"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.4 }}
                                />
                              </div>
                              <span className="text-xs">{selectedPersonality.name} is thinking...</span>
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
                        placeholder={`Chat with ${selectedPersonality.name}...`}
                        className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400/50"
                        disabled={isTyping}
                      />
                      <Button
                        onClick={sendMessage}
                        disabled={!userInput.trim() || !isVoiceEnabled || isTyping}
                        className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-4"
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
                          setUserInput("Browse https://news.ycombinator.com and summarize the top stories")
                          setTimeout(sendMessage, 100)
                        }}
                        className="text-xs text-green-400 hover:text-green-300"
                        disabled={isTyping}
                      >
                        🌐 Browse Web
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setUserInput("Analyze my uploaded document")
                          setTimeout(sendMessage, 100)
                        }}
                        className="text-xs text-orange-400 hover:text-orange-300"
                        disabled={isTyping}
                      >
                        📄 Read File
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setUserInput("Give me your best business advice")
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
                          setUserInput("Motivate me to achieve my goals")
                          setTimeout(sendMessage, 100)
                        }}
                        className="text-xs text-amber-400 hover:text-amber-300"
                        disabled={isTyping}
                      >
                        🚀 Motivate Me
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Web Access Tab */}
                  <TabsContent value="web-access" className="space-y-4">
                    <div className="p-3 bg-gradient-to-r from-green-800/30 to-blue-800/30 rounded-lg border border-green-400/30">
                      <div className="text-sm text-green-300 font-medium mb-2">🌐 Web Access Engine</div>
                      <div className="text-xs text-green-400">
                        Browse any website and extract content, data, or summaries
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-cyan-300 mb-2">Website URL:</div>
                        <input
                          type="url"
                          value={webUrl}
                          onChange={(e) => setWebUrl(e.target.value)}
                          placeholder="https://example.com"
                          className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:border-green-400/50"
                        />
                      </div>

                      <Button
                        onClick={browseWebsite}
                        disabled={!webUrl.trim() || isWebAccessing}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      >
                        {isWebAccessing ? (
                          <div className="flex items-center space-x-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                            >
                              <Globe className="w-4 h-4" />
                            </motion.div>
                            <span>Browsing Website...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Globe className="w-4 h-4" />
                            <span>Browse & Analyze Website</span>
                          </div>
                        )}
                      </Button>

                      {webResults && (
                        <div className="p-3 bg-green-800/20 rounded-lg border border-green-600/30">
                          <div className="text-xs text-green-300 mb-1">Web Analysis Results:</div>
                          <div className="text-sm text-green-100">
                            <div className="font-medium">{webResults.data?.title}</div>
                            <div className="text-xs mt-1">{webResults.data?.summary}</div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setWebUrl("https://news.ycombinator.com")}
                        className="text-xs text-orange-400 hover:text-orange-300"
                      >
                        📰 Hacker News
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setWebUrl("https://techcrunch.com")}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        🚀 TechCrunch
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setWebUrl("https://kzmr0ntnmauuv4h3c4l4.lite.vusercontent.net")}
                        className="text-xs text-cyan-400 hover:text-cyan-300"
                      >
                        🔗 Analyze User Content
                      </Button>
                    </div>
                  </TabsContent>

                  {/* File Processor Tab */}
                  <TabsContent value="file-processor" className="space-y-4">
                    <div className="p-3 bg-gradient-to-r from-orange-800/30 to-red-800/30 rounded-lg border border-orange-400/30">
                      <div className="text-sm text-orange-300 font-medium mb-2">📄 File Processing Engine</div>
                      <div className="text-xs text-orange-400">Upload and analyze text files, documents, and data</div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-cyan-300 mb-2">Upload File:</div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                          accept=".txt,.md,.csv,.json,.log"
                          className="hidden"
                        />
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          variant="outline"
                          className="w-full border-dashed border-2 border-slate-600 hover:border-orange-400"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {selectedFile ? selectedFile.name : "Choose File to Analyze"}
                        </Button>
                      </div>

                      {selectedFile && (
                        <div className="p-2 bg-orange-800/20 rounded-lg border border-orange-600/30">
                          <div className="text-xs text-orange-300">Selected: {selectedFile.name}</div>
                          <div className="text-xs text-orange-400">
                            Size: {(selectedFile.size / 1024).toFixed(1)} KB
                          </div>
                        </div>
                      )}

                      <Button
                        onClick={processFile}
                        disabled={!selectedFile || isFileProcessing}
                        className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                      >
                        {isFileProcessing ? (
                          <div className="flex items-center space-x-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                            >
                              <FileText className="w-4 h-4" />
                            </motion.div>
                            <span>Processing File...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4" />
                            <span>Analyze File</span>
                          </div>
                        )}
                      </Button>

                      {fileResults && (
                        <div className="p-3 bg-orange-800/20 rounded-lg border border-orange-600/30">
                          <div className="text-xs text-orange-300 mb-1">File Analysis Results:</div>
                          <div className="text-sm text-orange-100">
                            <div className="font-medium">{fileResults.filename}</div>
                            <div className="text-xs mt-1">
                              {fileResults.stats?.words} words • {fileResults.analysis?.sentiment} sentiment
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-slate-400">
                      Supported: .txt, .md, .csv, .json, .log files (max 10MB)
                    </div>
                  </TabsContent>

                  {/* Personality & Voice Tab */}
                  <TabsContent value="personality" className="space-y-4">
                    <div className="p-3 bg-gradient-to-r from-purple-800/30 to-pink-800/30 rounded-lg border border-purple-400/30">
                      <div className="text-sm text-purple-300 font-medium mb-2">🎭 Personality & Voice Engine</div>
                      <div className="text-xs text-purple-400">Choose AI personalities and voice characteristics</div>
                    </div>

                    {/* Personality Selection */}
                    <div className="space-y-2">
                      <div className="text-sm text-cyan-300">AI Personality:</div>
                      <div className="grid grid-cols-1 gap-2">
                        {PERSONALITY_PROFILES.map((personality) => (
                          <Button
                            key={personality.id}
                            variant={selectedPersonality.id === personality.id ? "default" : "outline"}
                            onClick={() => setSelectedPersonality(personality)}
                            className="justify-start text-left p-3 h-auto"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-lg">{personality.icon}</span>
                              <div className="flex-1">
                                <div className="font-medium text-sm">{personality.name}</div>
                                <div className="text-xs opacity-70">{personality.description}</div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {personality.traits.slice(0, 3).map((trait) => (
                                    <Badge key={trait} variant="secondary" className="text-xs">
                                      {trait}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Voice Settings */}
                    <div className="space-y-3">
                      <div className="text-sm text-cyan-300">Voice Settings:</div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-purple-300">Speed</span>
                          <span className="text-xs text-purple-400">{customSettings.rate.toFixed(1)}x</span>
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
                          <span className="text-sm text-purple-300">Pitch</span>
                          <span className="text-xs text-purple-400">{customSettings.pitch.toFixed(2)}</span>
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

                    <Button
                      onClick={() => speakResponse(`Hello! I'm ${selectedPersonality.name}. This is how I sound!`)}
                      disabled={!isVoiceEnabled || isTestingVoice}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      {isTestingVoice ? "Testing Voice..." : `Test ${selectedPersonality.name} Voice`}
                    </Button>
                  </TabsContent>

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

                    <div className="space-y-2">
                      <div className="text-xs text-purple-300 font-medium">Try saying:</div>
                      <div className="grid grid-cols-1 gap-1 text-xs text-slate-400">
                        <div>• "Browse website [URL]"</div>
                        <div>• "Read file" (then upload)</div>
                        <div>• "Mimic Elon Musk"</div>
                        <div>• "Go to dashboard"</div>
                        <div>• "Check balance"</div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Footer Stats */}
                <div className="mt-4 pt-3 border-t border-slate-600/30">
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div>
                      <div className="text-green-400 font-bold">{conversationCount}</div>
                      <div className="text-green-300">Messages</div>
                    </div>
                    <div>
                      <div className="text-blue-400 font-bold">{selectedPersonality.icon}</div>
                      <div className="text-blue-300">Personality</div>
                    </div>
                    <div>
                      <div className="text-purple-400 font-bold">🌐</div>
                      <div className="text-purple-300">Web Access</div>
                    </div>
                    <div>
                      <div className="text-amber-400 font-bold">📄</div>
                      <div className="text-amber-300">File Reader</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".txt,.md,.csv,.json,.log"
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
      />
    </div>
  )
}
