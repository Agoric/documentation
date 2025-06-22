"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useJonlorenzoTheme } from "@/contexts/jonlorenzo-theme-context"
import {
  Sparkles,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Target,
  Navigation,
  MessageCircle,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
} from "lucide-react"
import type { SpeechRecognition } from "web-speech-api"

interface GuidanceStep {
  id: string
  title: string
  description: string
  action: string
  completed: boolean
  required: boolean
  category: "navigation" | "action" | "information" | "completion"
}

interface GuidanceTask {
  id: string
  title: string
  description: string
  steps: GuidanceStep[]
  progress: number
  priority: "low" | "medium" | "high" | "critical"
  estimatedTime: string
}

interface VoiceSettings {
  enabled: boolean
  rate: number
  pitch: number
  volume: number
  voice: SpeechSynthesisVoice | null
}

const SAMPLE_TASKS: GuidanceTask[] = [
  {
    id: "setup-profile",
    title: "Complete Your Profile",
    description: "Set up your global citizenship profile for maximum benefits",
    progress: 60,
    priority: "high",
    estimatedTime: "5 minutes",
    steps: [
      {
        id: "basic-info",
        title: "Basic Information",
        description: "Enter your personal details",
        action: "Go to Profile Settings",
        completed: true,
        required: true,
        category: "navigation",
      },
      {
        id: "citizenship-docs",
        title: "Upload Documents",
        description: "Upload required citizenship documents",
        action: "Upload Documents",
        completed: true,
        required: true,
        category: "action",
      },
      {
        id: "verify-identity",
        title: "Identity Verification",
        description: "Complete identity verification process",
        action: "Start Verification",
        completed: false,
        required: true,
        category: "action",
      },
      {
        id: "setup-banking",
        title: "Banking Integration",
        description: "Connect your banking for QGI investments",
        action: "Connect Bank Account",
        completed: false,
        required: false,
        category: "action",
      },
    ],
  },
  {
    id: "qgi-investment",
    title: "QGI Investment Setup",
    description: "Configure your Qualified Global Investment portfolio",
    progress: 25,
    priority: "critical",
    estimatedTime: "10 minutes",
    steps: [
      {
        id: "investment-amount",
        title: "Set Investment Amount",
        description: "Choose your QGI investment level",
        action: "Select Investment Tier",
        completed: true,
        required: true,
        category: "action",
      },
      {
        id: "risk-assessment",
        title: "Risk Assessment",
        description: "Complete investment risk profile",
        action: "Take Assessment",
        completed: false,
        required: true,
        category: "action",
      },
      {
        id: "legal-review",
        title: "Legal Documentation",
        description: "Review and sign investment agreements",
        action: "Review Documents",
        completed: false,
        required: true,
        category: "information",
      },
      {
        id: "fund-transfer",
        title: "Fund Transfer",
        description: "Transfer funds to QGI account",
        action: "Initiate Transfer",
        completed: false,
        required: true,
        category: "action",
      },
    ],
  },
]

const GENIUS_RESPONSES = {
  greetings: [
    "Hello there, brilliant mind! I'm your Genius Guide, and I'm absolutely thrilled to help you navigate your journey to success!",
    "Welcome, champion! Your personal AI Genius is here and ready to guide you through every step of your transformation!",
    "Greetings, future leader! I'm your intelligent companion, designed to make your experience seamless and extraordinary!",
  ],

  taskIntroductions: [
    "I've identified some important tasks that will accelerate your progress. Shall we tackle them together?",
    "There are some exciting opportunities waiting for you. Let me guide you through them step by step!",
    "I see several ways we can optimize your journey. Ready to unlock your full potential?",
  ],

  stepCompletions: [
    "Excellent work! You're making fantastic progress. Let's keep this momentum going!",
    "Outstanding! You're demonstrating true leadership qualities. Ready for the next challenge?",
    "Brilliant execution! Your dedication is truly impressive. Shall we continue?",
  ],

  encouragements: [
    "You're doing amazingly well! Every step brings you closer to your goals.",
    "Your progress is remarkable! I'm here to support you every step of the way.",
    "Fantastic job! Your commitment to excellence is truly inspiring.",
  ],

  voiceCommands: {
    "start guidance": "I'll begin guiding you through your most important tasks right away!",
    "next step": "Let me show you the next step in your journey to success!",
    "complete step": "Wonderful! I'll mark that step as completed and move us forward.",
    "skip task": "No problem! I'll help you focus on what matters most to you right now.",
    "help me": "I'm here to help! Let me provide you with personalized guidance.",
    "what's next": "Great question! Here's what I recommend we focus on next.",
  },
}

export function GeniusGuideOrb() {
  const { geniusActive, theme } = useJonlorenzoTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [currentTask, setCurrentTask] = useState<GuidanceTask | null>(null)
  const [currentStep, setCurrentStep] = useState<GuidanceStep | null>(null)
  const [isGuiding, setIsGuiding] = useState(false)
  const [isCommunicating, setIsCommunicating] = useState(false)
  const [guidanceMessage, setGuidanceMessage] = useState("")
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [isFollowing, setIsFollowing] = useState(false)
  const [tasks, setTasks] = useState<GuidanceTask[]>(SAMPLE_TASKS)

  // Voice and conversation state
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    enabled: true,
    rate: 1.1,
    pitch: 1.0,
    volume: 0.8,
    voice: null,
  })
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [lastCommand, setLastCommand] = useState("")
  const [conversationHistory, setConversationHistory] = useState<string[]>([])
  const [isConversationMode, setIsConversationMode] = useState(false)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])

  const orbRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  // Initialize speech synthesis and recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis

      const loadVoices = () => {
        const voices = synthRef.current?.getVoices() || []
        setAvailableVoices(voices)

        // Prefer female voices for the Genius
        const preferredVoice =
          voices.find((voice) => voice.name.includes("Google UK English Female")) ||
          voices.find((voice) => voice.name.includes("Microsoft Zira")) ||
          voices.find((voice) => voice.name.includes("Samantha")) ||
          voices.find((voice) => voice.lang.startsWith("en") && voice.name.toLowerCase().includes("female")) ||
          voices.find((voice) => voice.lang.startsWith("en")) ||
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
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = "en-US"

        recognitionRef.current.onresult = (event) => {
          let finalTranscript = ""

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i]
            if (result.isFinal) {
              finalTranscript += result[0].transcript
            }
          }

          if (finalTranscript) {
            setLastCommand(finalTranscript.toLowerCase().trim())
            processVoiceCommand(finalTranscript.toLowerCase().trim())
          }
        }

        recognitionRef.current.onstart = () => {
          setIsListening(true)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error:", event.error)
          setIsListening(false)
        }
      }
    }
  }, [])

  // Show/hide based on genius activation
  useEffect(() => {
    if (geniusActive) {
      setIsVisible(true)
      // Welcome message
      setTimeout(() => {
        const greeting = GENIUS_RESPONSES.greetings[Math.floor(Math.random() * GENIUS_RESPONSES.greetings.length)]
        speak(greeting)
        communicate(greeting)
      }, 1000)

      // Auto-start with highest priority incomplete task
      const priorityTask = tasks
        .filter((task) => task.progress < 100)
        .sort((a, b) => {
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        })[0]

      if (priorityTask) {
        setTimeout(() => {
          const taskIntro =
            GENIUS_RESPONSES.taskIntroductions[Math.floor(Math.random() * GENIUS_RESPONSES.taskIntroductions.length)]
          speak(taskIntro)
          setTimeout(() => startGuidance(priorityTask), 3000)
        }, 4000)
      }
    } else {
      setIsVisible(false)
      setIsGuiding(false)
      setCurrentTask(null)
      setCurrentStep(null)
      stopSpeaking()
    }
  }, [geniusActive])

  // Mouse following effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }

      if (isFollowing && !isGuiding) {
        setTimeout(() => {
          setPosition((prev) => ({
            x: prev.x + (mousePosition.current.x - prev.x) * 0.1,
            y: prev.y + (mousePosition.current.y - prev.y) * 0.1,
          }))
        }, 100)
      }
    }

    if (isVisible) {
      window.addEventListener("mousemove", handleMouseMove)
      setIsFollowing(true)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isVisible, isFollowing, isGuiding])

  const speak = useCallback(
    (text: string) => {
      if (!voiceSettings.enabled || !synthRef.current || !voiceSettings.voice) return

      // Stop any current speech
      synthRef.current.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.voice = voiceSettings.voice
      utterance.rate = voiceSettings.rate
      utterance.pitch = voiceSettings.pitch
      utterance.volume = voiceSettings.volume

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      synthRef.current.speak(utterance)
    },
    [voiceSettings],
  )

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }, [])

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start()
    }
  }, [isListening])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }, [isListening])

  const processVoiceCommand = useCallback(
    (command: string) => {
      setConversationHistory((prev) => [...prev.slice(-4), command])

      // Check for exact matches first
      const exactMatch = Object.entries(GENIUS_RESPONSES.voiceCommands).find(([key]) =>
        command.includes(key.toLowerCase()),
      )

      if (exactMatch) {
        const [, response] = exactMatch
        speak(response)
        communicate(response)

        // Execute command actions
        if (command.includes("start guidance")) {
          const nextTask = tasks.find((task) => task.progress < 100)
          if (nextTask) startGuidance(nextTask)
        } else if (command.includes("next step")) {
          if (currentStep) {
            completeStep(currentStep.id)
          }
        } else if (command.includes("complete step")) {
          if (currentStep) {
            completeStep(currentStep.id)
          }
        }
      } else {
        // Contextual responses based on current state
        let response = ""

        if (command.includes("hello") || command.includes("hi")) {
          response = "Hello! I'm delighted to assist you. How can I help you achieve your goals today?"
        } else if (command.includes("help")) {
          response =
            "I'm here to provide personalized guidance! I can help you complete tasks, answer questions, or simply have a conversation."
        } else if (command.includes("status") || command.includes("progress")) {
          const incompleteTasks = tasks.filter((task) => task.progress < 100)
          response = `You have ${incompleteTasks.length} tasks remaining. Your overall progress is excellent! Shall we continue?`
        } else {
          response =
            "That's interesting! I'm always learning. Could you tell me more about what you'd like to accomplish?"
        }

        speak(response)
        communicate(response)
      }
    },
    [tasks, currentStep],
  )

  const startGuidance = (task: GuidanceTask) => {
    setCurrentTask(task)
    setIsGuiding(true)
    setIsFollowing(false)

    const nextStep = task.steps.find((step) => !step.completed)
    if (nextStep) {
      setCurrentStep(nextStep)
      const message = `Let me guide you through: ${task.title}. First, we need to ${nextStep.title.toLowerCase()}.`
      communicate(message)
      speak(message)
    }
  }

  const completeStep = (stepId: string) => {
    if (!currentTask) return

    setTasks((prev) =>
      prev.map((task) =>
        task.id === currentTask.id
          ? {
              ...task,
              steps: task.steps.map((step) => (step.id === stepId ? { ...step, completed: true } : step)),
              progress: Math.round(
                (task.steps.filter((s) => s.completed || s.id === stepId).length / task.steps.length) * 100,
              ),
            }
          : task,
      ),
    )

    // Speak completion message
    const completionMessage =
      GENIUS_RESPONSES.stepCompletions[Math.floor(Math.random() * GENIUS_RESPONSES.stepCompletions.length)]
    speak(completionMessage)

    // Move to next step
    const updatedTask = tasks.find((t) => t.id === currentTask.id)
    if (updatedTask) {
      const nextStep = updatedTask.steps.find((step) => !step.completed && step.id !== stepId)
      if (nextStep) {
        setCurrentStep(nextStep)
        const nextMessage = `Now let's ${nextStep.title.toLowerCase()}.`
        communicate(nextMessage)
        setTimeout(() => speak(nextMessage), 2000)
      } else {
        const taskCompleteMessage = `Excellent! You've completed "${currentTask.title}". Looking for your next priority...`
        communicate(taskCompleteMessage)
        speak(taskCompleteMessage)

        setTimeout(() => {
          const nextTask = tasks.find((task) => task.progress < 100 && task.id !== currentTask.id)
          if (nextTask) {
            startGuidance(nextTask)
          } else {
            setIsGuiding(false)
            setIsFollowing(true)
            const allCompleteMessage = "Congratulations! All tasks completed! I'll continue to assist you as needed."
            communicate(allCompleteMessage)
            speak(allCompleteMessage)
          }
        }, 3000)
      }
    }
  }

  const communicate = (message: string) => {
    setIsCommunicating(true)
    setGuidanceMessage(message)

    setTimeout(() => {
      setIsCommunicating(false)
      setGuidanceMessage("")
    }, 6000)
  }

  const toggleConversationMode = () => {
    setIsConversationMode(!isConversationMode)
    if (!isConversationMode) {
      speak("Conversation mode activated! I'm listening and ready to chat.")
      startListening()
    } else {
      speak("Conversation mode deactivated.")
      stopListening()
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-400"
      case "high":
        return "text-orange-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-green-400"
      default:
        return "text-blue-400"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "navigation":
        return Navigation
      case "action":
        return Target
      case "information":
        return Lightbulb
      case "completion":
        return CheckCircle
      default:
        return Sparkles
    }
  }

  if (!isVisible) return null

  return (
    <>
      {/* Main Genius Orb */}
      <motion.div
        ref={orbRef}
        className="fixed z-40 pointer-events-none"
        style={{
          left: position.x - 25,
          top: position.y - 25,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
      >
        <motion.div
          className="w-12 h-12 rounded-full bg-gradient-to-br from-genius-400 to-genius-600 flex items-center justify-center cursor-pointer pointer-events-auto"
          animate={
            isCommunicating || isSpeaking
              ? {
                  scale: [1, 1.3, 1.1, 1.3, 1],
                  boxShadow: [
                    "0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(99, 102, 241, 0.3)",
                    "0 0 50px rgba(99, 102, 241, 0.8), 0 0 100px rgba(99, 102, 241, 0.5)",
                    "0 0 40px rgba(99, 102, 241, 0.6), 0 0 80px rgba(99, 102, 241, 0.4)",
                    "0 0 50px rgba(99, 102, 241, 0.8), 0 0 100px rgba(99, 102, 241, 0.5)",
                    "0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(99, 102, 241, 0.3)",
                  ],
                }
              : {
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(99, 102, 241, 0.3)",
                    "0 0 40px rgba(99, 102, 241, 0.6), 0 0 80px rgba(99, 102, 241, 0.4)",
                    "0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(99, 102, 241, 0.3)",
                  ],
                }
          }
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: isCommunicating || isSpeaking ? 0.8 : 3,
          }}
          onClick={() => {
            if (!isGuiding && tasks.some((task) => task.progress < 100)) {
              const nextTask = tasks.find((task) => task.progress < 100)
              if (nextTask) startGuidance(nextTask)
            }
          }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>

        {/* Voice Status Indicators */}
        <div className="absolute -top-1 -right-1 flex flex-col space-y-1">
          {isSpeaking && (
            <motion.div
              className="w-3 h-3 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6 }}
            />
          )}
          {isListening && (
            <motion.div
              className="w-3 h-3 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
            />
          )}
          {isGuiding && (
            <motion.div
              className="w-3 h-3 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
            />
          )}
        </div>
      </motion.div>

      {/* Voice Controls */}
      <motion.div
        className="fixed top-20 right-6 z-40"
        initial={{ scale: 0, opacity: 0, x: 50 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        exit={{ scale: 0, opacity: 0, x: 50 }}
      >
        <Card className="bg-gradient-to-br from-genius-900/95 to-genius-800/95 backdrop-blur-xl border-genius-400/30 w-64">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-genius-300" />
                <span className="text-genius-100 font-medium text-sm">Genius Voice</span>
              </div>
              <Badge className="bg-genius-500/20 text-genius-300 border-genius-400/30 text-xs">
                {isSpeaking ? "SPEAKING" : isListening ? "LISTENING" : "READY"}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <Button
                size="sm"
                onClick={toggleConversationMode}
                className={`${
                  isConversationMode ? "bg-green-600 hover:bg-green-700" : "bg-genius-600 hover:bg-genius-700"
                }`}
              >
                {isConversationMode ? <MicOff className="w-3 h-3 mr-1" /> : <Mic className="w-3 h-3 mr-1" />}
                {isConversationMode ? "Stop Chat" : "Start Chat"}
              </Button>

              <Button
                size="sm"
                onClick={() => setVoiceSettings((prev) => ({ ...prev, enabled: !prev.enabled }))}
                variant={voiceSettings.enabled ? "default" : "outline"}
              >
                {voiceSettings.enabled ? <Volume2 className="w-3 h-3 mr-1" /> : <VolumeX className="w-3 h-3 mr-1" />}
                {voiceSettings.enabled ? "Mute" : "Unmute"}
              </Button>
            </div>

            {lastCommand && (
              <div className="p-2 bg-genius-800/30 rounded border border-genius-600/30">
                <div className="text-xs text-genius-300 mb-1">Last Command:</div>
                <div className="text-xs text-genius-100">"{lastCommand}"</div>
              </div>
            )}

            <div className="mt-3 text-xs text-genius-400">
              Try saying: "Hello", "Help me", "Next step", "What's my status?"
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Communication Bubble */}
      <AnimatePresence>
        {isCommunicating && guidanceMessage && (
          <motion.div
            className="fixed z-50 pointer-events-none"
            style={{
              left: position.x + 40,
              top: position.y - 60,
            }}
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
          >
            <Card className="bg-gradient-to-br from-genius-900/95 to-genius-800/95 backdrop-blur-xl border-genius-400/30 max-w-sm">
              <CardContent className="p-3">
                <div className="flex items-start space-x-2">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  >
                    <MessageCircle className="w-4 h-4 text-genius-300 mt-0.5" />
                  </motion.div>
                  <div className="text-sm text-genius-100 leading-relaxed">{guidanceMessage}</div>
                </div>
                {isSpeaking && (
                  <div className="flex items-center space-x-1 mt-2">
                    <Volume2 className="w-3 h-3 text-genius-400" />
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-1 bg-genius-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 0.6,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-genius-800/95"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guidance Panel */}
      <AnimatePresence>
        {isGuiding && currentTask && (
          <motion.div
            className="fixed bottom-6 left-6 z-50"
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 50 }}
          >
            <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30 w-96">
              <CardContent className="p-4">
                {/* Task Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5 text-genius-500" />
                    </motion.div>
                    <div>
                      <h3 className="text-illumination-300 font-bold text-sm">{currentTask.title}</h3>
                      <p className="text-illumination-400/70 text-xs">{currentTask.description}</p>
                    </div>
                  </div>
                  <Badge className={`${getPriorityColor(currentTask.priority)} bg-opacity-20 border-opacity-30`}>
                    {currentTask.priority.toUpperCase()}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-illumination-300">Progress</span>
                    <span className="text-illumination-400">{currentTask.progress}%</span>
                  </div>
                  <div className="w-full bg-royal-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-genius-500 to-genius-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${currentTask.progress}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>

                {/* Current Step */}
                {currentStep && (
                  <div className="mb-4 p-3 bg-gradient-to-r from-genius-800/20 to-genius-700/20 rounded-lg border border-genius-400/30">
                    <div className="flex items-start space-x-3">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                      >
                        {(() => {
                          const IconComponent = getCategoryIcon(currentStep.category)
                          return <IconComponent className="w-4 h-4 text-genius-400 mt-0.5" />
                        })()}
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="text-genius-300 font-medium text-sm">{currentStep.title}</h4>
                        <p className="text-genius-400/70 text-xs mb-2">{currentStep.description}</p>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => completeStep(currentStep.id)}
                            className="bg-gradient-to-r from-genius-600 to-genius-700 hover:from-genius-700 hover:to-genius-800"
                          >
                            <ArrowRight className="w-3 h-3 mr-1" />
                            {currentStep.action}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const message = `Let me explain: ${currentStep.description}`
                              speak(message)
                              communicate(message)
                            }}
                          >
                            <Volume2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Steps Overview */}
                <div className="space-y-2">
                  <div className="text-xs text-illumination-300 font-medium">Steps:</div>
                  {currentTask.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`flex items-center space-x-2 text-xs p-2 rounded ${
                        step.completed
                          ? "bg-green-800/20 border border-green-400/30"
                          : step.id === currentStep?.id
                            ? "bg-genius-800/20 border border-genius-400/30"
                            : "bg-royal-200/20 border border-royal-400/30"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {step.completed ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : step.id === currentStep?.id ? (
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "linear" }}
                          >
                            <Zap className="w-3 h-3 text-genius-400" />
                          </motion.div>
                        ) : (
                          <div className="w-3 h-3 rounded-full border border-royal-400" />
                        )}
                      </div>
                      <span
                        className={`flex-1 ${
                          step.completed
                            ? "text-green-300"
                            : step.id === currentStep?.id
                              ? "text-genius-300"
                              : "text-royal-300"
                        }`}
                      >
                        {step.title}
                      </span>
                      {step.required && <AlertCircle className="w-3 h-3 text-orange-400" />}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-4 pt-3 border-t border-illumination-400/20 flex items-center justify-between text-xs">
                  <span className="text-illumination-400">Est. {currentTask.estimatedTime}</span>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const message = `This task involves: ${currentTask.description}. Each step is designed to help you succeed!`
                        speak(message)
                        communicate(message)
                      }}
                      className="text-illumination-400 hover:text-illumination-300"
                    >
                      <Volume2 className="w-3 h-3 mr-1" />
                      Explain
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setIsGuiding(false)
                        setIsFollowing(true)
                        setCurrentTask(null)
                        setCurrentStep(null)
                        speak("Guidance dismissed. I'm here whenever you need me!")
                      }}
                      className="text-illumination-400 hover:text-illumination-300"
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task Overview (when not actively guiding) */}
      <AnimatePresence>
        {isVisible && !isGuiding && tasks.some((task) => task.progress < 100) && (
          <motion.div
            className="fixed top-20 left-6 z-40"
            initial={{ scale: 0, opacity: 0, x: -50 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0, opacity: 0, x: -50 }}
          >
            <Card className="bg-gradient-to-br from-royal-50/90 to-royal-100/90 backdrop-blur-xl border-illumination-400/30 w-80">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles className="w-4 h-4 text-genius-500" />
                  <span className="text-illumination-300 font-medium text-sm">Available Guidance</span>
                </div>

                <div className="space-y-2">
                  {tasks
                    .filter((task) => task.progress < 100)
                    .slice(0, 3)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="p-2 bg-royal-200/20 rounded border border-royal-400/30 cursor-pointer hover:bg-royal-200/30 transition-colors"
                        onClick={() => startGuidance(task)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-illumination-300 text-xs font-medium">{task.title}</div>
                            <div className="text-illumination-400/70 text-xs">{task.progress}% complete</div>
                          </div>
                          <Badge
                            className={`${getPriorityColor(task.priority)} bg-opacity-20 border-opacity-30 text-xs`}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="flex space-x-2 mt-3">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-genius-600 to-genius-700 hover:from-genius-700 hover:to-genius-800"
                    onClick={() => {
                      const nextTask = tasks.find((task) => task.progress < 100)
                      if (nextTask) startGuidance(nextTask)
                    }}
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    Start Guidance
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const message =
                        "I'm your intelligent guide, ready to help you succeed! Just say 'hello' to start chatting."
                      speak(message)
                      communicate(message)
                    }}
                  >
                    <Volume2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
