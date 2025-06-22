"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Volume2, VolumeX, Zap, Brain, Play, Pause } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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

/**
 * Minimal exponential-backoff retry wrapper for fetch.
 * Retries on 5xx responses or network failures.
 */
async function fetchWithRetry(url: string, options: RequestInit, retries = 2, delay = 600): Promise<Response> {
  try {
    const res = await fetch(url, options)
    if (res.ok || retries === 0) return res
    if (res.status >= 500) {
      // wait and retry on server errors
      await new Promise((r) => setTimeout(r, delay))
      return fetchWithRetry(url, options, retries - 1, delay * 2)
    }
    return res
  } catch (err) {
    if (retries === 0) throw err
    await new Promise((r) => setTimeout(r, delay))
    return fetchWithRetry(url, options, retries - 1, delay * 2)
  }
}

export function RealVoiceEngine() {
  const [selectedVoice, setSelectedVoice] = useState<RealVoiceProfile>(REAL_VOICE_PROFILES[0])
  const [isEnabled, setIsEnabled] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioCache, setAudioCache] = useState<Map<string, string>>(new Map())
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { toast } = useToast()

  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [autoRetractTimer, setAutoRetractTimer] = useState<NodeJS.Timeout | null>(null)

  // Pull build-time public env first
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY ?? ""
  const [apiKey, setApiKey] = useState<string>(() => {
    if (PUBLIC_KEY) return PUBLIC_KEY // 1️⃣ build-time
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("elevenlabs_api_key")
      if (stored) return stored // 2️⃣ saved key
    }
    return "" // 3️⃣ none yet
  })

  // Add after the ElevenLabs API key state
  // Build-time public key first, then LS
  const PUBLIC_REPLICATE_KEY = process.env.NEXT_PUBLIC_REPLICATE_API_KEY ?? ""
  const [replicateKey, setReplicateKey] = useState<string>(() => {
    if (PUBLIC_REPLICATE_KEY) return PUBLIC_REPLICATE_KEY
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("replicate_api_key")
      if (stored) return stored
    }
    return ""
  })

  useEffect(() => {
    if (!PUBLIC_KEY) {
      // only look in LS if no env key
      const stored = localStorage.getItem("elevenlabs_api_key")
      if (stored) setApiKey(stored)
    }
  }, [])

  useEffect(() => {
    // Load Replicate key from localStorage on mount
    const stored = localStorage.getItem("replicate_api_key")
    if (stored) setReplicateKey(stored)
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

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    if (autoRetractTimer) {
      clearTimeout(autoRetractTimer)
      setAutoRetractTimer(null)
    }
    if (!isExpanded) {
      setIsExpanded(true)
    }
  }, [isExpanded, autoRetractTimer])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    const timer = setTimeout(() => {
      if (!isHovered && isExpanded) {
        setIsExpanded(false)
      }
    }, 4000) // Auto-retract after 4 seconds
    setAutoRetractTimer(timer)
  }, [isHovered, isExpanded])

  useEffect(() => {
    return () => {
      if (autoRetractTimer) {
        clearTimeout(autoRetractTimer)
      }
    }
  }, [autoRetractTimer])

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
        case "elevenlabs": {
          audioUrl = await generateElevenLabsVoice(text, voiceProfile.voiceId)
          if (!audioUrl) {
            // automatic fallback
            toast({
              title: "ElevenLabs unavailable – switching to Bark TTS",
              description: "Using Replicate for this request.",
            })
            audioUrl = await generateReplicateVoice(text, voiceProfile)
          }
          break
        }
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
    if (!apiKey) {
      toast({
        title: "Missing ElevenLabs API key",
        description: "Add NEXT_PUBLIC_ELEVENLABS_API_KEY or paste one into the voice panel.",
        variant: "destructive",
      })
      return null
    }

    try {
      // Hard-cap input to 1 800 chars (ElevenLabs limit ≈2 000)
      const safeText = text.slice(0, 1800)

      const res = await fetchWithRetry(
        "/api/voice/elevenlabs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-elevenlabs-key": apiKey,
          },
          body: JSON.stringify({ text: safeText, voiceId }),
        },
        2, // retries
      )

      if (!res.ok) {
        let payload: unknown = {}
        try {
          payload = await res.json()
        } catch {
          /* no-op */
        }

        // Detect invalid/expired key and clear LS so the input field shows again
        const isInvalidKey =
          res.status === 401 ||
          (typeof payload === "object" &&
            payload !== null &&
            // @ts-ignore
            (payload.detail?.status === "invalid_api_key" || payload.error?.type === "invalid_api_key"))

        if (isInvalidKey) {
          if (localStorage.getItem("elevenlabs_api_key")) {
            localStorage.removeItem("elevenlabs_api_key")
          }
          setApiKey("")
          toast({
            title: "Invalid ElevenLabs API key",
            description: "The key you supplied is not valid. Please provide a correct key.",
            variant: "destructive",
          })
          return null
        }

        const msg =
          // @ts-ignore
          payload?.detail?.message ||
          // @ts-ignore
          payload?.error?.message ||
          `ElevenLabs proxy error: ${res.status}`

        throw new Error(msg)
      }

      const blob = await res.blob()
      return URL.createObjectURL(blob)
    } catch (err) {
      console.error("ElevenLabs proxy generation error:", err)
      toast({
        title: "Voice generation failed",
        description: (err as Error).message,
        variant: "destructive",
      })
      return null
    }
  }

  const generateReplicateVoice = async (text: string, voiceProfile: RealVoiceProfile): Promise<string | null> => {
    if (!replicateKey) {
      toast({
        title: "Replicate key missing",
        description: "Supply NEXT_PUBLIC_REPLICATE_API_KEY at build time or paste a key once in the panel.",
        variant: "destructive",
      })
      return null
    }
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "x-replicate-key": replicateKey,
      }

      const res = await fetchWithRetry(
        "/api/voice/replicate",
        {
          method: "POST",
          headers,
          body: JSON.stringify({ text, voice_preset: voiceProfile.voiceId }),
        },
        3, // retries - exponential back-off handled inside helper
      )

      if (!res.ok) {
        const errTxt = await res.text().catch(() => "")
        toast({
          title: "Replicate service unavailable",
          description:
            res.status === 502 || res.status === 504
              ? "The TTS service is temporarily unreachable. Please try again in a moment."
              : `Replicate error ${res.status}: ${errTxt || "Unknown error"}`,
          variant: "destructive",
        })
        return null
      }

      const { audio_url } = (await res.json()) as { audio_url: string }
      return audio_url
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
    <div className="fixed top-32 right-6 z-40" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <AnimatePresence>
        {!isExpanded ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="w-12 h-12 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-amber-400/30 border rounded-full flex items-center justify-center cursor-pointer"
          >
            <Brain className="w-6 h-6 text-amber-400" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, x: 50 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0.8, opacity: 0, x: 50 }}
          >
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

                {/* API Key Input (shown only if no key anywhere) */}
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

                {/* Replicate API Key Input */}
                {!replicateKey && (
                  <div className="mb-4 p-3 bg-blue-900/20 border border-blue-400/30 rounded-lg">
                    <div className="text-sm text-blue-300 mb-2">Optional Replicate API Key:</div>
                    <input
                      type="password"
                      placeholder="Paste Replicate key & press Enter…"
                      className="w-full bg-slate-800/50 border border-slate-600/30 rounded px-3 py-2 text-white text-sm"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value) {
                          localStorage.setItem("replicate_api_key", e.currentTarget.value)
                          setReplicateKey(e.currentTarget.value)
                          e.currentTarget.value = ""
                          toast({
                            title: "Replicate key saved",
                            description: "Voice generation will now use your Replicate API key.",
                          })
                        }
                      }}
                    />
                    <p className="text-xs text-blue-400 mt-1">For Bark TTS fallback when ElevenLabs is unavailable.</p>
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
                      <div className="flex items-center space-x-1 ml-1">
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs">
                          {selectedVoice.apiProvider.toUpperCase()}
                        </Badge>
                        {selectedVoice.apiProvider === "elevenlabs" && apiKey && (
                          <Badge className="bg-green-500/20 text-green-300 border-green-400/30 text-xs">✓ KEY</Badge>
                        )}
                        {selectedVoice.apiProvider === "replicate" && replicateKey && (
                          <Badge className="bg-green-500/20 text-green-300 border-green-400/30 text-xs">✓ KEY</Badge>
                        )}
                      </div>
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
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={stopPlayback}
                        className="text-red-400 hover:text-red-300"
                      >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
