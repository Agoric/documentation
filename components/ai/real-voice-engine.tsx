"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Volume2, VolumeX, Zap, Brain, Play, Pause } from "lucide-react"

interface RealVoiceProfile {
  id: string
  name: string
  description: string
  gender: "male" | "female"
  accent: string
  personality: string
  apiProvider: "elevenlabs" | "murf" | "speechify" | "azure" | "replicate"
  voiceId: string
  preview?: string
}

const REAL_VOICE_PROFILES: RealVoiceProfile[] = [
  {
    id: "leonardo-wolf",
    name: "Leonardo (Wolf)",
    description: "Confident, charismatic, Wall Street energy",
    gender: "male",
    accent: "American",
    personality: "Confident, Energetic, Persuasive",
    apiProvider: "elevenlabs",
    voiceId: "pNInz6obpgDQGcFmaJgB", // Adam voice from ElevenLabs
    preview: "Hey there, champion! Ready to make some serious money moves today?",
  },
  {
    id: "executive-authority",
    name: "Executive Authority",
    description: "Professional, authoritative, business leader",
    gender: "male",
    accent: "American",
    personality: "Professional, Authoritative, Clear",
    apiProvider: "elevenlabs",
    voiceId: "ErXwobaYiN019PkySvjV", // Antoni voice from ElevenLabs
    preview: "Your financial empire requires strategic thinking and decisive action.",
  },
  {
    id: "smooth-advisor",
    name: "Smooth Advisor",
    description: "Calm, reassuring, wise mentor",
    gender: "male",
    accent: "British",
    personality: "Calm, Wise, Reassuring",
    apiProvider: "elevenlabs",
    voiceId: "VR6AewLTigWG4xSOukaG", // Arnold voice from ElevenLabs
    preview: "Let me guide you through the complexities of digital sovereignty.",
  },
  {
    id: "dynamic-coach",
    name: "Dynamic Coach",
    description: "High-energy, motivational, inspiring",
    gender: "male",
    accent: "American",
    personality: "Energetic, Motivational, Inspiring",
    apiProvider: "elevenlabs",
    voiceId: "EXAVITQu4vr4xnSDxMaL", // Sam voice from ElevenLabs
    preview: "You've got this! Let's turn your dreams into reality right now!",
  },
]

export function RealVoiceEngine() {
  const [selectedVoice, setSelectedVoice] = useState<RealVoiceProfile>(REAL_VOICE_PROFILES[0])
  const [isEnabled, setIsEnabled] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioCache, setAudioCache] = useState<Map<string, string>>(new Map())
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [apiKey, setApiKey] = useState<string>("")

  useEffect(() => {
    const stored = localStorage.getItem("elevenlabs_api_key")
    if (stored) setApiKey(stored)
  }, [])

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio()
    audioRef.current.onended = () => setIsPlaying(false)
    audioRef.current.onerror = () => {
      setIsPlaying(false)
      console.error("Audio playback error")
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const generateRealVoice = async (text: string, voiceProfile: RealVoiceProfile): Promise<string | null> => {
    setIsGenerating(true)

    try {
      // Check cache first
      const cacheKey = `${voiceProfile.id}-${text.substring(0, 50)}`
      if (audioCache.has(cacheKey)) {
        setIsGenerating(false)
        return audioCache.get(cacheKey)!
      }

      let audioUrl: string | null = null

      switch (voiceProfile.apiProvider) {
        case "elevenlabs":
          audioUrl = await generateElevenLabsVoice(text, voiceProfile.voiceId)
          break
        case "replicate":
          audioUrl = await generateReplicateVoice(text, voiceProfile)
          break
        case "azure":
          audioUrl = await generateAzureVoice(text, voiceProfile)
          break
        default:
          console.warn(`Provider ${voiceProfile.apiProvider} not implemented`)
      }

      if (audioUrl) {
        // Cache the audio URL
        setAudioCache((prev) => new Map(prev.set(cacheKey, audioUrl)))
      }

      setIsGenerating(false)
      return audioUrl
    } catch (error) {
      console.error("Voice generation error:", error)
      setIsGenerating(false)
      return null
    }
  }

  const generateElevenLabsVoice = async (text: string, voiceId: string): Promise<string | null> => {
    try {
      const res = await fetch("/api/voice/elevenlabs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-elevenlabs-key": apiKey } : {}),
        },
        body: JSON.stringify({ text, voiceId }),
      })

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || `ElevenLabs proxy error: ${res.status}`)
      }

      const blob = await res.blob()
      return URL.createObjectURL(blob)
    } catch (err) {
      console.error("ElevenLabs proxy generation error:", err)
      return null
    }
  }

  const generateReplicateVoice = async (text: string, voiceProfile: RealVoiceProfile): Promise<string | null> => {
    try {
      // Using Replicate's Bark model for voice generation
      const response = await fetch("/api/voice/replicate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          voice_preset: voiceProfile.voiceId,
        }),
      })

      if (!response.ok) {
        throw new Error(`Replicate API error: ${response.status}`)
      }

      const data = await response.json()
      return data.audio_url
    } catch (error) {
      console.error("Replicate generation error:", error)
      return null
    }
  }

  const generateAzureVoice = async (text: string, voiceProfile: RealVoiceProfile): Promise<string | null> => {
    try {
      const response = await fetch("/api/voice/azure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          voice: voiceProfile.voiceId,
          style: voiceProfile.personality.toLowerCase(),
        }),
      })

      if (!response.ok) {
        throw new Error(`Azure API error: ${response.status}`)
      }

      const audioBlob = await response.blob()
      return URL.createObjectURL(audioBlob)
    } catch (error) {
      console.error("Azure generation error:", error)
      return null
    }
  }

  const playRealVoice = async (text: string) => {
    if (!isEnabled || isGenerating || !audioRef.current) return

    const audioUrl = await generateRealVoice(text, selectedVoice)
    if (audioUrl) {
      audioRef.current.src = audioUrl
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  const testVoice = () => {
    if (selectedVoice.preview) {
      playRealVoice(selectedVoice.preview)
    }
  }

  return (
    <div className="fixed top-32 right-6 z-40">
      <Card className="w-96 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-amber-400/30">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-amber-400" />
              <span className="text-amber-300 font-semibold">Real Voice Engine</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500/20 text-green-300 border-green-400/30 text-xs">AI POWERED</Badge>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEnabled(!isEnabled)}
                className={`w-8 h-8 p-0 ${isEnabled ? "text-green-400" : "text-gray-400"}`}
              >
                {isEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* API Key Input (optional - only shown if env-var absent) */}
          {!apiKey && (
            <div className="mb-4 p-3 bg-amber-900/20 border border-amber-400/30 rounded-lg">
              <div className="text-sm text-amber-300 mb-2">Optional ElevenLabs API Key:</div>
              <input
                type="password"
                placeholder="Paste key & press Enter…"
                className="w-full bg-slate-800/50 border border-slate-600/30 rounded px-3 py-2 text-white text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value) {
                    localStorage.setItem("elevenlabs_api_key", e.currentTarget.value)
                    setApiKey(e.currentTarget.value)
                    e.currentTarget.value = ""
                  }
                }}
              />
              <p className="text-xs text-amber-400 mt-1">
                Not required if <code>ELEVENLABS_API_KEY</code> is set on the server.
              </p>
            </div>
          )}

          {/* Voice Selection */}
          <div className="mb-4">
            <div className="text-sm text-amber-300 mb-2">Select Voice:</div>
            <Select
              value={selectedVoice.id}
              onValueChange={(value) => {
                const voice = REAL_VOICE_PROFILES.find((v) => v.id === value)
                if (voice) setSelectedVoice(voice)
              }}
            >
              <SelectTrigger className="bg-slate-800/50 border-slate-600/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {REAL_VOICE_PROFILES.map((voice) => (
                  <SelectItem key={voice.id} value={voice.id} className="text-white hover:bg-slate-700">
                    <div>
                      <div className="font-medium">{voice.name}</div>
                      <div className="text-xs text-slate-400">{voice.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Voice Details */}
          <div className="mb-4 p-3 bg-gradient-to-r from-purple-800/30 to-indigo-800/30 rounded-lg border border-purple-400/30">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-purple-300">Gender:</span>
                <span className="text-white ml-1 capitalize">{selectedVoice.gender}</span>
              </div>
              <div>
                <span className="text-purple-300">Accent:</span>
                <span className="text-white ml-1">{selectedVoice.accent}</span>
              </div>
              <div className="col-span-2">
                <span className="text-purple-300">Personality:</span>
                <span className="text-white ml-1">{selectedVoice.personality}</span>
              </div>
              <div className="col-span-2">
                <span className="text-purple-300">Provider:</span>
                <Badge className="ml-1 bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs">
                  {selectedVoice.apiProvider.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>

          {/* Test Voice */}
          <div className="mb-4">
            <Button
              onClick={testVoice}
              disabled={!isEnabled || isGenerating}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
            >
              {isGenerating ? (
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Zap className="w-4 h-4" />
                  </motion.div>
                  <span>Generating Voice...</span>
                </div>
              ) : isPlaying ? (
                <div className="flex items-center space-x-2">
                  <Pause className="w-4 h-4" />
                  <span>Playing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Test Real Voice</span>
                </div>
              )}
            </Button>
          </div>

          {/* Playback Controls */}
          {isPlaying && (
            <div className="mb-4 p-2 bg-green-900/20 border border-green-400/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                    className="w-2 h-2 bg-green-400 rounded-full"
                  />
                  <span className="text-green-300 text-sm">Playing Real Voice</span>
                </div>
                <Button size="sm" variant="ghost" onClick={stopPlayback} className="text-red-400 hover:text-red-300">
                  <Pause className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Voice Stats */}
          <div className="pt-4 border-t border-slate-600/30">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-green-400 font-bold text-lg">{audioCache.size}</div>
                <div className="text-green-300 text-xs">Cached</div>
              </div>
              <div>
                <div className="text-blue-400 font-bold text-lg">HD</div>
                <div className="text-blue-300 text-xs">Quality</div>
              </div>
              <div>
                <div className="text-amber-400 font-bold text-lg">AI</div>
                <div className="text-amber-300 text-xs">Powered</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 flex space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => playRealVoice("Hey there, champion! Ready to make some serious money moves?")}
              className="flex-1 text-xs text-green-400 hover:text-green-300"
              disabled={!isEnabled || isGenerating}
            >
              💰 Money Talk
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => playRealVoice("You've got this! Let's dominate today's challenges together!")}
              className="flex-1 text-xs text-blue-400 hover:text-blue-300"
              disabled={!isEnabled || isGenerating}
            >
              🚀 Motivate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
