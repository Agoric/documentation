"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { useJonlorenzoTheme } from "@/contexts/jonlorenzo-theme-context"
import {
  Sparkles,
  Mic,
  MicOff,
  Brain,
  MessageCircle,
  Settings,
  Volume2,
  VolumeX,
  Youtube,
  Upload,
  Palette,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  enhancedGeniusVoiceSystem,
  type VoiceProfile,
  type CharacterProfile,
  type EmotionalContext,
} from "@/lib/enhanced-genius-voice-system"
import SpeechRecognition from "speech-recognition"

// Predefined character profiles
const CHARACTER_PROFILES: CharacterProfile[] = [
  {
    id: "leonardo_wolf",
    name: "Leonardo (Wolf of Wall Street)",
    personality: "Charismatic, confident, motivational, success-driven",
    voiceStyle: "Energetic, persuasive, inspiring",
    responsePatterns: ["Let's make some money!", "You've got this, champion!", "Time to dominate!"],
    empathyLevel: 8,
    charismaLevel: 10,
    customAudioClips: [],
    themeColors: {
      primary: "#FFD700",
      secondary: "#FF6B35",
      accent: "#FF1744",
      background: "#1A1A2E",
      text: "#FFFFFF",
      glow: "#FFD700",
    },
    conversationStyle: {
      formalityLevel: 7,
      empathyResponse: [
        "Hey, I can hear something's bothering you.",
        "Listen, we all go through tough times.",
        "I'm here for you, no matter what.",
      ],
      motivationalPhrases: [
        "You're destined for greatness!",
        "Every setback is a setup for a comeback!",
        "Champions are made in moments like this!",
      ],
      concernExpressions: [
        "I'm genuinely concerned about you right now.",
        "Something doesn't sound right, and I care about your wellbeing.",
        "I can sense you're struggling, and that matters to me.",
      ],
      celebrationPhrases: [
        "That's what I'm talking about!",
        "You're absolutely crushing it!",
        "This is your moment to shine!",
      ],
      distractionTechniques: [
        {
          id: "success_visualization",
          name: "Success Visualization",
          type: "self_development",
          description: "Visualize your future success and achievements",
          duration: "10 minutes",
          instructions: [
            "Close your eyes and take deep breaths",
            "Picture yourself achieving your biggest goal",
            "Feel the emotions of that success",
            "Anchor that feeling with a physical gesture",
          ],
          effectiveness: 0.85,
        },
        {
          id: "power_walk",
          name: "Power Walk",
          type: "physical_activity",
          description: "Take a confident walk to reset your energy",
          duration: "15 minutes",
          instructions: [
            "Stand tall with shoulders back",
            "Walk with purpose and confidence",
            "Focus on your breathing",
            "Think about your next big win",
          ],
          effectiveness: 0.8,
        },
      ],
    },
  },
  {
    id: "wise_mentor",
    name: "Wise Mentor",
    personality: "Calm, wise, supportive, philosophical",
    voiceStyle: "Gentle, thoughtful, reassuring",
    responsePatterns: ["Let's explore this together.", "Wisdom comes from experience.", "You have the answers within."],
    empathyLevel: 10,
    charismaLevel: 8,
    customAudioClips: [],
    themeColors: {
      primary: "#4A90E2",
      secondary: "#7B68EE",
      accent: "#9370DB",
      background: "#2C3E50",
      text: "#ECF0F1",
      glow: "#4A90E2",
    },
    conversationStyle: {
      formalityLevel: 8,
      empathyResponse: [
        "I sense you're carrying a heavy burden.",
        "Your feelings are valid and important.",
        "Let's work through this together, step by step.",
      ],
      motivationalPhrases: [
        "Growth happens outside your comfort zone.",
        "Every challenge is an opportunity to learn.",
        "You're stronger than you realize.",
      ],
      concernExpressions: [
        "I'm deeply concerned about your wellbeing.",
        "Your mental health is my priority right now.",
        "Let's focus on getting you the support you need.",
      ],
      celebrationPhrases: [
        "I'm so proud of your progress!",
        "This achievement reflects your dedication.",
        "You've earned this moment of joy.",
      ],
      distractionTechniques: [
        {
          id: "mindful_meditation",
          name: "Mindful Meditation",
          type: "relaxation",
          description: "Center yourself with guided meditation",
          duration: "20 minutes",
          instructions: [
            "Find a quiet, comfortable space",
            "Focus on your breath",
            "Observe thoughts without judgment",
            "Return attention to breathing when distracted",
          ],
          effectiveness: 0.9,
        },
        {
          id: "journaling",
          name: "Reflective Journaling",
          type: "self_development",
          description: "Write down your thoughts and feelings",
          duration: "15 minutes",
          instructions: [
            "Get a pen and paper or open a document",
            "Write continuously without editing",
            "Express whatever comes to mind",
            "End with three things you're grateful for",
          ],
          effectiveness: 0.85,
        },
      ],
    },
  },
]

export function EnhancedGeniusGuideOrb() {
  const { geniusActive, theme } = useJonlorenzoTheme()
  const { toast } = useToast()

  // Core state
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentView, setCurrentView] = useState<"main" | "settings" | "character" | "youtube">("main")

  // Voice and conversation state
  const [voiceProfile, setVoiceProfile] = useState<VoiceProfile | null>(null)
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterProfile>(CHARACTER_PROFILES[0])
  const [currentStressLevel, setCurrentStressLevel] = useState(0)
  const [emotionalContext, setEmotionalContext] = useState<EmotionalContext | null>(null)
  const [conversationInput, setConversationInput] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isResponding, setIsResponding] = useState(false)

  // Customization state
  const [youtubeVideoId, setYoutubeVideoId] = useState("")
  const [customTheme, setCustomTheme] = useState(selectedCharacter.themeColors)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [empathyLevel, setEmpathyLevel] = useState([8])
  const [charismaLevel, setCharismaLevel] = useState([9])

  // Greeting state
  const [lastGreeting, setLastGreeting] = useState<Date | null>(null)
  const [greetingScheduled, setGreetingScheduled] = useState(false)

  // Refs
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // Initialize voice profile and check for greetings
  useEffect(() => {
    if (geniusActive) {
      setIsVisible(true)
      initializeVoiceProfile()
      checkForGreetings()
    } else {
      setIsVisible(false)
      stopVoiceAnalysis()
    }
  }, [geniusActive])

  // Initialize speech recognition
  useEffect(() => {
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join("")

        if (event.results[event.results.length - 1].isFinal) {
          handleVoiceInput(transcript)
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }
    }
  }, [])

  const initializeVoiceProfile = async () => {
    try {
      const userId = "user_123" // In real app, get from auth context
      const profile = await enhancedGeniusVoiceSystem.createVoiceProfile(userId, selectedCharacter)
      setVoiceProfile(profile)
    } catch (error) {
      console.error("Failed to initialize voice profile:", error)
    }
  }

  const checkForGreetings = async () => {
    if (!voiceProfile) return

    const greetingNeeds = enhancedGeniusVoiceSystem.shouldProvideGreeting(voiceProfile.userId)

    if (greetingNeeds.daily || greetingNeeds.audible) {
      setTimeout(async () => {
        const greeting = await enhancedGeniusVoiceSystem.generatePersonalizedGreeting(
          voiceProfile.userId,
          greetingNeeds.audible,
        )

        setAiResponse(greeting)

        if (greetingNeeds.audible && audioEnabled) {
          speakResponse(greeting)
        }

        toast({
          title: greetingNeeds.audible ? "Daily Audible Greeting" : "Daily Greeting",
          description: "Your Genius Guide has a personalized message for you!",
        })
      }, 2000)
    }
  }

  const startVoiceAnalysis = async () => {
    if (!voiceProfile) return

    try {
      setIsListening(true)
      setIsAnalyzing(true)

      await enhancedGeniusVoiceSystem.startVoiceAnalysis(voiceProfile.userId)

      if (recognitionRef.current) {
        recognitionRef.current.start()
      }

      // Simulate periodic stress level updates
      const analysisInterval = setInterval(() => {
        const mockStressLevel = Math.random() * 0.3 + currentStressLevel * 0.7 // Gradual change
        setCurrentStressLevel(mockStressLevel)

        const mockEmotionalContext: EmotionalContext = {
          detectedEmotion: mockStressLevel > 0.6 ? "stressed" : mockStressLevel > 0.3 ? "anxious" : "neutral",
          confidence: 0.8,
          stressLevel: mockStressLevel,
          energyLevel: Math.random(),
          needsSupport: mockStressLevel > 0.5,
        }

        setEmotionalContext(mockEmotionalContext)

        // Auto-respond to high stress
        if (mockStressLevel > 0.7 && !isResponding) {
          handleStressDetection(mockEmotionalContext)
        }
      }, 5000)

      // Store interval for cleanup
      setTimeout(() => clearInterval(analysisInterval), 300000) // Stop after 5 minutes
    } catch (error) {
      console.error("Failed to start voice analysis:", error)
      setIsListening(false)
      setIsAnalyzing(false)
    }
  }

  const stopVoiceAnalysis = () => {
    setIsListening(false)
    setIsAnalyzing(false)

    enhancedGeniusVoiceSystem.stopVoiceAnalysis()

    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const handleVoiceInput = async (transcript: string) => {
    if (!transcript.trim() || !voiceProfile || !emotionalContext) return

    setConversationInput(transcript)
    await generateAIResponse(transcript, emotionalContext)
  }

  const handleTextInput = async () => {
    if (!conversationInput.trim() || !voiceProfile) return

    const mockContext: EmotionalContext = {
      detectedEmotion: "neutral",
      confidence: 0.6,
      stressLevel: currentStressLevel,
      energyLevel: 0.5,
      needsSupport: currentStressLevel > 0.5,
    }

    await generateAIResponse(conversationInput, mockContext)
  }

  const generateAIResponse = async (input: string, context: EmotionalContext) => {
    if (!voiceProfile) return

    setIsResponding(true)

    try {
      const response = await enhancedGeniusVoiceSystem.generateEmpathicResponse(voiceProfile.userId, input, context)

      setAiResponse(response)

      if (audioEnabled) {
        speakResponse(response)
      }

      // Clear input
      setConversationInput("")
    } catch (error) {
      console.error("Failed to generate AI response:", error)
      setAiResponse("I'm sorry, I'm having trouble processing that right now. Please try again.")
    } finally {
      setIsResponding(false)
    }
  }

  const handleStressDetection = async (context: EmotionalContext) => {
    if (!voiceProfile) return

    const technique = await enhancedGeniusVoiceSystem.suggestDistractionTechnique(
      voiceProfile.userId,
      context.stressLevel,
    )

    if (technique) {
      const stressResponse = `I can sense you're feeling stressed right now, and I want you to know that I'm here for you. Let's try a technique that might help: ${technique.name}. ${technique.description}. Would you like me to guide you through it?`

      setAiResponse(stressResponse)

      if (audioEnabled) {
        speakResponse(stressResponse)
      }

      toast({
        title: "Stress Detected",
        description: "Your Genius Guide is offering support and distraction techniques.",
        variant: "default",
      })
    }
  }

  const speakResponse = async (text: string) => {
    if (!audioEnabled) return

    try {
      // Use Web Speech API for text-to-speech
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1.1
      utterance.volume = 0.8

      // Try to use a voice that matches the character
      const voices = speechSynthesis.getVoices()
      const preferredVoice = voices.find((voice) => voice.name.includes("Google") || voice.name.includes("Microsoft"))

      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      speechSynthesis.speak(utterance)
    } catch (error) {
      console.error("Text-to-speech failed:", error)
    }
  }

  const handleCharacterChange = (characterId: string) => {
    const character = CHARACTER_PROFILES.find((c) => c.id === characterId)
    if (character) {
      setSelectedCharacter(character)
      setCustomTheme(character.themeColors)
      setEmpathyLevel([character.empathyLevel])
      setCharismaLevel([character.charismaLevel])

      // Update voice profile
      if (voiceProfile) {
        voiceProfile.preferredCharacter = character
      }

      toast({
        title: "Character Updated",
        description: `Switched to ${character.name} personality`,
      })
    }
  }

  const handleYoutubeVideoAdd = () => {
    if (!youtubeVideoId.trim()) return

    // Extract video ID from URL if full URL is provided
    const videoId =
      youtubeVideoId.includes("youtube.com") || youtubeVideoId.includes("youtu.be")
        ? youtubeVideoId.split("v=")[1]?.split("&")[0] || youtubeVideoId.split("/").pop()
        : youtubeVideoId

    if (videoId) {
      setSelectedCharacter((prev) => ({
        ...prev,
        youtubeVideoId: videoId,
      }))

      toast({
        title: "YouTube Video Added",
        description: "Your favorite character video has been integrated!",
      })
    }
  }

  const getStressLevelColor = (level: number) => {
    if (level > 0.7) return "text-red-400"
    if (level > 0.4) return "text-yellow-400"
    return "text-green-400"
  }

  const getStressLevelText = (level: number) => {
    if (level > 0.7) return "High Stress"
    if (level > 0.4) return "Moderate Stress"
    return "Calm"
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-32 right-6 z-50">
      <AnimatePresence>
        {!isExpanded ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative"
          >
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${customTheme.primary}, ${customTheme.secondary})`,
                boxShadow: `0 0 30px ${customTheme.glow}50, 0 0 60px ${customTheme.glow}30`,
              }}
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  `0 0 30px ${customTheme.glow}50, 0 0 60px ${customTheme.glow}30`,
                  `0 0 40px ${customTheme.glow}70, 0 0 80px ${customTheme.glow}50`,
                  `0 0 30px ${customTheme.glow}50, 0 0 60px ${customTheme.glow}30`,
                ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
              }}
              onClick={() => setIsExpanded(true)}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>

            {/* Status indicators */}
            <div className="absolute -top-2 -right-2 flex space-x-1">
              {isListening && (
                <motion.div
                  className="w-4 h-4 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                />
              )}
              {emotionalContext?.needsSupport && (
                <motion.div
                  className="w-4 h-4 bg-yellow-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                />
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, x: 50 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0.8, opacity: 0, x: 50 }}
          >
            <Card
              className="w-[480px] backdrop-blur-xl border-2"
              style={{
                background: `linear-gradient(135deg, ${customTheme.background}95, ${customTheme.primary}10)`,
                borderColor: `${customTheme.primary}50`,
              }}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "linear" }}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${customTheme.primary}, ${customTheme.secondary})`,
                      }}
                    >
                      <Brain className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: customTheme.text }}>
                        Enhanced Genius Guide
                      </h3>
                      <p className="text-sm opacity-70" style={{ color: customTheme.text }}>
                        {selectedCharacter.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setCurrentView(currentView === "settings" ? "main" : "settings")}
                      style={{ color: customTheme.text }}
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsExpanded(false)}
                      style={{ color: customTheme.text }}
                    >
                      ×
                    </Button>
                  </div>
                </div>

                {/* Main View */}
                {currentView === "main" && (
                  <>
                    {/* Status Display */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 rounded-lg" style={{ background: `${customTheme.primary}20` }}>
                        <div className={`text-lg font-bold ${getStressLevelColor(currentStressLevel)}`}>
                          {Math.round(currentStressLevel * 100)}%
                        </div>
                        <div className="text-xs" style={{ color: customTheme.text }}>
                          {getStressLevelText(currentStressLevel)}
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-lg" style={{ background: `${customTheme.secondary}20` }}>
                        <div className="text-lg font-bold" style={{ color: customTheme.accent }}>
                          {emotionalContext?.detectedEmotion || "Neutral"}
                        </div>
                        <div className="text-xs" style={{ color: customTheme.text }}>
                          Emotion
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-lg" style={{ background: `${customTheme.accent}20` }}>
                        <div className="text-lg font-bold" style={{ color: customTheme.primary }}>
                          {isListening ? "Active" : "Idle"}
                        </div>
                        <div className="text-xs" style={{ color: customTheme.text }}>
                          Status
                        </div>
                      </div>
                    </div>

                    {/* Voice Controls */}
                    <div className="flex items-center space-x-3 mb-6">
                      <Button
                        onClick={isListening ? stopVoiceAnalysis : startVoiceAnalysis}
                        className="flex-1"
                        style={{
                          background: isListening
                            ? `linear-gradient(135deg, #ef4444, #dc2626)`
                            : `linear-gradient(135deg, ${customTheme.primary}, ${customTheme.secondary})`,
                        }}
                      >
                        {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                        {isListening ? "Stop Listening" : "Start Voice Analysis"}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setAudioEnabled(!audioEnabled)}
                        style={{ color: customTheme.text }}
                      >
                        {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                      </Button>
                    </div>

                    {/* Conversation Interface */}
                    <div className="space-y-4 mb-6">
                      <div className="flex space-x-2">
                        <Input
                          value={conversationInput}
                          onChange={(e) => setConversationInput(e.target.value)}
                          placeholder="Type your message or speak..."
                          className="flex-1"
                          style={{
                            background: `${customTheme.background}50`,
                            borderColor: `${customTheme.primary}30`,
                            color: customTheme.text,
                          }}
                          onKeyPress={(e) => e.key === "Enter" && handleTextInput()}
                        />
                        <Button
                          onClick={handleTextInput}
                          disabled={!conversationInput.trim() || isResponding}
                          style={{
                            background: `linear-gradient(135deg, ${customTheme.primary}, ${customTheme.secondary})`,
                          }}
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* AI Response */}
                      {aiResponse && (
                        <div
                          className="p-4 rounded-lg border-l-4"
                          style={{
                            background: `${customTheme.primary}10`,
                            borderLeftColor: customTheme.primary,
                          }}
                        >
                          <div className="flex items-start space-x-3">
                            <motion.div
                              animate={isResponding ? { scale: [1, 1.1, 1] } : {}}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                            >
                              <Brain className="w-5 h-5 mt-1" style={{ color: customTheme.primary }} />
                            </motion.div>
                            <div className="flex-1">
                              <p className="text-sm" style={{ color: customTheme.text }}>
                                {aiResponse}
                              </p>
                              {isResponding && (
                                <div className="flex items-center space-x-2 mt-2">
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                                    className="w-3 h-3 border-2 border-t-transparent rounded-full"
                                    style={{ borderColor: customTheme.primary }}
                                  />
                                  <span className="text-xs opacity-70" style={{ color: customTheme.text }}>
                                    Generating response...
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setCurrentView("character")}
                        className="flex items-center space-x-2"
                        style={{ color: customTheme.text }}
                      >
                        <Palette className="w-4 h-4" />
                        <span>Character</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setCurrentView("youtube")}
                        className="flex items-center space-x-2"
                        style={{ color: customTheme.text }}
                      >
                        <Youtube className="w-4 h-4" />
                        <span>YouTube</span>
                      </Button>
                    </div>
                  </>
                )}

                {/* Settings View */}
                {currentView === "settings" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold" style={{ color: customTheme.text }}>
                        Settings
                      </h4>
                      <Button size="sm" variant="ghost" onClick={() => setCurrentView("main")}>
                        ← Back
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block" style={{ color: customTheme.text }}>
                          Empathy Level
                        </label>
                        <Slider
                          value={empathyLevel}
                          onValueChange={setEmpathyLevel}
                          max={10}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="text-xs mt-1 opacity-70" style={{ color: customTheme.text }}>
                          Current: {empathyLevel[0]}/10
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block" style={{ color: customTheme.text }}>
                          Charisma Level
                        </label>
                        <Slider
                          value={charismaLevel}
                          onValueChange={setCharismaLevel}
                          max={10}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="text-xs mt-1 opacity-70" style={{ color: customTheme.text }}>
                          Current: {charismaLevel[0]}/10
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: customTheme.text }}>
                          Audio Responses
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setAudioEnabled(!audioEnabled)}
                          style={{ color: audioEnabled ? customTheme.primary : customTheme.text }}
                        >
                          {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Character Selection View */}
                {currentView === "character" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold" style={{ color: customTheme.text }}>
                        Choose Character
                      </h4>
                      <Button size="sm" variant="ghost" onClick={() => setCurrentView("main")}>
                        ← Back
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {CHARACTER_PROFILES.map((character) => (
                        <div
                          key={character.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedCharacter.id === character.id ? "border-opacity-100" : "border-opacity-30"
                          }`}
                          style={{
                            background: `${character.themeColors.primary}10`,
                            borderColor: character.themeColors.primary,
                          }}
                          onClick={() => handleCharacterChange(character.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium" style={{ color: customTheme.text }}>
                                {character.name}
                              </h5>
                              <p className="text-xs opacity-70" style={{ color: customTheme.text }}>
                                {character.personality}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge style={{ background: character.themeColors.primary, color: "white" }}>
                                Empathy: {character.empathyLevel}
                              </Badge>
                              <Badge style={{ background: character.themeColors.secondary, color: "white" }}>
                                Charisma: {character.charismaLevel}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* YouTube Integration View */}
                {currentView === "youtube" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold" style={{ color: customTheme.text }}>
                        YouTube Integration
                      </h4>
                      <Button size="sm" variant="ghost" onClick={() => setCurrentView("main")}>
                        ← Back
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block" style={{ color: customTheme.text }}>
                          Add Your Favorite Character Video
                        </label>
                        <div className="flex space-x-2">
                          <Input
                            value={youtubeVideoId}
                            onChange={(e) => setYoutubeVideoId(e.target.value)}
                            placeholder="YouTube URL or Video ID"
                            className="flex-1"
                            style={{
                              background: `${customTheme.background}50`,
                              borderColor: `${customTheme.primary}30`,
                              color: customTheme.text,
                            }}
                          />
                          <Button
                            onClick={handleYoutubeVideoAdd}
                            style={{
                              background: `linear-gradient(135deg, ${customTheme.primary}, ${customTheme.secondary})`,
                            }}
                          >
                            <Upload className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {selectedCharacter.youtubeVideoId && (
                        <div className="space-y-3">
                          <h5 className="font-medium" style={{ color: customTheme.text }}>
                            Current Character Video
                          </h5>
                          <div
                            className="aspect-video rounded-lg overflow-hidden"
                            style={{ background: `${customTheme.primary}20` }}
                          >
                            <iframe
                              width="100%"
                              height="100%"
                              src={`https://www.youtube.com/embed/${selectedCharacter.youtubeVideoId}`}
                              title="Character Video"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      )}

                      <div className="text-xs opacity-70" style={{ color: customTheme.text }}>
                        Add a video of your favorite character to personalize your Genius Guide experience. The AI will
                        adapt its personality and responses to match your chosen character.
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
