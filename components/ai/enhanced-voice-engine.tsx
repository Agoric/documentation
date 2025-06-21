"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Volume2, VolumeX, Mic, Zap, Brain } from "lucide-react"

interface VoiceProfile {
  name: string
  rate: number
  pitch: number
  volume: number
  voice: string
  description: string
}

const VOICE_PROFILES: VoiceProfile[] = [
  {
    name: "Conversational",
    rate: 1.3,
    pitch: 0.95,
    volume: 0.85,
    voice: "natural",
    description: "Natural, smooth conversation flow",
  },
  {
    name: "Executive",
    rate: 1.1,
    pitch: 0.85,
    volume: 0.9,
    voice: "authoritative",
    description: "Professional, confident tone",
  },
  {
    name: "Energetic",
    rate: 1.5,
    pitch: 1.1,
    volume: 0.95,
    voice: "dynamic",
    description: "High-energy, motivational",
  },
  {
    name: "Smooth",
    rate: 1.2,
    pitch: 0.9,
    volume: 0.8,
    voice: "smooth",
    description: "Silky smooth, easy listening",
  },
]

export function EnhancedVoiceEngine() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentProfile, setCurrentProfile] = useState<VoiceProfile>(VOICE_PROFILES[0])
  const [isEnabled, setIsEnabled] = useState(true)
  const [customSettings, setCustomSettings] = useState({
    rate: 1.3,
    pitch: 0.95,
    volume: 0.85,
  })
  const [isTestingVoice, setIsTestingVoice] = useState(false)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)

  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis

      const loadVoices = () => {
        const voices = synthRef.current?.getVoices() || []
        setAvailableVoices(voices)

        const bestVoice =
          voices.find((v) => v.name.includes("Google US English") && v.name.includes("Male")) ||
          voices.find((v) => v.name.includes("Microsoft David Desktop")) ||
          voices.find((v) => v.name.includes("Alex")) ||
          voices.find((v) => v.name.includes("Daniel")) ||
          voices.find((v) => v.lang.startsWith("en-US") && v.localService) ||
          voices.find((v) => v.lang.startsWith("en-US")) ||
          voices[0]

        setSelectedVoice(bestVoice)
      }

      loadVoices()
      if (synthRef.current) {
        synthRef.current.onvoiceschanged = loadVoices
      }
    }
  }, [])

  const testVoice = (profile: VoiceProfile) => {
    if (!synthRef.current || !selectedVoice || !isEnabled) return

    setIsTestingVoice(true)
    synthRef.current.cancel()

    const testPhrases = [
      "Hey there! This is how I sound with the conversational profile.",
      "Your AI genius is ready to help you dominate today's challenges.",
      "Let's make some serious moves and crush your goals together.",
      "How does this voice sound to you? Pretty smooth, right?",
    ]

    const testText = testPhrases[Math.floor(Math.random() * testPhrases.length)]

    const utterance = new SpeechSynthesisUtterance(testText)
    utterance.voice = selectedVoice
    utterance.rate = profile.rate
    utterance.pitch = profile.pitch
    utterance.volume = profile.volume

    utterance.onend = () => {
      setIsTestingVoice(false)
    }

    utterance.onerror = () => {
      setIsTestingVoice(false)
    }

    synthRef.current.speak(utterance)
  }

  const applyProfile = (profile: VoiceProfile) => {
    setCurrentProfile(profile)
    setCustomSettings({
      rate: profile.rate,
      pitch: profile.pitch,
      volume: profile.volume,
    })
  }

  const updateCustomSetting = (setting: keyof typeof customSettings, value: number) => {
    setCustomSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  return (
    <div className="fixed top-32 right-6 z-40">
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
              className={`w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-600 shadow-2xl flex items-center justify-center ${
                isTestingVoice ? "shadow-cyan-500/50" : ""
              }`}
              animate={
                isTestingVoice
                  ? {
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 20px rgba(34, 211, 238, 0.5)",
                        "0 0 40px rgba(34, 211, 238, 0.7)",
                        "0 0 20px rgba(34, 211, 238, 0.5)",
                      ],
                    }
                  : {
                      boxShadow: [
                        "0 0 15px rgba(79, 70, 229, 0.3)",
                        "0 0 25px rgba(34, 211, 238, 0.5)",
                        "0 0 15px rgba(79, 70, 229, 0.3)",
                      ],
                    }
              }
              transition={
                isTestingVoice
                  ? { repeat: Number.POSITIVE_INFINITY, duration: 1 }
                  : { repeat: Number.POSITIVE_INFINITY, duration: 3 }
              }
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Brain className="w-5 h-5 text-white" />
            </motion.div>

            {/* Status indicators */}
            <div className="absolute -top-1 -right-1">
              {isTestingVoice && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                  className="w-3 h-3 bg-cyan-400 rounded-full"
                />
              )}
            </div>

            {/* Tooltip */}
            <motion.div
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-gradient-to-r from-indigo-900/95 to-cyan-900/95 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-cyan-400/30"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-2">
                <Brain className="w-3 h-3" />
                <span>Voice Engine</span>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-indigo-900/95"></div>
            </motion.div>

            {/* Quick controls */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsEnabled(!isEnabled)
                }}
                className={`w-8 h-8 p-0 rounded-full ${
                  isEnabled ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {isEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
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
            <Card className="bg-gradient-to-br from-slate-900/95 to-indigo-900/95 backdrop-blur-xl border-cyan-400/30">
              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-cyan-400" />
                    <span className="text-cyan-300 font-semibold">Voice Engine</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsEnabled(!isEnabled)}
                      className={`w-8 h-8 p-0 ${isEnabled ? "text-green-400" : "text-gray-400"}`}
                    >
                      {isEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsExpanded(false)}
                      className="w-8 h-8 p-0 text-cyan-400"
                    >
                      ×
                    </Button>
                  </div>
                </div>

                {/* Voice Profiles */}
                <div className="mb-4">
                  <div className="text-sm text-cyan-300 mb-2">Voice Profiles:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {VOICE_PROFILES.map((profile) => (
                      <motion.button
                        key={profile.name}
                        className={`p-2 rounded-lg text-xs transition-all ${
                          currentProfile.name === profile.name
                            ? "bg-cyan-600/30 border border-cyan-400/50 text-cyan-200"
                            : "bg-slate-800/50 border border-slate-600/30 text-slate-300 hover:bg-slate-700/50"
                        }`}
                        onClick={() => applyProfile(profile)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="font-medium">{profile.name}</div>
                        <div className="text-xs opacity-70">{profile.description}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Custom Controls */}
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-cyan-300">Speed</span>
                      <span className="text-xs text-cyan-400">{customSettings.rate.toFixed(1)}x</span>
                    </div>
                    <Slider
                      value={[customSettings.rate]}
                      onValueChange={([value]) => updateCustomSetting("rate", value)}
                      min={0.5}
                      max={2.0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-cyan-300">Pitch</span>
                      <span className="text-xs text-cyan-400">{customSettings.pitch.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[customSettings.pitch]}
                      onValueChange={([value]) => updateCustomSetting("pitch", value)}
                      min={0.5}
                      max={1.5}
                      step={0.05}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-cyan-300">Volume</span>
                      <span className="text-xs text-cyan-400">{Math.round(customSettings.volume * 100)}%</span>
                    </div>
                    <Slider
                      value={[customSettings.volume]}
                      onValueChange={([value]) => updateCustomSetting("volume", value)}
                      min={0.1}
                      max={1.0}
                      step={0.05}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Test Voice */}
                <div className="mb-4">
                  <Button
                    onClick={() => testVoice(currentProfile)}
                    disabled={!isEnabled || isTestingVoice}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                  >
                    {isTestingVoice ? (
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Zap className="w-4 h-4" />
                        </motion.div>
                        <span>Testing Voice...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Mic className="w-4 h-4" />
                        <span>Test Voice</span>
                      </div>
                    )}
                  </Button>
                </div>

                {/* Voice Info */}
                <div className="text-xs text-slate-400">
                  <div className="flex items-center justify-between mb-1">
                    <span>Current Voice:</span>
                    <span className="text-cyan-400">{selectedVoice?.name || "Default"}</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span>Language:</span>
                    <span className="text-cyan-400">{selectedVoice?.lang || "en-US"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Quality:</span>
                    <Badge className="bg-green-500/20 text-green-300 border-green-400/30 text-xs">
                      {selectedVoice?.localService ? "High" : "Standard"}
                    </Badge>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="mt-4 pt-4 border-t border-slate-600/30">
                  <div className="text-xs text-slate-400 mb-2">Quick Presets:</div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateCustomSetting("rate", 1.5)}
                      className="text-xs text-green-400 hover:text-green-300"
                    >
                      Fast
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateCustomSetting("rate", 1.2)}
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      Smooth
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateCustomSetting("pitch", 0.85)}
                      className="text-xs text-purple-400 hover:text-purple-300"
                    >
                      Deep
                    </Button>
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
